import { ColorSchemeName } from 'react-native';
import { SearchStyles } from './interface';
import { getThemeColors } from '../../styles/theme';
import { createUseStyles } from '../../hooks/useStyles';

export const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): SearchStyles => {
  const themeColors = getThemeColors(theme);

  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      paddingHorizontal: 16,
      height: 52,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: themeColors.text,
    },
    searchInputText: {
      fontSize: 16,
      color: themeColors.text,
    },
    searchIcon: {
      marginRight: 12,
    },
    filterContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20,
      gap: 12,
    },
    filterScrollView: {
      marginBottom: 20,
      height: 60,
    },
    filterScrollContainer: {
      paddingHorizontal: 20,
      paddingVertical: 5,
      gap: 12,
    },
    filterButton: {
      paddingHorizontal: 20,
      height: 40,
      backgroundColor: themeColors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: themeColors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterButtonActive: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
    },
    filterButtonText: {
      fontSize: 14,
      color: themeColors.textSecondary,
      fontWeight: '500',
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
    filterButtonTextActive: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    resultsList: {
      paddingHorizontal: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 100,
    },
    emptyText: {
      fontSize: 16,
      color: themeColors.textSecondary,
    },
    emptySubtext: {},
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: themeColors.textSecondary,
      marginTop: 10,
    },
    tabBar: {},
    tabButton: {},
    tabButtonActive: {},
    tabButtonText: {},
    tabButtonTextActive: {},
  };
};

export const useStyles = createUseStyles(getStyles);
