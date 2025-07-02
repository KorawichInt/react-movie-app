const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const LANGUAGE = "en-US";
const PAGE = 1;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

const fetchFromTMDB = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Fetch error:", error.message);
    return [];
  }
};

export const getPopularMovies = () =>
  fetchFromTMDB(`/movie/popular?language=${LANGUAGE}&page=${PAGE}`);

export const searchMovies = (query) =>
  fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(
      query
    )}&include_adult=false&language=${LANGUAGE}&page=${PAGE}`
  );
