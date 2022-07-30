import { combineReducers } from "@reduxjs/toolkit";
import CountReducer from "./counter";

const rootReducer = combineReducers({
  count: CountReducer,
});

export default rootReducer;
