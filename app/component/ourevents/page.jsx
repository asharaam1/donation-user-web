'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function OurEvents() {
  const router = useRouter();

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-16 lg:px-24">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold uppercase tracking-wide mb-2">OUR EVENTS</p>
          <h2 className="text-5xl font-bold leading-tight">
            Join Us in the Fight <br /> Against Poverty
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition">
            <div className="relative">
              <img 
                src="https://anity.vercel.app/assets/images/event/event-1-1.jpg" 
                alt="Donation Drive" 
                className="w-full h-44 object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white px-4 py-1 rounded-full flex items-center text-sm font-semibold text-gray-700 shadow">
                <span className="text-green-500 text-xl mr-2">🟢</span> 20th Dec, 2024
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-3">Donation Drive</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Help us raise funds to provide essential resources and support to families in need.
              </p>
              <p className="flex items-center text-gray-700 mb-6">
                <span className="text-orange-500 text-xl mr-2">📍</span> 6391 Elgin St. Celina, 10299
              </p>
              <button 
                onClick={() => router.push('/donor/give')}
                className="flex items-center justify-center px-8 py-3 border-2 border-orange-500 text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition w-fit mx-auto"
              >
                DONATE NOW <span className="ml-2 text-xl">➜</span>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition">
            <div className="relative">
              <img 
                src="https://anity.vercel.app/assets/images/event/event-1-2.jpg" 
                alt="Win-Win Survival" 
                className="w-full h-44 object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white px-4 py-1 rounded-full flex items-center text-sm font-semibold text-gray-700 shadow">
                <span className="text-green-500 text-xl mr-2">🟢</span> 15th Nov, 2023
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-3">Win-Win Survival</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                A community initiative to empower individuals with skills and knowledge for self-sufficiency.
              </p>
              <p className="flex items-center text-gray-700 mb-6">
                <span className="text-orange-500 text-xl mr-2">📍</span> 6391 Elgin St. Celina, 10299
              </p>
              <button 
                onClick={() => router.push('/donor/give')}
                className="flex items-center justify-center px-8 py-3 border-2 border-orange-500 text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition w-fit mx-auto"
              >
                DONATE NOW <span className="ml-2 text-xl">➜</span>
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition">
            <div className="relative">
              <img 
                src="https://anity.vercel.app/assets/images/event/event-1-3.jpg" 
                alt="Children Education" 
                className="w-full h-44 object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white px-4 py-1 rounded-full flex items-center text-sm font-semibold text-gray-700 shadow">
                <span className="text-green-500 text-xl mr-2">🟢</span> 19th Feb, 2024
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-3">Children Education</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Supporting education initiatives to help children build a brighter future.
              </p>
              <p className="flex items-center text-gray-700 mb-6">
                <span className="text-orange-500 text-xl mr-2">📍</span> 6391 Elgin St. Celina, 10299
              </p>
              <button 
                onClick={() => router.push('/donor/give')}
                className="flex items-center justify-center px-8 py-3 border-2 border-orange-500 text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition w-fit mx-auto"
              >
                DONATE NOW <span className="ml-2 text-xl">➜</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
