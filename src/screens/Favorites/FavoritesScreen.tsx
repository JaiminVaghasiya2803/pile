import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FavoritesScreenProps } from './interface';
import { useStyles } from './styles';
import { RootState, AppDispatch } from '../../store';
import { toggleFavorite, selectIsFavorite } from '../../store/slices/eventsSlice';
import { logout } from '../../store/slices/authSlice';
import { useTheme } from '../../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../../components/EventCard/EventCard';
import { useEventsListing, EventItem } from '../../services/events';

const FavoritesScreen: React.FC<FavoritesScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favoriteIds } = useSelector((state: RootState) => state.events);
  const { user, isGuest } = useSelector((state: RootState) => state.auth);

  // Re-use the events listing so we can filter to favorites
  const { data } = useEventsListing({});

  const { isDark } = useTheme();
  const styles = useStyles({ theme: isDark ? 'dark' : 'light' });

  // Filter fetched events down to just the favourited ones
  const favorites: EventItem[] = useMemo(() => {
    const allEvents = data?.data?.events ?? [];
    return allEvents.filter(e => favoriteIds.includes(e.event_date_id));
  }, [data, favoriteIds]);

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
    console.log('Favorite event pressed:', event.event_name);
  }, []);

  const renderFavorite = useCallback(
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

  const displayName = useMemo(() => {
    if (user) {
      return user.usr_fname || user.usr_username || 'there';
    }
    return isGuest ? 'Guest' : 'there';
  }, [user, isGuest]);

  const headerComponent = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello {displayName}!</Text>
          <Text style={styles.subtitle}>Your saved events</Text>
        </View>
      </View>
    ),
    [styles, displayName]
  );

  const emptyComponent = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {isGuest
            ? 'Sign in to save your favorite events!'
            : 'No favorites yet. Tap the ♥ on any event to save it!'}
        </Text>
        {isGuest && (
          <TouchableOpacity style={styles.signInButton} onPress={() => dispatch(logout())}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
    ),
    [styles, isGuest, dispatch]
  );

  const listComponent = useMemo(
    () => (
      <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={item => item.event_date_id.toString()}
        contentContainerStyle={styles.favoritesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyComponent}
      />
    ),
    [favorites, renderFavorite, styles.favoritesList, emptyComponent]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {headerComponent}
      {listComponent}
    </SafeAreaView>
  );
};

export default FavoritesScreen;
