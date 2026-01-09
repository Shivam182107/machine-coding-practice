import { lazy, Suspense, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import Navbar from './component/Navbar';
import Breadcrumbs from './component/Breadcrumbs';

const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
function App() {


  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-black">
        <h1 className="text-white text-2xl font-semibold animate-pulse">
          Loading...
        </h1>
      </div>
      }>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Product' element={<Product />}></Route>
          <Route path='/Product/:id' element={<ProductDetails />}></Route>

        </Routes>

      </Suspense>
    </>
  )
}

export default App
