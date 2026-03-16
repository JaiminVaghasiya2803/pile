import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Settings, Bell, HelpCircle, Shield, Star, ChevronRight, User } from 'lucide-react-native';
import { ProfileScreenProps } from './interface';
import { useStyles } from './styles';
import { RootState, AppDispatch } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { useTheme } from '../../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

const MENU_ITEMS = [
  {
    icon: Settings,
    title: 'Settings',
    subtitle: 'App preferences and account',
  },
  {
    icon: Bell,
    title: 'Notifications',
    subtitle: 'Manage your notifications',
  },
  {
    icon: HelpCircle,
    title: 'Help & Support',
    subtitle: 'Get help and contact us',
  },
  {
    icon: Shield,
    title: 'Privacy Policy',
    subtitle: 'Read our privacy policy',
  },
  { icon: Star, title: 'Rate App', subtitle: 'Rate us on the App Store' },
];

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { favoriteIds } = useSelector((state: RootState) => state.events);

  const { isDark } = useTheme();
  const styles = useStyles({ theme: isDark ? 'dark' : 'light' });

  const handleLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
        },
      },
    ]);
  }, [dispatch, navigation]);

  const handleLogin = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleMenuPress = useCallback((item: string) => {
    Alert.alert('Menu', `${item} pressed - Not implemented yet`);
  }, []);

  const iconColor = useMemo(() => (isDark ? '#FFF' : '#666'), [isDark]);
  const chevronColor = useMemo(() => (isDark ? '#9CA3AF' : '#999'), [isDark]);

  // Derived user display values
  const displayName = useMemo(() => {
    if (!user) {
      return '';
    }
    const first = user.usr_fname || '';
    const last = user.usr_lname || '';
    return `${first} ${last}`.trim() || user.usr_username || 'User';
  }, [user]);

  const profileHeader = useMemo(
    () =>
      user && (
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user.usr_profile_img ? (
              <Image source={{ uri: user.usr_profile_img }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user.usr_fname?.charAt(0)?.toUpperCase() || 'U'}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userEmail}>{user.usr_email}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleMenuPress('Edit Profile')}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    [styles, user, displayName, handleMenuPress]
  );

  const statsSection = useMemo(
    () => (
      <View style={styles.statsSection}>
        <Text style={styles.statsTitle}>Your Activity</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{favoriteIds.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Events Attended</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
      </View>
    ),
    [styles, favoriteIds.length]
  );

  const menuSection = useMemo(
    () => (
      <View style={styles.menuSection}>
        {MENU_ITEMS.map((item, index) => (
          <React.Fragment key={item.title}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress(item.title)}>
              <View style={styles.menuItemContent}>
                <item.icon size={20} color={iconColor} style={styles.menuIcon} />
                <View style={styles.menuItemTitleContainer}>
                  <Text style={styles.menuText}>{item.title}</Text>
                  <Text style={styles.menuSubtext}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={20} color={chevronColor} style={styles.menuArrow} />
              </View>
            </TouchableOpacity>
            {index < MENU_ITEMS.length - 1 && <View style={styles.menuDivider} />}
          </React.Fragment>
        ))}
      </View>
    ),
    [styles, handleMenuPress, iconColor, chevronColor]
  );

  const logoutSection = useMemo(
    () => (
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    ),
    [styles.logoutSection, styles.logoutButton, styles.logoutButtonText, handleLogout]
  );

  const guestSection = useMemo(
    () => (
      <View style={styles.guestSection}>
        <View style={styles.avatarPlaceholder}>
          <User size={40} color={iconColor} />
        </View>
        <Text style={styles.guestText}>
          You're browsing as a guest. Sign in to save favorites, get personalized recommendations,
          and more!
        </Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    ),
    [styles, iconColor, handleLogin]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {isAuthenticated && user ? (
          <>
            {profileHeader}
            {statsSection}
            {menuSection}
            {logoutSection}
          </>
        ) : (
          guestSection
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
