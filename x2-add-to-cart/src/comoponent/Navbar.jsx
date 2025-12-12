import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (

    <>
    
  <div className="backdrop-blur-md bg-black/40 h-20 w-full flex justify-between items-center px-10 fixed top-0 left-0 z-50 shadow-lg">

  {/* Logo */}
  <h1 className="text-3xl font-bold text-white">
    <span className="text-orange-500">e</span>Commerce
  </h1>

  {/* Nav Links */}
  <div className="flex gap-10 text-lg font-medium">
    <NavLink
      to="/"
      className={({ isActive }) =>
        `relative transition text
        ${isActive ? "bg-orange-500 text-white px-2 py-2 font-bold rounded-lg" : "hover:text-orange-400 text-white px-2 py-2 bg-white/10 rounded-lg font-bold"}`
      }
    >
      Home
    </NavLink>

    <NavLink
      to="/wishlist"
      className={({ isActive }) =>
        `relative transition 
        ${isActive ? "bg-orange-500 text-white px-2 py-2 font-bold rounded-lg" : "hover:text-orange-400 text-white px-2 py-2 bg-white/10 rounded-lg font-bold"}`
      }
    >
      Wishlist
    </NavLink>

    <NavLink
      to="/addtocart"
      className={({ isActive }) =>
        `relative transition 
        ${isActive ? "bg-orange-500 text-white px-2 py-2 font-bold rounded-lg" : "hover:text-orange-400 text-white px-2 py-2 bg-white/10 rounded-lg font-bold"}`
      }
    >
      Add to Cart
    </NavLink>
  </div>
</div>


    </>
  )
}

export default Navbar