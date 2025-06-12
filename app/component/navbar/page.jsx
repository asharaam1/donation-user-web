"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { app } from "../../utils/firebaseConfig";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };
  const handleLogout = async () => {
  await signOut(auth);
  router.push('/auth/login');
};


  const navLinksDonor = [
    { name: "Home", path: "/donor/Home" },
    { name: "About", path: "/about" },
    { name: "Donation", path: "/donor/Home" },
    { name: "FAQs", path: "/faq" },
    { name: "Contact", path: "/contact" },
    { name: "Give", path: "/donor/give" },
  ];

  const navLinksNeedy = [
    { name: "Home", path: "/needy/home" },
    { name: "About", path: "/about" },
    { name: "FAQs", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-7 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2 justify-center">
          <Image
            src="/logo-donation.png"
            alt="Lift Humanity Logo"
            width={90}
            height={90}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium">
          {(userData?.role === "donor" ? navLinksDonor : navLinksNeedy).map(
            (item, i) => (
              <button
                key={i}
                onClick={() => handleNavigation(item.path)}
                className="hover:text-orange-500 flex items-center gap-1">
                {item.name}
              </button>
            )
          )}
        </nav>

    {userData && (
  <div className="hidden md:flex items-center gap-6">
    {/* Profile Image + Name (Clickable) */}
    <div
      onClick={() =>
        router.push(userData.role === "donor" ? "/donor/Profile" : "/needy/profile")
      }
      className="flex items-center gap-3 bg-white px-4 py-2 border border-gray-200 rounded-full shadow-md hover:shadow-lg transition cursor-pointer"
    >
      <Image
        src={userData.profileImageUrl || "/default-avatar.png"}
        alt="User Avatar"
        width={44}
        height={44}
        className="rounded-full object-cover border-2 border-orange-500"
      />
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-gray-900">
          {userData.fullName || "User"}
        </p>
        <p className="text-xs text-gray-500">View Profile</p>
      </div>
    </div>

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-full text-sm font-medium transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7"
        />
      </svg>
      Logout
    </button>
  </div>
)}



        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {(userData?.role === "donor" ? navLinksDonor : navLinksNeedy).map(
              (item, i) => (
                <button
                  key={i}
                  onClick={() => handleNavigation(item.path)}
                  className="hover:text-orange-500 flex items-center gap-1">
                  {item.name}
                </button>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
