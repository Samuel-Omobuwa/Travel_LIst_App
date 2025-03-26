import { useState } from "react";


export default function App() {
  const [items, setItem] = useState([]);

  function handleAddItems(item) {
    setItem((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handleItemToggle(id){
    setItem((items) => items.map((item)=> item.id === id ?{...item, packed: !item.packed} : item))
  }

  return (
    <div className="App">
      <Logo />
      <Form onhandleAddItems={handleAddItems} />
      <PackingList items={items} 
      onToggleItem={handleItemToggle}
      onDeleteItems={handleDeleteItems} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away 💼</h1>;
}
function Form({ onhandleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(3);

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
        <Item item={item} key={item.id} onDeleteItems={onDeleteItems} onToggleItem={onToggleItem} />
      ))}
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={()=> onToggleItem(item.id)} />
      <span
        style={
          item.packed
            ? { textDecoration: `line-through` }
            : { textDecoration: `none` }
        }
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={()=> onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You hav X items on your list, and you already packed X (X%) </em>
    </footer>
  );
}
