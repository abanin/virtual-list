import React, { ReactNode, useMemo, useState } from "react";

import styles from "./styles.module.css";

type Props<Item> = {
  height: number;
  getItemHeight: (item: Item, idx: number) => number;
  items: Item[];
  keyAccessor: (item: Item, idx: number) => string;
  renderItem: (item: Item, idx: number) => ReactNode;
};

const AMOUNT_BUFFER_ITEMS = 2;

const VirtualList = <T extends unknown>({
  height,
  items,
  getItemHeight,
  renderItem,
  keyAccessor,
}: Props<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const listHolderHeight = useMemo(() => {
    return items.reduce((totalHeight, item, idx) => {
      totalHeight += getItemHeight(item, idx);
      return totalHeight;
    }, 0);
  }, [items, getItemHeight]);

  const heightsCache = useMemo(() => {
    return items.reduce<number[]>((arrayHeight, _item, idx) => {
      if (idx === 0) {
        arrayHeight[idx] = 0;
      } else {
        arrayHeight[idx] =
          getItemHeight(items[idx - 1], idx) + arrayHeight[idx - 1];
      }

      return arrayHeight;
    }, []);
  }, [items, getItemHeight]);

  const getIdx = (scrollTop: number) => {
    const idx = heightsCache.findIndex((height) => height >= scrollTop);
    return idx < 0 ? items.length - 1 : idx - 1;
  };

  const startIdx = Math.max(0, getIdx(scrollTop) - AMOUNT_BUFFER_ITEMS);
  const endIdx = Math.min(
    items.length - 1,
    getIdx(scrollTop + height) + AMOUNT_BUFFER_ITEMS
  );

  const renderedItems = items.slice(startIdx, endIdx + 1);

  return (
    <div style={{ height }} className={styles.listWrapper} onScroll={onScroll}>
      <div className={styles.listHolder} style={{ height: listHolderHeight }}>
        <ul
          className={styles.list}
          style={{
            transform: `translateY(${heightsCache[startIdx]}px)`,
          }}
        >
          {renderedItems.map((item, idx) => (
            <li
              className={styles.item}
              key={keyAccessor(item, idx)}
              style={{ height: getItemHeight(item, idx) }}
            >
              {renderItem(item, idx)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VirtualList;
