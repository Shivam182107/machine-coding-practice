import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AppContext } from '../api/AppContext';

const ViewNote = () => {
    const navigate=useNavigate();
    const {NoteData}=useContext(AppContext)
    const {id}=useParams();
    const item=NoteData?.find(val=>val.id==id);

    return (
        <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
                <div className="flex flex-col justify-between  gap-4 bg-black backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-white/30 transition-all duration-300 h-[220px] w-[500px]">

                    {/* Header */}
                    <div className="flex justify-between items-center ">
                        <h2 className="text-xl font-semibold text-white">
                            {item?.Title}
                        </h2>
                        <span className="text-gray-300 text-sm bg-white/10 px-3 py-1 rounded-full">
                            {new Date(item?.date).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Content */}
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {item?.Description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center ">
                        <button
                            className="px-4 py-2 border border-white/20 text-gray-200 rounded-lg
                        hover:bg-white hover:text-black
                   transition-all duration-200 text-sm font-medium"
                        onClick={()=>{
                           navigate('/Note') 
                        }}
                        >
                            Back
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default React.memo(ViewNote)