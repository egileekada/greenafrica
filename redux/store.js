import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "redux/reducers/counter";
import generalReducer from "redux/reducers/general";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    general: generalReducer,
  },
});
