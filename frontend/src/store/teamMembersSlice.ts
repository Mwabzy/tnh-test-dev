import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import {
  createTeamMember,
  deleteTeamMember,
  fetchTeamMemberById,
  fetchTeamMembers,
  reorderTeamMembers,
  updateTeamMember,
} from "@/api/api";
import type { TeamMember } from "@/types";

type TeamMemberPayload = TeamMember | FormData;

interface TeamMembersState {
  members: TeamMember[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: TeamMembersState = {
  members: [],
  loading: false,
  error: null,
  initialized: false,
};

const sortMembers = (list: TeamMember[]) =>
  [...list].sort((a, b) => {
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    if (orderA !== orderB) return orderA - orderB;
    return a.id.localeCompare(b.id);
  });

export const normalizeTeamMember = (member: unknown): TeamMember => {
  const entry =
    member && typeof member === "object"
      ? (member as Record<string, unknown>)
      : {};

  return {
    ...(entry as TeamMember),
    id: typeof entry.id === "string" ? entry.id : String(entry.id ?? ""),
    image_alt: typeof entry.image_alt === "string" ? entry.image_alt : "",
    name: typeof entry.name === "string" ? entry.name : "",
    role: typeof entry.role === "string" ? entry.role : "",
    image: typeof entry.image === "string" ? entry.image : "",
    description:
      typeof entry.description === "string" ? entry.description : "",
    group: typeof entry.group === "string" ? entry.group : "",
    order:
      typeof entry.order === "number"
        ? entry.order
        : Number.isFinite(Number(entry.order))
          ? Number(entry.order)
          : undefined,
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

export const fetchTeamMembersList = createAsyncThunk<
  TeamMember[],
  void,
  { rejectValue: string }
>("teamMembers/fetchTeamMembersList", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchTeamMembers();
    const list = Array.isArray(data) ? data : data?.results ?? data?.data ?? [];
    return sortMembers(list.map(normalizeTeamMember));
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Failed to load team members."),
    );
  }
});

export const fetchTeamMemberEntry = createAsyncThunk<
  TeamMember,
  string,
  { rejectValue: string }
>("teamMembers/fetchTeamMemberEntry", async (id, { rejectWithValue }) => {
  try {
    const data = await fetchTeamMemberById(id);
    return normalizeTeamMember(data);
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Failed to load team member."),
    );
  }
});

export const createTeamMemberEntry = createAsyncThunk<
  TeamMember,
  TeamMemberPayload,
  { rejectValue: string }
>("teamMembers/createTeamMemberEntry", async (payload, { rejectWithValue }) => {
  try {
    const data = await createTeamMember(payload);
    return normalizeTeamMember(data);
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Failed to create team member."),
    );
  }
});

export const updateTeamMemberEntry = createAsyncThunk<
  TeamMember,
  { id: string; payload: TeamMemberPayload },
  { rejectValue: string }
>(
  "teamMembers/updateTeamMemberEntry",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await updateTeamMember(id, payload);
      return normalizeTeamMember(data);
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Failed to update team member."),
      );
    }
  },
);

export const deleteTeamMemberEntry = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("teamMembers/deleteTeamMemberEntry", async (id, { rejectWithValue }) => {
  try {
    await deleteTeamMember(id);
    return id;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Failed to delete team member."),
    );
  }
});

export const reorderTeamMemberEntries = createAsyncThunk<
  string[],
  string[],
  { rejectValue: string }
>(
  "teamMembers/reorderTeamMemberEntries",
  async (orderedIds, { rejectWithValue }) => {
    try {
      await reorderTeamMembers(orderedIds);
      return orderedIds;
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Failed to reorder team members."),
      );
    }
  },
);

const teamMembersSlice = createSlice({
  name: "teamMembers",
  initialState,
  reducers: {
    setTeamMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.members = sortMembers(action.payload.map(normalizeTeamMember));
      state.initialized = true;
    },
    upsertTeamMember: (state, action: PayloadAction<TeamMember>) => {
      const next = normalizeTeamMember(action.payload);
      const index = state.members.findIndex((member) => member.id === next.id);

      if (index >= 0) {
        state.members[index] = next;
      } else {
        state.members.push(next);
      }

      state.members = sortMembers(state.members);
      state.initialized = true;
    },
    removeTeamMemberFromState: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter(
        (member) => member.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembersList.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
        state.initialized = true;
      })
      .addCase(fetchTeamMembersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load team members.";
      })
      .addCase(fetchTeamMemberEntry.fulfilled, (state, action) => {
        const next = action.payload;
        const index = state.members.findIndex((member) => member.id === next.id);
        if (index >= 0) {
          state.members[index] = next;
        } else {
          state.members.push(next);
        }
        state.members = sortMembers(state.members);
      })
      .addCase(createTeamMemberEntry.fulfilled, (state, action) => {
        state.members = sortMembers([...state.members, action.payload]);
      })
      .addCase(updateTeamMemberEntry.fulfilled, (state, action) => {
        state.members = sortMembers(
          state.members.map((member) =>
            member.id === action.payload.id ? action.payload : member,
          ),
        );
      })
      .addCase(deleteTeamMemberEntry.fulfilled, (state, action) => {
        state.members = state.members.filter(
          (member) => member.id !== action.payload,
        );
      })
      .addCase(reorderTeamMemberEntries.fulfilled, (state, action) => {
        const orderLookup = new Map(
          action.payload.map((id, index) => [id, index] as const),
        );
        state.members = [...state.members].sort((a, b) => {
          const indexA = orderLookup.get(a.id);
          const indexB = orderLookup.get(b.id);
          if (indexA === undefined && indexB === undefined) return 0;
          if (indexA === undefined) return 1;
          if (indexB === undefined) return -1;
          return indexA - indexB;
        });
      })
      .addMatcher(
        (action) => action.type.startsWith("teamMembers/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.error =
            (action as PayloadAction<string | undefined>).payload ??
            state.error ??
            "Team member request failed.";
        },
      );
  },
});

export const {
  setTeamMembers,
  upsertTeamMember,
  removeTeamMemberFromState,
} = teamMembersSlice.actions;

export const teamMembersReducer = teamMembersSlice.reducer;
export default teamMembersSlice.reducer;
