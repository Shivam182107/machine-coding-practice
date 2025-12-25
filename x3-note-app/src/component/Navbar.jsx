import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
    return (
        <>
            <div className="h-20 w-full px-4 md:px-8 bg-gray-950 border-b border-gray-800 flex flex-row justify-between items-center text-white">
                <div className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    Shivam's App
                </div>
                <div className="text-white flex gap-6 md:gap-10">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive 
                                ? "px-4 py-2 font-bold text-blue-400 border-b-2 border-blue-400 transition-colors duration-200"
                                : "px-4 py-2 font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/Note"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 font-bold text-blue-400 border-b-2 border-blue-400 transition-colors duration-200"
                                : "px-4 py-2 font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                        }
                    >
                        Note
                    </NavLink>
                    <NavLink
                        to="/Todo"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 font-bold text-blue-400 border-b-2 border-blue-400 transition-colors duration-200"
                                : "px-4 py-2 font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                        }
                    >
                        Todo
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Navbar

