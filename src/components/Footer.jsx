import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-4 h-16'>
      <div className='flex items-center justify-center gap-4'>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
      </div>
      <p className='text-sm'>2025 MT-moviechannel <span> | </span> @All right Reserved</p>
    </footer>
  )
}

export default Footer