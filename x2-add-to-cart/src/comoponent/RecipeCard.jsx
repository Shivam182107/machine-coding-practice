import React from 'react'
import { Clock, Flame, Utensils, ChefHat, Star, Heart } from "lucide-react";
import { useNavigate } from 'react-router';

const RecipeCard = ({data}) => {
    const navigate=useNavigate();
  return (
  <>
                  {
                      data?.recipes?.map(val => (
  
                          <div className=' h-[470px] w-[400px] flex flex-col items-center bg-white shadow-xl rounded-md '>
                              {/* image section  */}
                              <div className='h-[250px] w-full rounded-md overflow-hidden relative'>
                                  <img src={val.image}
                                      className='h-[250px]  w-full rounded-md hover:scale-105 hover:cursor-pointer object-cover  transition-transform duration-300 '
                                      loading='lazy'
                                  >
                                  </img>
                                  <div className="absolute top-2 right-2 flex items-center gap-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-md">
                                      <div className="p-1 rounded-full hover:bg-gray-100 transition"
                                       onClick={()=>{
                                        navigate(`/wishlist/${val.id}`)
                                       }}
                                      >
                                          <Heart className="w-4 h-4 text-red-500" />
                                      </div>
  
                                      <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-md">
                                          <Star className="w-4 h-4 text-yellow-500" />
                                          <span className="text-sm font-medium text-gray-700">{val.rating}</span>
                                      </div>
                                  </div>
  
                              </div>
                              {/* description section  */}
                              <div className='w-full'>
                                  <p className='text-xl font-bold self-start pl-4 mt-2 '>{val.name}</p>
                                  <p className='text-sm ml-8 mt-2'>Delicious recipe you’ll love!</p>
                              </div>
                              <div className="grid grid-cols-2  place-items-center gap-x-20 gap-y-6 font-bold w-full text-gray-700 text-sm mt-4 ">
  
                                  <div className="flex items-center  ">
                                      <Clock className="text-orange-500 w-5 h-5 mr-4" />
                                      {val.cookTimeMinutes + val.prepTimeMinutes} min
                                  </div>
  
                                  <div className="flex items-center  ">
                                      <Utensils className="text-orange-500 w-5 h-5 mr-4" />
                                      {val.servings} servings
                                  </div>
  
                                  <div className="flex items-center  ">
                                      <Flame className="text-orange-500 w-5 h-5 mr-4" />
                                      {val.caloriesPerServing} cal
                                  </div>
  
                                  <div className="flex items-center  ">
                                      <ChefHat className="text-orange-500 w-5 h-5 mr-4" />
                                      {val.cuisine}
                                  </div>
                              </div>
                              {/* button section */}
                              <div className='flex flex-row justify-between  w-full px-4 mt-4'>
                                  <button className='border-1 border-orange-600 h-12 px-4 font-bold text-orange-600 hover:bg-orange-500 hover:text-white'>View Recipe</button>
                                  <button className='border-1 border-orange-600 h-12 px-4 font-bold text-orange-600 hover:bg-orange-500 hover:text-white'
                                  onClick={()=>{
                                    navigate(`/addtocart/${val.id}`)
                                  }}
                                  
                                  >Add To Cart</button>
                              </div>
                          </div>
                      ))
                  }
                  
             
  </>
  )
}

export default RecipeCard