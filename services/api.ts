export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    //@ts-ignore
    throw new Error("Failed the fetch movies", response.statusText);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movie_id: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movie_id}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      //@ts-ignore
      throw new Error("Failed the fetch movie", response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchTopRatedMovies = async (): Promise<Movie | null> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/top_rated?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!response.ok) {
      //@ts-ignore
      throw new Error("Failed the fetch movies", response.statusText);
    }

    const data = await response.json();
    return data.results;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchFavoriteMovies = async (
  account_id: string
): Promise<Movie> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/account/${account_id}/favorite/movies?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      //@ts-ignore
      throw new Error("Failed the fetch movie", response.statusText);
    }

    const data = await response.json();
    return data.results;
  } catch (err) {
    throw err;
  }
};
