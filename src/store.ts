import { configureStore } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import logger from "redux-logger";
import app from "./reducers/AppReducer";

const isDev = process.env.NODE_ENV === "development";

const store = configureStore({
  reducer: {
    app
  },
  devTools: isDev ? true : false,
  middleware: (getDefaultMiddleware) =>
    isDev
      ? getDefaultMiddleware({ serializableCheck: false }).concat(logger)
      : getDefaultMiddleware({ serializableCheck: false })
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
