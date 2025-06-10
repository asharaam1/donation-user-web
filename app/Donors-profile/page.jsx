"use client";

import React from "react";
import { FaMedal, FaHandHoldingHeart, FaCalendarAlt, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const DonorProfile = () => {
  const contributions = [
    { cause: "Flood Relief Fund", amount: "120,000", date: "May 2024", category: "Disaster Relief" },
    { cause: "Education for Orphans", amount: "95,000", date: "Apr 2024", category: "Education" },
    { cause: "Ramzan Ration Drive", amount: "50,000", date: "Mar 2024", category: "Food Aid" },
    { cause: "Clean Water Project", amount: "75,000", date: "Feb 2024", category: "Health" },
    { cause: "Winter Clothes Drive", amount: "38,000", date: "Jan 2024", category: "Welfare" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-800">
          Lift Humanity
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Celebrating <span className="font-semibold text-indigo-700">Pakistan's</span> most generous hearts
        </p>
      </motion.div>

      {/* Profile Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg mx-auto object-cover"
              alt="Donor"
            />
            <h2 className="mt-4 text-2xl font-bold text-white">Ali Raza</h2>
            <div className="inline-flex items-center mt-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              <FaMedal className="mr-1" /> Diamond Donor
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center">
                <FaHandHoldingHeart className="text-blue-600 mr-2" />
                <span className="text-gray-600">Total Donated</span>
              </div>
              <span className="font-bold text-blue-800 flex items-center">
                Rs 985,000
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <FaCalendarAlt className="text-blue-600 mr-2" />
                <span className="text-gray-600">Causes Supported</span>
              </div>
              <span className="font-bold text-blue-800">25+</span>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Impact Summary</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <FaHeart className="text-red-400 mr-2" /> Helped 120+ flood victims
                </li>
                <li className="flex items-center">
                  <FaHeart className="text-red-400 mr-2" /> Funded 5 school scholarships
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contributions Section */}
        <div className="md:col-span-2">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 h-full border border-gray-100"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Your Generosity</h3>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Since 2020
              </span>
            </div>

            <div className="space-y-5">
              {contributions.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="group flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-700">{item.cause}</h4>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full mt-1 inline-block">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-800 flex items-center justify-end">
                      Rs {item.amount}
                    </p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 text-center"
            >
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-lg text-white px-8 py-3 rounded-full font-bold shadow-md transition-all">
                Continue Your Legacy
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
