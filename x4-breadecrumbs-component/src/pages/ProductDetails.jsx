import React from 'react'
import { useQuery } from "@tanstack/react-query"
import { fetchProductbyid } from '../api/data?';
import { useParams } from 'react-router';

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["Productbyid"],
    queryFn: () => fetchProductbyid(id),
    staleTime: Infinity
  });

  console.log(data);
  return (
    <>
     {!isLoading?<div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-6xl w-full bg-black border border-gray-300 rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* Left Image Section */}
          <div className="bg-white flex items-center justify-center p-6">
            <img
              src={data?.images?.[0]}
              alt={data?.title}
              className="w-full h-full max-h-[450px] object-contain"
            />
          </div>

          {/* Right Details Section */}
          <div className="p-8 text-white flex flex-col gap-4">

            <h1 className="text-3xl font-bold">
              {data?.title}
            </h1>

            <p className="text-sm text-gray-300">
              Brand: <span className="text-white font-medium">{data?.brand}</span>
            </p>

            <p className="text-sm text-gray-300">
              Category: <span className="text-white font-medium">{data?.category}</span>
            </p>

            <p className="text-gray-200 leading-relaxed">
              {data?.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-4 mt-2">
              <span className="text-2xl font-bold text-white">
                ₹{data?.price}
              </span>
              <span className="text-xs border border-white px-3 py-1 rounded-full">
                {data?.discountPercentage}% OFF
              </span>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-300 mt-4">
              <p>⭐ Rating: {data?.rating}</p>
              <p>📦 Stock: {data?.stock}</p>
              <p>🚚 {data?.shippingInformation}</p>
              <p>✅ {data?.availabilityStatus}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-white text-black py-3 rounded-md font-semibold hover:bg-gray-200 transition">
                Add to Cart
              </button>
              <button className="flex-1 border border-white text-white py-3 rounded-md font-semibold hover:bg-white hover:text-black transition">
                Buy Now
              </button>
            </div>

          </div>
        </div>
      </div>:<div className="fixed inset-0 flex items-center justify-center bg-black">
        <h1 className="text-white text-2xl font-semibold animate-pulse">
          Loading...
        </h1>
      </div>}



    </>
  )
}

export default ProductDetails