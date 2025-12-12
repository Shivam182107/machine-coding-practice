import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { RecipeContext } from '../api/DataContext';
import { Clock, Flame, Utensils, ChefHat, Star, Heart } from "lucide-react";

const Wishlist = () => {
  const [wishlistData, setwishlistData] = useState([]);
  let { id } = useParams();
  // console.log(id)
  let { recipeData } = useContext(RecipeContext);
  const [removewishlist, setremovewishlist] = useState(null);
  useEffect(()=>{
    let arr=JSON.parse(localStorage.getItem("wishlist")) || [];
     if(arr.length==0) return;

     setwishlistData(arr);

  },[])

  useEffect(() => {
    if (!id) return;
    setwishlistData((prev) => {
      let arr = [...prev]
      let obj = recipeData?.recipes.find(val => val.id == Number(id));
      let isexist=arr.some(val=>val?.id==Number(id));
      if (arr.length == 0 || !isexist) {
        arr.push(obj);
      }
      else{
          return [...prev]
      }
      localStorage.setItem("wishlist",JSON.stringify(arr))
      return arr;
    })
  }, [id])


  
  return (
    <>

      <div className="w-[70%] h-full p-6 overflow-y-auto pt-40">

        {wishlistData.length > 0 ? (
          wishlistData.map((val) => (
            <div
              key={val?.id}
              className="h-[160px] w-full bg-white rounded-xl shadow-md mb-6 flex flex-row gap-4 p-4"
            >

              {/* Image */}
              <div className="h-full w-[180px] rounded-xl overflow-hidden">
                <img
                  src={val?.image}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Details Section */}
              <div className="flex flex-col justify-between w-full">

                {/* Name + Rating */}
                <div className="flex justify-between items-start">
                  <h1 className="text-xl font-bold text-gray-800">{val?.name}</h1>

                  <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{val?.rating}</span>
                  </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-3 text-sm mt-2 text-gray-700 gap-y-1">

                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-orange-500 mr-2" />
                    {val?.cookTimeMinutes + val?.prepTimeMinutes} min
                  </div>

                  <div className="flex items-center">
                    <Flame className="w-5 h-5 text-orange-500 mr-2" />
                    {val?.caloriesPerServing} cal
                  </div>

                  <div className="flex items-center">
                    <Utensils className="w-5 h-5 text-orange-500 mr-2" />
                    {val?.servings} servings
                  </div>

                </div>

                {/* Remove Button */}
                <button
                  className="self-end text-red-600 hover:text-red-800 mt-2"

                  onClick={() => {
                    setwishlistData((prev)=>{
                      let arr=[...prev];
                      arr=arr.filter(item=>item.id!=val.id);
                      localStorage.setItem("wishlist",JSON.stringify(arr))
                      return arr;
                    })

                  }}
                >
                  Remove
                </button>

              </div>

            </div>
          ))
        ) : (
          <div className='h-full flex flex-col items-center justify-center'>
            <h1 className='text-orange-700 text-center text-6xl'>Nothing in wishlist</h1>
          </div>
        )}

      </div>
    </>
  )
}

export default Wishlist