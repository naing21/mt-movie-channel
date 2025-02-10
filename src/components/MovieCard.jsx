import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
function MovieCard({ movie }) {

  const navigate = useNavigate();
  const handleGoToDetail = () => {
    // console.log("Click")
    console.log("movie", movie)
    navigate(`/detail/${movie.id}?movie`, { state: movie })
  }
  return (
    <>
      <img onClick={handleGoToDetail} src={IMAGE_BASE_URL + movie.poster_path}
        className='w-[110px] font-[Poppins] md:w-[200px]  rounded-lg hover:border-[3px] border-gray-400 hover:scale-110 transition-all duration-150 ease-in cursor-pointer' />
    </>
  )
}

export default MovieCard