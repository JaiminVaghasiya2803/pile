import { ColorSchemeName } from "react-native";
import { EventCardStyles } from "./interface";
import { getThemeColors } from "../../styles/theme";
import { createUseStyles } from "../../hooks/useStyles";

export const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): EventCardStyles => {
  const themeColors = getThemeColors(theme);

  return {
    eventCard: {
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      marginBottom: 16,
      flexDirection: "row",
      padding: 12,
    },
    eventImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 12,
    },
    eventContent: {
      flex: 1,
    },
    eventHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    eventTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: themeColors.text,
      flex: 1,
    },
    eventDateRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 2,
    },
    eventDate: {
      fontSize: 13,
      color: themeColors.primary,
      fontWeight: "bold",
      flex: 1,
    },
    eventLocation: {
      fontSize: 11,
      color: themeColors.textSecondary,
      textAlign: "right",
      flexShrink: 1,
      marginLeft: 8,
    },
    eventPrice: {
      fontSize: 14,
      color: themeColors.textSecondary,
      fontWeight: "500",
    },
    eventFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    eventTags: {
      flexDirection: "row",
      flexWrap: "wrap",
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
      fontSize: 12,
      color: themeColors.textSecondary,
    },
    eventActions: {
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
    },
    actionButton: {
      padding: 4,
    },
    favoriteButton: {},
    arrowButton: {
      padding: 4,
    },
  };
};

export const useStyles = createUseStyles(getStyles);
