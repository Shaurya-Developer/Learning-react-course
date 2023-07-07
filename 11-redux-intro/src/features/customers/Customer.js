import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store) => store.customer.fullname); // To read from store of redux we use useSelector hook, it takes a callback function in which we give our store and then read values from it, this hook creates a subscription to the store so whenever the store value changes, component subscribed to that store re-renders
  console.log(customer);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
