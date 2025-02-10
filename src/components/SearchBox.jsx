import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = "453dbfafba9e16d8905d4e2eb5b0a62c"; // Replace with your TMDB API key
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"; // TMDB image base URL

const SearchPage = ({ movie }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoToDetail = (id) => {
    navigate(`/detail/${id}?movie`, { state: movie });
    // navigate("detail/" + movie.id + "?movie", { state: movie });
  };
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get("query") || ""
  );
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}`;
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <h2 className="text-2xl font-bold font-serif text-white mb-4">Search for Movies</h2>

      {/* Search Input */}
      <form
        onSubmit={handleSearch}
        className="w-50 max-w-md flex space-x-2 mb-6"
      >
        <input
          type="text"
          placeholder="Type movie name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition"
        >
          Search
        </button>
      </form>

      {/* Search Results */}
      <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-neutral-800 p-3 rounded-md flex flex-col items-center"
            >
              <img
                src={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-auto rounded-md"
                onClick={()=>handleGoToDetail(movie.id)}
              />
              <h3 className="text-lg font-bold text-white mt-2 text-center">
                {movie.title}
              </h3>
            </div>
          ))
        ) : (
          <p className="text-white flex text-center justify-center col-span-full font-mono">
            No movies found. Try searching for something else!
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
