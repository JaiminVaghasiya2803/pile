import { ColorSchemeName } from 'react-native';
import { ProfileStyles } from './interface';
import { getThemeColors } from '../../styles/theme';
import { createUseStyles } from '../../hooks/useStyles';
import { fonts } from '../../styles/fonts';

export const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): ProfileStyles => {
  const themeColors = getThemeColors(theme);

  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 20,
    },
    profileSection: {
      backgroundColor: themeColors.surface,
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    avatarContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 12,
    },
    avatarPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: themeColors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarText: {
      fontFamily: fonts.semiBold,
      fontSize: 32,
      fontWeight: '600',
      color: themeColors.textSecondary,
    },
    profileInfo: {
      alignItems: 'center',
    },
    userName: {
      fontFamily: fonts.semiBold,
      fontSize: 24,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: themeColors.textSecondary,
      marginBottom: 16,
    },
    editButton: {
      backgroundColor: themeColors.primary,
      paddingHorizontal: 24,
      paddingVertical: 8,
      borderRadius: 20,
    },
    editButtonText: {
      fontFamily: fonts.semiBold,
      fontSize: 14,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    menuSection: {
      backgroundColor: themeColors.surface,
      marginHorizontal: 20,
      borderRadius: 16,
      marginBottom: 20,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    menuItem: {
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    menuItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuItemTitleContainer: {
      flex: 1,
    },
    menuIcon: {
      marginRight: 16,
    },
    menuText: {
      fontFamily: fonts.medium,
      fontSize: 16,
      fontWeight: '500',
      color: themeColors.text,
    },
    menuSubtext: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    menuArrow: {
      marginLeft: 8,
    },
    menuDivider: {
      height: 1,
      backgroundColor: themeColors.border,
      marginLeft: 56,
    },
    statsSection: {
      backgroundColor: themeColors.surface,
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    statsTitle: {
      fontFamily: fonts.semiBold,
      fontSize: 18,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontFamily: fonts.bold,
      fontSize: 24,
      fontWeight: '700',
      color: themeColors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: themeColors.textSecondary,
    },
    logoutSection: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    logoutButton: {
      backgroundColor: themeColors.error,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
    },
    logoutButtonText: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    guestSection: {
      backgroundColor: themeColors.surface,
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    guestText: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: themeColors.textSecondary,
      textAlign: 'center',
      marginBottom: 16,
    },
    loginButton: {
      backgroundColor: themeColors.primary,
      borderRadius: 12,
      paddingHorizontal: 32,
      paddingVertical: 12,
    },
    loginButtonText: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    tabBar: {},
    tabButton: {},
    tabButtonActive: {},
    tabButtonText: {},
    tabButtonTextActive: {},
  };
};

export const useStyles = createUseStyles(getStyles);
