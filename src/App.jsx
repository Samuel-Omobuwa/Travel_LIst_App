import { useState } from "react";

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

  return (
    <div className="app">
      <Logo />
      <Form onhandleAddItems={handleAddItems} />
      <PackingList
        items={items}
        onToggleItem={handleItemToggle}
        onDeleteItems={handleDeleteItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>🌴Far Away 💼</h1>
      <h3
        style={{
          backgroundColor: "#f4a226",
          textAlign: "center",
          fontWeight: "900",
          padding: "0px 0px 20px 0px",
        }}
      >
        YOUR TRAVEL PACKING LIST{" "}
      </h3>
    </div>
  );
}

function Form({ onhandleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleItemSubmit(e) {
    e.preventDefault();

    const newItem = { description, quantity, packed: false, id: Date.now() };

    console.log(newItem);
    onhandleAddItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleItemSubmit}>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num} onChange={Number(num)}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems, onToggleItem }) {
  return (
    <div className="list">
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteItems={onDeleteItems}
          onToggleItem={onToggleItem}
        />
      ))}

      <div className="actions">
        <select name="" id="">
          <option value="input">Sort by the input order</option>
          <option value="description">Sort by description </option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li className="">
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span
        style={
          item.packed
            ? { textDecoration: `line-through` }
            : { textDecoration: `none` }
        }
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em> Start adding some items to your list 🚀</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You go everything! Ready to go ✈️"
          : `  💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%) `}
      </em>
    </footer>
  );
}
