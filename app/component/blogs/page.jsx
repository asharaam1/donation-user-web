import React from 'react'

export default function page() {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-16 lg:px-24">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold uppercase tracking-wide mb-2">News and Blogs</p>
          <h2 className="text-5xl font-serif leading-tight">
            Lending a Hand <br /> Spreading Hope
          </h2>
        </div>

        {/* Blog Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Blog Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-3 py-5 flex flex-col justify-between border border-gray-300 hover:shadow-2xl transition">
            <div className="relative mb-6">
              <img 
                src="https://cdn.pixabay.com/photo/2019/09/23/05/55/poor-man-4497600_1280.jpg" 
                alt="Caring For The Elderly And Vulnerable Strategy" 
                className="rounded-xl w-full object-cover h-64" 
              />
              <div className="absolute top-4 left-4 bg-orange-500 text-white font-bold rounded px-3 py-1 text-center">
                <div className="text-lg">20</div>
                <div className="text-xs">FEB</div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Caring For The Elderly And Vulnerable Strategy</h3>
            <button className="flex items-center px-6 py-2 border-2 border-orange-500 text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition w-fit mt-auto">
              READ MORE <span className="ml-2 text-xl">➜</span>
            </button>
          </div>

          {/* Blog Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-3 py-5 flex flex-col justify-between border border-gray-300 hover:shadow-2xl transition">
            <div className="relative mb-6">
              <img 
                src="https://cdn.pixabay.com/photo/2015/02/26/15/40/doctor-650534_1280.jpg" 
                alt="Our Goal Is Help The Poor Child Around The World" 
                className="rounded-xl w-full object-cover h-64" 
              />
              <div className="absolute top-4 left-4 bg-orange-500 text-white font-bold rounded px-3 py-1 text-center">
                <div className="text-lg">15</div>
                <div className="text-xs">NOV</div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Our Goal Is Help The Poor Child Around The World</h3>
            <button className="flex items-center px-6 py-2 border-2 border-orange-500 text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition w-fit mt-auto">
              READ MORE <span className="ml-2 text-xl">➜</span>
            </button>
          </div>

          {/* Blog Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-3 py-5 flex flex-col justify-between border border-gray-300 hover:shadow-2xl transition">
            <div className="relative mb-6">
              <img 
                src="https://cdn.pixabay.com/photo/2025/05/29/08/25/doctor-9628974_640.jpg" 
                alt="Education For Poor Children Is A Must Now" 
                className="rounded-xl w-full object-cover h-64" 
              />
              <div className="absolute top-4 left-4 bg-orange-500 text-white font-bold rounded px-3 py-1 text-center">
                <div className="text-lg">25</div>
                <div className="text-xs">JUN</div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Education For Poor Children Is A Must Now</h3>
            <button className="flex items-center px-6 py-2 border-2 border-orange-500 text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition w-fit mt-auto">
              READ MORE <span className="ml-2 text-xl">➜</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
