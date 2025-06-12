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
  where,
} from "firebase/firestore";
import { app } from "../../utils/firebaseConfig";
import { motion } from "framer-motion";

const NeedyProfile = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [userData, setUserData] = useState(null);
  const [fundRequests, setFundRequests] = useState([]);
  const [totalCases, setTotalCases] = useState(0);
  const [totalDonatedAmount, setTotalDonatedAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("No user found, redirecting...");
        setLoading(false);
        return;
      }

      console.log("User authenticated:", user.uid);

      try {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeUser = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              console.log("User data fetched:", docSnap.data());
              setUserData(docSnap.data());
            } else {
              console.log("No user document found");
              setUserData(null);
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
            setLoading(false);
          }
        );

        const fundRequestsRef = collection(db, "fundRequests");
        const q = query(
          fundRequestsRef, 
          where("userId", "==", user.uid), 
          orderBy("createdAt", "desc")
        );

        console.log("Setting up fund requests listener for user:", user.uid);

        const unsubscribeFundRequests = onSnapshot(q, async (snapshot) => {
          console.log("Fund requests snapshot received, docs count:", snapshot.docs.length);
          
          let totalRaisedForAllRequests = 0;
          const fetchedRequests = [];

          for (const docSnap of snapshot.docs) {
            const fundRequestData = { id: docSnap.id, ...docSnap.data() };
            console.log("Processing fund request:", fundRequestData);
            fetchedRequests.push(fundRequestData);
            totalRaisedForAllRequests += fundRequestData.amountRaised || 0;
          }

          console.log("Setting fund requests:", fetchedRequests);
          setFundRequests(fetchedRequests);
          setTotalCases(fetchedRequests.length);
          setTotalDonatedAmount(totalRaisedForAllRequests);
          setLoading(false);
        }, (error) => {
          console.error("Error in fund requests listener:", error);
          setLoading(false);
        });

        return () => {
          console.log("Cleaning up listeners");
          unsubscribeUser();
          unsubscribeFundRequests();
        };
      } catch (error) {
        console.error("Error in auth state change handler:", error);
        setLoading(false);
      }
    });

    return () => {
      console.log("Cleaning up auth listener");
      unsubscribeAuth();
    };
  }, [auth, db]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 text-black">
        <p className="text-xl font-semibold animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!userData || userData.role !== "needy") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 text-black text-center px-4">
        <p className="text-lg font-semibold">Unauthorized or user not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-16 px-4">
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
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center relative overflow-hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-20 -right-20 bg-orange-50 opacity-30 w-64 h-64 rounded-full"
          />
          <motion.img
            src={userData.profileImageUrl || "/default-avatar.png"}
            alt="Profile"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-32 h-32 rounded-full object-cover border-4 border-[#ff5528] mx-auto mb-4 z-10 relative"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            {userData.fullName || "Needy User"}
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">Needy Beneficiary</p>

          <div className="text-left space-y-2 text-sm">
            <p>
              <strong>Email:</strong> {userData.email || "N/A"}
            </p>
            <p>
              <strong>Mobile:</strong> {userData.mobile || "N/A"}
            </p>
            <p>
              <strong>Country:</strong> {userData.country || "N/A"}
            </p>
          </div>

          {/* Stats Section */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-orange-50 p-4 rounded-xl shadow-inner"
            >
              <p className="text-gray-600 text-sm">Total Cases</p>
              <p className="text-xl font-bold text-[#ff5528]">{totalCases}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-orange-50 p-4 rounded-xl shadow-inner"
            >
              <p className="text-gray-600 text-sm">Total Raised</p>
              <p className="text-xl font-bold text-[#ff5528]">Rs {totalDonatedAmount.toLocaleString()}</p>
            </motion.div>
          </div>
        </motion.div>
        {/* RIGHT: Fund Request History */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-[#ff5528] mb-6">
            My Fund Requests
          </h3>

          {fundRequests.length === 0 ? (
            <p className="text-gray-500">No fund requests submitted yet.</p>
          ) : (
            <div className="space-y-5 overflow-y-auto max-h-[400px] pr-2">
              {fundRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="bg-orange-50 hover:bg-orange-100 p-4 rounded-xl shadow-sm transition flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{request.title}</p>
                    <p className="text-sm text-gray-600">Status: {request.status}</p>
                    <p className="text-xs text-gray-500">
                      Requested: Rs {request.amountRequested.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Raised: Rs {request.amountRaised ? request.amountRaised.toLocaleString() : 0}
                    </p>
                  </div>
                  <img
                    src={request.blogImg || "/default-fund-img.png"}
                    alt={request.title}
                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                  />
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
