import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import generalReducer from "redux/reducers/general";
import sessionReducer from "redux/reducers/session";
import paymentReducer from "redux/reducers/payment";
import bookingReducer from "redux/reducers/booking";
import checkinReducer from "./reducers/checkin";

import { widgetApi } from "../services/widgetApi";
import { bookingApi } from "../services/bookingApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["widgetApi", "bookingApi"],
};

const rootReducer = combineReducers({
  general: generalReducer,
  session: sessionReducer,
  payment: paymentReducer,
  booking: bookingReducer,
  checkin: checkinReducer,
  [widgetApi.reducerPath]: widgetApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(widgetApi.middleware, bookingApi.middleware),
});

export const persistor = persistStore(store);

// Reset store when you need to e.g logout session
export const resetStore = async () => {
  await persistor.purge();
};
