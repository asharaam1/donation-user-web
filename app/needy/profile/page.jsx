"use client";

import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { app } from "../../utils/firebaseConfig";
import { motion } from "framer-motion";

const NeedyProfile = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [userData, setUserData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return setLoading(false);

    const docRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());

        const q = query(
          collection(db, "users", user.uid, "donations"),
          orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        const donations = querySnapshot.docs.map((doc) => doc.data());
        setHistory(donations);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!userData || userData.role !== "needy") {
    return (
      <div className="flex items-center justify-center min-h-screen text-center px-4">
        <p className="text-lg font-semibold">Unauthorized or user not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8 text-center relative overflow-hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-20 -right-20 bg-orange-100 w-64 h-64 rounded-full opacity-30"
          />
          <motion.img
            src={userData.profileImage}
            alt="Profile"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 mx-auto mb-4 z-10 relative"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            {userData.fullName}
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">Needy Beneficiary</p>

          <div className="text-left space-y-2 text-sm">
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Mobile:</strong> {userData.mobile}
            </p>
            <p>
              <strong>Country:</strong> {userData.country}
            </p>
          </div>

          {/* Stats Section */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-orange-100 p-4 rounded-xl shadow-inner"
            >
              <p className="text-gray-600 text-sm">Total Cases</p>
              <p className="text-xl font-bold text-orange-600"></p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-orange-100 p-4 rounded-xl shadow-inner"
            >
              <p className="text-gray-600 text-sm">Total Donations</p>
              <p className="text-xl font-bold text-orange-600"></p>
            </motion.div>
          </div>
        </motion.div>
        {/* RIGHT: Donation History */}
<motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8">
          <h3 className="text-2xl font-bold text-orange-600 mb-6">
            Donation History
          </h3>

          {history.length === 0 ? (
            <p className="text-gray-500">No donations received yet.</p>
          ) : (
            <div className="space-y-5 overflow-y-auto max-h-[400px] pr-2">
              {history.map((donation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-orange-50 hover:bg-orange-100 p-4 rounded-xl shadow-sm transition">
                  <p className="font-medium text-orange-800">
                    Rs {donation.amount}
                  </p>
                  <p className="text-sm text-gray-700">
                    Donor: {donation.donorName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(
                      donation.date.seconds * 1000
                    ).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        
      </motion.div>
      </motion.div>
    </div>
  );
};

export default NeedyProfile;
