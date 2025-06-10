import React from 'react'

export default function page() {
  return (
    <div className="w-full bg-amber-50 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-4 md:px-16 lg:px-24">
        
        <div className="flex flex-col justify-center h-full font-serif">
          <p className="text-orange-500 font-semibold uppercase tracking-wide mb-4">Who We Are</p>
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Supporting Dreams <br /> Changing Lives
          </h2>
          <p className="text-gray-600 mb-8 text-[15px]">
            LiftHumanity is committed to empowering communities and transforming lives through your generous support.
          </p>

          {/* Fund Worth */}
          <div className="mb-4">
            <p className="text-gray-700 font-medium mb-1">
              Total Fund Worth: <span className="text-green-500 font-bold">₨450,896,070</span>
            </p>
            <div className="h-1 bg-gray-200">
              <div className="h-1 bg-orange-500 w-[75%]"></div>
            </div>
          </div>

          {/* Cases Helped */}
          <div className="mb-8">
            <p className="text-gray-700 font-medium mb-1">
              Total Cases Helped: <span className="text-green-500 font-bold">200+</span>
            </p>
            <div className="h-1 bg-gray-200">
              <div className="h-1 bg-orange-500 w-[90%]"></div>
            </div>
          </div>

          {/* Button */}
          <button className="flex items-center px-8 py-4 border-2 border-orange-500 text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition w-fit">
            DONATE NOW <span className="ml-2 text-xl">➜</span>
          </button>
        </div>

        {/* Right Images */}
        <div className="relative w-full h-full flex justify-center items-center">
          {/* Background Image */}
          <img
            src="https://anity.vercel.app/assets/images/resources/who-we-are-img-1.jpg"
            alt="Children"
            className="rounded-2xl w-[120%] shadow-lg"
          />
          {/* Overlapping Image */}
          <img
            src="https://cdn.pixabay.com/photo/2013/11/08/19/40/child-207573_640.jpg"
            alt="Child"
            className="absolute bottom-[-18px] right-[-60px] w-70 h-72 rounded-2xl shadow-2xl border-8 border-white"
          />
        </div>

      </div>
    </div>
  )
}
