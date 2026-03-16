import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventItem } from "../../services/events";

interface EventsState {
  // Tracks which event_date_ids have been favorited by the user
  favoriteIds: number[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
}

const initialState: EventsState = {
  favoriteIds: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  selectedCategory: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const idx = state.favoriteIds.indexOf(id);
      if (idx >= 0) {
        state.favoriteIds.splice(idx, 1);
      } else {
        state.favoriteIds.push(id);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  toggleFavorite,
  setSearchQuery,
  setSelectedCategory,
  clearError,
} = eventsSlice.actions;
export default eventsSlice.reducer;

// Selectors
export const selectIsFavorite = (
  favoriteIds: number[],
  eventDateId: number,
): boolean => favoriteIds.includes(eventDateId);

// Helper to get formatted price string from an event
export const formatEventPrice = (event: EventItem): string => {
  const { event_price_from, event_price_to } = event;
  if (!event_price_from && !event_price_to) {
    return "Free";
  }
  if (event_price_from === event_price_to) {
    return `€${event_price_from}`;
  }
  return `€${event_price_from} – €${event_price_to}`;
};
