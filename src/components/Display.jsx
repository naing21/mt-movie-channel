import React from 'react'
import Slider from './Slider'
import ProductionHouse from './ProductionHouse'
import GenreMovieList from './GenreMovieList'
import MovieList from './MovieList'


function Display() {
  return (
    <div>
      <Slider />
      <ProductionHouse />
      <GenreMovieList />
      <MovieList />
    </div>
  )
}

export default Display