// pages/give.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from "@/app/component/navbar/page";
import Footer from '../../component/footer/page';
import { collection, query, getDocs, doc, getDoc, where, orderBy } from "firebase/firestore";
import { db } from '../../utils/firebaseConfig';

const GivePage = () => {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
 

    useEffect(() => {
        const fetchFundRequests = async () => {
            try {
                const fundRequestsRef = collection(db, 'fundRequests');
                // Query for approved fund requests, ordered by creation date
                const q = query(fundRequestsRef, where("status", "==", "approved"), orderBy("createdAt", "desc"));
                const fundSnapshot = await getDocs(q);

                const fundData = await Promise.all(
                    fundSnapshot.docs.map(async (docSnap) => {
                        const fund = docSnap.data();
                        // Fetch user data for needy person
                        const userRef = doc(db, 'users', fund.userId);
                        const userSnap = await getDoc(userRef);
                        const user = userSnap.data();

                        return {
                            id: docSnap.id,
                            ...fund,
                            userName: user?.fullName || 'Unknown',
                            userImg: fund.blogImg || user?.profileImageUrl || '/default-avatar.png',
                        };
                    })
                );
                setBlogs(fundData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching fund requests: ", error);
                setLoading(false);
            }
        };

        fetchFundRequests();
    }, [db]);

    return (
        <div className="min-h-screen bg-[#f7f7f7]">
            <Navbar />
            {/* New Hero Section with Background Image */}
            <div
                className="w-full h-80 bg-cover bg-center flex items-center justify-center text-white relative"
                style={{
                    backgroundImage: "url('/bg-img.png')",
                    backgroundAttachment: "fixed", // Optional: for parallax effect
                }}
            >
                <div className="absolute inset-0 bg-black opacity-5"></div>
                <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-center drop-shadow-lg">Give a Helping Hand</h1>
            </div>

            <div className="px-6 py-10">
                {loading ? (
                    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.80)-theme(spacing.20))]">
                        <p className="text-xl font-semibold animate-pulse">Loading fund requests...</p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.80)-theme(spacing.20))]">
                        <p className="text-lg font-semibold">No approved fund requests found at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {blogs.map((blog) => {
                            const dateObject = blog.createdAt instanceof Date ? blog.createdAt : blog.createdAt.toDate();
                            const day = dateObject.getDate().toString().padStart(2, '0');
                            const month = dateObject.toLocaleString('default', { month: 'short' }).toUpperCase();
                            return (
                                <div
                                    key={blog.id}
                                    className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl group"
                                >
                                    <div className="relative">
                                        {blog.userImg && (
                                            <img
                                                src={blog.userImg}
                                                className="w-full h-52 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                                alt={blog.title}
                                            />
                                        )}
                                        {/* Date badge bottom left */}
                                        <div className="absolute left-4 bottom-4 bg-orange-500 text-white rounded px-3 py-1 flex flex-col items-center shadow-md">
                                            <span className="text-base font-bold leading-none">{day}</span>
                                            <span className="text-xs font-semibold leading-none">{month}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col p-6">
                                        <Link href={`/donor/give/${blog.id}`}>
                                            <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-orange-500 transition-colors cursor-pointer min-h-[56px]">
                                                {blog.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 text-sm mb-4 flex-1 min-h-[48px]">
                                            {blog.description.slice(0, 80)}...
                                        </p>
                                        <div className="mb-4 text-xs text-gray-500 flex flex-col gap-1">
                                            <span><span className="font-semibold">By:</span> {blog.userName}</span>
                                            <span><span className="font-semibold">Raised:</span> Rs {blog.amountRaised.toLocaleString()} / Rs {blog.amountRequested.toLocaleString()}</span>
                                        </div>
                                        <Link href={`/donor/give/${blog.id}`} className="mt-auto">
                                            <button className="flex items-center gap-2 px-4 py-2 border-2 border-orange-500 text-orange-500 font-semibold rounded-full transition hover:bg-orange-500 hover:text-white hover:shadow-md w-fit mx-auto">
                                                Read More
                                                <span className="inline-flex items-center justify-center bg-orange-500 text-white rounded-full p-2 ml-2 w-8 h-8">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default GivePage;
