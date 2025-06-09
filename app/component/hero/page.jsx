'use client';
import React from 'react';

export default function HeroSection() {
  return (
    <div
      className="relative w-full h-[600px] flex items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2018/07/19/08/51/old-man-3548098_1280.jpg'), linear-gradient(135deg, rgba(34,193,195,0.5), rgba(253,187,45,0.5))",
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* Overlay for color gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-orange-300 opacity-60 mix-blend-screen z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col justify-center h-full text-white px-6 md:px-0">
        <p className="text-3xl text-black font-serif mb-2">Serving Pakistan’s Communities.</p>
        <h1 className="text-5xl sm:text-7xl font-serif mb-8  leading-tight">
          Together, we can <br /> uplift lives <br /> and build hope
        </h1>
        <button className="flex items-center px-6 py-3 border border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition w-fit">
          DONATE NOW
          <span className="ml-2 text-lg">➜</span>
        </button>
      </div>

      {/* Left & Right Arrows */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-10">
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition text-xl">
          ←
        </button>
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition text-xl">
          →
        </button>
      </div>

      {/* Easy Donation Box */}
      <div className="absolute bottom-8 right-8 bg-white text-black rounded-xl px-8 py-4 shadow-lg text-xl font-semibold z-10">
        Easy Donation
      </div>
    </div>
  );
}
