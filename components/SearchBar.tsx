import { Image, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import Icon from "@expo/vector-icons/FontAwesome";
import { useTheme } from "@/context/ThemeContext";
import { useThemeStyled } from "@/hooks/useThemeStyled";

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
  const { colors } = useTheme();
  const styles = useThemeStyled();

  return (
    <View
      className="flex-row rounded-full items-center px-5 py-5"
      style={styles.searchBarContainer}
    >
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={colors.searchIcon}
      />
      <TextInput
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholderTextColor}
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
