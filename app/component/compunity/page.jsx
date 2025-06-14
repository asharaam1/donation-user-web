'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter()

  return (
    <div>

      {/* CTA Section */}
      <div
        className="w-full h-[400px] bg-cover bg-orange-400 bg-center flex flex-col justify-center items-center text-center px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586201375761-83865001e17b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
          backgroundBlendMode: "multiply",
        }}
      >
        <h2 className="text-white text-4xl md:text-5xl font-serif mb-8 leading-snug">
          Creating Lasting Change in <br /> Communities Worldwide
        </h2>

        <div className="flex flex-wrap justify-center gap-4">

          {/* Button 1 */}
          <button 
            onClick={() => router.push('/donor/give')}
            className="flex items-center bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold space-x-2 shadow-md hover:bg-yellow-500 transition"
          >
            <span>DONATE NOW</span>
            <span className="bg-black text-white rounded-full p-1">➜</span>
          </button>

          {/* Button 2 */}
          <button className="flex items-center bg-white text-black px-6 py-3 rounded-full font-semibold space-x-2 shadow-md hover:bg-gray-100 transition">
            <span>BECOME A VOLUNTEER</span>
            <span className="bg-black text-white rounded-full p-1">➜</span>
          </button>

        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-orange-500 py-10 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">

        {/* Left Text */}
        <h3 className="text-white text-2xl font-serif">
          Subscribe Our Newsletters
        </h3>

        {/* Input + Button */}
        <div className="flex items-center space-x-4 w-full md:w-auto">

          <input
            type="email"
            placeholder="Enter Your Email"
            className="bg-transparent border-b border-white text-white placeholder-white px-2 py-2 outline-none w-full md:w-64"
          />

          <button className="flex items-center bg-white text-black px-5 py-2 rounded-full font-semibold space-x-2 hover:bg-gray-100 transition">
            <span>SUBSCRIBE</span>
            <span className="bg-orange-500 text-white rounded-full p-1">➜</span>
          </button>

        </div>

      </div>

    </div>
  )
}
