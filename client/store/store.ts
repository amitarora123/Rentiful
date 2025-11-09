import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./feature/filterSlice";
import paymentReducer from "./feature/paymentMethodSlice";
import { api } from "./api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
      payment: paymentReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
