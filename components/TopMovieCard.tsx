import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { useThemeStyled } from "@/hooks/useThemeStyled";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";
import { useTheme } from "@/context/ThemeContext";

interface Props {
  movie: Movie;
  index: number;
}

export default function TopMovieCard({ movie, index }: Props) {
  const { colors } = useTheme();
  const styles = useThemeStyled();

  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5 mr-1">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-32 h-48 rounded-lg border border-gray-500"
          resizeMode="cover"
        />
        <View className="absolute bottom-3 -left-2 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              tintColor={colors.maskedTextColor}
              resizeMode="cover"
            />
          </MaskedView>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
