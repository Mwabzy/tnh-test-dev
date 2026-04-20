import { configureStore } from "@reduxjs/toolkit";
import { doctorsReducer } from "./doctorsSlice";
import { outpatientCentersReducer } from "./outpatientCentersSlice";
import { servicesReducer } from "./servicesSlice";
import { teamMembersReducer } from "./teamMembersSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    outpatientCenters: outpatientCentersReducer,
    services: servicesReducer,
    teamMembers: teamMembersReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
