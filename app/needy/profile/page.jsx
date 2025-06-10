"use client";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { app } from "../../utils/firebaseConfig";
import { motion } from "framer-motion";

const Profile = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching user data: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth, db]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#000000] text-white">
        <p className="text-xl font-semibold animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#000000] text-white px-4 text-center">
        <p className="text-lg font-semibold">User data not found. Please login again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-[#141414] to-black text-white py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl font-extrabold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-[#ff5528] to-[#ff7f50] bg-clip-text text-transparent">
            Profile Overview
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-3xl p-8 md:p-12 shadow-2xl bg-gradient-to-br from-[#1c1c1c] to-[#000000] border border-[#2a2a2a] backdrop-blur-lg"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="group">
                <label className="text-sm font-medium text-[#ff7f50] mb-1 block">Full Name</label>
                <p className="text-xl font-semibold group-hover:text-[#ff5528] transition-colors">
                  {userData.fullName || "N/A"}
                </p>
              </div>
              
              <div className="group">
                <label className="text-sm font-medium text-[#ff7f50] mb-1 block">Email</label>
                <p className="text-xl font-semibold group-hover:text-[#ff5528] transition-colors">
                  {userData.email || "N/A"}
                </p>
              </div>

              {userData.role === "needy" && (
                <>
                  <div className="group">
                    <label className="text-sm font-medium text-[#ff7f50] mb-1 block">Country</label>
                    <p className="text-xl font-semibold group-hover:text-[#ff5528] transition-colors">
                      {userData.country || "N/A"}
                    </p>
                  </div>
                  
                  <div className="group">
                    <label className="text-sm font-medium text-[#ff7f50] mb-1 block">Mobile</label>
                    <p className="text-xl font-semibold group-hover:text-[#ff5528] transition-colors">
                      {userData.mobile || "N/A"}
                    </p>
                  </div>
                </>
              )}
            </div>

            {userData.role === "needy" && userData.kycPhoto && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ff5528]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div>
                  <label className="text-sm font-medium text-[#ff7f50] mb-3 block">Verification Image</label>
                  <img
                    src={userData.kycPhoto}
                    alt="KYC Document"
                    className="rounded-2xl border-2 border-[#ff5528] shadow-2xl w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </motion.div>
            )}

            {userData.role === "donor" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="md:col-span-2 mt-4 p-6 rounded-2xl bg-gradient-to-r from-[#1f1f1f] to-[#0f0f0f] border border-[#2a2a2a]"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">👋</span>
                  <p className="text-xl font-medium text-[#ff5528]">
                    Welcome, donor! You can donate and track your impact here.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
