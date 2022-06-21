import VirtualList from "./components/VirtualList";
import VirtualListV2 from "./components/VirtualListV2";
import { createItems } from "./helpers";

function renderItem(item: number) {
  return <span className="item">{item}</span>;
}

function keyAccessor(item: number) {
  return item.toString();
}

function getItemHeight(item: number) {
  return item % 2 ? 100 : 50;
}

const items = createItems(999);

function App() {
  return (
    <div className="App">
      <div className="container">
        <VirtualList
          height={200}
          items={items}
          itemHeight={50}
          renderItem={renderItem}
          keyAccessor={keyAccessor}
        />
      </div>
      <div className="container">
        <VirtualListV2
          height={300}
          items={items}
          getItemHeight={getItemHeight}
          renderItem={renderItem}
          keyAccessor={keyAccessor}
        />
      </div>
    </div>
  );
}

export default App;
