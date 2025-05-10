import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
}

export default function SearchBar({
  placeholder,
  onPress,
  value,
  onChangeText,
}: Props) {
  return (
    <View className="flex-row rounded-full items-center bg-dark-200 px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"#a8b5db"}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginLeft: 8,
    color: "white",
  },
});
