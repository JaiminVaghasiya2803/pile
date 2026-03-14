import { ViewStyle, TextStyle, StyleProp } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

export interface SearchScreenProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

export interface SearchStyles {
  container: StyleProp<ViewStyle>;
  header: StyleProp<ViewStyle>;
  searchContainer: StyleProp<ViewStyle>;
  searchInput: StyleProp<TextStyle>;
  searchInputText: StyleProp<TextStyle>;
  searchIcon: StyleProp<ViewStyle>;
  filterContainer: StyleProp<ViewStyle>;
  filterScrollView: StyleProp<ViewStyle>;
  filterScrollContainer: StyleProp<ViewStyle>;
  filterButton: StyleProp<ViewStyle>;
  filterButtonActive: StyleProp<ViewStyle>;
  filterButtonText: StyleProp<TextStyle>;
  filterButtonTextActive: StyleProp<TextStyle>;
  resultsList: StyleProp<ViewStyle>;
  emptyContainer: StyleProp<ViewStyle>;
  emptyText: StyleProp<TextStyle>;
  emptySubtext: StyleProp<TextStyle>;
  loadingContainer: StyleProp<ViewStyle>;
  loadingText: StyleProp<TextStyle>;
  tabBar: StyleProp<ViewStyle>;
  tabButton: StyleProp<ViewStyle>;
  tabButtonActive: StyleProp<ViewStyle>;
  tabButtonText: StyleProp<TextStyle>;
  tabButtonTextActive: StyleProp<TextStyle>;
}
