import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "redux/reducers/general";
import sessionReducer from "redux/reducers/session";
import paymentReducer from "redux/reducers/payment";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    session: sessionReducer,
    payment: paymentReducer,
  },
});
