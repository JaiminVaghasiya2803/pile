import { QueryClient, onlineManager, focusManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { AppState, AppStateStatus, Platform, NativeEventSubscription } from 'react-native';

// Synchronize onlineManager with React Native NetInfo
onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

// Refresh queries when app comes to the foreground
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

let appStateSubscription: NativeEventSubscription | null = null;

export const setupQueryClient = () => {
  appStateSubscription = AppState.addEventListener('change', onAppStateChange);
};

export const teardownQueryClient = () => {
  if (appStateSubscription) {
    appStateSubscription.remove();
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst', // Always fetch from cache if offline
      staleTime: 1000 * 60 * 5, // 5 minutes (data remains fresh)
      gcTime: 1000 * 60 * 60 * 24, // 24 hours cache retention
      retry: 2, // Retry failed requests twice
      refetchOnWindowFocus: true, // Refetch when app comes back to foreground
    },
    mutations: {
      networkMode: 'offlineFirst', // Queue mutations if offline
    },
  },
});
