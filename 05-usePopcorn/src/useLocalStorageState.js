// const [watched, setWatched] = useState([]);
// const [watched, setWatched] = useState(function () {
//   const storedValue = localStorage.getItem("watched");
//   return JSON.parse(storedValue);
// }); // LAZY EVALUATION, we can set initial value of our state using callback, this function will only run on first render and will be ignored on re-renders

// Initial value of state are only read during mounting phase

import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  ); // by setting up localStorage in effect,  we don't have to delete items manually from local storage , as effect is synced with watched state so it will be done by it
  return [value, setValue];
}
