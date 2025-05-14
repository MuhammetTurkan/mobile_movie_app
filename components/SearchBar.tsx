import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";
import Icon from "@expo/vector-icons/FontAwesome";

interface Props {
  placeholder: string;
  onPress?: () => void;
  deletePress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
}

export default function SearchBar({
  placeholder,
  onPress,
  deletePress,
  value,
  onChangeText,
}: Props) {
  return (
    <View className="flex-row rounded-full items-center bg-dark-200 px-5 py-5">
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
      {value?.trim() && (
        <TouchableOpacity activeOpacity={0.5} onPress={deletePress}>
          <Icon name="close" size={22} color={"#a8b5db"} />
        </TouchableOpacity>
      )}
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
