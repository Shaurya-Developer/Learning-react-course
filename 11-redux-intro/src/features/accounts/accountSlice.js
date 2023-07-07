import { createSlice } from "@reduxjs/toolkit";

// createSlice automatically create action creaters from our reducer, it makes writing these reducers easier,we can mutate our state inside reducers(Behind the scene it will use library immer which will convert logic to immutable logic)

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    // we can only give one argument in these functions when we call them, but here we want 2 arguments, so we  have to modify it
    // requestLoan(state, action) {
    //   if (state.loan > 0) return;
    //   state.loan = action.payload.amount;
    //   state.loanPurpose = action.payload.purpose;
    //   state.balance = state.balance + action.payload.amount;
    // },
    // we make it an object and call prepare method which will be the payload of reducer function, and we give function name as reducer
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrenty(state) {
      state.isLoading = true;
    },
  },
}); // it will take object of options and will return a slice, object will have name of reducer, initialState and reducers
// createSlice combines name of slice with reducers , so they'll be like account/deposit, bcz name is account and one reducer is deposit

//  console.log(accountSlice)// {name: 'account', actions: {…}, caseReducers: {…}, reducer: ƒ, getInitialState: ƒ}

// Creating own deposit(action creator, so redux will know by itself that it is action creater with thunk)
export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    // API call
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const coverted = data.rates.USD;
    // return action
    dispatch({
      type: "account/deposit",
      payload: coverted,
    });
  };
}
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
/*
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

// ACTION CREATERS
export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };
  // working with thunk(this function get access to dispatch and our state)(this middleware will sit between dispatching and store)(while working with thunk we dont return action object but instead return a function)
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    // API call
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const coverted = data.rates.USD;
    // return action
    dispatch({
      type: "account/deposit",
      payload: coverted,
    });
  };
}
export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: 1000, purpose: purpose },
  };
}
export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
*/
