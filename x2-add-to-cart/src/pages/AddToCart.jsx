import React, { useContext, useEffect, useReducer, useState, memo } from 'react'

import { useParams } from 'react-router'
import { RecipeContext } from '../api/DataContext';
import { Clock, Flame, Utensils, ChefHat, Star, Heart } from "lucide-react";

const AddToCart = () => {
  const { recipeData } = useContext(RecipeContext);
  const [CartData, setCartData] = useState({ CartArray: [], TotalAmount: 0 });
  const [removeorCheckout, setremoveorCheckout] = useState(null)
  const { id } = useParams();
  console.log("re rendering ......")

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("addtocart")) || [];
    if (data.length == 0) {
      return;
    }
    else {
      setCartData(data);

    }
  }, [])


  useEffect(() => {
    if (!id) return;
    setCartData((prev) => {
      let arr = [...prev.CartArray];
      let ExistRecipe = prev.CartArray.some(val => val.cartItem.id == Number(id));
      if (prev.CartArray.length == 0 || !ExistRecipe) {
        let obj = recipeData?.recipes?.find(val => val.id == Number(id))
        console.log(obj);
        let final = {
          cartItem: obj,
          cartItemCount: 1
        }
        arr.push(final);
      }
      else {
        return { ...prev };
      }
      let amt = arr.reduce((acc, val) => {
        return acc = acc + (val.cartItemCount * Math.floor(val.cartItem.rating)) * 100
      }, 0)
      localStorage.setItem("addtocart", JSON.stringify({ CartArray: arr, TotalAmount: amt }));
      return {
        CartArray: arr, TotalAmount: amt
      }
    })

  }, [id])

  useEffect(() => {
    setCartData((prev) => {
      let arr = [...prev.CartArray];
      arr = arr.filter(val => val.cartItem?.id != removeorCheckout);
      let amt = arr.reduce((acc, val) => {
        return acc = acc + (val.cartItemCount * Math.floor(val.cartItem.rating)) * 100
      }, 0)
      localStorage.setItem("addtocart", JSON.stringify({ CartArray: arr, TotalAmount: amt }));
      return {
        CartArray: arr, TotalAmount: amt
      }

    })
  }, [removeorCheckout])


  return (
    <>
      <div className='h-screen border-2 flex flex-row bg-gray-100 pt-20'>

        {/* LEFT SIDE – Cart Items */}
        <div className="w-[70%] h-full p-6 overflow-y-auto">

          {CartData.CartArray.length > 0 ? (
            CartData.CartArray.map((val, idx) => (
              <div
                key={val?.cartItem.id}
                className="h-[160px] w-full bg-white rounded-xl shadow-md mb-6 flex flex-row gap-4 p-4"
              >

                {/* Image */}
                <div className="h-full w-[180px] rounded-xl overflow-hidden">
                  <img
                    src={val?.cartItem.image}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-between w-full">

                  {/* Name + Rating */}
                  <div className="flex justify-between items-start">
                    <h1 className="text-xl font-bold text-gray-800">{val?.cartItem.name}</h1>

                    <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-md">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{val?.cartItem.rating}</span>
                    </div>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-3 text-sm mt-2 text-gray-700 gap-y-1">

                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-orange-500 mr-2" />
                      {val?.cartItem.cookTimeMinutes + val?.cartItem.prepTimeMinutes} min
                    </div>

                    <div className="flex items-center">
                      <Flame className="w-5 h-5 text-orange-500 mr-2" />
                      {val?.cartItem.caloriesPerServing} cal
                    </div>

                    <div className="flex items-center">
                      <Utensils className="w-5 h-5 text-orange-500 mr-2" />
                      {val?.cartItem.servings} servings
                    </div>

                  </div>
                  <span className='self-end flex flex-row items-center gap-4'>

                    <input type="number" name="value" id="value"
                      className="w-16 h-9 border border-gray-300 rounded-md px-2 text-gray-800
                      bg-white shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       hover:border-orange-400 transition-all"
                      value={CartData.CartArray[idx].cartItemCount}
                      onChange={(e) => {
                        setCartData((prev) => {
                          let arr = [...prev.CartArray];
                          let idx = arr.findIndex(item => item.cartItem.id == val.cartItem.id)
                          arr[idx] = { ...arr[idx], cartItemCount: e.target.value }

                          let amt = arr.reduce((acc, item) => {
                            acc = acc + (item.cartItemCount * Math.floor(item.cartItem.rating)) * 100
                            return acc;
                          }, 0)
                          localStorage.setItem("addtocart", JSON.stringify({ CartArray: arr, TotalAmount: amt }));
                          return {
                            CartArray: arr, TotalAmount: amt
                          }
                        })
                      }}
                    />
                    {/* Remove Button */}
                    <button
                      className="self-end text-red-600 hover:text-red-800 h-9"

                      onClick={() => {
                        setremoveorCheckout(val.cartItem.id)

                      }}
                    >
                      Remove
                    </button>
                  </span>

                </div>

              </div>
            ))
          ) : (
            <div className='h-full flex flex-col items-center justify-center'>
              <h1 className='text-orange-700 text-center text-6xl'>Nothing in Cart</h1>
            </div>
          )}

        </div>

        {/* RIGHT SIDE – Total Summary */}
        <div className="w-[30%] flex justify-center items-center p-4">

          <div className='h-[300px] w-[250px] bg-white rounded-xl shadow-xl p-6 flex flex-col justify-center items-center'>
            <h1 className='text-xl font-bold text-gray-800 mb-2'>Total Amount</h1>
            <p className='text-4xl font-bold text-orange-600'>₹{CartData.TotalAmount}</p>

            <button className='mt-6 bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-700'
              onClick={() => {
                setCartData({ CartArray: [], TotalAmount: 0 })
              }}

            >
              Checkout
            </button>
          </div>

        </div>

      </div>

    </>
  )
}

export default memo(AddToCart)