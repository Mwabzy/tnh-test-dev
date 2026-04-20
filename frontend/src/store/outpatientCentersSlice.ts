import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import {
  createOutpatientCenter,
  deleteOutpatientCenter,
  fetchOutpatientCenter,
  updateOutpatientCenter,
} from "@/api/api";
import type { ClinicalService, Image, outpatientCenter, Timings } from "@/types";

type OutpatientCenterPayload = outpatientCenter | FormData;

interface OutpatientCentersState {
  centers: outpatientCenter[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: OutpatientCentersState = {
  centers: [],
  loading: false,
  error: null,
  initialized: false,
};

const normalizeImageEntry = (entry: Record<string, unknown>): Image | null => {
  const url = typeof entry.url === "string" ? entry.url : "";
  if (!url) return null;

  return {
    id:
      typeof entry.id === "number"
        ? entry.id
        : Number.isFinite(Number(entry.id))
          ? Number(entry.id)
          : undefined,
    url,
    alt: typeof entry.alt === "string" ? entry.alt : undefined,
  };
};

const normalizeImages = (value: unknown): Image[] => {
  if (Array.isArray(value)) {
    return value
      .map((img) => {
        if (!img || typeof img !== "object") return null;
        return normalizeImageEntry(img as Record<string, unknown>);
      })
      .filter((img): img is Image => img !== null);
  }

  if (value && typeof value === "object") {
    const image = normalizeImageEntry(value as Record<string, unknown>);
    return image ? [image] : [];
  }

  return [];
};

const normalizeTimings = (value: unknown): Timings[] => {
  if (!Array.isArray(value)) return [];

  return value.map((timing) => {
    const entry =
      timing && typeof timing === "object"
        ? (timing as Record<string, unknown>)
        : {};

    const clinicRaw =
      entry.clinicId ?? entry.clinic_id ?? entry.clinic ?? entry.serviceId;

    return {
      clinicId:
        clinicRaw === undefined || clinicRaw === null ? "" : String(clinicRaw),
      day: typeof entry.day === "string" ? entry.day : "",
      month: typeof entry.month === "string" ? entry.month : "",
      startTime:
        typeof entry.startTime === "string"
          ? entry.startTime
          : typeof entry.start_time === "string"
            ? String(entry.start_time)
            : "",
      stopTime:
        typeof entry.stopTime === "string"
          ? entry.stopTime
          : typeof entry.stop_time === "string"
            ? String(entry.stop_time)
            : "",
    } satisfies Timings;
  });
};

const normalizeServicesOffered = (
  value: unknown,
): Array<number | ClinicalService> => {
  if (!Array.isArray(value)) return [];

  return value
    .map((service) => {
      if (typeof service === "number") return service;
      if (service && typeof service === "object") {
        const entry = service as ClinicalService;
        if (typeof entry.id === "number") return entry;
      }
      const maybeNumber = Number(service);
      return Number.isFinite(maybeNumber) ? maybeNumber : null;
    })
    .filter(
      (service): service is number | ClinicalService => service !== null,
    );
};

export const normalizeOutpatientCenter = (center: any): outpatientCenter => ({
  id:
    typeof center?.id === "number"
      ? center.id
      : Number.isFinite(Number(center?.id))
        ? Number(center.id)
        : undefined,
  name: center?.name ?? center?.title ?? "",
  slug: center?.slug ?? undefined,
  path: center?.path ?? undefined,
  description: center?.description ?? "",
  description_fr: center?.description_fr ?? "",
  description_es: center?.description_es ?? "",
  description_zh: center?.description_zh ?? "",
  description_ru: center?.description_ru ?? "",
  contact:
    center?.contact && typeof center.contact === "object"
      ? center.contact
      : { phone: "", email: "" },
  location: center?.location ?? "",
  timings: normalizeTimings(center?.timings),
  image: normalizeImages(center?.image),
  services_offered: normalizeServicesOffered(center?.services_offered),
});

const sortCenters = (centers: outpatientCenter[]) =>
  [...centers].sort((a, b) => {
    const nameA = (a.name ?? "").toLowerCase();
    const nameB = (b.name ?? "").toLowerCase();
    return nameA.localeCompare(nameB);
  });

const extractErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data;
    if (typeof detail === "string") return detail;
    if (detail && typeof detail === "object" && "detail" in detail) {
      const message = (detail as { detail?: unknown }).detail;
      if (typeof message === "string") return message;
    }
  }
  return fallback;
};

