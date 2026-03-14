import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';

import { store, persistor } from './store';
import RootNavigator from './navigation/RootNavigator';
import {
  queryClient,
  setupQueryClient,
  teardownQueryClient,
} from './services/queryClient';
import NetworkStatus from './components/NetworkStatus/NetworkStatus';

const App: React.FC = () => {
  React.useEffect(() => {
    setupQueryClient();
    return () => {
      teardownQueryClient();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<View style={styles.loading} />}
        persistor={persistor}
      >
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider style={styles.container}>
            <NavigationContainer>
              <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
              <RootNavigator />
              <NetworkStatus />
            </NavigationContainer>
          </SafeAreaProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = {
  loading: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
};

export default App;
