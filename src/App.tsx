import VirtualList from "./components/VirtualList";
import { createItems } from "./helpers";

function renderItem(item: number) {
  return <span className="item">{item}</span>;
}

function keyAccessor(item: number) {
  return item.toString();
}

const items = createItems(10000);

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
    </div>
  );
}

export default App;
