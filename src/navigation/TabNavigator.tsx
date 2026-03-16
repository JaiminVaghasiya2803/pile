import React, { useCallback } from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ViewStyle,
  TextStyle,
  ColorSchemeName,
  StyleProp,
} from "react-native";
import { Search, Calendar, Heart, User } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setActiveTab } from "../store/slices/uiSlice";
import { logout } from "../store/slices/authSlice";
import { useTheme } from "../hooks/useTheme";
import { createUseStyles } from "../hooks/useStyles";
import { getThemeColors } from "../styles/theme";

import EventsScreen from "../screens/Events/EventsScreen";
import FavoritesScreen from "../screens/Favorites/FavoritesScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export type TabParamList = {
  Search: undefined;
  Events: undefined;
  Favorites: undefined;
  Profile: undefined;
};

interface TabBarStyles {
  safeArea: StyleProp<ViewStyle>;
  tabBar: StyleProp<ViewStyle>;
  tabButton: StyleProp<ViewStyle>;
  tabButtonText: StyleProp<TextStyle>;
  tabButtonTextActive: StyleProp<TextStyle>;
  badge: StyleProp<ViewStyle>;
  badgeText: StyleProp<TextStyle>;
  iconWrapper: StyleProp<ViewStyle>;
}

const getStyles = ({ theme }: { theme: ColorSchemeName }): TabBarStyles => {
  const themeColors = getThemeColors(theme);
  return {
    safeArea: {
      backgroundColor: themeColors.background,
      borderTopWidth: 1,
      borderTopColor: themeColors.border,
    },
    tabBar: {
      flexDirection: "row",
      height: 60,
      backgroundColor: themeColors.background,
      alignItems: "center",
    },
    tabButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    tabButtonText: {
      fontSize: 10,
      color: themeColors.textSecondary,
      marginTop: 4,
    },
    tabButtonTextActive: {
      color: themeColors.text,
      fontWeight: "bold",
    },
    badge: {
      position: "absolute",
      top: -4,
      right: -8,
      backgroundColor: "#FF3B30",
      borderRadius: 9,
      minWidth: 18,
      height: 18,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 4,
      borderWidth: 1.5,
      borderColor: themeColors.background,
    },
    badgeText: {
      color: "#FFFFFF",
      fontSize: 10,
      fontWeight: "bold",
      lineHeight: 14,
    },
    iconWrapper: {
      position: "relative",
    },
  };
};

const useStyles = createUseStyles(getStyles);

const Tab = createBottomTabNavigator<TabParamList>();

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const styles = useStyles({ theme: isDark ? "dark" : "light" });
  const themeColors = getThemeColors(isDark ? "dark" : "light");
  const { isAuthenticated, isGuest } = useSelector(
    (rootState: RootState) => rootState.auth,
  );
  const favoritesCount = useSelector(
    (rootState: RootState) => rootState.events.favoriteIds.length,
  );
  const showFavoritesBadge = !isGuest && isAuthenticated && favoritesCount > 0;

  const getTabIcon = useCallback(
    (routeName: string, isFocused: boolean) => {
      const color = isFocused ? themeColors.text : themeColors.textSecondary;
      const size = 24;

      switch (routeName) {
        case "Search":
          return <Search size={size} color={color} />;
        case "Events":
          return <Calendar size={size} color={color} />;
        case "Favorites":
          return <Heart size={size} color={color} />;
        case "Profile":
          return <User size={size} color={color} />;
        default:
          return null;
      }
    },
    [themeColors],
  );

  const renderTab = useCallback(
    (route: { key: string; name: string }, index: number) => {
      const label = route.name;
      const isFocused = state.index === index;

      const onPress = () => {
        // Block Favorites tab for guests
        if (route.name === "Favorites" && isGuest) {
          Alert.alert(
            "Sign In Required",
            "Please sign in to access your favourites.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Sign In", onPress: () => dispatch(logout()) },
            ],
          );
          return;
        }

        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          dispatch(setActiveTab(route.name));
          navigation.navigate(route.name);
        }
      };

      return (
        <TouchableOpacity
          key={route.key}
          style={styles.tabButton}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapper}>
            {getTabIcon(route.name, isFocused)}
            {route.name === "Favorites" && showFavoritesBadge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.tabButtonText,
              isFocused && styles.tabButtonTextActive,
            ]}
          >
            {label === "Favorites" ? "Favourites" : label}
          </Text>
        </TouchableOpacity>
      );
    },
    [state.index, navigation, dispatch, styles, getTabIcon, favoritesCount, isGuest, showFavoritesBadge],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tabBar}>{state.routes.map(renderTab)}</View>
    </SafeAreaView>
  );
};

const TabNavigator: React.FC = () => {
  const renderCustomTabBar = useCallback(
    (props: BottomTabBarProps) => <CustomTabBar {...props} />,
    [],
  );

  return (
    <Tab.Navigator
      tabBar={renderCustomTabBar}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Events"
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
