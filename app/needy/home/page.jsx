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
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.2 
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
              <motion.span 
                className="inline-flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                Get the Help
              </motion.span> <br />
              <motion.span 
                className="bg-gradient-to-r from-[#ff5528] to-[#ff784e] bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                You Deserve
                <motion.span 
                  className="text-[0.85em] transform -translate-y-[2px]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  ❤️
                </motion.span>
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            Welcome to the platform where you can raise funds, track your
            donation history, and update your profile with ease.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => router.push("/needy/raise-fund")}
              className="bg-gradient-to-r from-[#ff5528] to-[#ff784e] px-8 py-4 text-black font-semibold rounded-full hover:opacity-90 transition-all shadow-lg"
            >
              Raise Fund
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => router.push("/needy/profile")}
              className="border-2 border-[#ff5528] px-8 py-4 rounded-full text-white hover:bg-[#ff5528] hover:text-black transition-all"
            >
              View Profile
            </motion.button>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            ease: "easeOut"
          }}
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff5528]/20 to-transparent rounded-xl"></div>
            <img
              src="https://anity.vercel.app/assets/images/backgrounds/donate-one-single-bg-two.jpg"
              alt="Help illustration"
              className="w-full rounded-xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="text-center text-gray-400 py-8 text-sm border-t border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
      >
        <p className="max-w-md mx-auto">
          &copy; {new Date().getFullYear()} Helping Hands — Empowering those in need.
        </p>
      </motion.footer>
    </div>
  );
};

export default NeedyHome;
