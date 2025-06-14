'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function AboutUsSection() {
  const router = useRouter()

  return (
    <section className="bg-gradient-to-r m-20 from-orange-50 via-white to-white py-16 px-6 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto">

      <div className="relative w-full md:w-1/2">
 
        <img
          src="https://cdn.pixabay.com/photo/2018/07/19/08/51/old-man-3548098_1280.jpg"
          alt="Old Man"
          className="rounded-xl w-72 h-70 object-cover mb-50 z-10 relative"
        />

        <img
          src="https://cdn.pixabay.com/photo/2015/07/20/06/53/man-852423_640.jpg"
          alt="Poor Boy"
          className="absolute bottom-0  right-[-50px] md:right-[100px] w-72 h-100 rounded-xl object-cover shadow-lg"
        />

        {/* Orange Card */}
        <div className="absolute bottom-[30px] left-0 bg-orange-300 text-white p-5 rounded-xl flex items-center space-x-4 w-70 shadow-lg z-20">
          <div className="text-4xl">💖:</div>
          <div>
            <div className="text-3xl font-bold">250+</div>
            <div className="text-lg">Services we provide</div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 md:pl-16 text-center md:text-left">
        <p className="text-orange-500 uppercase font-medium mb-3">About Us</p>
        <h2 className="text-5xl font-serif mb-6 leading-tight">
          LiftHumanity
          <br />
          Uniting Hearts Empowering Lives
        </h2>

        <div className="flex flex-wrap justify-center md:justify-start mb-6 space-x-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold shadow">
            Our Mission
          </button>
          <button className="border border-gray-400 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
            Our Vision
          </button>
          <button className="border border-gray-400 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
            Our Goal
          </button>
        </div>

        {/* Updated Paragraph */}
        <p className="text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
          LiftHumanity is committed to transforming lives and building stronger communities.  
          We believe that every individual deserves access to education, healthcare, and opportunities to thrive.  
          By partnering with local communities, we create sustainable programs that empower people to become self-sufficient and hopeful for the future.  
          At LiftHumanity, compassion, integrity, and respect are the foundation of everything we do — striving to be a beacon of hope for those in need.
        </p>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button 
            onClick={() => router.push('/donor/give')}
            className="flex items-center space-x-2 border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-full hover:bg-orange-500 hover:text-white transition"
          >
            <span>Donate Now</span>
            <span className="text-xl">→</span>
          </button>

          <div className="flex items-center space-x-2 text-gray-800 text-lg">
            <span className="text-orange-500 text-2xl">📞</span>
            <div>
              <div className="text-sm text-gray-500">Need help?</div>
              <div className="font-semibold italic">+92 306 3039620</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
