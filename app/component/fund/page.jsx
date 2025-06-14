'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Fund() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row w-full mt-100 min-h-[400px]">
  
      {/* Left Side Image */}
      <div
        className="md:w-1/2 w-full h-[450px] bg-cover bg-center"
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2019/09/23/05/55/poor-man-4497600_640.jpg')" }}
      >
      </div>

      {/* Right Side Content */}
      <div className="md:w-1/2 w-full h-[450px] bg-[#2a2a2a] flex flex-col justify-center px-8 py-12 text-white">
        
        <p className="text-orange-500 font-semibold mb-3">Join Us Now</p>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          Helping To Make Our <br /> World Better Living
        </h2>

        {/* Amount Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold">Rs. 1,000</button>
          <button className="bg-[#1d1d1d] text-white px-6 py-3 rounded-full font-bold">Rs. 3,000</button>
          <button className="bg-[#1d1d1d] text-white px-6 py-3 rounded-full font-bold">Rs. 5,000</button>
          <button className="bg-[#1d1d1d] text-white px-6 py-3 rounded-full font-bold">Rs. 10,000</button>
          <button className="bg-[#1d1d1d] text-white px-6 py-3 rounded-full font-bold">Rs. 20,000</button>
        </div>

        {/* Custom Amount Input */}
        <div className="flex mb-6">
          <input 
            type="text" 
            placeholder="Rs. Custom Amount" 
            className="bg-[#1d1d1d] text-white placeholder-gray-400 px-6 py-3 rounded-full w-full outline-none"
          />
        </div>

        {/* Donate Button */}
        <button 
          onClick={() => router.push('/donor/give')}
          className="flex items-center justify-center px-8 py-4 bg-orange-500 text-white rounded-full font-bold text-lg w-fit"
        >
          DONATE NOW <span className="ml-2 text-xl">➜</span>
        </button>

      </div>
    </div>
  )
}
