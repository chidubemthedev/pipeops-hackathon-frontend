import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/orders/orderSlice";
import { APIService } from "../util/APIService";

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"], //add any reducer you want to be persisted here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.VITE_NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

APIService.interceptors.request.use(function (config) {
  const token = store.getState().auth?.token;
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
});

export const persistor = persistStore(store);
