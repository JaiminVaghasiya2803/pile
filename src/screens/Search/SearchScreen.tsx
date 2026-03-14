import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react-native';
import { SearchScreenProps } from './interface';
import { useStyles } from './styles';
import { RootState, AppDispatch } from '../../store';
import { useTheme } from '../../hooks/useTheme';
import {
  toggleFavorite,
  setSearchQuery,
  setSelectedCategory,
} from '../../store/slices/eventsSlice';
import { logout } from '../../store/slices/authSlice';
import { useEventsListing, EventItem } from '../../services/events';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../../components/EventCard/EventCard';

const SearchScreen: React.FC<SearchScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    searchQuery,
    selectedCategory,
    events: storeEvents,
  } = useSelector((state: RootState) => state.events);
  const { isGuest } = useSelector((state: RootState) => state.auth);

  // Fetching events dynamically via TanStack Query
  const {
    data,
    isLoading: isApiLoading,
    isError,
    refetch,
    isRefetching,
  } = useEventsListing({});

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

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const categories = useMemo(
    () => ['All', 'Workshop', 'Course', 'Festival', 'Party'],
    [],
  );

  // Filter events based on search query and category
  const filteredEvents = useMemo(() => {
    let baseEvents: EventItem[] = [];

    const apiEvents = data?.data?.events || data?.data;
    if (Array.isArray(apiEvents) && apiEvents.length > 0) {
      baseEvents = apiEvents;
    } else if (storeEvents.length > 0) {
      // storeEvents is pre-seeded with mockEvents; also updated when API syncs
      baseEvents = storeEvents as unknown as EventItem[];
    }

    let filtered = baseEvents;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        event =>
          (event.title || event.event_name || '')
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (event.location || event.event_location || '')
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(
        event =>
          (event.category || '').toLowerCase() ===
          selectedCategory.toLowerCase(),
      );
    }

    return filtered;
  }, [data, storeEvents, searchQuery, selectedCategory]);

  const handleSearch = useCallback(
    (text: string) => {
      setLocalSearchQuery(text);
      dispatch(setSearchQuery(text));
    },
    [dispatch],
  );

  const handleCategoryFilter = useCallback(
    (category: string) => {
      dispatch(setSelectedCategory(category === 'All' ? null : category));
    },
    [dispatch],
  );

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
    console.log('Search result pressed:', event.title || event.event_name);
  }, []);

  const renderSearchResult = useCallback(
    ({ item }: { item: EventItem }) => (
      <EventCard
        event={item}
        onToggleFavorite={handleToggleFavorite}
        onPress={handleEventPress}
      />
    ),
    [handleToggleFavorite, handleEventPress],
  );

  const categoryFilters = useMemo(
    () => (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContainer}
        style={styles.filterScrollView}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              (selectedCategory === category ||
                (category === 'All' && !selectedCategory)) &&
                styles.filterButtonActive,
            ]}
            onPress={() => handleCategoryFilter(category)}
          >
            <Text
              style={[
                styles.filterButtonText,
                (selectedCategory === category ||
                  (category === 'All' && !selectedCategory)) &&
                  styles.filterButtonTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    ),
    [styles, categories, selectedCategory, handleCategoryFilter],
  );

  const emptyResultComponent = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {searchQuery ? 'No results found' : 'Start searching'}
        </Text>
      </View>
    ),
    [styles.emptyContainer, styles.emptyText, searchQuery],
  );

  const headerComponent = useMemo(
    () => (
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, locations..."
            placeholderTextColor="#999"
            value={localSearchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
    ),
    [styles, localSearchQuery, handleSearch],
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
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
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

      {/* Header with Search */}
      {headerComponent}

      {/* Category Filters */}
      {categoryFilters}

      {/* Search Results */}
      {resultsComponent}
    </SafeAreaView>
  );
};

export default SearchScreen;
