import { ViewStyle, TextStyle, StyleProp } from 'react-native';
import { EventItem } from '../../services/events';
import { NavigationProp } from '@react-navigation/native';

export interface EventsScreenProps {
  navigation?: NavigationProp<ReactNavigation.RootParamList>;
}

export interface EventCardProps {
  event: EventItem;
  onToggleFavorite: (eventId: string | number) => void;
  onPress: (event: EventItem) => void;
}

export interface EventsStyles {
  container: StyleProp<ViewStyle>;
  headerContainer: StyleProp<ViewStyle>;
  header: StyleProp<ViewStyle>;
  greeting: StyleProp<TextStyle>;
  subtitle: StyleProp<TextStyle>;
  searchContainer: StyleProp<ViewStyle>;
  listContainer: StyleProp<ViewStyle>;
  eventsList: StyleProp<ViewStyle>;
  eventCard: StyleProp<ViewStyle>;
  eventImage: StyleProp<ViewStyle>;
  eventContent: StyleProp<ViewStyle>;
  eventHeader: StyleProp<ViewStyle>;
  eventTitle: StyleProp<TextStyle>;
  eventDate: StyleProp<TextStyle>;
  eventLocation: StyleProp<TextStyle>;
  eventPrice: StyleProp<TextStyle>;
  eventFooter: StyleProp<ViewStyle>;
  eventTags: StyleProp<ViewStyle>;
  eventTag: StyleProp<ViewStyle>;
  eventTagText: StyleProp<TextStyle>;
  eventActions: StyleProp<ViewStyle>;
  actionButton: StyleProp<ViewStyle>;
  favoriteButton: StyleProp<ViewStyle>;
  favoriteActive: StyleProp<ViewStyle>;
  arrowButton: StyleProp<ViewStyle>;
  loadingContainer: StyleProp<ViewStyle>;
  loadingText: StyleProp<TextStyle>;
  emptyContainer: StyleProp<ViewStyle>;
  emptyText: StyleProp<TextStyle>;
  tabBar: StyleProp<ViewStyle>;
  tabButton: StyleProp<ViewStyle>;
  tabButtonActive: StyleProp<ViewStyle>;
  tabButtonText: StyleProp<TextStyle>;
  tabButtonTextActive: StyleProp<TextStyle>;
  tabIcon: StyleProp<ViewStyle>;
}
