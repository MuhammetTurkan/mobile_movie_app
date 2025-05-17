import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

export default function Profile() {
  return (
    <View className="flex-1 bg-primary px-10">
      <View className="flex flex-1 flex-col justify-center items-center gap-3">
        <Image source={icons.person} className="size-10" />
        <Text className="text-white text-lg">Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
