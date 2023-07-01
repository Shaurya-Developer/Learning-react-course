import { Children, useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

// so when we update state, SlowComponent is re-rendered so updating the state will take time so what we can do is take out counter part
/* 
export default function Test() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      <SlowComponent />
    </div>
  );
}
*/

// here SlowComponent is passed as a children so it will be passed as a prop during initial render but when we change state of Counter then SlowComponent will not re-render and updating of state will be faster
function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}
export default function Test() {
  return (
    <Counter>
      <SlowComponent />
    </Counter>
  );
}
