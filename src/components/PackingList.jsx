import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItems,
  onToggleItem,
  onClearList,
}) {
  const [sortedBy, setSortedBy] = useState("input");

  let sortedItems;

  if (sortedBy === "input") sortedItems = items;
  if (sortedBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortedBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

          

  return (
    <div className="list">
      {
      sortedItems.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteItems={onDeleteItems}
          onToggleItem={onToggleItem}
        />
      ))}

      <div className="actions">
        <select onChange={(e) => setSortedBy(e.target.value)}>
          <option value="input">Sort by the input order</option>
          <option value="description">Sort by description </option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button onClick={() => onClearList()}> Clear List</button>
      </div>
    </div>
  );
}
