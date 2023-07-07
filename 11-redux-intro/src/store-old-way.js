import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Old way
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
); // we can give 2nd argument in createStore in which we can specify thunk middleware using applyMiddleware, we wrap applyMiddleware with composeWithDevTools bcz we can to use redux devtools

export default store;
// 3 steps to work with thunks(Redux Middleware)
// 1) Install middleware package
// 2) Apply middleware to our store
// 3) use middleware in action creator function
