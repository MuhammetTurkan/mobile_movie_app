import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

export default function Saved() {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex flex-1 fle-col items-center justify-center gap-3">
        <Image source={icons.save} className="size-10" tintColor="#fff" />
        <Text className="text-lg text-white">Saved</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
