import { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native';
import { EventItem } from '../../services/events';

export interface EventCardProps {
  event: EventItem;
  onToggleFavorite: (eventId: string | number) => void;
  onPress: (event: EventItem) => void;
}

export interface EventCardStyles {
  eventCard: StyleProp<ViewStyle>;
  eventImage: StyleProp<ImageStyle>;
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
  arrowButton: StyleProp<ViewStyle>;
}
