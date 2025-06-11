"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

// Dummy data array (copy from give/page.jsx)
const dummyBlogs = [
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
];

export default function BlogDetailsPage() {
  const { blogId } = useParams();
  const blog = dummyBlogs.find((b) => b.id === blogId);

  if (!blog) return <div className="p-10">Blog not found.</div>;

  const day = blog.createdAt.getDate().toString().padStart(2, '0');
  const month = blog.createdAt.toLocaleString('default', { month: 'short' }).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="relative">
          <img src={blog.userImg} className="w-full h-64 object-cover" alt={blog.title} />
          <div className="absolute left-4 bottom-4 bg-orange-500 text-white rounded px-3 py-1 flex flex-col items-center shadow-md">
            <span className="text-base font-bold leading-none">{day}</span>
            <span className="text-xs font-semibold leading-none">{month}</span>
          </div>
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">{blog.title}</h1>
          <div className="flex items-center gap-3 mb-4">
            <img src={blog.userImg} className="w-12 h-12 rounded-full border" alt={blog.userName} />
            <div>
              <h3 className="text-lg font-semibold">{blog.userName}</h3>
              <p className="text-gray-500 text-xs">{blog.createdAt.toDateString()}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-6 text-base">{blog.description}</p>
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p><strong>Amount Requested:</strong> Rs {blog.amountRequested}</p>
            <p><strong>Amount Raised:</strong> Rs {blog.amountRaised}</p>
          </div>
          <Link href="/donor/give" className="inline-block mt-2 text-orange-500 hover:underline">← Back to Blogs</Link>
        </div>
      </div>
    </div>
  );
} 