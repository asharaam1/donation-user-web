'use client';
import React from 'react'
import { useRouter } from 'next/navigation';

export default function LiftHumanity() {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-20 px-4">

      {/* Left Card */}
      <div
        className="relative rounded-2xl p-10 text-white flex flex-col justify-between"
        style={{
          backgroundImage: "linear-gradient(rgba(255,87,34,0.85), rgba(255,87,34,0.85)), url('https://cdn.pixabay.com/photo/2020/01/30/19/25/child-4801383_1280.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h3 className="text-2xl font-bold mb-4">Support Lives with Your Donation</h3>
          <p className="mb-6">
            LiftHumanity is dedicated to improving lives through compassionate donations.
            Your support helps us provide food, shelter, and education to those in need.
          </p>
        </div>
        <button
          onClick={() => router.push('/donor/give')}
          className="flex items-center px-6 py-3 bg-transparent border-2 border-white rounded-full text-white font-bold w-fit hover:bg-white hover:text-orange-500 transition"
        >
          DONATE NOW <span className="ml-2 text-xl">➜</span>
        </button>
      </div>

      {/* Right Card */}
      <div
        className="relative rounded-2xl p-8 text-white flex flex-col justify-between"
        style={{
          backgroundImage: "linear-gradient(rgba(0,173,131,0.85), rgba(0,173,131,0.85)), url('https://cdn.pixabay.com/photo/2018/04/28/17/03/children-3353293_1280.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h3 className="text-2xl font-bold mb-4">Join Us as a Volunteer</h3>
          <p className="mb-6">
            Become a part of LiftHumanity’s mission by volunteering your time and skills.
            Together, we can create a positive impact in communities that need it most.
          </p>
        </div>
        <button
          onClick={() => router.push('/donor/give')}
          className="flex items-center px-6 py-3 bg-transparent border-2 border-white rounded-full text-white font-bold w-fit hover:bg-white hover:text-green-600 transition"
        >
          JOIN NOW <span className="ml-2 text-xl">➜</span>
        </button>
      </div>

    </div>
  )
}
