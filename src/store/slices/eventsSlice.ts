import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  city: string;
  country: string;
  price: string;
  currency: string;
  image: any;
  category: string;
  tags: string[];
  isFavorite: boolean;
  type: 'workshop' | 'course' | 'festival' | 'party';
}

interface EventsState {
  events: Event[];
  favorites: Event[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
}

// Mock data for development
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'ADICTO: Berlin Festival',
    description: 'Amazing dance festival in Berlin',
    date: '24.02.2022',
    endDate: '26.02.2022',
    time: '',
    location: 'Berlin, Germany',
    city: 'Berlin',
    country: 'Germany',
    price: '€30 - €100',
    currency: 'EUR',
    image: require('../../assets/adicto_logo.png'),
    category: 'Workshop',
    tags: ['Workshop', 'Bachata'],
    isFavorite: true,
    type: 'workshop',
  },
  {
    id: '2',
    title: 'Bachata: Open level',
    description: 'Open level bachata course',
    date: '27.02.2022',
    time: '@8pm',
    location: 'Berlin, Germany',
    city: 'Berlin',
    country: 'Germany',
    price: '€12',
    currency: 'EUR',
    image: require('../../assets/la_mambita_logo.png'),
    category: 'Course',
    tags: ['Course', 'Bachata'],
    isFavorite: false,
    type: 'course',
  },
  {
    id: '3',
    title: 'SSD Rovinj 2022',
    description: 'Summer Sensual Days festival',
    date: '07.06.2022',
    endDate: '13.06.2022',
    time: '',
    location: 'Rovinj, Croatia',
    city: 'Rovinj',
    country: 'Croatia',
    price: '€65 - €450',
    currency: 'EUR',
    image: require('../../assets/ssd_logo.png'),
    category: 'Festival',
    tags: ['Festival', 'Bachata'],
    isFavorite: false,
    type: 'festival',
  },
  {
    id: '4',
    title: 'Berlin Sensual Nights',
    description: 'Sensual bachata party night',
    date: '29.02.2022',
    time: '21:00 - 04:00',
    location: 'Berlin, Germany',
    city: 'Berlin',
    country: 'Germany',
    price: '€30 - €100',
    currency: 'EUR',
    image: require('../../assets/bebo_logo.png'),
    category: 'Party',
    tags: ['Party', 'Bachata', 'Salsa', 'Kizz'],
    isFavorite: true,
    type: 'party',
  },
  {
    id: '5',
    title: 'Salsa & Bachata Night',
    description: 'Saturday night dancing',
    date: '05.03.2022',
    time: '19:00 - 01:00',
    location: 'Berlin, Germany',
    city: 'Berlin',
    country: 'Germany',
    price: '€7',
    currency: 'EUR',
    image: require('../../assets/havanna_logo.png'),
    category: 'Course',
    tags: ['Course', 'Party', 'Bachata', 'Salsa'],
    isFavorite: false,
    type: 'party',
  },
  {
    id: '6',
    title: 'Soda Social Club - Salsa, Bachata, ...',
    description: 'Social dancing club',
    date: '06.03.2022',
    time: '19:00 - 02:00',
    location: 'Berlin, Germany',
    city: 'Berlin',
    country: 'Germany',
    price: '',
    currency: 'EUR',
    image: require('../../assets/soda_logo.png'),
    category: 'Party',
    tags: ['Party', 'Bachata', 'Salsa', 'Kiz'],
    isFavorite: false,
    type: 'party',
  },
];

const initialState: EventsState = {
  events: mockEvents,
  favorites: mockEvents.filter(e => e.isFavorite),
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedCategory: null,
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(() => resolve(null), 1000));
  return mockEvents;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      // Preserve isFavorite toggles already made by the user
      const favIds = new Set(state.favorites.map(f => f.id));
      state.events = action.payload.map(e => ({
        ...e,
        isFavorite: favIds.has(e.id) ? true : e.isFavorite,
      }));
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const eventId = action.payload;
      const event = state.events.find(e => e.id === eventId);
      if (event) {
        event.isFavorite = !event.isFavorite;
        if (event.isFavorite) {
          // avoid duplicates
          if (!state.favorites.find(f => f.id === eventId)) {
            state.favorites.push({ ...event });
          }
        } else {
          state.favorites = state.favorites.filter(f => f.id !== eventId);
        }
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
        state.favorites = action.payload.filter(event => event.isFavorite);
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch events';
      });
  },
});

export const {
  setEvents,
  toggleFavorite,
  setSearchQuery,
  setSelectedCategory,
  clearError,
} = eventsSlice.actions;
export default eventsSlice.reducer;
