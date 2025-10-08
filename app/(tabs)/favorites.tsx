import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { fetchFavoriteMovies } from "@/services/api";
import { TMDB_CONFIG } from "@/services/api";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@/context/ThemeContext";
import { useThemeStyled } from "@/hooks/useThemeStyled";

export default function Favorites() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshData, setRefreshData] = useState<any | null>(null);
  const isFocused = useIsFocused();
  const animRef = useRef<any | null>(null);
  const { theme } = useTheme();
  const styles = useThemeStyled();

  const { data: favoriteMovies, refetch: loadMovies } = useFetch(() =>
    fetchFavoriteMovies("21975759")
  );

  useFocusEffect(
    useCallback(() => {
      loadMovies();
    }, [loadMovies])
  );

  useEffect(() => {
    if (isFocused && animRef.current) {
      animRef.current.animate("fadeInUp", 500);
    }
  }, [isFocused]);

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
  }

  return (
    <View style={styles.mainContainer}>
      <Image source={images.bg} className="absolute w-full z-0" />

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
          <Animatable.View ref={animRef} className="flex-1">
            {favoriteMovies?.length == 0 ? (
              <>
                <View className="bg-indigo-500 mx-3 py-4 rounded-lg items-center">
                  <Text className="text-white text-xl text-start">
                    Favorites list is empty
                  </Text>
                </View>
              </>
            ) : (
              <FlatList
                data={refreshData == null ? favoriteMovies : refreshData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <Animatable.View
                    duration={500}
                    animation={"fadeInUp"}
                    delay={index * 200}
                    className="w-[30%]"
                  >
                    <MovieCard {...item} />
                  </Animatable.View>
                )}
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
            )}
          </Animatable.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
