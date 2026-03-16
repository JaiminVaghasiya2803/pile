import { ColorSchemeName } from 'react-native';
import { EventsStyles } from './interface';
import { getThemeColors } from '../../styles/theme';
import { createUseStyles } from '../../hooks/useStyles';
import { fonts } from '../../styles/fonts';

export const getStyles = ({ theme }: { theme: ColorSchemeName }): EventsStyles => {
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
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      marginHorizontal: 20,
      paddingHorizontal: 16,
      height: 52,
      marginBottom: 10,
    },
    listContainer: {
      flex: 1,
    },
    eventsList: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    eventCard: {
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      marginBottom: 16,
      flexDirection: 'row',
      padding: 12,
    },
    eventImage: {
      width: 80,
      height: 100,
      borderRadius: 8,
      marginRight: 12,
    },
    eventContent: {
      flex: 1,
    },
    eventHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    eventTitle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      fontWeight: 'bold',
      color: themeColors.text,
      flex: 1,
    },
    eventDate: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: themeColors.primary,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    eventLocation: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: themeColors.textSecondary,
      marginBottom: 2,
    },
    eventPrice: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: themeColors.textSecondary,
      fontWeight: '500',
    },
    eventFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    eventTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      flex: 1,
    },
    eventTag: {
      backgroundColor: themeColors.border,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
    eventTagText: {
      fontFamily: fonts.medium,
      fontSize: 12,
      color: themeColors.textSecondary,
    },
    eventActions: {
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      padding: 4,
    },
    favoriteButton: {},
    favoriteActive: {},
    arrowButton: {
      padding: 4,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: themeColors.textSecondary,
      marginTop: 10,
    },
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
    tabBar: {
      flexDirection: 'row',
      backgroundColor: themeColors.background,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: themeColors.border,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
    },
    tabButtonActive: {},
    tabButtonText: {
      fontFamily: fonts.medium,
      fontSize: 12,
      color: themeColors.textSecondary,
      marginTop: 4,
    },
    tabButtonTextActive: {
      color: themeColors.text,
    },
    tabIcon: {},
  };
};

export const useStyles = createUseStyles(getStyles);
