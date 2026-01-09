import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from '../api/data';
import { useNavigate } from 'react-router';
const Product = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProduct,
    staleTime: Infinity
  });
  const navigate = useNavigate();

  return (
    <>

      <div className="min-h-screen bg-gray-100 px-4 py-4 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {!isLoading ? data?.products?.map((val) => {
          return (
            <div
              key={val.id}
              className="box-border border border-black bg-white p-4 rounded-md flex flex-col gap-3"
            >
              {/* Image */}
              <div className="w-full h-48 border flex items-center justify-center overflow-hidden">
                <img
                  src={val.images}
                  alt={val.title}
                  loading="lazy"
                  width="192"
                  height="192"
                  className="object-contain"
                />
              </div>


              {/* Content */}
              <div className="flex flex-col gap-2">
                <p className="text-black font-medium text-sm">
                  {val?.title}
                </p>

                <p className="text-black font-semibold">
                  ₹ {Math.floor(val?.price) * 100}
                </p>

                <button className="border border-black text-black py-1 text-sm hover:bg-black hover:text-white transition"
                  onClick={() => {
                    navigate(`/product/${val.id}`)
                  }}


                >
                  View Product
                </button>
              </div>
            </div>
          )
        }) : Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[320px] bg-gray-300 animate-pulse rounded-md" />
        ))
        }
      </div>


    </>
  )
}

export default Product