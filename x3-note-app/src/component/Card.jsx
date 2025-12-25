import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { DeleteNote } from '../api/data';

const Card = ({ item }) => {
    const navigate = useNavigate();
    const location= useLocation();

    const queryClient = useQueryClient();
    const {mutate,isError} = useMutation({
        mutationFn: DeleteNote,
        onSuccess: (data, variable, context) => {
            queryClient.invalidateQueries({
                queryKey: ["Notes"]
            })
        }
    })
    return (
        <>
            <div className="flex flex-col justify-between  gap-4 bg-black backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-white/30 transition-all duration-300 h-[220px]">

                {/* Header */}
                <div className="flex justify-between items-center ">
                    <h2 className="text-xl font-semibold text-white">
                        {item.Title}
                    </h2>
                    <span className="text-gray-300 text-sm bg-white/10 px-3 py-1 rounded-full">
                        {new Date(item.date).toLocaleDateString()}
                    </span>
                </div>

                {/* Content */}
                <p className="text-gray-300 text-sm leading-relaxed">
                    {item.Description}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between items-center ">
                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1.5 border border-white/20 text-gray-300 
                                hover:bg-white hover:text-black 
                     transition-all duration-200 text-sm font-medium"
                            onClick={() => {
                                mutate(item.id)
                            }}
                        >
                            Delete
                        </button>

                        <button
                            className="px-3 py-1.5 border border-white/20 text-gray-300  
                                hover:bg-white hover:text-black 
                     transition-all duration-200 text-sm font-medium"
                            onClick={() => {
                                navigate(`/Note/edit/${item.id}`,{state:{from:location.pathname}})
                            }}
                        >
                            Edit
                        </button>
                    </div>

                    <button
                        className="px-4 py-2 border border-white/20 text-gray-200 rounded-lg
                   hover:bg-white hover:text-black
                   transition-all duration-200 text-sm font-medium"
                   onClick={()=>{
                   navigate(`/Note/${item.id}`) 
                   }}
                    >
                        View
                    </button>
                </div>

            </div>
        </>
    )
}

export default Card