import { configureStore } from "@reduxjs/toolkit";
import { outpatientCentersReducer } from "./outpatientCentersSlice";
import { servicesReducer } from "./servicesSlice";

export const store = configureStore({
  reducer: {
    outpatientCenters: outpatientCentersReducer,
    services: servicesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
