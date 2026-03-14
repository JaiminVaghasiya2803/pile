import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react-native';
import { FavoritesScreenProps } from './interface';
import { useStyles } from './styles';
import { RootState, AppDispatch } from '../../store';
import { toggleFavorite } from '../../store/slices/eventsSlice';
import { logout } from '../../store/slices/authSlice';
import { useTheme } from '../../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../../components/EventCard/EventCard';
import { EventItem } from '../../services/events';

const FavoritesScreen: React.FC<FavoritesScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.events);
  const { user, isGuest } = useSelector((state: RootState) => state.auth);

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
    console.log('Favorite event pressed:', event.title || event.event_name);
  }, []);

  const renderFavorite = useCallback(
    ({ item }: { item: EventItem }) => (
      <EventCard
        event={item}
        onToggleFavorite={handleToggleFavorite}
        onPress={handleEventPress}
      />
    ),
    [handleToggleFavorite, handleEventPress],
  );

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
        <Text style={styles.emptyText}>
          {isGuest
            ? 'Sign in to save your favorite events!'
            : 'No favorites yet'}
        </Text>
        {isGuest && (
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => dispatch(logout())}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
    ),
    [styles, isGuest, dispatch],
  );

  const listComponent = useMemo(
    () => (
      <FlatList
        data={favorites as unknown as EventItem[]}
        renderItem={renderFavorite}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        contentContainerStyle={styles.favoritesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyComponent}
      />
    ),
    [favorites, renderFavorite, styles.favoritesList, emptyComponent],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      {headerComponent}

      {/* Favorites List */}
      {listComponent}
    </SafeAreaView>
  );
};

export default FavoritesScreen;
