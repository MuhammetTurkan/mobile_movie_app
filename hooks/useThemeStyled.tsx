import { StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export const useThemeStyled = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.primaryBackground,
    },

    searchBarContainer: {
      backgroundColor: colors.searchBarBackground,
    },

    input: {
      flex: 1,
      marginLeft: 8,
      color: colors.inputText,
    },
  });
};
