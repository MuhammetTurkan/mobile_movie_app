import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/context/ThemeContext";

interface TabIconProps {
  focused: boolean;
  title: string;
  iconName: any;
}

const TabIcon = ({ focused, title, iconName }: TabIconProps) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: focused ? colors.tabFocusedBackground : "transparent",
      }}
      className={`flex-1 flex-row justify-center items-center w-full overflow-hidden min-w-[112px] min-h-16 rounded-full mt-3`}
    >
      <Icon
        name={iconName}
        size={26}
        color={focused ? "#F5EEDD" : colors.tabIcon}
      />
      {focused && (
        <Text className="ms-1 text-[13px] text-[#F5EEDD]">{title}</Text>
      )}
    </View>
  );
};

export default function _Layout() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          height: 0,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={toggleTheme}
            className="mr-5 p-2 bg-sky-900 rounded-full absolute top-4 right-2"
          >
            <Text className="text-white text-base">
              {theme === "dark" ? "☀️" : "🌙"}
            </Text>
          </TouchableOpacity>
        ),
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.tabBarBorder,
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
