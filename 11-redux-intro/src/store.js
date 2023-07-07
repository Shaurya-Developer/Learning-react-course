import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// configureStore automatically combine our reducers, apply thunk middleware and setup devtools
// New way using redux toolkit
const store = configureStore({
  reducer: { account: accountReducer, customer: customerReducer },
}); // configureStore take object of options so we can specify our root reducer, and reducer come into it,

export default store;
