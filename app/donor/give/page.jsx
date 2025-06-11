// pages/give.js
"use client";

import {  useState } from 'react';
// import { db } from '../firebase'; // your Firebase init
// import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const GivePage = () => {
    const router = useRouter();
    const [blogs, setBlogs] = useState([
        {
            id: "fundReq1",
            userName: "Ayesha Khan",
            userImg: "https://randomuser.me/api/portraits/women/68.jpg",
            title: "Help Me Buy Medicines",
            description: "I'm a single mother struggling with a chronic illness. Your donation can help me purchase life-saving medications for the next 3 months.",
            amountRequested: 10000,
            amountRaised: 2500,
            createdAt: new Date("2025-06-01"),
        },
        {
            id: "fundReq2",
            userName: "Ali Raza",
            userImg: "https://randomuser.me/api/portraits/men/45.jpg",
            title: "Need School Fees Support",
            description: "I am a student who recently lost his father. I need support to pay my school fees for the upcoming academic year.",
            amountRequested: 15000,
            amountRaised: 5000,
            createdAt: new Date("2025-05-20"),
        },
        {
            id: "fundReq3",
            userName: "Fatima Noor",
            userImg: "https://randomuser.me/api/portraits/women/32.jpg",
            title: "Emergency Surgery Required",
            description: "My younger brother needs emergency surgery after a road accident. We are unable to afford the hospital expenses on our own.",
            amountRequested: 50000,
            amountRaised: 12000,
            createdAt: new Date("2025-06-05"),
        },
        // Additional dummy data
        {
            id: "fundReq4",
            userName: "Sana Ahmed",
            userImg: "https://randomuser.me/api/portraits/women/44.jpg",
            title: "Support My Small Business",
            description: "I want to start a small tailoring business to support my family. Your help can make my dream come true.",
            amountRequested: 8000,
            amountRaised: 2000,
            createdAt: new Date("2025-06-10"),
        },
        {
            id: "fundReq5",
            userName: "Bilal Hussain",
            userImg: "https://randomuser.me/api/portraits/men/36.jpg",
            title: "Medical Equipment Needed",
            description: "I need funds to buy a wheelchair and other medical equipment for my disabled father.",
            amountRequested: 12000,
            amountRaised: 3500,
            createdAt: new Date("2025-06-12"),
        },
        {
            id: "fundReq6",
            userName: "Rabia Siddiqui",
            userImg: "https://randomuser.me/api/portraits/women/50.jpg",
            title: "Help Me Pay Rent",
            description: "I lost my job recently and am struggling to pay rent for my family. Any support is appreciated.",
            amountRequested: 7000,
            amountRaised: 1000,
            createdAt: new Date("2025-06-15"),
        },
    ]);

    // useEffect(() => {
    //     const fetchFundRequests = async () => {
    //         const fundSnapshot = await getDocs(collection(db, 'fundRequests'));
    //         const fundData = await Promise.all(
    //             fundSnapshot.docs.map(async (docSnap) => {
    //                 const fund = docSnap.data();
    //                 const userRef = doc(db, 'users', fund.userId);
    //                 const userSnap = await getDoc(userRef);
    //                 const user = userSnap.data();

    //                 return {
    //                     id: docSnap.id,
    //                     ...fund,
    //                     userName: user?.fullName || 'Unknown',
    //                     userImg: user?.profileImageUrl || '',
    //                 };
    //             })
    //         );
    //         setBlogs(fundData);
    //     };

    //     fetchFundRequests();
    // }, []);

    return (
        <div className="px-6 py-10 bg-[#fafbfc] min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {blogs.map((blog) => {
                    const day = blog.createdAt.getDate().toString().padStart(2, '0');
                    const month = blog.createdAt.toLocaleString('default', { month: 'short' }).toUpperCase();
                    return (
                        <div
                            key={blog.id}
                            className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl group"
                        >
                            <div className="relative">
                                {blog.userImg && (
                                    <img
                                        src={blog.userImg}
                                        className="w-full h-52 object-cover"
                                        alt="profile"
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
                                    <span><span className="font-semibold">Raised:</span> ${blog.amountRaised} / ${blog.amountRequested}</span>
                                </div>
                                <Link href={`/donor/give/${blog.id}`} className="mt-auto">
                                    <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-orange-500 text-orange-500 font-semibold py-2 rounded-full transition hover:bg-orange-500 hover:text-white hover:shadow-md">
                                        Read More
                                        <span className="inline-block bg-orange-500 text-white rounded-full p-1 ml-1">
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
        </div>
    );
};

export default GivePage;
