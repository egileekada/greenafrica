import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter";

const rootReducer = combineReducers({
  count: counterReducer,
});

export default rootReducer;
