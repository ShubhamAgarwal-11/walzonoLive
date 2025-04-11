// import React, {useEffect, useState} from 'react'
// import { Link } from 'react-router-dom'
// import { GoArrowUpRight } from "react-icons/go";
// import { SlArrowDown } from "react-icons/sl";
// import { useDispatch } from 'react-redux';
// import { addLocation } from '../redux/userSlice';
// import {useSelector} from 'react-redux'
// import { CgProfile } from "react-icons/cg";



// const Navbar = () => {

//   const [location, setLocation] = useState('');
//   const [city, setCity] = useState('');
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();
//   const {user} = useSelector(store => store.user);


//   useEffect(() => {
//     // Function to get the user's location
//     const fetchLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             // Fetch address using reverse geocoding API
//             fetch(
              // `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e1c19473641242a3a2bc426ed5cae494`
//             )
//               .then((response) => response.json())
//               .then((data) => {
//                 if (data.results && data.results.length > 0) {
//                   setLocation(data.results[0].formatted);
//                   // console.log(data.results[0]);
//                   setCity(data.results[0].components.town + ', ' + data.results[0].components.state);
//                   // console.log(data.results[0].components.state_district);
//                 } else {
//                   setError('Unable to fetch location details.');
//                 }
//               })
//               .catch(() => setError('Failed to fetch location.'));
//           },
//           (err) => {
//             switch (err.code) {
//               case err.PERMISSION_DENIED:
//                 setError('User denied the request for Geolocation.');
//                 break;
//               case err.POSITION_UNAVAILABLE:
//                 setError('Location information is unavailable.');
//                 break;
//               case err.TIMEOUT:
//                 setError('The request to get user location timed out.');
//                 break;
//               default:
//                 setError('An unknown error occurred.');
//                 break;
//             }
//           }
//         );
//       } else {
//         setError('Geolocation is not supported by this browser.');
//       }
//     };

//     fetchLocation();
//   }, []);


//   dispatch(addLocation(location));

//   return (
//     <div>
//       <div className="navbar">
//         <div className="flex-1">
//           <Link to='/' className="btn btn-ghost text-xl font-bold">GlowWithUs</Link>
//           <span className='mx-8 flex items-center text-lg hover:bg-[#E3C0D0] p-3 rounded-lg'> {city.length === 0 ? 'Select Location' : city} <SlArrowDown size={12} className='mx-2 mt-1'/> </span>
//           {/* {console.log(location)} */}

//         </div>
//         <div className="flex-none">
        
//         <div className=' flex items-center menu menu-horizontal '>
//           <span className='mx-5'>
//             <Link to='/add-parlour' className='flex items-center hover:rounded-md hover:bg-black hover:text-white px-6 py-2 text-lg text-black'>Add Parlour <GoArrowUpRight/></Link>
//           </span>

//           {!user ? ( 
//               <div>
//                 <span className='mx-5'>
//                   <Link to='/login' className='hover:rounded-md hover:bg-black hover:text-white px-6 py-2 text-lg text-black'>Login</Link>
//                 </span> 
//                 <span className='mx-5'>
//                   <Link to='/signup' className='hover:rounded-md hover:text-white hover:bg-black px-6 py-2 text-lg text-black'>SignUp</Link>
//                 </span> 
//               </div>
//           ) : (
//                 // <span className='mr-8'>
//                 //   <Link to='/' className='hover:rounded-md px-6 py-2 text-lg hover:bg-[#E3C0D0] text-black flex items-center'> <CgProfile class='mr-2' size={30}  /> {user?.name} <SlArrowDown size={12} className='mx-2 mt-1'/> </Link>
//                 // </span>

//                 <div className="dropdown dropdown-hover">
//                   <div tabIndex={0} role="button" className="hover:rounded-md px-6 py-2 text-lg hover:bg-[#E3C0D0] text-black flex items-center"><CgProfile class='mr-2' size={30}  /> {user?.name} <SlArrowDown size={12} className='mx-2 mt-1'/></div>
//                   <ul tabIndex={0} className="dropdown-content menu bg-black text-[#E3C0D0] rounded-box right-0 w-52 mt-5 shadow">
//                     <li><Link to='/profile'>Profile</Link></li>
//                     <li><Link to={'/logout'}>Logout</Link></li>
//                   </ul>
//                 </div>


//           )}          

        
//         </div>


