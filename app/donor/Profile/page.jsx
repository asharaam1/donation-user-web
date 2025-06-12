"use client";

import React, { useState, useEffect } from "react";
import { FaMedal, FaHandHoldingHeart, FaCalendarAlt, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "@/app/component/navbar/page";
import Footer from '../../component/footer/page'
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot, query, collection, where, getDoc } from "firebase/firestore";
import { app } from "../../utils/firebaseConfig";
import { useRouter } from "next/navigation";

const DonorProfile = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const [causesSupported, setCausesSupported] = useState(0);
  const [loading, setLoading] = useState(true);

  //   const contributions = [
  //     { cause: "Flood Relief Fund", amount: "120,000", date: "May 2024", category: "Disaster Relief" },
  //     { cause: "Education for Orphans", amount: "95,000", date: "Apr 2024", category: "Education" },
  //     { cause: "Ramzan Ration Drive", amount: "50,000", date: "Mar 2024", category: "Food Aid" },
  //     { cause: "Clean Water Project", amount: "75,000", date: "Feb 2024", category: "Health" },
  //     { cause: "Winter Clothes Drive", amount: "38,000", date: "Jan 2024", category: "Welfare" },
  //   ];

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeUser = onSnapshot(
          userDocRef,
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

        const fetchContributions = async () => {
          const donationsRef = collection(db, "donations");
          const q = query(donationsRef, where("donorId", "==", user.uid));

          const unsubscribeDonations = onSnapshot(q, async (snapshot) => {
            let totalAmount = 0;
            const supportedCauses = new Set();
            const fetchedContributions = [];

            for (const donationDoc of snapshot.docs) {
              const donationData = donationDoc.data();
              totalAmount += donationData.amount;
              supportedCauses.add(donationData.fundRequestId);

              const fundRequestDocRef = doc(db, "fundRequests", donationData.fundRequestId);
              const fundRequestSnap = await getDoc(fundRequestDocRef);

              if (fundRequestSnap.exists()) {
                const fundRequestData = fundRequestSnap.data();
                fetchedContributions.push({
                  cause: fundRequestData.title,
                  amount: donationData.amount.toLocaleString(),
                  date: new Date(donationData.donatedAt.toDate()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                  category: fundRequestData.category || "N/A",
                });
              }
            }
            setTotalDonated(totalAmount);
            setCausesSupported(supportedCauses.size);
            setContributions(fetchedContributions);
          }, (error) => {
            console.error("Error fetching donations: ", error);
          });

          return unsubscribeDonations;
        };

        const unsubscribeDonations = await fetchContributions();

        return () => {
          unsubscribeUser();
          if (unsubscribeDonations) {
            unsubscribeDonations();
          }
        };
      } else {
        // User is logged out or not authenticated
        setUserData(null);
        setContributions([]);
        setTotalDonated(0);
        setCausesSupported(0);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [auth, db]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 text-black">
        <p className="text-xl font-semibold animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 text-black px-4 text-center">
        <p className="text-lg font-semibold">User data not found or unauthorized.</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5528] to-[#ff784e]">
            Lift Humanity
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Celebrating <span className="font-semibold text-[#ff5528]">Pakistan's</span> most generous hearts
          </p>
        </motion.div>

        {/* Profile Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-[#ff5528] to-[#ff784e] p-6 text-center">
              <img
                // src="https://randomuser.me/api/portraits/men/75.jpg"
                src={userData.profileImageUrl || "/default-avatar.png"}
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg mx-auto object-cover"
                alt="Donor"
              />
              <h2 className="mt-4 text-2xl font-bold text-white">{userData.fullName || "Donor"}</h2>
              <div className="inline-flex items-center mt-2 bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                <FaMedal className="mr-1" /> Diamond Donor
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <FaHandHoldingHeart className="text-[#ff5528] mr-2" />
                  <span className="text-gray-600">Total Donated</span>
                </div>
                <span className="font-bold text-[#ff5528] flex items-center">
                  Rs {totalDonated.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-[#ff5528] mr-2" />
                  <span className="text-gray-600">Causes Supported</span>
                </div>
                <span className="font-bold text-[#ff5528]">{causesSupported}+</span>
              </div>

              <div className="mt-6 bg-orange-50 rounded-lg p-4">
                <h4 className="font-semibold text-[#ff5528] mb-2">Impact Summary</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {contributions.length > 0 ? (
                    [...new Set(contributions.map(c => c.cause))].map((cause, index) => (
                      <li key={index} className="flex items-center">
                        <FaHeart className="text-[#ff5528] mr-2" /> {cause}
                      </li>
                    ))
                  ) : (
                    <li className="text-center text-gray-500">No impact summary available.</li>
                  )}
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
                <span className="bg-orange-100 text-[#ff5528] px-3 py-1 rounded-full text-sm">
                  Since {new Date(userData.createdAt.toDate()).getFullYear()}
                </span>
              </div>

              <div className="space-y-5">
                {contributions.length > 0 ? (
                  contributions.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      className="group flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-white rounded-xl border-l-4 border-[#ff5528] shadow-sm hover:shadow-md transition"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-[#ff5528]">{item.cause}</h4>
                        <span className="text-xs text-[#ff5528] bg-orange-100 px-2 py-1 rounded-full mt-1 inline-block">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#ff5528] flex items-center justify-end">
                          Rs {item.amount}
                        </p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No contributions found yet.</p>
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 text-center"
              >
                <button 
                  onClick={() => router.push('/donor/give')}
                  className="bg-gradient-to-r from-[#ff5528] to-[#ff784e] hover:shadow-lg text-white px-8 py-3 rounded-full font-bold shadow-md transition-all"
                >
                  Continue Your Legacy
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonorProfile;
