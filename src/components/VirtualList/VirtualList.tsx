import React, { ReactNode, useState } from "react";

import styles from "./styles.module.css";

type Props<Item> = {
  height: number;
  itemHeight: number;
  items: Item[];
  keyAccessor: (item: Item) => string;
  renderItem: (item: Item) => ReactNode;
};

const AMOUNT_BUFFER_ITEMS = 2;

const VirtualList = <T extends unknown>({
  height,
  items,
  itemHeight,
  renderItem,
  keyAccessor,
}: Props<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const listHolderHeight = itemHeight * items.length;

  const startIdx = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - AMOUNT_BUFFER_ITEMS
  );
  const endIdx = Math.min(
    items.length - 1,
    Math.floor((scrollTop + height) / itemHeight) + AMOUNT_BUFFER_ITEMS
  );

  const renderedItems = items.slice(startIdx, endIdx + 1);

  return (
    <div style={{ height }} className={styles.listWrapper} onScroll={onScroll}>
      <div className={styles.listHolder} style={{ height: listHolderHeight }}>
        <ul
          className={styles.list}
          style={{ transform: `translateY(${startIdx * itemHeight}px)` }}
        >
          {renderedItems.map((item) => (
            <li
              className={styles.item}
              key={keyAccessor(item)}
              style={{ height: itemHeight }}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VirtualList;
