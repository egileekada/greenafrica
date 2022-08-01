import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import counterReducer from "redux/reducers/counter";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

