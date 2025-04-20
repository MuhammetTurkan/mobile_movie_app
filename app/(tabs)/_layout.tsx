import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icon from "@expo/vector-icons/MaterialIcons";

interface TabIconProps {
  focused: boolean;
  title: string;
  iconName: any;
}

const TabIcon = ({ focused, title, iconName }: TabIconProps) => {
  if (focused) {
    return (
      <View className="bg-indigo-500 flex-1 flex-row justify-center items-center w-full overflow-hidden min-w-[112px] min-h-16 rounded-full mt-3">
        <Icon name={iconName} size={26} color={"#F5EEDD"} />
        <Text className="ms-1 text-[13px] text-[#F5EEDD]">{title}</Text>
      </View>
    );
  }
  return (
    <View className="size-full flex-1 flex-row justify-center items-center mt-2">
      <Icon name={iconName} size={23} color={"#F5EEDD"} />
    </View>
  );
};

export default function _Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} title="Home" iconName={"home"} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} title="Search" iconName={"search"} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                title="Saved"
                iconName={"bookmark-border"}
              />
            </>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} title="Profile" iconName={"person"} />
            </>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
