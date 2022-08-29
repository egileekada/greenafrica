import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "redux/reducers/general";
import sessionReducer from "redux/reducers/session";
import paymentReducer from "redux/reducers/payment";
import bookingReducer from "redux/reducers/booking";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    session: sessionReducer,
    payment: paymentReducer,
    booking: bookingReducer,
  },
});
