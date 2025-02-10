import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from '../components/logos/login.png';
import { IoHome, IoSearch } from "react-icons/io5";

const Header = ({ setSearchQuery }) => {
  
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login")
  };

  const handleSearch = () => {
    navigate("/search")
  };

  return (
    <div className="fixed top-0 z-50 w-full h-16 bg-neutral-700 bg-opacity-75 rounded-b-lg">
      <div className="container mx-auto px-3 flex items-center justify-between h-full">
        
        {/* Left Section: Logo & Links */}
        <div className="flex items-center space-x-4">
          <h1 className="text-yellow-600 text-3xl">MT</h1>
         <h2>Movie Channel</h2>
        </div>


        {/* Center Section: Search Bar (Flex-Grow for Centering) */}
        <div className="flex-grow flex justify-center">
         <Link to="/" className="px-4 py-2 text-2xl text-white font-bold font-[Poppins] rounded-md">
             <IoHome /> 
         </Link>

       <button 
        onClick={handleSearch}
        className="px-4 py-2 text-2xl text-white font-bold font-[Poppins] rounded-md "
       >
        <IoSearch />
       </button>
        </div>

        {/* Right Section: Search Icon */}
        <div className="ml-4 active:scale-50 cursor-pointer">
          <img
           onClick={handleLogin}
          src={Login}
           alt="Logo"
            className="w-10 h-10" />
        </div>

      </div>
    </div>
  );
};

export default Header;


  // const [toggle, setToggle] = useState(false);
  // const menu = [
  //   {
  //     name: 'HOME',
  //     icon: HiOutlineHome
  //   },

  //   {
  //     name: 'SEARCH',
  //     icon: HiOutlineSearch,
    
  //   },

  //   {
  //     name: 'WATCH LIST',
  //     icon: HiOutlinePlusSm
  //   },

  //   {
  //     name: 'ORIGINAL',
  //     icon: HiStar
  //   },

  //   {
  //     name: 'MOVIES',
  //     icon: BiSolidMoviePlay
  //   },


  //   {
  //     name: 'SERIES',
  //     icon: MdLiveTv
  //   },
  // ]
// <div className='w-full fixed z-50 bg-neutral-900 max-h-14 flex items-center justify-between shadow-lg shadow-slate-800 p-5'>
//   <div className='flex items-center  gap-8'>
//       <h1 className='font-bold text-yellow-500 font-mono text-2xl '>MT-movie channel</h1>
//     <div className='hidden md:flex gap-8 md:w-1'>
//       {menu.map((item) => (
//         <HeaderItem name={item.name} Icon={item.icon} />
//       ))}
//     </div>
//     <div className='flex md:hidden gap-8 md:gap-1'>
//       {menu.map((item, index) => index < 3 && (
//         <HeaderItem name={''} Icon={item.icon} />
//       ))}
//       <div className='md:hidden' onClick={() => setToggle(!toggle)}>
//         <HeaderItem name={''} Icon={HiOutlineDotsVertical} />
//         {toggle ? <div className='absolute mt-3 bg-[#121212] border-[1px] border-gray-700 p-3 px-5 py-4'>
//           {menu.map((item, index) => index > 2 && (
//             <HeaderItem name={item.name} Icon={item.icon} />
//           ))}
//         </div> : null}
//       </div>
//     </div>
//   </div>
//   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQql095fg-wqQYTBjoDH493SkODvrejcFwVSn7XIQl6P9wZdla3skkeGDsWjxBY6Gel9Sc&usqp=CAU" className='w-[40px] rounded-full object-cover' />
// </div>