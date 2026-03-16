import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react-native';
import { SearchScreenProps } from './interface';
import { useStyles } from './styles';
import { RootState, AppDispatch } from '../../store';
import { useTheme } from '../../hooks/useTheme';
import { toggleFavorite, setSearchQuery, selectIsFavorite } from '../../store/slices/eventsSlice';
import { logout } from '../../store/slices/authSlice';
import { useEventsListing, EventItem } from '../../services/events';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../../components/EventCard/EventCard';

const SearchScreen: React.FC<SearchScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, selectedCategory, favoriteIds } = useSelector(
    (state: RootState) => state.events
  );
  const { isGuest } = useSelector((state: RootState) => state.auth);

  const { data, isLoading: isApiLoading, isError, refetch, isRefetching } = useEventsListing({});

  useEffect(() => {
    if (isError) {
      Alert.alert(
        'Connection Error',
        'Could not fetch events. Please check your internet connection.',
        [{ text: 'OK' }]
      );
    }
  }, [isError]);

  const { isDark } = useTheme();
  const styles = useStyles({ theme: isDark ? 'dark' : 'light' });

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Real API dance style names for category filtering
  const filteredEvents = useMemo(() => {
    const allEvents: EventItem[] = data?.data?.events ?? [];

    let filtered = allEvents;

    // Filter by search query (event name, city, country, keywords)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        event =>
          event.event_name.toLowerCase().includes(q) ||
          (event.city || '').toLowerCase().includes(q) ||
          (event.country || '').toLowerCase().includes(q) ||
          event.keywords?.some(k => k.toLowerCase().includes(q)) ||
          event.danceStyles?.some(ds => ds.ds_name.toLowerCase().includes(q))
      );
    }

    // Filter by dance style / category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(event =>
        event.danceStyles?.some(ds => ds.ds_name.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    return filtered;
  }, [data, searchQuery, selectedCategory]);

  const handleSearch = useCallback(
    (text: string) => {
      setLocalSearchQuery(text);
      dispatch(setSearchQuery(text));
    },
    [dispatch]
  );

  const handleToggleFavorite = useCallback(
    (eventDateId: number) => {
      if (isGuest) {
        Alert.alert('Sign In Required', 'Please sign in to save events to your favorites.', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign In', onPress: () => dispatch(logout()) },
        ]);
        return;
      }
      dispatch(toggleFavorite(eventDateId));
    },
    [dispatch, isGuest]
  );

  const handleEventPress = useCallback((event: EventItem) => {
    console.log('Search result pressed:', event.event_name);
  }, []);

  const renderSearchResult = useCallback(
    ({ item }: { item: EventItem }) => (
      <EventCard
        event={item}
        isFavorite={selectIsFavorite(favoriteIds, item.event_date_id)}
        onToggleFavorite={handleToggleFavorite}
        onPress={handleEventPress}
      />
    ),
    [handleToggleFavorite, handleEventPress, favoriteIds]
  );

  const emptyResultComponent = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {searchQuery ? 'No results found' : 'Start searching for events'}
        </Text>
      </View>
    ),
    [styles.emptyContainer, styles.emptyText, searchQuery]
  );

  const headerComponent = useMemo(
    () => (
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, locations, dance styles..."
            placeholderTextColor="#999"
            value={localSearchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
    ),
    [styles, localSearchQuery, handleSearch]
  );

  const resultsComponent = useMemo(() => {
    if (isApiLoading && filteredEvents.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#21D393" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredEvents}
        renderItem={renderSearchResult}
        keyExtractor={item => item.event_date_id.toString()}
        contentContainerStyle={styles.resultsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyResultComponent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#21D393"
            colors={['#21D393']}
          />
        }
      />
    );
  }, [
    isApiLoading,
    styles,
    filteredEvents,
    renderSearchResult,
    emptyResultComponent,
    isRefetching,
    refetch,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {headerComponent}
      {resultsComponent}
    </SafeAreaView>
  );
};

export default SearchScreen;
