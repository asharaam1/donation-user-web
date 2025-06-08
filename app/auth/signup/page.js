"use client";
import React from "react";
import { useState } from "react";
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex justify-center gap-6 mb-2">
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
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          {role === "needy" && (
            <>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <label className="block text-sm text-gray-700">
                Upload Live Photo (KYC)
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setKycFile(e.target.files[0])}
                  required
                  className="mt-2 w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#ff5520] hover:file:bg-[#ff7f50] file:cursor-pointer file:transition file:duration-300"
                />
              </label>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-[#ff5528] hover:bg-[#ff7f50] text-white py-2 rounded-lg transition">
            {uploading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#ff5528] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}