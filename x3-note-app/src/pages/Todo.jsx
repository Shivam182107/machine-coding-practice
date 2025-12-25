import React, { useContext, useState } from 'react'
import { AppContext } from '../api/AppContext'
import { useLocation, useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteTodo } from '../api/data';

const Todo = () => {
    const { TodoData } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [IsComplete, setIsComplete] = useState([]);


    const queryClient = useQueryClient()
    const { mutate, isError } = useMutation({
        mutationFn: DeleteTodo,
        onSuccess: (data, variable, context) => {
            queryClient.invalidateQueries({
                queryKey: ["Todo"]
            })
        }
    })
    return (
        <>

            <div className='flex flex-row justify-between items-center mt-4 pr-4'>
                <h1 className='text-4xl underline ml-8 font-bold '>Todo</h1>

                <div className=''>
                    {/* tab  */}
                </div>

                <button className='bg-white border-1 py-2 px-12 hover:bg-black hover:text-white hover:cursor-pointer font-bold'
                    onClick={() => {
                        navigate("/Todo/NewTodo", { state: { from: location.pathname } })
                    }}
                >Create Todo</button> 
            </div>

            <div className=' h-screen flex flex-col justify-start items-center py-8 gap-4'>

                {
                    TodoData?.map(val => (
                        <div className="bg-black text-white border border-white/20 rounded-lg p-4 w-[700px]">
                            <div className="flex items-center justify-between">

                                {/* Left Section */}
                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        name="IsComplete"
                                        className="mt-1 w-4 h-3 accent-white cursor-pointer mr-2"
                                        onChange={(e) => {
                                            setIsComplete(prev => {
                                                let arr = [...prev];
                                                let isExist = arr.some(item => item.id == val.id);
                                                if (isExist) {
                                                    arr = arr.filter(item => item.id != val.id);
                                                }
                                                else {
                                                    let obj = { id: e.target.checked ? val.id : "" };
                                                    arr.push(obj);
                                                }
                                                return arr;
                                            });
                                        }}
                                        checked={IsComplete.some(item => item.id == val.id)}
                                    />

                                    <div>
                                        <p className={`text-base  ${IsComplete.some(item => item.id == val.id) ? "line-through text-gray-300 font-semibold tracking-wide " : "font-semibold tracking-wide"}`}>
                                            {val.Task}
                                        </p>

                                    </div>
                                </div>

                                {/* Right Section */}
                                <div className="flex items-center gap-6">

                                    {/* Date */}
                                    <p className="text-sm text-gray-300 whitespace-nowrap">
                                        {new Date(val.date).toLocaleDateString()}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 border border-white/30 text-sm
                           hover:bg-white hover:text-black transition font-medium"
                                            onClick={() => {
                                                navigate(`/Todo/Edit/${val.id}`, { state: { from: location.pathname } })
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button className="px-3 py-1.5 border border-white/30 text-sm
                           hover:bg-white hover:text-black transition font-medium"
                                            onClick={() => {
                                                mutate(val.id)
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </>
    )
}

export default Todo