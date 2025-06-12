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
      <div className="flex items-center justify-center min-h-screen bg-white text-black">
        <p className="text-xl font-semibold animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!userData || userData.role !== "needy") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black px-4 text-center">
        <p className="text-lg font-semibold">User data not found or unauthorized.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black py-16 px-4">
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
          className="text-4xl md:text-5xl font-extrabold mb-12 text-center"
        >
          <span className="text-orange-500">Needy Profile</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-3xl p-6 md:p-10 shadow-lg bg-white border border-gray-200"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Full Name</label>
                <p className="text-lg font-semibold">{userData.fullName || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
                <p className="text-lg font-semibold">{userData.email || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Country</label>
                <p className="text-lg font-semibold">{userData.country || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Mobile</label>
                <p className="text-lg font-semibold">{userData.mobile || "N/A"}</p>
              </div>
            </div>

            <div className="flex justify-center items-start">
              <div className="text-center">
                {userData.profileImage && (
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 mx-auto"
                  />
                )}
              </div>
            </div>
          </div>

          {userData.kycPhoto && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8"
            >
              <img
                src={userData.kycPhoto}
                alt="KYC Document"
                className="rounded-xl border border-gray-300 w-full max-w-md object-cover mx-auto"
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
