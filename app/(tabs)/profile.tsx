import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { useTheme } from "@/context/ThemeContext";
import { useThemeStyled } from "@/hooks/useThemeStyled";

export default function Profile() {
  const { theme } = useTheme();
  const styles = useThemeStyled();

  return (
    <View style={styles.mainContainer}>
      <View className="flex flex-1 flex-col justify-center items-center gap-3">
        <Image source={icons.person} className="size-10" />
        <Text className="text-white text-lg">Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
