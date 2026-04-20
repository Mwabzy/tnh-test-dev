import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import {
  createDoctor,
  deleteDoctor,
  fetchDoctorById,
  fetchDoctors,
  reorderDoctors,
  updateDoctor,
} from "@/api/api";
import type { ClinicalService, Doctor, Image } from "@/types";

type DoctorPayload = Doctor | FormData;

interface DoctorsState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: DoctorsState = {
  doctors: [],
  loading: false,
  error: null,
  initialized: false,
};

const sortDoctors = (list: Doctor[]) =>
  [...list].sort((a, b) => {
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    if (orderA !== orderB) return orderA - orderB;
    return (a.id ?? 0) - (b.id ?? 0);
  });

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

const normalizeTextList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/,|;|\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const sanitizeLocationValue = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const extractDoctorLocations = (doctor: Record<string, unknown>): string[] => {
  const unique = new Set<string>();

  const addLocation = (value: unknown) => {
    const cleaned = sanitizeLocationValue(value);
    if (cleaned) unique.add(cleaned);
  };

  addLocation(doctor.location);

  if (Array.isArray(doctor.locations)) {
    doctor.locations.forEach(addLocation);
  }

  if (Array.isArray(doctor.services_offered)) {
    doctor.services_offered.forEach((service) => {
      if (!service || typeof service !== "object") return;
      const serviceRecord = service as Record<string, unknown>;
      if (Array.isArray(serviceRecord.locations)) {
        serviceRecord.locations.forEach(addLocation);
      }
      addLocation(serviceRecord.location);
    });
  }

  return Array.from(unique);
};

const normalizeServicesOffered = (value: unknown): ClinicalService[] => {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (service): service is ClinicalService =>
      Boolean(service) &&
      typeof service === "object" &&
      typeof (service as ClinicalService).id === "number",
  );
};

export const normalizeDoctor = (doctor: unknown): Doctor => {
  const entry =
    doctor && typeof doctor === "object"
      ? (doctor as Record<string, unknown>)
      : {};

  const images = normalizeImages(entry.images ?? entry.image);
  const locations = extractDoctorLocations(entry);
  const servicesOffered = normalizeServicesOffered(entry.services_offered);
  const role =
    typeof entry.role === "string"
      ? entry.role
      : typeof entry.specialization === "string"
        ? entry.specialization
        : "";
  const bio = typeof entry.bio === "string" ? entry.bio : "";

  return {
    id:
      typeof entry.id === "number"
        ? entry.id
        : Number.isFinite(Number(entry.id))
          ? Number(entry.id)
          : undefined,
    order:
      typeof entry.order === "number"
        ? entry.order
        : Number.isFinite(Number(entry.order))
          ? Number(entry.order)
          : undefined,
    name: typeof entry.name === "string" ? entry.name : "",
    role,
    bio,
    images,
    image: images,
    description:
      typeof entry.description === "string" || Array.isArray(entry.description)
        ? entry.description
        : bio
          ? [bio]
          : undefined,
    services_offered: servicesOffered,
    research_publications: normalizeTextList(
      entry.research_publications ?? entry.researchAndPublications,
    ),
    researchAndPublications: normalizeTextList(
      entry.researchAndPublications ?? entry.research_publications,
    ),
    awards: normalizeTextList(entry.awards ?? entry.awardsAndRecognition),
    awardsAndRecognition: normalizeTextList(
      entry.awardsAndRecognition ?? entry.awards,
    ),
    locations,
    location:
      sanitizeLocationValue(entry.location) ??
      locations[0] ??
      "",
    schedule: Array.isArray(entry.schedule)
      ? normalizeTextList(entry.schedule)
      : typeof entry.schedule === "string"
        ? normalizeTextList(entry.schedule)
        : [],
    languages: normalizeTextList(entry.languages ?? entry.languagesSpoken),
    languagesSpoken:
      typeof entry.languagesSpoken === "string"
        ? entry.languagesSpoken
        : normalizeTextList(entry.languages).join(", "),
    email:
      typeof entry.email === "string"
        ? entry.email
        : typeof entry.contactEmail === "string"
          ? entry.contactEmail
          : "",
    phone:
      typeof entry.phone === "string"
        ? entry.phone
        : typeof entry.contactPhone === "string"
          ? entry.contactPhone
          : "",
    contactEmail:
      typeof entry.contactEmail === "string"
        ? entry.contactEmail
        : typeof entry.email === "string"
          ? entry.email
          : "",
    contactPhone:
      typeof entry.contactPhone === "string"
        ? entry.contactPhone
        : typeof entry.phone === "string"
          ? entry.phone
          : "",
    socialMediaWebsite: normalizeTextList(
      entry.socialMediaWebsite ?? entry.socialMedia,
    ),
    role_fr: typeof entry.role_fr === "string" ? entry.role_fr : undefined,
    role_es: typeof entry.role_es === "string" ? entry.role_es : undefined,
    role_zh: typeof entry.role_zh === "string" ? entry.role_zh : undefined,
    role_ru: typeof entry.role_ru === "string" ? entry.role_ru : undefined,
    bio_fr: typeof entry.bio_fr === "string" ? entry.bio_fr : undefined,
    bio_es: typeof entry.bio_es === "string" ? entry.bio_es : undefined,
    bio_zh: typeof entry.bio_zh === "string" ? entry.bio_zh : undefined,
    bio_ru: typeof entry.bio_ru === "string" ? entry.bio_ru : undefined,
  };
};

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

