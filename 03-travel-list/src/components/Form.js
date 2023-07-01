import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]); // we want these items to render in PackingList but Form and  PackingList are siblings so we can't pass it through props so we use a trick, we lift the state up to common parent(App) and use it there and pass handleFunction as a prop

  // function handleAddItems(item) {
  //   setItems((items) => [...items, item]);
  // } // for lifting the state up we have to make this also to common parent element(App)

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    // handleAddItems(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
      {/* {Array.from({ length: 20 }, (_, i) => i + 1) Array.from makes an array, it takes 2 arguments 1st- length 2nd- It's like a map function so it's empty array at starting so we will fill it with index+1 and then we applied map function to return 20 options.  */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      {/* Below is controlled element (when we use value attribute and we have a handle function which handles state, it becomes controlled element), its value is controlled by react and not by DOM */}
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        placeholder="Item"
      />
      <button>Add</button>
    </form>
  );
}
