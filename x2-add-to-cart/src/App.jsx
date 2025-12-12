import { Route, Routes } from 'react-router'
import './App.css'
import "./index.css"
import { lazy, Suspense, useState } from 'react'
import { RecipeContext } from './api/DataContext'


const Navbar=lazy(()=>import('./comoponent/Navbar'))
const Home=lazy(()=>import('./pages/Home'));
const Wishlist=lazy(()=>import('./pages/Wishlist'));
const AddToCart=lazy(()=>import('./pages/AddToCart'));
function App() {
const [recipeData,setrecipeData]=useState(null);
 function getRecipeData(data){
  setrecipeData(data);
 }
  return (
    <>
    <RecipeContext.Provider value={{
      getRecipeData,
      recipeData
    }}>

    <Suspense fallback={<h1 className='text-center text-6xl text-orange-400'>Loading.....</h1>}>
    <Navbar/>
    
    <Routes>
      <Route path='/' element={<Home/>}>
      </Route>

       <Route path='/wishlist/:id?' element={<Wishlist/>}>
      </Route>
       <Route path='/addtocart/:id?' element={<AddToCart/>}>
      </Route>
    </Routes>
    </Suspense>
   
    </   RecipeContext.Provider>
    </>
  )
}

export default App
