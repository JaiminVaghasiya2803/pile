import React, { useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react-native';
import { EventsScreenProps } from './interface';
import { useStyles } from './styles';
import { RootState, AppDispatch } from '../../store';
import { useTheme } from '../../hooks/useTheme';
import { toggleFavorite, setEvents } from '../../store/slices/eventsSlice';
import { logout } from '../../store/slices/authSlice';
import { useEventsListing, EventItem } from '../../services/events';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../../components/EventCard/EventCard';

const EventsScreen: React.FC<EventsScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isGuest } = useSelector((state: RootState) => state.auth);
  const { events: storeEvents } = useSelector(
    (state: RootState) => state.events,
  );
  // Fetching events dynamically via TanStack Query
  const {
    data,
    isLoading: isApiLoading,
    isError,
    refetch,
    isRefetching,
  } = useEventsListing({});

  // Sync API events into Redux so toggleFavorite can find them
  useEffect(() => {
    const apiEvents = data?.data?.events || data?.data;
    if (Array.isArray(apiEvents) && apiEvents.length > 0) {
      dispatch(
        setEvents(
          apiEvents as unknown as import('../../store/slices/eventsSlice').Event[],
        ),
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isError) {
      Alert.alert(
        'Offline Mode',
        'Could not fetch the latest events. Showing offline data instead.',
        [{ text: 'OK' }],
      );
    }
  }, [isError]);

  const { isDark } = useTheme();

  const styles = useStyles({ theme: isDark ? 'dark' : 'light' });

  const handleToggleFavorite = useCallback(
    (eventId: string | number) => {
      if (isGuest) {
        Alert.alert(
          'Sign In Required',
          'Please sign in to save events to your favorites.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign In', onPress: () => dispatch(logout()) },
          ],
        );
        return;
      }
      dispatch(toggleFavorite(String(eventId)));
    },
    [dispatch, isGuest],
  );

  const handleEventPress = useCallback((event: EventItem) => {
    console.log('Event pressed:', event.title || event.event_name);
  }, []);

  const renderEvent = useCallback(
    ({ item }: { item: EventItem }) => (
      <EventCard
        event={item}
        onToggleFavorite={handleToggleFavorite}
        onPress={handleEventPress}
      />
    ),
    [handleToggleFavorite, handleEventPress],
  );

  // Events: prefer API data -> Redux store (seeded with mockEvents) -> empty
  const events: EventItem[] = useMemo(() => {
    const apiEvents = data?.data?.events || data?.data;
    if (Array.isArray(apiEvents) && apiEvents.length > 0) {
      return apiEvents;
    }
    // storeEvents is seeded with mockEvents on first load, or populated after API sync
    if (storeEvents.length > 0) {
      return storeEvents as unknown as EventItem[];
    }
    return [];
  }, [data, storeEvents]);

  const headerComponent = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hello {user?.name || (isGuest ? 'Guest' : 'Renzo')}!
          </Text>
          <Text style={styles.subtitle}>Are you ready to dance?</Text>
        </View>
        <TouchableOpacity>
          <Search size={24} color={isDark ? '#FFF' : '#000'} />
        </TouchableOpacity>
      </View>
    ),
    [styles, user, isGuest, isDark],
  );

  const emptyComponent = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No events found</Text>
      </View>
    ),
    [styles.emptyContainer, styles.emptyText],
  );

  const loadingComponent = useMemo(
    () => (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#21D393" />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      </SafeAreaView>
    ),
    [styles],
  );

  const listComponent = useMemo(
    () => (
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : index.toString()
        }
        style={styles.listContainer}
        contentContainerStyle={styles.eventsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#21D393"
            colors={['#21D393']}
          />
        }
      />
    ),
    [
      events,
      renderEvent,
      styles.eventsList,
      styles.listContainer,
      emptyComponent,
      isRefetching,
      refetch,
    ],
  );

  // Only show full screen loading if we have no events at all
  if (isApiLoading && events.length === 0) {
    return loadingComponent;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      {headerComponent}

      {/* Events List */}
      {listComponent}
    </SafeAreaView>
  );
};

export default EventsScreen;
