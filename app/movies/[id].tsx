import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import {
  addFavoriteList,
  fetchMovieDetails,
  removeFavoriteList,
} from "@/services/api";
import { TMDB_CONFIG } from "@/services/api";
import { icons } from "@/constants/icons";
import Ionicon from "@expo/vector-icons/Ionicons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-100 text-sm font-normal">{label}</Text>
    <Text className="text-light-300 text-sm font-semibold text-justify mt-1">
      {value || `N/A`}
    </Text>
  </View>
);

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const [isOnList, setIsOnList] = useState<boolean | null>(null);
  const [favoriteMovies, setMovies] = useState<MovieDetails[] | null>(null);

  const togglePress = useCallback(
    (movie_id: string) => {
      if (isOnList) {
        removeFavoriteList(movie_id);
        setIsOnList(!isOnList);

        Toast.show({
          type: "info",
          text1: "Removed from Favorities",
          text2: "The movie has been removed from your favorities list.",
          position: "bottom",
        });
      } else {
        addFavoriteList(movie_id);
        setIsOnList(!isOnList);

        Toast.show({
          type: "success",
          text1: "Added to Favorities",
          text2: "The movie has been added to your favorities list.",
          position: "bottom",
        });
      }
    },
    [isOnList]
  );

  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovieDetails(id as string));

  useEffect(() => {
    async function fetchFavorite() {
      try {
        const response = await fetch(
          `${TMDB_CONFIG.BASE_URL}/account/21975759/favorite/movies?api_key=${TMDB_CONFIG.API_KEY}`,
          {
            method: "GET",
            headers: TMDB_CONFIG.headers,
          }
        );
        if (!response.ok) {
          //@ts-ignore
          throw new Error("Failed the fetch movie ", response.statusText);
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    if (favoriteMovies == null) {
      fetchFavorite();
    } else {
      if (movie != null) {
        setIsOnList(false);
        for (let index = 0; index < favoriteMovies.length; index++) {
          if (favoriteMovies[index].id == movie.id) {
            setIsOnList(true);
            break;
          }
        }
      }
    }
  }, [setMovies, favoriteMovies]);

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {movieLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-16 self-center"
          />
        ) : movieError ? (
          <Text>Error : {movieError.message}</Text>
        ) : (
          <>
            <View>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                }}
                className="w-full h-[550px] rounded-b-3xl"
                resizeMode="stretch"
              />
            </View>
            <View className="flex-col items-start justify-center mt-5 px-5">
              <View className="flex-row items-center justify-between w-full">
                <Text className="text-white font-bold text-xl w-[50%]">
                  {movie?.title}
                </Text>
                {isOnList == null ? (
                  <></>
                ) : (
                  <TouchableOpacity
                    className="bg-slate-500 px-2 py-2 rounded-xl mt-1"
                    onPress={() => togglePress(movie?.id as any)}
                  >
                    {isOnList ? (
                      <Text className="text-white font-bold text-md">
                        Remove the Favorite List
                      </Text>
                    ) : (
                      <Text className="text-white font-bold text-md">
                        Add the Favorite List
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>

              <View className="flex-row items-center gap-x-1 mt-2">
                <Text className="text-light-200 text-sm">
                  {movie?.release_date.split("-")[0]} {movie?.runtime}m
                </Text>
              </View>
              <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                <Image source={icons.star} className="size-4" />
                <Text className="text-white font-bold text-sm">
                  {Math.round(movie?.vote_average ?? 0)} / 10
                </Text>
                <Text className="text-light-200 text-sm">
                  ({movie?.vote_count} votes)
                </Text>
              </View>
              <MovieInfo label="Overview" value={movie?.overview} />
              <MovieInfo
                label="Genres"
                value={movie?.genres?.map((g) => g.name).join(` - `) || "N/A"}
              />
              <View className="flex flex-row justify-between w-1/2">
                <MovieInfo
                  label="Budget"
                  value={`$${movie?.budget / 1_000_000} millions`}
                />
                <MovieInfo
                  label="Revenue"
                  value={`$${Math.round(movie?.revenue) / 1_000_000}`}
                />
              </View>
              <MovieInfo
                label="Production Companies"
                value={
                  movie?.production_companies.map((c) => c.name).join(" - ") ||
                  `N/A`
                }
              />
              <MovieInfo
                label="Production Countries"
                value={
                  movie?.production_countries
                    .map((co) => co.name)
                    .join(" - ") || `N/A`
                }
              />
            </View>
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={router.back}
        className="flex-row justify-center items-center bg-sky-600 absolute top-12 left-3 py-2 px-3 rounded-full"
      >
        <Ionicon
          color={"white"}
          size={19}
          className="mr-2"
          name="arrow-back-sharp"
        />

        <Text className="text-white text-lg">Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
