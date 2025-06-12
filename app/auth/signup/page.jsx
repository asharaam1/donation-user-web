"use client";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../utils/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

const cloudName = "dhcqfjulx";
const uploadPreset = "Donation App";

export default function Signup() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  const [role, setRole] = useState("donor");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!profileImageUrl) {
      setError("Please upload a profile image.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let imageUrl = "";
      if (role === "needy" && profileImageUrl) {
        imageUrl = await uploadToCloudinary(profileImageUrl);
      }
      if (role === "donor" && profileImageUrl) {
        imageUrl = await uploadToCloudinary(profileImageUrl);
      }

      const userData = {
        fullName,
        email,
        role,
        profileImageUrl: imageUrl,
        uid: user.uid,
        createdAt: new Date(),
      };

      if (role === "needy") {
        userData.mobile = mobile;
        userData.country = country;
      }

      await setDoc(doc(db, "users", user.uid), userData);
      router.push("/auth/login");
    } catch (err) {
      setError(err.message || "Signup failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-2">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center">
          <img
            src="/logo-donation.png"
            alt="Lift Humanity"
            className="w-55 h-55"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-[#ff5528] mb-8">
          Sign Up
        </h2>
        <div className="flex justify-center gap-4 mb-7">
          <button
            type="button"
            onClick={() => setRole("donor")}
            className={`w-1/2 py-2 rounded-full text-white font-medium ${
              role === "donor"
                ? "bg-[#ff5528]"
                : "bg-gray-300 text-black hover:bg-[#ff784e]"
            }`}>
            Donor
          </button>
          <button
            type="button"
            onClick={() => setRole("needy")}
            className={`w-1/2 py-2 rounded-full text-white font-medium ${
              role === "needy"
                ? "bg-[#ff5528]"
                : "bg-gray-300 text-black hover:bg-[#ff784e]"
            }`}>
            Needy
          </button>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5528]"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5528]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5528]"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5528]"
          />

          {role === "needy" && (
            <>
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5528]"
              />

              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5528]"
              />
            </>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImageUrl(e.target.files[0])}
            required
            className="mt-1 w-full text-sm file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-[#ff5528] file:text-white hover:file:bg-[#ff784e] file:cursor-pointer"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff5528] hover:bg-[#ff784e] text-white font-semibold py-3 rounded-lg transition-all">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-[#ff5528] mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#ff5528] hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
