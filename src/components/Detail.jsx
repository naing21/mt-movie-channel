import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch'; 
import Divider from './Divider';
import { IoClose } from 'react-icons/io5';
import { Loader } from 'lucide-react';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Detail = () => {
  const { id } = useParams();
  const location = useLocation();
  const contentType = location.search.includes("movie") ? "movie" : "tv";
  const apiKey = '453dbfafba9e16d8905d4e2eb5b0a62c';

  const navigate = useNavigate();
  const handleGoToDetail = () => {
    navigate(`/detail/${movie.id}?movie`, {state: movie})};
    // navigate('/detail', { state: movie })

  const contentUrl = `https://api.themoviedb.org/3/${contentType}/${id}?api_key=${apiKey}&language=en-US`;
  const castUrl = `https://api.themoviedb.org/3/${contentType}/${id}/credits?api_key=${apiKey}&language=en-US`;
  const trailerUrl = `https://api.themoviedb.org/3/${contentType}/${id}/videos?api_key=${apiKey}&language=en-US`;
  const relatedUrl = `https://api.themoviedb.org/3/${contentType}/${id}/recommendations?api_key=${apiKey}&language=en-US`;
const { data: related, loading: relatedLoading, error: relatedError } = useFetch(relatedUrl);

const trendingTvUrl = `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=en-US`;
const { data: trendingTv, loading: trendingLoading, error: trendingError } = useFetch(trendingTvUrl);



  const { data: content, loading: contentLoading, error: contentError } = useFetch(contentUrl);
  const { data: cast, loading: castLoading, error: castError } = useFetch(castUrl);
  const { data: trailer, loading: trailerLoading, error: trailerError } = useFetch(trailerUrl);

  // Extract director and writers from the crew array
const director = cast?.crew?.find((member) => member.job === "Director");
const writers = cast?.crew?.filter(
  (member) => member.job === "Writer" || member.job === "Screenplay"
);


  const [showTrailer, setShowTrailer] = useState(false);

  if (contentLoading || castLoading || trailerLoading) {
    return  <p className="text-white flex items-center justify-center">
    <Loader className='w-22 h-22 mt-6 mb-6 animate-spin'/>
    </p>;
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
            <p><span className="text-white">Director</span>: {director ? director.name : "N/A"}</p>
            <Divider />
            <p><span>Writer</span>: {writers.length > 0 ? writers.map(writer => writer.name).join(", ") : "N/A"}</p>
          </div>
          <Divider />
          <h2 className="font-bold text-lg">Cast:</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-3">
            {cast?.cast?.map((actor) => (
              <div key={actor.id} className="text-center">
                <div>
                <img
        src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : "https://via.placeholder.com/96x96?text=No+Image"}
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

<Divider/>
{/* Related Movies Section */}
<h2 className="font-mono text-yellow-500 text-lg mt-6">Related Movies:</h2>
{relatedLoading ? (
 <p className="text-white flex items-center justify-center">
    <Loader className='w-22 h-22 mt-6 mb-6 animate-spin'/>
    </p>
) : relatedError ? (
  <p className="text-red-500">Error loading related movies.</p>
) : (
  <div className="overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
    <div className="flex gap-4">
      {related?.results?.map((movie) => (
        <div
          key={movie.id}
          className="shrink-0 w-32 md:w-40 lg:w-48 text-center cursor-pointer"
          onClick={() => navigate(`/detail/${movie.id}?type=movie`)} // Dynamic navigation
        >
          <img
            src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/150x225?text=No+Image"}
            alt={movie?.title || movie?.name}
            className="w-full h-auto object-cover rounded-md"
          />
          <p className="text-white mt-2 font-serif text-sm truncate">{movie?.title || movie?.name}</p>
        </div>
      ))}
    </div>
  </div>
)}


<Divider/>
{/* Trending TV Series Section */}
<h2 className="font-serif text-yellow-500 text-lg mt-6">Trending TV Series:</h2>
{trendingLoading ? (
   <p className="text-white flex items-center justify-center">
    <Loader className='w-22 h-22 mt-6 mb-6 animate-spin'/>
    </p>
) : trendingError ? (
  <p className="text-red-500">Error loading trending TV series.</p>
) : (
  <div className="overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
    <div className="flex gap-4">
      {trendingTv?.results?.map((series) => (
        <div
          key={series.id}
          className="shrink-0 w-32 md:w-40 lg:w-48 text-center cursor-pointer"
          onClick={() => navigate(`/detail/${series.id}?type=tv`)} // Dynamic navigation
        >
          <img
            src={series.poster_path ? `${IMAGE_BASE_URL}${series.poster_path}` : "https://via.placeholder.com/150x225?text=No+Image"}
            alt={series?.name}
            className="w-full h-auto object-cover rounded-md"
          />
          <p className="text-white mt-2 text-sm font-mono truncate">{series?.name}</p>
        </div>
      ))}
    </div>
  </div>
)}



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
