import React from 'react'

const Home = () => {
  return (
    <>
      <div className="min-h-screen  flex flex-col items-center justify-center px-6">

      

        {/* Card */}
        <div className="max-w-2xl bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg text-center">

          <p className="text-xl font-semibold mb-4 text-gray-400">
            Hello, I am <span className="text-blue-400">Shivam Ranjan Moharana</span>
          </p>

          <p className="text-gray-400 leading-relaxed">
            Welcome to my project. This application is built using modern
            web technologies with a clean UI and smooth user experience.
          </p>

        </div>

      </div>

    </>
  )
}

export default Home