import { StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export const useThemeStyled = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.primaryBackground,
    },

    primaryText: {
      color: colors.primaryTextColor,
    },
    secondaryText: {
      color: colors.secondaryTextColor,
    },

    emptyListContainer: {
      backgroundColor: colors.emptyListBackground,
    },

    movieStarContainer: {
      backgroundColor: colors.movieStarBackground,
    },
    movieInfoText: {
      color: colors.movieInfoHeader,
    },

    searchBarContainer: {
      backgroundColor: colors.searchBarBackground,
    },

    searchQuery: {
      color: colors.searchQueryColor,
    },

    input: {
      flex: 1,
      marginLeft: 8,
      color: colors.inputText,
    },
  });
};
