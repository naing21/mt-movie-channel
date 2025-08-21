import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = '453dbfafba9e16d8905d4e2eb5b0a62c'; // Replace with your actual TMDb API key
  const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return  <p className="text-white flex items-center justify-center">
    <Loader className='w-22 h-22 mt-6 mb-6 animate-spin'/>
    </p>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-white mb-4">Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="text-center">
            <Link to={`/movies/${movie.id}`}>
              <img 
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                alt={movie.name} 
                className="w-full h-auto rounded-md" 
              />
              <h3 className="text-white mt-2">{movie.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
