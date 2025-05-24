import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { fetchFavoriteMovies } from "@/services/api";
import { TMDB_CONFIG } from "@/services/api";
import { icons } from "@/constants/icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";

export default function Favorites() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshData, setRefreshData] = useState<any | null>(null);
  const [isModal, setModal] = useState(true);

  const { data: favoriteMovies, loading: moviesLoading } = useFetch(() =>
    fetchFavoriteMovies("21975759")
  );

  async function onRefresh() {
    setRefreshing(true);
    try {
      const response = await fetch(
        `${TMDB_CONFIG.BASE_URL}/account/21975759/favorite/movies?api_key=${TMDB_CONFIG.API_KEY}`,
        {
          method: "GET",
          headers: TMDB_CONFIG.headers,
        }
      );
      const data = await response.json();
      setRefreshData(data.results);
    } catch (err) {
      console.log("Error : ", err);
      throw err;
    }
    setRefreshing(false);
    setModal(false);
  }

  const toggleModalVisible = useCallback(() => {
    setModal(false);
  }, [setModal, isModal]);

  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="absolute w-full z-0" />
      {isModal && (
        <View className="absolute z-10 top-28 right-0 left-0 flex flex-row justify-between items-center py-1 px-3 mx-4 bg-[#7EACB5] rounded-xl">
          <Text className="text-white text-sm">
            Drag screen to refresh the list.
          </Text>
          <TouchableOpacity
            className="p-1.5 rounded-full bg-[#FFF4EA]"
            onPress={toggleModalVisible}
          >
            <Ionicons name="close-outline" size={18} color={"red"} />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={"red"}
            title="Loading"
            titleColor={"red"}
            progressViewOffset={50}
          />
        }
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-1 mx-auto" />
        <View className="flex-1 mt-5">
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            Favorite Movies
          </Text>
          <FlatList
            data={refreshData == null ? favoriteMovies : refreshData}
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
    </View>
  );
}

const styles = StyleSheet.create({});
