import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../services/GlobalApi'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Navigate, useNavigate } from 'react-router-dom';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const screenWidth = window.innerWidth;

function Slider({movie}) {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef();
  useEffect(() => {
    getTrendingVideos();
  }, [])

  const getTrendingVideos = () => {
    GlobalApi.getTrendingVideos.then(resp => {
      console.log(resp.data.results);
      setMovieList(resp.data.results)
    })
  }

  const sliderRight = (element) => {
    element.scrollLeft += screenWidth - 110
  }
  const sliderLeft = (element) => {
    element.scrollLeft -= screenWidth - 110
  }

  const navigate = useNavigate();
  const handleGoToDetail = (movie) => { 
    // navigate('/detail', { state: movie }) 
    navigate(`/detail/${movie.id}?movie`, {state: movie}) 
  }

  return (
    <div>
      <HiChevronLeft
        className='hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer'
        onClick={(e) => {
          sliderLeft(elementRef.current)
        }}
      />
      <HiChevronRight
        className='hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer right-0'
        onClick={(e) => {
          sliderRight(elementRef.current)
        }}
      />
      <div className='flex overflow-x-auto w-full px-16 py-4 scrollbar-hide md:scrollbar-smooth scroll-smooth cursor-pointer' 
        ref={elementRef}
        >
        {movieList.map((item) =>
          <img key={item.id} onClick={() => handleGoToDetail(item)} src={IMAGE_BASE_URL + item.backdrop_path}
          className=' w-full md:h-[310px] object-cover object-left-top mr-5 rounded-md hover:border-[4px] border-gray-400 transition-all duration-100 ease-in' />
        )}
      </div>
    </div>
  )
}

export default Slider