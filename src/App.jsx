import { useState } from "react";
import Logo  from "./components/Logo";
import  Form  from "./components/Form";
import PackingList  from "./components/PackingList";
import  Stats  from "./components/Stats";

export default function App() {
  const [items, setItem] = useState([]);

  function handleAddItems(item) {
    setItem((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handleItemToggle(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const name = window.confirm("Are you sure you want to delete items");

    if (name) setItem([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onhandleAddItems={handleAddItems} />
      <PackingList
        items={items}
        onToggleItem={handleItemToggle}
        onDeleteItems={handleDeleteItems}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
