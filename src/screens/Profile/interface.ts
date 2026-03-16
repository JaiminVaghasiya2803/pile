import { ViewStyle, TextStyle, StyleProp, ImageStyle } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

export interface ProfileStyles {
  container: StyleProp<ViewStyle>;
  header: StyleProp<ViewStyle>;
  profileSection: StyleProp<ViewStyle>;
  avatarContainer: StyleProp<ViewStyle>;
  avatar: StyleProp<ImageStyle>;
  avatarPlaceholder: StyleProp<ViewStyle>;
  avatarText: StyleProp<TextStyle>;
  profileInfo: StyleProp<ViewStyle>;
  userName: StyleProp<TextStyle>;
  userEmail: StyleProp<TextStyle>;
  editButton: StyleProp<ViewStyle>;
  editButtonText: StyleProp<TextStyle>;
  menuSection: StyleProp<ViewStyle>;
  menuItem: StyleProp<ViewStyle>;
  menuItemContent: StyleProp<ViewStyle>;
  menuItemTitleContainer: StyleProp<ViewStyle>;
  menuIcon: StyleProp<ViewStyle>;
  menuText: StyleProp<TextStyle>;
  menuSubtext: StyleProp<TextStyle>;
  menuArrow: StyleProp<ViewStyle>;
  menuDivider: StyleProp<ViewStyle>;
  statsSection: StyleProp<ViewStyle>;
  statsTitle: StyleProp<TextStyle>;
  statsContainer: StyleProp<ViewStyle>;
  statItem: StyleProp<ViewStyle>;
  statNumber: StyleProp<TextStyle>;
  statLabel: StyleProp<TextStyle>;
  logoutSection: StyleProp<ViewStyle>;
  logoutButton: StyleProp<ViewStyle>;
  logoutButtonText: StyleProp<TextStyle>;
  guestSection: StyleProp<ViewStyle>;
  guestText: StyleProp<TextStyle>;
  loginButton: StyleProp<ViewStyle>;
  loginButtonText: StyleProp<TextStyle>;
  tabBar: StyleProp<ViewStyle>;
  tabButton: StyleProp<ViewStyle>;
  tabButtonActive: StyleProp<ViewStyle>;
  tabButtonText: StyleProp<TextStyle>;
  tabButtonTextActive: StyleProp<TextStyle>;
}
