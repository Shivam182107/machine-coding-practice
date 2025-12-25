import React from 'react'
import { useLocation, useNavigate } from 'react-router'


const Home = () => {
   const navigate=useNavigate()
   const location =useLocation();

  return (
    <>
      <div className='flex gap-8 absolute top-28 right-8'>

        <button className='bg-white border-1 py-2 px-12 hover:bg-black hover:text-white hover:cursor-pointer font-bold'
        onClick={()=>{
          navigate("/Note/NewNote",{state:{from:location.pathname}})
        }}
        >Create Note</button>
        <button className='bg-white border-1 py-2 px-12 hover:bg-black hover:text-white hover:cursor-pointer font-bold'
           onClick={()=>{
          navigate("/Todo/NewTodo",{state:{from:location.pathname}})
        }}
        >Create Todo</button>
      </div>
    </>
  )
}


export default Home