import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Divider from './Divider';
import { IoClose } from 'react-icons/io5';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Detail = () => {
  const { id } = useParams();
  const location = useLocation();
  const contentType = location.search.includes("movie") ? "movie" : "tv";
  const apiKey = '453dbfafba9e16d8905d4e2eb5b0a62c';

  const contentUrl = `https://api.themoviedb.org/3/${contentType}/${id}?api_key=${apiKey}&language=en-US`;
  const castUrl = `https://api.themoviedb.org/3/${contentType}/${id}/credits?api_key=${apiKey}&language=en-US`;
  const trailerUrl = `https://api.themoviedb.org/3/${contentType}/${id}/videos?api_key=${apiKey}&language=en-US`;

  const { data: content, loading: contentLoading, error: contentError } = useFetch(contentUrl);
  const { data: cast, loading: castLoading, error: castError } = useFetch(castUrl);
  const { data: trailer, loading: trailerLoading, error: trailerError } = useFetch(trailerUrl);

  const [showTrailer, setShowTrailer] = useState(false);

  if (contentLoading || castLoading || trailerLoading) {
    return <p className="text-white flex justify-center text-center text-3xl">Loading...</p>;
  }

  if (contentError || castError || trailerError) {
    return <p className="text-white">Error loading data.</p>;
  }

  const trailerUrlToPlay = trailer?.results?.[0]?.key;
  const duration = (content?.runtime / 60)?.toFixed(1)?.split(".");

  const handlePlayNow = () => {
    setShowTrailer(true);
  };

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={`${IMAGE_BASE_URL}${content?.backdrop_path || content?.poster_path}`}
            alt={content?.name || content?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:-mt-28 lg:ml-0 lg:mx-0 w-fit min-w-60">
          <img
            src={`${IMAGE_BASE_URL}${content?.backdrop_path || content?.poster_path}`}
            alt={content?.name || content?.title}
            className="w-60 h-80 object-cover rounded"
          />
        <div className="flex justify-center mt-6">
        <button
          onClick={handlePlayNow}
          className="bg-yellow-500 w-60 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Play Now
        </button>
      </div>
        </div>


        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4">{content?.name || content?.title}</h2>
          <p className="text-neutral-400">{content?.tagline}</p>
          <Divider />
          <div className="flex items-center gap-3">
            <p className="text-white mt-2">Rating: {Number(content?.vote_average).toFixed(1)}+<span> | </span></p>
            <p className="text-white mt-2">Views: {Number(content?.vote_count).toFixed(1)}</p>
            <p className="text-white mt-2"><span> | </span>Duration: {duration[0]}h {duration[1]}m</p>
          </div>
          <Divider />
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <Divider />
            <p className="text-white font-[Roboto+Condensed] mt-2">{content?.overview}</p>
            <div className="flex items-center gap-3 my-3 text-center">
              <p>Status: {content?.status}</p><span> | </span>
              <p>Release Date: {content?.release_date}</p><span> | </span>
              <p>Revenue: {Number(content?.revenue)}</p>
            </div>
            <Divider />
          </div>
          <div>
            <p><span className="text-white">Director</span>:</p>
            <Divider />
            <p><span>Writer:</span></p>
          </div>
          <Divider />
          <h2 className="font-bold text-lg">Cast:</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-3">
            {cast?.cast?.map((actor) => (
              <div key={actor.id} className="text-center">
                <div>
                  <img
                    src={`${IMAGE_BASE_URL}${actor?.profile_path}`}
                    alt={actor?.name}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                </div>
                <h4 className="text-white">{actor?.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

 
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative z-50">
            <h3 className="text-xl font-serif text-white">Watch Trailer</h3>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerUrlToPlay}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer"
              className="w-full"
            ></iframe>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-0 right-0  mr-2 text-2xl text-white px-2 py-1 rounded hover:bg-red-500"
            >
              <IoClose/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
