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

import { widgetApi } from "../services/widgetApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  general: generalReducer,
  session: sessionReducer,
  payment: paymentReducer,
  booking: bookingReducer,
  [widgetApi.reducerPath]: widgetApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(widgetApi.middleware),
});

export const persistor = persistStore(store);

// Reset store when you need to e.g logout session
export const resetStore = async () => {
  await persistor.purge();
};
