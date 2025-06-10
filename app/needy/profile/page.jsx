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
    <div className="min-h-screen bg-gradient-to-tr from-black via-[#141414] to-black text-white py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-[#ff5528] to-[#ff7f50] bg-clip-text text-transparent tracking-tight">
          Profile Overview
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-2xl p-8 shadow-lg bg-gradient-to-br from-[#1c1c1c] to-[#000000] border border-[#2a2a2a]"
        >
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold text-[#ff7f50]">Full Name:</span>{" "}
              {userData.fullName || "N/A"}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-[#ff7f50]">Email:</span>{" "}
              {userData.email || "N/A"}
            </p>

            {userData.role === "needy" && (
              <>
                <p className="text-lg">
                  <span className="font-semibold text-[#ff7f50]">Country:</span>{" "}
                  {userData.country || "N/A"}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-[#ff7f50]">Mobile:</span>{" "}
                  {userData.mobile || "N/A"}
                </p>

                {userData.kycPhoto && (
                  <div className="mt-6">
                    <p className="text-lg font-semibold text-[#ff7f50] mb-2">Image:</p>
                    <img
                      src={userData.kycPhoto}
                      alt="KYC Document"
                      className="rounded-xl border border-[#ff5528] shadow-xl max-w-xs transition-transform hover:scale-105"
                    />
                  </div>
                )}
              </>
            )}

            {userData.role === "donor" && (
              <div className="mt-4 text-lg font-medium text-[#ff5528]">
                👋 Welcome, donor! You can donate and track your impact here.
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
