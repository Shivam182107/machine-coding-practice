import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Note from './pages/Note'
import Todo from './pages/Todo'
import Navbar from './component/Navbar'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes, fetchTodos } from './api/data'
import { AppContext } from './api/AppContext'
import AllForm from './pages/AllForm'
import ViewNote from './pages/ViewNote'

function App() {


  const {data:NoteData,isError,isLoading}=useQuery({
    queryKey:["Notes"],
    queryFn:fetchNotes,
    staleTime:Infinity
  })

  const {data:TodoData,isError:TodoError,isLoading:TodoLoading}=useQuery({
    queryKey:["Todo"],
    queryFn:fetchTodos
  })
  return (
    <>
    <AppContext.Provider value={{
      NoteData,
      TodoData
    }}>

    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
       <Route path='/Note' element={<Note/>}></Route>
        <Route path='/Note/NewNote' element={<AllForm/>}></Route>
        <Route path='/Note/edit/:id' element={<AllForm/>}></Route>
        <Route path='/Note/:id' element={<ViewNote/>}></Route>
        <Route path='/Todo' element={<Todo/>}></Route>
         <Route path='/Todo/NewTodo' element={<AllForm/>}></Route>
         <Route path='/Todo/edit/:id' element={<AllForm/>}></Route>
    </Routes>
   
    </AppContext.Provider>
   
    </>
  )
}

export default App