//           {/* <ul className="menu menu-horizontal px-1">    
//              <li>
//               <details>
//                 <summary>Parent</summary>
//                 <ul className="bg-base-100 rounded-t-none p-2">
//                   <li><a>Link 1</a></li>
//                   <li><a>Link 2</a></li>
//                 </ul>
//               </details>
//             </li>
//           </ul> */}
//         </div>
//       </div>
//       <hr class="border-black" />
//     </div>
//   )
// }

// export default Navbar






// src/components/Navbar.js

"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { IoBagHandleOutline } from "react-icons/io5"
import { IoMdSearch } from "react-icons/io"
import { RiArrowDownSLine } from "react-icons/ri"
import axios from "axios"
import toast from "react-hot-toast"
import { USER_API_END_POINT } from "../utils/constent"
import { useDispatch } from "react-redux"
import { logoutUser } from "../redux/userSlice"
import { selectCartItems } from "../redux/cartSlice"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [search, setSearch] = useState("")
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  // Close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
        setIsSearchOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(search)
    setIsSearchOpen(false)
  }

  const handleLogOut = async () => {
    try {
      const response = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (response.data.success) {
        toast.success(response.data.message)
        dispatch(logoutUser())
      }
    } catch (err) {
      console.log(err)
      toast.error("Logout Failed")
    }
  }

  return (
    <div className="relative w-full">
      {/* CSS Styles */}
      <style jsx>{`
        .cart-icon {
          position: relative;
          display: inline-flex;
        }
        
        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: #ef4444;
          color: white;
          font-size: 0.75rem;
          height: 1.25rem;
          width: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
        }
      `}</style>

      {/* Main Navigation Bar */}
      <div className="bg-black text-white px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"} className="text-2xl font-bold flex-shrink-0">
          <img
            className="h-8 sm:h-10 w-auto rounded"
            src="https://res.cloudinary.com/daf7blofc/image/upload/v1742589542/kl2suqvae1x3kp9pqi2x.png"
            alt="Logo"
          />
        </Link>

        {/* Search Bar - Hidden on Small Screens */}
        <div className="hidden md:flex w-1/2 max-w-xl mx-4">
          <form className="flex w-full" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for service"
              className="w-full px-4 py-2 text-black bg-white rounded-l-md focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white font-medium rounded-r-md hover:bg-gray-900 transition-colors"
            >
              <IoMdSearch size={20} />
            </button>
          </form>
        </div>

        {/* Mobile Search Icon */}
        <div className="md:hidden flex items-center mr-2">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:text-gray-300 focus:outline-none"
            aria-label="Search"
          >
            <IoMdSearch size={24} />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <Link to="/add-partners" className="text-sm lg:text-base hover:text-gray-300 transition-colors">
            Add Partners
          </Link>
          <a href="#help" className="text-sm lg:text-base hover:text-gray-300 transition-colors">
            Help
          </a>

          <Link to={"/cart"} className="cart-icon">
            <IoBagHandleOutline className="text-white" size={24} />
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          </Link>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center hover:text-gray-300 cursor-pointer transition-colors"
              >
                <span className="text-sm lg:text-base">{user?.name}</span>
                <RiArrowDownSLine className="ml-1" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-black text-white z-10 rounded-lg w-52 mt-4 border border-gray-700"
              >
                <li>
                  <Link to="/profile" className="text-white hover:bg-gray-700 transition-colors">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-white hover:bg-gray-700 transition-colors w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-black px-5 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors shadow-md"
            >
              Log in
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:text-gray-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black px-4 py-3 z-20">
          <form className="flex w-full" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for service"
              className="w-full px-4 py-2 text-black bg-white rounded-l-md focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white font-medium rounded-r-md hover:bg-gray-900"
            >
              <IoMdSearch size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black text-white px-4 py-3 z-10 flex flex-col space-y-3 border-t border-gray-700 shadow-lg">
          <Link
            to="/add-partners"
            className="py-2 hover:text-gray-300 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Add Partners
          </Link>
          <a href="#help" className="py-2 hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
            Help
          </a>
          <Link
            to="/cart"
            className="py-2 flex items-center hover:text-gray-300 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <div className="pt-2 font-medium border-t border-gray-700">{user?.name}</div>
              <Link
                to="/profile"
                className="py-2 hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogOut()
                  setIsMenuOpen(false)
                }}
                className="py-2 text-left hover:text-gray-300 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="mt-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors text-center shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar
