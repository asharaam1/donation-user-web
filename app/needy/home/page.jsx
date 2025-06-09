"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../utils/firebaseConfig";

const NeedyHome = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login"); 
      } else {
        setCheckingAuth(false); 
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-lg font-semibold animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Section */}
      <motion.section
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto px-6 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Content */}
        <div className="flex-1">
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Get the Help <br />
            You Deserve ❤️
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg mb-8 max-w-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome to the platform where you can raise funds, track your
            donation history, and update your profile with ease.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => router.push("/needy/raise-fund")}
              className="bg-gradient-to-r from-[#ff5528] to-[#ff784e] px-6 py-3 text-black font-semibold rounded-full hover:opacity-90 transition-all"
            >
              Raise Fund
            </button>
            <button
              onClick={() => router.push("/needy/profile")}
              className="border border-[#ff5528] px-6 py-3 rounded-full text-white hover:bg-[#ff5528] hover:text-black transition-all"
            >
              View Profile
            </button>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          className="flex-1 w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <img
            src="https://anity.vercel.app/assets/images/backgrounds/donate-one-single-bg-two.jpg"
            alt="Help illustration"
            className="w-full rounded-xl shadow-lg"
          />
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 text-sm">
        &copy; {new Date().getFullYear()} Helping Hands — Empowering those in need.
      </footer>
    </div>
  );
};

export default NeedyHome;
