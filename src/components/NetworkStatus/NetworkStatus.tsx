import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useIsMutating } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WifiOff, RefreshCcw } from 'lucide-react-native';

const NetworkStatus: React.FC = () => {
  const { isConnected, isInternetReachable } = useNetInfo();
  // We consider it offline if either returns explicitly false.
  // Initially they might be null during mounting.
  const isOffline = isConnected === false || isInternetReachable === false;

  // Gets all currently pending/paused mutations executing in TanStack Query
  const pendingMutationsCount = useIsMutating();

  const insets = useSafeAreaInsets();
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (isOffline || pendingMutationsCount > 0) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        speed: 12,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOffline, pendingMutationsCount, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        {isOffline ? (
          <WifiOff size={16} color="#FFFFFF" />
        ) : (
          <RefreshCcw size={16} color="#FFFFFF" />
        )}
        <Text style={styles.text}>
          {isOffline ? 'You are offline' : 'Reconnecting and syncing...'}
        </Text>
        {pendingMutationsCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {pendingMutationsCount} pending
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FF3B30', // standard danger/offline red
    zIndex: 9999, // Ensure it floats above all navigation elements
    elevation: 9999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 4,
  },
  badgeText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default NetworkStatus;
