import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies, fetchTopRatedMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import TopMovieCard from "@/components/TopMovieCard";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const { data: topRatedMovies, loading: topMoviesLoadding } = useFetch(() =>
    fetchTopRatedMovies()
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 100,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb5 mx-auto" />

        {moviesLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error : {moviesError.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
            />

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Top Rated Movies
              </Text>

              <FlatList
                data={topRatedMovies}
                renderItem={({ item, index }) => (
                  <TopMovieCard movie={item} index={index} />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsVerticalScrollIndicator={false}
                className="mb-4 mt-3"
                ItemSeparatorComponent={() => <View className="w-4" />}
              />
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <View className="w-[30%]">
                    <MovieCard {...item} />
                  </View>
                )}
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
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
