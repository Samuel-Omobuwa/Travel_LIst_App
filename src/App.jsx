const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away 💼</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
}
function PackingList() {
  return (
    <div className="list">
      {initialItems.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span
        style={
          item.packed
            ? { textDecoration: `line-through` }
            : { textDecoration: `none` }
        }
      >
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
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
