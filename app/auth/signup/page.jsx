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
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [kycFile, setKycFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

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
    setUploading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let kycPhotoURL = "";
      if (role === "needy" && kycFile) {
        kycPhotoURL = await uploadToCloudinary(kycFile);
      }

      const userData = {
        fullName,
        email,
        role,
        createdAt: new Date(),
      };

      if (role === "needy") {
        userData.country = country;
        userData.mobile = mobile;
        userData.kycPhoto = kycPhotoURL;
        userData.kycStatus = "pending";
      }

      await setDoc(doc(db, "users", user.uid), userData);
      router.push("/auth/login");
    } catch (err) {
      setError(err.message);
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#2a2a2a]">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex justify-center gap-6 text-white">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="donor"
                checked={role === "donor"}
                onChange={() => setRole("donor")}
              />
              Donor
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="needy"
                checked={role === "needy"}
                onChange={() => setRole("needy")}
              />
              Needy
            </label>
          </div>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff5528] focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff5528] focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff5528] focus:outline-none"
          />

          {role === "needy" && (
            <>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff5528] focus:outline-none"
              />

              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff5528] focus:outline-none"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setKycFile(e.target.files[0])}
                required
                className="mt-1 w-full text-sm text-white file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-[#ff5528] file:text-white hover:file:bg-[#ff7f50] file:cursor-pointer file:transition file:duration-300"
              />
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-gradient-to-r from-[#ff5528] to-[#ff784e] text-black font-semibold py-3 rounded-full hover:opacity-90 transition-all"
          >
            {uploading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#ff5528] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
