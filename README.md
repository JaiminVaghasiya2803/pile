# Pile 🎉

A **React Native** event discovery app built with a production-ready architecture. Browse events, search and filter by category, manage favourites, and stay in sync even when offline.

---

## Tech Stack

| Layer                  | Technology                                       |
| ---------------------- | ------------------------------------------------ |
| Framework              | React Native 0.84 (New Architecture)             |
| Language               | TypeScript                                       |
| State Management       | Redux Toolkit + redux-persist                    |
| Server State / Caching | TanStack Query (React Query) v5                  |
| HTTP Client            | Axios                                            |
| Navigation             | React Navigation v7 (Native Stack + Bottom Tabs) |
| Offline Detection      | @react-native-community/netinfo                  |
| Local Storage          | @react-native-async-storage/async-storage        |
| Icons                  | lucide-react-native + react-native-svg           |
| Safe Area              | react-native-safe-area-context                   |

---

## Project Structure

```
src/
├── components/
│   ├── EventCard/          # Reusable event card (image, tags, favourite, share)
│   ├── Icons/              # Custom SVG icons (Apple, Google, Facebook)
│   └── NetworkStatus/      # Floating offline/sync status banner
├── hooks/
│   ├── useTheme.ts         # Dark/light mode hook
│   └── useStyles.ts        # createUseStyles factory for typed, themed styles
├── navigation/
│   ├── RootNavigator.tsx   # Auth vs. Main stack switcher
│   ├── AuthStack.tsx       # Unauthenticated stack (Login)
│   ├── MainStack.tsx       # Authenticated native stack
│   └── TabNavigator.tsx    # Bottom tab navigator
├── screens/
│   ├── Events/             # Home feed — live events list with pull-to-refresh
│   ├── Search/             # Search + horizontal category filters
│   ├── Favorites/          # Saved events list
│   ├── Profile/            # User profile
│   └── Login/              # Auth screen (email/password, Apple, Google, Facebook)
├── services/
│   ├── api.ts              # Axios instance with auth token interceptor
│   ├── auth.ts             # Auth API calls
│   ├── events.ts           # Events API calls + useEventsListing hook
│   └── queryClient.ts      # Offline-first QueryClient configuration
├── store/
│   ├── index.ts            # Redux store with persistence (auth + theme persisted)
│   └── slices/
│       ├── authSlice.ts    # Auth state (login, guest mode, logout)
│       ├── eventsSlice.ts  # Events + favourites + search/filter state
│       ├── themeSlice.ts   # Dark/light theme preference
│       └── uiSlice.ts      # Global UI state (loading, modals)
├── styles/
│   └── theme.ts            # Design tokens (colours, spacing, typography, shadows)
├── types/                  # Shared TypeScript types
└── index.tsx               # App root with all providers
```

---

## Key Features

### 📡 Data & Offline-First Architecture

- **TanStack Query** is used as the primary data-fetching layer with `networkMode: 'offlineFirst'`.
- Queries are served from an in-memory cache (stale for **5 min**, retained for **24 h**) when offline.
- `onlineManager` is wired to `NetInfo` — React Query automatically re-fires paused queries the moment connectivity is restored.
- `focusManager` is wired to `AppState` — queries are refetched whenever the app returns to the foreground.
- **Offline fallback**: if the API call fails, `mockEvents` are shown and an "Offline Mode" alert is displayed.

### 📶 NetworkStatus Banner

- An animated floating banner slides in from the top whenever the device goes offline.
- Shows a live **pending action count** (powered by `useIsMutating()`) so the user knows exactly how many queued writes are waiting to sync.
- Automatically slides away and disappears once back online and all mutations are complete.

### 🗂 Events List

- Full-screen `FlatList` with proper `flex: 1` layout and `paddingBottom` so cards never clip behind the tab bar.
- **Pull-to-refresh** wired directly to `refetch` from TanStack Query.
- Skeleton/loading state shown only when no data is available yet.
- Fallback to static `mockEvents` on network error, with a user-facing alert.

### 🔍 Search & Filters

- Real-time search filtering against event title and location.
- **Horizontal scrollable category chip filters** (Workshop, Course, Festival, Party, All) — no text clipping.
- Search screen also has pull-to-refresh and the same offline-first fallback pattern.

### ⭐ Favourites

- Toggle favourite state is managed in Redux via `eventsSlice`.
- Guest users are prompted to sign in before saving a favourite.

### 🎨 Theming

- Full **dark / light mode** support via a `useTheme` hook.
- Design tokens (`lightTheme`, `darkTheme`) fed through a `createUseStyles` factory so every screen gets typed, memoized style objects.

### 🔐 Authentication

- Email/password login dispatched through Redux Toolkit async thunk.
- Social sign-in buttons (Apple, Google, Facebook) — UI ready.
- **Guest mode** — browse events without an account.
- Auth token automatically attached to every API request via an Axios request interceptor.
- Auth state (`isAuthenticated`, user info) is persisted via `redux-persist` + `AsyncStorage`.

---

## Getting Started

> **Pre-requisite**: complete the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) first.

### 1. Install dependencies

```sh
yarn install
# iOS only
cd ios && bundle exec pod install && cd ..
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
API_URL=https://your-api-base-url.com/api
```

The Axios client reads `API_URL` via `react-native-dotenv`.

### 3. Start Metro

```sh
yarn start
```

### 4. Run on device / simulator

```sh
# Android
yarn android

# iOS
yarn ios
```

---

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `yarn start`   | Start the Metro bundler  |
| `yarn android` | Build and run on Android |
| `yarn ios`     | Build and run on iOS     |
| `yarn lint`    | Run ESLint               |
| `yarn test`    | Run Jest test suite      |

---

## Environment Requirements

- Node ≥ 22.11.0
- React Native 0.84 (New Architecture enabled by default)

---

## Architecture Notes

- **Redux** owns UI-derived state: auth session, favourites toggle, search/filter query, theme preference.
- **TanStack Query** owns server state: fetching, caching, background sync, and retry logic.
- Screens are **code-split** via `useMemo` / `useCallback` to prevent unnecessary re-renders.
- Style objects are created once per theme change via `createUseStyles`, keeping render paths clean.
- All style definitions live in co-located `interface.ts` + `styles.ts` files for each screen, keeping components markup-only.
