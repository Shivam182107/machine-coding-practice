import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { CreateNote, CreateTodo, EditNote, EditTodo } from '../api/data';
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../api/AppContext';


const AllForm = () => {
    const { NoteData, TodoData } = useContext(AppContext);
    let { id } = useParams();

    const location = useLocation();
    let Editobj;
    if (id) {
        if (location.pathname.replace("/" + id, "") == "/Note/edit") {
            Editobj = NoteData?.find(val => val.id == id);

        }
        else {
            Editobj = TodoData?.find(val => val.id == id);

        }
    }
    const navigateLoaction = location.state?.from || "/";
    const navgate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isError } = useMutation({
        mutationFn: CreateNote,
        onSuccess: (data, variable, context) => {
            queryClient.invalidateQueries({
                queryKey: ["Notes"]
            })
        }
    })
    let {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    function handelNoteForm(data) {


        // console.log(data);
        if (location.pathname == "/Note/NewNote" || location.pathname.replace("/" + id, "") == "/Note/edit") {
            if (data.Title == "" || data.Description == "" || data.date == "") {
                alert("plz fill valid things ");
                return;
            }
            NoteSubmit(data);
        }
        else {
            if (data.Task == "" || data.date == "") {
                alert("plz fill valid things ");
                return;
            }
            TodoSubmit(data);
        }

        reset();
    }

    function NoteSubmit(data) {
        if (id) {

            EditMutate({ ...data, id: Editobj.id });
            navgate(navigateLoaction);
            reset();

        }
        else {
            mutate({ ...data, id: uuidv4() });
            navgate(navigateLoaction);
        }
    }
    useEffect(() => {
        if (!id) return;

        if (!Editobj) return;
        if (location.pathname.replace("/" + id,"") == "/Note/edit") {
            reset({
                Title: Editobj.Title,
                Description: Editobj.Description,
                date: Editobj.date,
            })
        }
        else {
            reset({
                Task: Editobj.Task,
                date: Editobj.date
            })
        }

    }, [id]);

    const { mutate: EditMutate, isError: EditError } = useMutation({
        mutationFn: EditNote,
        onSuccess: (data, variable, context) => {
            queryClient.invalidateQueries({
                queryKey: ["Notes"]
            })
        }
    })

    //making todo post resquests 


    const { mutate: TodoMutate, isError: Todoerror } = useMutation({
        mutationFn: CreateTodo,
        onSuccess: (data, variable, context) => {
            queryClient.invalidateQueries({
                queryKey: ["Todo"]
            })
        }
    })

    function TodoSubmit(data) {
        if (id) {
            // inside edit functionality 
            EditTodoMutate({ ...data, id: Editobj.id });
            navgate(navigateLoaction);
            reset();
        }
        else {
            // inside new todo create functionality 
            // console.log("inside todosubmit ", data);
            TodoMutate({ ...data, id: uuidv4() })
            navgate(navigateLoaction);
            reset();
        }
    }

    const { mutate: EditTodoMutate, isError: EditTodoError } = useMutation({
        mutationFn: EditTodo,
        onSuccess: (data, variable, context) => {
            queryClient.invalidateQueries({
                queryKey: ["Todo"]
            })
        }
    })
    return (
        <>
            <div className='  fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50'>
                {
                    location.pathname == '/Note/NewNote' || location.pathname.replace("/" + id, "") == "/Note/edit" ? (
                        <div className='w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
                                Create New Note
                            </h2>

                            <form className='space-y-6' onSubmit={handleSubmit(handelNoteForm)}>
                                <div>
                                    <label htmlFor="Title" className='block text-sm font-medium text-gray-700 mb-2'>
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="Title"
                                        id="Title"

                                        placeholder='Enter note title'
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200'
                                        {...register("Title", {
                                            required: { value: true, message: "This Filed is Required" },
                                        })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Description" className='block text-sm font-medium text-gray-700 mb-2'>
                                        Description
                                    </label>
                                    <textarea
                                        name="Description"
                                        id="Description"
                                        placeholder='Enter note description'
                                        rows="4"

                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all duration-200'
                                        {...register("Description", {
                                            required: { value: true, message: "This Filed is Required" },
                                        })}
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="date" className='block text-sm font-medium text-gray-700 mb-2'>
                                        Enter Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"

                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200'
                                        {...register("date", {
                                            required: { value: true, message: "This Filed is Required" },
                                        })}
                                    />
                                </div>

                                <div className='flex justify-between gap-4 pt-2'>
                                    <button
                                        type="button"
                                        className='bg-white border-1 py-2 px-12 hover:bg-black hover:text-white hover:cursor-pointer font-bold'
                                        onClick={() => {
                                            navgate(navigateLoaction)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className='bg-white border-1 py-2 px-12 hover:bg-black hover:text-white hover:cursor-pointer font-bold'
                                    >
                                        Create Note
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                Create New Todo
                            </h2>

                            <form className="space-y-6" onSubmit={handleSubmit(handelNoteForm)}>
                                {/* Todo Title */}
                                <div>
                                    <label
                                        htmlFor="task"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Task
                                    </label>
                                    <input
                                        type="text"
                                        id="Task"
                                        name="Task"
                                        placeholder="Enter todo task"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   outline-none transition-all duration-200"

                                        {...register("Task", {
                                            required: { value: true, message: "This filed id required" },

                                        })}
                                    />
                                </div>

                                {/* Todo Date */}
                                <div>
                                    <label
                                        htmlFor="date"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Enter Date
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   outline-none transition-all duration-200"
                                        {...register("date", {
                                            required: { value: true, message: "This filed id required" },

                                        })}
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-between gap-4 pt-2">
                                    <button
                                        type="button"
                                        className="bg-white border border-black py-2 px-12
                   hover:bg-black hover:text-white transition font-bold"
                                        onClick={() => navgate(navigateLoaction)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="bg-white border border-black py-2 px-12
                   hover:bg-black hover:text-white transition font-bold"
                                    >
                                        Create Todo
                                    </button>
                                </div>
                            </form>
                        </div>

                    )
                }
            </div>
        </>
    )
}

export default AllForm