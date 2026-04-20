import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { api } from "@/api/api";

import axios from "axios";
import type { ClinicalService } from "@/types";

// inital state

interface ServiceState {
  services: ClinicalService[];
  loading: boolean;
  error: string | null;
}

const sortByOrder = (list: ClinicalService[]) =>
  [...list].sort((a, b) => {
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    if (orderA !== orderB) return orderA - orderB;
    return (a.id ?? 0) - (b.id ?? 0);
  });

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
};

// async thunk to fetch services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/clinical-services/");
      return response.data as ClinicalService[];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<ClinicalService[]>) => {
      state.services = sortByOrder(action.payload);
    },
    upsertService: (state, action: PayloadAction<ClinicalService>) => {
      const nextService = action.payload;
      const existingIndex = state.services.findIndex(
        (service) => service.id === nextService.id,
      );

      if (existingIndex >= 0) {
        state.services[existingIndex] = nextService;
      } else {
        state.services.push(nextService);
      }

      state.services = sortByOrder(state.services);
    },
    removeService: (state, action: PayloadAction<number>) => {
      state.services = state.services.filter(
        (service) => service.id !== action.payload,
      );
    },
    reorderServices: (state, action: PayloadAction<number[]>) => {
      const orderLookup = new Map(
        action.payload.map((id, index) => [id, index] as const),
      );

      state.services = [...state.services].sort((a, b) => {
        const indexA = orderLookup.get(a.id ?? -1);
        const indexB = orderLookup.get(b.id ?? -1);

        if (indexA === undefined && indexB === undefined) {
          const orderA = a.order ?? 0;
          const orderB = b.order ?? 0;
          if (orderA !== orderB) return orderA - orderB;
          return (a.id ?? 0) - (b.id ?? 0);
        }

        if (indexA === undefined) return 1;
        if (indexB === undefined) return -1;
        return indexA - indexB;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = sortByOrder(action.payload);
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setServices, upsertService, removeService, reorderServices } =
  servicesSlice.actions;
export const servicesReducer = servicesSlice.reducer;
export default servicesSlice.reducer;
