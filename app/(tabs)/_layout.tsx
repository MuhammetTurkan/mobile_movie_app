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
  return (
    <View
      className={`${
        focused ? `bg-indigo-500` : `bg-transparent`
      } flex-1 flex-row justify-center items-center w-full overflow-hidden min-w-[112px] min-h-16 rounded-full mt-3`}
    >
      <Icon name={iconName} size={26} color={"#F5EEDD"} />
      {focused && (
        <Text className="ms-1 text-[13px] text-[#F5EEDD]">{title}</Text>
      )}
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
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                title="Favorites"
                iconName={"favorite-outline"}
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
