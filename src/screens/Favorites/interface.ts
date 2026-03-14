import { ViewStyle, TextStyle, StyleProp } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

export interface FavoritesScreenProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

export interface FavoritesStyles {
  container: StyleProp<ViewStyle>;
  headerContainer: StyleProp<ViewStyle>;
  header: StyleProp<ViewStyle>;
  greeting: StyleProp<TextStyle>;
  subtitle: StyleProp<TextStyle>;
  favoritesList: StyleProp<ViewStyle>;
  favoritesListContainer: StyleProp<ViewStyle>;
  favoriteCard: StyleProp<ViewStyle>;
  favoriteImage: StyleProp<ViewStyle>;
  favoriteContent: StyleProp<ViewStyle>;
  favoriteHeader: StyleProp<ViewStyle>;
  favoriteTitle: StyleProp<TextStyle>;
  favoriteDate: StyleProp<TextStyle>;
  favoriteLocation: StyleProp<TextStyle>;
  favoritePrice: StyleProp<TextStyle>;
  favoriteFooter: StyleProp<ViewStyle>;
  favoriteTags: StyleProp<ViewStyle>;
  favoriteTag: StyleProp<ViewStyle>;
  favoriteTagText: StyleProp<TextStyle>;
  favoriteActions: StyleProp<ViewStyle>;
  actionButton: StyleProp<ViewStyle>;
  favoriteButton: StyleProp<ViewStyle>;
  favoriteActive: StyleProp<ViewStyle>;
  arrowButton: StyleProp<ViewStyle>;
  emptyContainer: StyleProp<ViewStyle>;
  emptyText: StyleProp<TextStyle>;
  emptySubtext: StyleProp<TextStyle>;
  tabBar: StyleProp<ViewStyle>;
  tabButton: StyleProp<ViewStyle>;
  tabButtonActive: StyleProp<ViewStyle>;
  tabButtonText: StyleProp<TextStyle>;
  tabButtonTextActive: StyleProp<TextStyle>;
  signInButton: StyleProp<ViewStyle>;
  signInButtonText: StyleProp<TextStyle>;
}
