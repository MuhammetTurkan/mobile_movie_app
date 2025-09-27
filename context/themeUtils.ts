import { StyleSheet } from "react-native";

export const setCustomNativeWindColors = (colors: Record<string, string>) => {
  StyleSheet.create({
    //NativeWind Dynamic colors

    tabBarBackground: { backgroundColor: colors.tabBarBackground },
    primary: { backgroundColor: colors.primary },
    tabIcon: { color: colors.tabIcon },
  });
};
