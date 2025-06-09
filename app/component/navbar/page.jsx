'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-7 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2 justify-center">
         <h1 className='text-3xl font-bold'>LiftHumanity</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium">
          {['Home', 'About',  'Donation', 'Blogs' ,   'Contact'].map((item, i) => (
            <Link
              key={i}
              href="#"
              className="hover:text-orange-500 flex items-center gap-1"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5h2a2 2 0 012 2v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 012-2h2m-2 4v6m-8 4h.01M6 20h12"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Call Anytime</p>
              <p className="text-sm font-medium">+92 306 3039620</p>
            </div>
          </div>
          <button className="p-2 bg-orange-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="flex items-center border border-orange-500 rounded-full overflow-hidden">
            <span className="px-4 py-2 text-sm font-semibold">DONATE NOW</span>
            <span className="bg-orange-500 text-white px-3 py-2 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {['Home', 'About',  'Donation' , 'Blogs' ,  'Contact'].map((item, i) => (
              <Link
                key={i}
                href="#"
                className="hover:text-orange-500 flex items-center gap-1"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