export const fetchDoctorsList = createAsyncThunk<
  Doctor[],
  void,
  { rejectValue: string }
>("doctors/fetchDoctorsList", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchDoctors();
    const list = Array.isArray(data) ? data : data?.results ?? data?.data ?? [];
    return sortDoctors(list.map(normalizeDoctor));
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Failed to load doctors."),
    );
  }
});

export const fetchDoctorEntry = createAsyncThunk<
  Doctor,
  number,
  { rejectValue: string }
>("doctors/fetchDoctorEntry", async (id, { rejectWithValue }) => {
  try {
    const data = await fetchDoctorById(id);
    return normalizeDoctor(data);
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Failed to load doctor."),
    );
  }
});

export const createDoctorEntry = createAsyncThunk<
  Doctor,
  DoctorPayload,
  { rejectValue: string }
>("doctors/createDoctorEntry", async (payload, { rejectWithValue }) => {
  try {
    const data = await createDoctor(payload);
    return normalizeDoctor(data);
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Failed to create doctor."),
    );
  }
});

export const updateDoctorEntry = createAsyncThunk<
  Doctor,
  { id: number; payload: DoctorPayload },
  { rejectValue: string }
>("doctors/updateDoctorEntry", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const data = await updateDoctor(id, payload);
    return normalizeDoctor(data);
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Failed to update doctor."),
    );
  }
});

export const deleteDoctorEntry = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("doctors/deleteDoctorEntry", async (id, { rejectWithValue }) => {
  try {
    await deleteDoctor(id);
    return id;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Failed to delete doctor."),
    );
  }
});

export const reorderDoctorEntries = createAsyncThunk<
  number[],
  number[],
  { rejectValue: string }
>("doctors/reorderDoctorEntries", async (orderedIds, { rejectWithValue }) => {
  try {
    await reorderDoctors(orderedIds);
    return orderedIds;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Failed to reorder doctors."),
    );
  }
});

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setDoctors: (state, action: PayloadAction<Doctor[]>) => {
      state.doctors = sortDoctors(action.payload.map(normalizeDoctor));
      state.initialized = true;
    },
    upsertDoctor: (state, action: PayloadAction<Doctor>) => {
      const next = normalizeDoctor(action.payload);
      const index = state.doctors.findIndex((doctor) => doctor.id === next.id);

      if (index >= 0) {
        state.doctors[index] = next;
      } else {
        state.doctors.push(next);
      }

      state.doctors = sortDoctors(state.doctors);
      state.initialized = true;
    },
    removeDoctorFromState: (state, action: PayloadAction<number>) => {
      state.doctors = state.doctors.filter(
        (doctor) => doctor.id !== action.payload,
      );
    },
    reorderDoctorsInState: (state, action: PayloadAction<number[]>) => {
      const orderLookup = new Map(
        action.payload.map((id, index) => [id, index] as const),
      );

      state.doctors = [...state.doctors].sort((a, b) => {
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
      .addCase(fetchDoctorsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsList.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
        state.initialized = true;
      })
      .addCase(fetchDoctorsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load doctors.";
      })
      .addCase(fetchDoctorEntry.fulfilled, (state, action) => {
        const next = action.payload;
        const index = state.doctors.findIndex((doctor) => doctor.id === next.id);
        if (index >= 0) {
          state.doctors[index] = next;
        } else {
          state.doctors.push(next);
        }
        state.doctors = sortDoctors(state.doctors);
      })
      .addCase(fetchDoctorEntry.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to load doctor.";
      })
      .addCase(createDoctorEntry.fulfilled, (state, action) => {
        state.doctors = sortDoctors([...state.doctors, action.payload]);
      })
      .addCase(createDoctorEntry.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to create doctor.";
      })
      .addCase(updateDoctorEntry.fulfilled, (state, action) => {
        state.doctors = sortDoctors(
          state.doctors.map((doctor) =>
            doctor.id === action.payload.id ? action.payload : doctor,
          ),
        );
      })
      .addCase(updateDoctorEntry.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update doctor.";
      })
      .addCase(deleteDoctorEntry.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(
          (doctor) => doctor.id !== action.payload,
        );
      })
      .addCase(deleteDoctorEntry.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete doctor.";
      })
      .addCase(reorderDoctorEntries.fulfilled, (state, action) => {
        const orderLookup = new Map(
          action.payload.map((id, index) => [id, index] as const),
        );
        state.doctors = [...state.doctors].sort((a, b) => {
          const indexA = orderLookup.get(a.id ?? -1);
          const indexB = orderLookup.get(b.id ?? -1);
          if (indexA === undefined && indexB === undefined) return 0;
          if (indexA === undefined) return 1;
          if (indexB === undefined) return -1;
          return indexA - indexB;
        });
      })
      .addCase(reorderDoctorEntries.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to reorder doctors.";
      });
  },
});

export const {
  setDoctors,
  upsertDoctor,
  removeDoctorFromState,
  reorderDoctorsInState,
} = doctorsSlice.actions;

export const doctorsReducer = doctorsSlice.reducer;
export default doctorsSlice.reducer;
