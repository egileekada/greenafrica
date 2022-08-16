import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "redux/reducers/counter";
import generalReducer from "redux/reducers/general";
import sessionReducer from "redux/reducers/session";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    general: generalReducer,
    session: sessionReducer,
  },
});
