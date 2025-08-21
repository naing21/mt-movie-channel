import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = '453dbfafba9e16d8905d4e2eb5b0a62c'; // Replace with your actual TMDb API key
  const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1`;

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await axios.get(apiUrl);
        setTvShows(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
        setLoading(false);
      }
    };

    fetchTvShows();
  }, []);

  if (loading) return   <p className="text-white flex items-center justify-center">
    <Loader className='w-22 h-22 mt-6 mb-6 animate-spin'/>
    </p>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-white mb-4">TV Shows</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tvShows.map((show) => (
          <div key={show.id} className="text-center">
            <Link to={`/tvshow/${show.id}`}>
              <img 
                src={`https://image.tmdb.org/t/p/original${show.poster_path}`} 
                alt={show.name} 
                className="w-full h-auto rounded-md" 
              />
              <h3 className="text-white mt-2">{show.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvShows;
