import axios from 'axios';

const movieBaseUrl = "https://api.themoviedb.org/3"
const api_key = "453dbfafba9e16d8905d4e2eb5b0a62c"

const movieByGenreBaseURL = 'https://api.themoviedb.org/3/discover/movie?api_key=453dbfafba9e16d8905d4e2eb5b0a62c';

// https://api.themoviedb.org/3/trending/all/day?api_key= bc14d8b1ef1d792b8855e1acd531ca27
const getTrendingVideos = axios.get(movieBaseUrl + "/movie/popular?api_key=" + api_key);
const getMovieByGenreId = (id) => axios.get(movieByGenreBaseURL + "&with_genres=" + id )

export default {
  getTrendingVideos,
  getMovieByGenreId,
}

// const API_KEY = "bc14d8b1ef1d792b8855e1acd531ca27";
// const BASE_URL = "https://api.themoviedb.org/3";
// 2ec0d66f5bdf1dd12eefa0723f1479cf = other id
// async function fetchPopularMovies() {
//   try {
//     const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log("Popular Movies:", data.results);
//   } catch (error) {
//     console.error("Failed to fetch movies:", error);
//   }
// }

// fetchPopularMovies();
