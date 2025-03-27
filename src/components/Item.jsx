export default function Item({ item, onDeleteItems, onToggleItem }) {
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
