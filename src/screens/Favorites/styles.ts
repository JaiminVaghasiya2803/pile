import { ColorSchemeName } from 'react-native';
import { FavoritesStyles } from './interface';
import { getThemeColors } from '../../styles/theme';
import { createUseStyles } from '../../hooks/useStyles';
import { fonts } from '../../styles/fonts';

export const getStyles = ({ theme }: { theme: ColorSchemeName }): FavoritesStyles => {
  const themeColors = getThemeColors(theme);

  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 20,
      backgroundColor: themeColors.surface,
      marginBottom: 33,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 20,
    },
    greeting: {
      fontFamily: fonts.bold,
      fontSize: 28,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: themeColors.textSecondary,
    },
    favoritesList: {
      paddingHorizontal: 20,
    },
    favoriteCard: {},
    favoriteImage: {},
    favoriteContent: {},
    favoriteHeader: {},
    favoriteTitle: {},
    favoriteDate: {},
    favoriteLocation: {},
    favoritePrice: {},
    favoriteFooter: {},
    favoritesListContainer: {
      paddingBottom: 20,
    },
    favoriteTags: {},
    favoriteTag: {},
    favoriteTagText: {},
    favoriteActions: {},
    actionButton: {},
    favoriteButton: {},
    favoriteActive: {},
    arrowButton: {},
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 100,
    },
    emptyText: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: themeColors.textSecondary,
    },
    emptySubtext: {},
    tabBar: {},
    tabButton: {},
    tabButtonActive: {},
    tabButtonText: {},
    tabButtonTextActive: {},
    signInButton: {
      marginTop: 20,
      backgroundColor: '#21D393',
      paddingHorizontal: 30,
      paddingVertical: 12,
      borderRadius: 12,
    },
    signInButtonText: {
      fontFamily: fonts.bold,
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  };
};

export const useStyles = createUseStyles(getStyles);
