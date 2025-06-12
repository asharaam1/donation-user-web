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
} from "firebase/firestore";

const NeedyHome = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login");
      } else {
        setCheckingAuth(false);

        const q = query(
          collection(db, "publicPosts"),
          where("status", "==", "approved"),
          orderBy("createdAt", "desc")
        );

        const unsubscribePosts = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(data);
        });

        return () => unsubscribePosts();
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

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

        {posts.length === 0 ? (
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
                {post.userImage && (
                  <img
                    src={post.userImage}
                    alt="Profile"
                    className="w-14 h-14 rounded-full mb-3 object-cover border"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">
                  {post.description}
                </h3>
                <p className="text-orange-600 font-medium mb-1">
                  Amount: ${post.amount}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(
                    post.createdAt?.toDate?.() || post.createdAt
                  ).toLocaleString()}
                </p>
                {post.name && (
                  <p className="text-sm text-gray-500 italic">
                    By: {post.name}
                  </p>
                )}
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
