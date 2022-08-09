import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import generalReducer from "./general";
import sessionReducer from "./session";

const rootReducer = combineReducers({
  count: counterReducer,
  general: generalReducer,
  session: sessionReducer,
});

export default rootReducer;
