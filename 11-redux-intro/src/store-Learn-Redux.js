import { combineReducers, createStore } from "redux"; // createStore is deprecated, we have modern way of using redux, but for educational purposes we are learning it

// Learning redux in isolation, without react
// Redux is quite similar to useReducer hook, it is a library used for managing global state
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullname: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
} // by convention in redux we write our type in the way (state domanin /event name), in default we return the state instead of throwing error in redux

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullname: action.payload.fullname,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullname: action.payload };
    default:
      return state;
  }
}

// we combine all reducers and give one root reducer in store, we do it using  combineReducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

/*
const store = createStore(accountReducer); // we have store so on this store we can dispatch actions
store.dispatch({ type: "account/deposit", payload: 500 });
// store.getState() gives us state of our function
console.log(store.getState()); // {balance: 500, loan: 0, loanPurpose: ''}
store.dispatch({ type: "account/withdraw", payload: 100 });
console.log(store.getState()); // {balance: 400, loan: 0, loanPurpose: ''}

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Buy a car" },
});
console.log(store.getState()); // {balance: 1400, loan: 1000, loanPurpose: 'Buy a car'}
store.dispatch({
  type: "account/payLoan",
});
console.log(store.getState()); // {balance: 400, loan: 0, loanPurpose: ''}
*/
// we don't write actions manually while using redux we usually create actionCreaters to automate this thing, this is not a redux thing, redux can work without this , it is just a convention used by redux developers

function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}
function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: 1000, purpose: purpose },
  };
}
function payLoan() {
  return {
    type: "account/payLoan",
  };
}

// Account reducer (without combining with Customer reducer)
store.dispatch(deposit(500));
console.log(store.getState()); // {balance: 500, loan: 0, loanPurpose: ''}
store.dispatch(withdraw(200));
console.log(store.getState()); // {balance: 300, loan: 0, loanPurpose: ''}
store.dispatch(requestLoan(1000, "Buy shoes"));
console.log(store.getState()); // {balance: 1300, loan: 1000, loanPurpose: 'Buy shoes'}
store.dispatch(payLoan());
console.log(store.getState()); // {balance: 300, loan: 0, loanPurpose: ''}

function createCustomer(fullname, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullname, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullname) {
  return { type: "customer/updateName", payload: fullname };
}

// After combining reducers
store.dispatch(createCustomer("Shaurya Sharma", "1823473"));
console.log(store.getState()); // {account: {…}, customer: {…}} , it have updated data of account and customer
