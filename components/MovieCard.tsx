import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
import { useThemeStyled } from "@/hooks/useThemeStyled";
import { useTheme } from "@/context/ThemeContext";

export default function MovieCard({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) {
  const { colors } = useTheme();
  const styles = useThemeStyled();

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/${colors.noPoster}/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text
          numberOfLines={1}
          className="text-sm font-bold mt-2"
          style={styles.primaryText}
        >
          {title}
        </Text>
        <View className="flex-row justify-start items-center gap-x-1 mt-0.5">
          <Image source={icons.star} className="size-4" />
          <Text
            className="text-xs font-bold uppercase"
            style={styles.primaryText}
          >
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text
            className="text-xs font-medium mt-1"
            style={styles.secondaryText}
          >
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-xs text-light-300 uppercase font-bold">
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
}
