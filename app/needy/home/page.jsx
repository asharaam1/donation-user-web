"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "../../component/navbar/page";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "../../utils/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import Link from "next/link";

const NeedyHome = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth/login");
      } else {
        setCheckingAuth(false);

        try {
          const fundRequestsQuery = query(
            collection(db, "fundRequests"),
            where("status", "==", "approved"),
            orderBy("createdAt", "desc")
          );

          const unsubscribePosts = onSnapshot(fundRequestsQuery, async (snapshot) => {
            try {
              const fetchedPosts = await Promise.all(
                snapshot.docs.map(async (docSnap) => {
                  const fund = docSnap.data();
                  const userRef = doc(db, 'users', fund.userId);
                  const userSnap = await getDoc(userRef);
                  const user = userSnap.data();
                  
                  return {
                    id: docSnap.id,
                    title: fund.title,
                    description: fund.description,
                    amountRequested: fund.amountRequested,
                    amountRaised: fund.amountRaised || 0,
                    imageUrl: fund.blogImg || user?.profileImageUrl || '/default-fund-img.png',
                    userName: user?.fullName || 'Unknown',
                    createdAt: fund.createdAt?.toDate ? fund.createdAt.toDate() : fund.createdAt,
                  };
                })
              );
              setPosts(fetchedPosts);
              setLoadingPosts(false);
            } catch (error) {
              console.error("Error processing fund requests:", error);
              setLoadingPosts(false);
            }
          }, (error) => {
            if (error.code === 'failed-precondition') {
              console.error("Index not ready. Please create the required index:", error.message);
              // Fallback to a simpler query without ordering
              const simpleQuery = query(
                collection(db, "fundRequests"),
                where("status", "==", "approved")
              );
              
              const unsubscribeSimple = onSnapshot(simpleQuery, async (snapshot) => {
                try {
                  const fetchedPosts = await Promise.all(
                    snapshot.docs.map(async (docSnap) => {
                      const fund = docSnap.data();
                      const userRef = doc(db, 'users', fund.userId);
                      const userSnap = await getDoc(userRef);
                      const user = userSnap.data();
                      
                      return {
                        id: docSnap.id,
                        title: fund.title,
                        description: fund.description,
                        amountRequested: fund.amountRequested,
                        amountRaised: fund.amountRaised || 0,
                        imageUrl: fund.blogImg || user?.profileImageUrl || '/default-fund-img.png',
                        userName: user?.fullName || 'Unknown',
                        createdAt: fund.createdAt?.toDate ? fund.createdAt.toDate() : fund.createdAt,
                      };
                    })
                  );
                  // Sort the posts client-side
                  fetchedPosts.sort((a, b) => b.createdAt - a.createdAt);
                  setPosts(fetchedPosts);
                  setLoadingPosts(false);
                } catch (error) {
                  console.error("Error processing fund requests (fallback):", error);
                  setLoadingPosts(false);
                }
              });
              return () => unsubscribeSimple();
            } else {
              console.error("Error fetching approved fund requests:", error);
              setLoadingPosts(false);
            }
          });

          return () => unsubscribePosts();
        } catch (error) {
          console.error("Error setting up fund requests query:", error);
          setLoadingPosts(false);
        }
      }
    });

    return () => unsubscribeAuth();
  }, [auth, router, db]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black">
        <p className="text-lg font-semibold animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <div className="flex-1 space-y-8">
          <motion.h1
            className="text-5xl md:text-6xl font-bold leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            Get the Help <br />
            <span className="text-orange-500">You Deserve ❤️</span>
          </motion.h1>

          <motion.p
            className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}>
            Welcome to Lift Humanity — raise funds, connect with donors, and
            access the support you need.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => router.push("/needy/raise-fund")}
              className="bg-orange-500 px-8 py-3 text-white font-semibold rounded-full hover:bg-orange-600">
              Raise Fund
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => router.push("/needy/profile")}
              className="border-2 border-orange-500 px-8 py-3 rounded-full text-orange-500 hover:bg-orange-100">
              View Profile
            </motion.button>
          </div>
        </div>

        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}>
          <img
            src="https://anity.vercel.app/assets/images/backgrounds/donate-one-single-bg-two.jpg"
            alt="Help illustration"
            className="w-full rounded-xl shadow-2xl"
          />
        </motion.div>
      </motion.section>

      {/* Approved Posts */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-8">Approved Fund Requests</h2>

        {loadingPosts ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-lg font-semibold animate-pulse">Loading fund requests...</p>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No approved fund requests yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white border border-gray-300 rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {post.description.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
                  <span>Raised: <span className="font-semibold">Rs {(post.amountRaised || 0).toLocaleString()}</span></span>
                  <span>Target: <span className="font-semibold">Rs {(post.amountRequested || 0).toLocaleString()}</span></span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-orange-500 h-2.5 rounded-full"
                    style={{
                      width: `${((post.amountRaised || 0) / (post.amountRequested || 1)) * 100 || 0}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 italic mb-4">By: {post.userName} on {new Date(post.createdAt).toLocaleDateString()}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <motion.footer
        className="text-center text-gray-500 py-8 text-sm border-t border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}>
        <p>
          &copy; {new Date().getFullYear()} Lift Humanity — Empowering those in
          need.
        </p>
      </motion.footer>
    </div>
  );
};

export default NeedyHome;