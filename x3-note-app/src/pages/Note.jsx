import React, { useContext } from 'react'
import { AppContext } from '../api/AppContext'
import Card from '../component/Card'
import { useLocation, useNavigate } from 'react-router';

const Note = () => {
  let { NoteData } = useContext(AppContext);
  const navigate = useNavigate()
  const location = useLocation();

  return (
    <>
      <div className='flex flex-row justify-between items-center mt-4 pr-4'>
        <h1 className='text-4xl underline ml-8 font-bold '>Note</h1>

      <div className=''>
        {/* tab  */}
      </div>

        <button className='bg-white border-1 py-2 px-12 hover:bg-black hover:text-white hover:cursor-pointer font-bold'
          onClick={() => {
            navigate("/Note/NewNote", { state: { from: location.pathname } })
          }}
        >Create Note</button>
      </div>
      {/* tab component */}
      <div className='grid grid-cols-3 gap-4 pt-8 px-6 '>

        {
          NoteData?.map(val => (
            <Card item={val} />
          ))
        }
      </div>
    </>
  )
}

export default Note