export const fetchOutpatientCenters = createAsyncThunk<
  outpatientCenter[],
  void,
  { rejectValue: string }
>("outpatientCenters/fetchOutpatientCenters", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchOutpatientCenter();
    const list = Array.isArray(data) ? data : data?.results ?? data?.data ?? [];
    return sortCenters(list.map(normalizeOutpatientCenter));
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Failed to load outpatient centers."),
    );
  }
});

export const createOutpatientCenterEntry = createAsyncThunk<
  outpatientCenter,
  OutpatientCenterPayload,
  { rejectValue: string }
>(
  "outpatientCenters/createOutpatientCenterEntry",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createOutpatientCenter(payload);
      return normalizeOutpatientCenter(data);
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Failed to create outpatient center."),
      );
    }
  },
);

export const updateOutpatientCenterEntry = createAsyncThunk<
  outpatientCenter,
  { id: number; payload: OutpatientCenterPayload },
  { rejectValue: string }
>(
  "outpatientCenters/updateOutpatientCenterEntry",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await updateOutpatientCenter(id, payload);
      return normalizeOutpatientCenter(data);
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Failed to update outpatient center."),
      );
    }
  },
);

export const deleteOutpatientCenterEntry = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  "outpatientCenters/deleteOutpatientCenterEntry",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOutpatientCenter(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Failed to delete outpatient center."),
      );
    }
  },
);

const outpatientCentersSlice = createSlice({
  name: "outpatientCenters",
  initialState,
  reducers: {
    setOutpatientCenters: (state, action: PayloadAction<outpatientCenter[]>) => {
      state.centers = sortCenters(action.payload);
      state.initialized = true;
    },
    upsertOutpatientCenter: (state, action: PayloadAction<outpatientCenter>) => {
      const next = action.payload;
      const index = state.centers.findIndex((center) => center.id === next.id);

      if (index >= 0) {
        state.centers[index] = next;
      } else {
        state.centers.push(next);
      }

      state.centers = sortCenters(state.centers);
      state.initialized = true;
    },
    removeOutpatientCenterFromState: (state, action: PayloadAction<number>) => {
      state.centers = state.centers.filter(
        (center) => center.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutpatientCenters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutpatientCenters.fulfilled, (state, action) => {
        state.loading = false;
        state.centers = action.payload;
        state.initialized = true;
      })
      .addCase(fetchOutpatientCenters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load outpatient centers.";
      })
      .addCase(createOutpatientCenterEntry.fulfilled, (state, action) => {
        state.centers = sortCenters([...state.centers, action.payload]);
      })
      .addCase(createOutpatientCenterEntry.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to create outpatient center.";
      })
      .addCase(updateOutpatientCenterEntry.fulfilled, (state, action) => {
        state.centers = sortCenters(
          state.centers.map((center) =>
            center.id === action.payload.id ? action.payload : center,
          ),
        );
      })
      .addCase(updateOutpatientCenterEntry.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update outpatient center.";
      })
      .addCase(deleteOutpatientCenterEntry.fulfilled, (state, action) => {
        state.centers = state.centers.filter(
          (center) => center.id !== action.payload,
        );
      })
      .addCase(deleteOutpatientCenterEntry.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete outpatient center.";
      });
  },
});

export const {
  setOutpatientCenters,
  upsertOutpatientCenter,
  removeOutpatientCenterFromState,
} = outpatientCentersSlice.actions;

export const outpatientCentersReducer = outpatientCentersSlice.reducer;
export default outpatientCentersSlice.reducer;
