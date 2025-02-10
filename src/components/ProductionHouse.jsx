import React from 'react'
import Disney from './../components/logos/Images/Disney.png'
import Marvel from './../components/logos/Images/Marvel.png'
import NatGeo from './../components/logos/Images/NatGeo.png'
import Pixar from './../components/logos/Images/Pixar.png'
import Starwars from './../components/logos/Images/Starwars.png'

import DisneyV from './../components/logos/Videos/disney.mp4'
import MarvelV from './../components/logos/Videos/marvel.mp4'
import NatGeoV from './../components/logos/Videos/national-geographic.mp4'
import PixarV from './../components/logos/Videos/pixar.mp4'
import StarwarsV from './../components/logos/Videos/star-wars.mp4'
function ProductionHouse() {
  const productionHouseList=[
    {
      id:1,
      image:Disney,
      video:DisneyV
    },
    {
      id:2,
      image:Marvel,
      video:MarvelV
    },
    {
      id:3,
      image:NatGeo,
      video:NatGeoV
    },
    {
      id:4,
      image:Pixar,
      video:PixarV
    },
    {
      id:5,
      image:Starwars,
      video:StarwarsV
    },
  ]
  return (
    <div className='flex gap-2 md:gap-5 p-2 px-5 md:px-16'>
      {productionHouseList.map((item)=>(
        <div className='border-[2px] border-gray-600 rounded-lg hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer relative'>
           <video src={item.video} autoPlay loop playsInline muted
           className='absolute top-0 rounded-md z-0 opacity-0 hover:opacity-50'/>
           <img src={item.image} className='w-full z-[1]' />
        </div>
      ))}
    </div>
  )
}

export default ProductionHouse