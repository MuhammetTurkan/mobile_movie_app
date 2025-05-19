import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import useFetch from "@/services/useFetch";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { fetchFavoriteMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";

export default function Favorites() {
  const router = useRouter();
  const { data: favoriteMovies, loading: moviesLoading } = useFetch(() =>
    fetchFavoriteMovies("21975759")
  );

  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="flex-1 mt-5">
          <SearchBar
            placeholder="Search for a movie"
            onPress={() => router.push("/search")}
          />
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            Favorite Movies
          </Text>
          <FlatList
            data={favoriteMovies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            className="mt-2"
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      {/* <View className="flex flex-1 fle-col items-center justify-center gap-3">
        <Image source={icons.save} className="size-10" tintColor="#fff" />
        <Text className="text-lg text-white">Saved</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({});
