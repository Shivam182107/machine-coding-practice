import React, { memo, useState } from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
    const [isOpen, setisOpen] = useState(false);
    return (
        <>
            <div className='h-20 bg-black flex flex-row justify-between items-center px-6 md:px-3 relative '>
                <div className='text-2xl text-white'>Shivam's <span className='text-orange '>App</span></div>
                <button className='md:hidden text-white  '
                    onClick={() => {
                        setisOpen(prev => !prev);
                    }}

                >
                    ☰
                </button>
                {/* ispen div  */}
                {isOpen&&<div className=' flex flex-col bg-black md:hidden absolute border-1 w-screen top-[100%] left-0 min-h-[160px]'>
                    <NavLink to={"/"} className='border-1 border-white text-white font-bold h-10 py-10 mb-2 hover:bg-white hover:text-black hover:cursor-pointer flex flex-col items-center justify-center'>Home</NavLink>
                    <NavLink to={"/Product"} className='border-1 border-white text-white font-bold h-10 py-10 mb-2 hover:bg-white hover:text-black hover:cursor-pointer flex flex-col items-center justify-center'>Product</NavLink>

                </div>}
                    {/* Desktop div  */}
                <div className=' flex-row gap-6 sm:gap-3 md:gap-4 hidden md:flex'>
                    <NavLink to={"/"} className='border-1 border-white text-white font-bold h-10 px-10 hover:bg-white hover:text-black hover:cursor-pointer flex flex-col items-center justify-center'>Home</NavLink>
                    <NavLink to={"/Product"} className='border-1 border-white text-white font-bold h-10 px-10 hover:bg-white hover:text-black hover:cursor-pointer flex flex-col items-center justify-center'>Product</NavLink>

                </div>


            </div>
        </>
    )
}

export default memo(Navbar)