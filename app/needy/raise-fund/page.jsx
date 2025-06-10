"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import { db, auth } from "../../utils/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";

const videoConstraints = {
  width: 320,
  height: 240,
  facingMode: "user",
};

const RaiseFund = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [selfie, setSelfie] = useState(null);
  const [kycLoading, setKycLoading] = useState(false);

  const [fundAmount, setFundAmount] = useState("");
  const [fundDescription, setFundDescription] = useState("");
  const [fundLoading, setFundLoading] = useState(false);

  const webcamRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

 const captureSelfie = () => {
  if (webcamRef.current) {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      alert("Unable to capture selfie. Please allow camera access.");
      return;
    }
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
        setSelfie(file);
        console.log("Captured selfie file:", file);
      });
  }
};


  const submitKyc = async () => {
    if (!cnicFront || !cnicBack || !address.trim() || !mobile.trim() || !selfie) {
      alert("Please fill all KYC fields and capture selfie");
      return;
    }

    const mobileRegex = /^03\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      alert("Please enter a valid mobile number starting with 03");
      return;
    }

    setKycLoading(true);
    try {
      const [frontUrl, backUrl, selfieUrl] = await Promise.all([
        uploadToCloudinary(cnicFront, "kyc"),
        uploadToCloudinary(cnicBack, "kyc"),
        uploadToCloudinary(selfie, "kyc"),
      ]);
      const user = auth.currentUser;
      await addDoc(collection(db, "kycRequests"), {
        userId: user.uid,
        cnicFrontUrl: frontUrl,
        cnicBackUrl: backUrl,
        selfieUrl: selfieUrl,
        address: address.trim(),
        mobile: mobile.trim(),
        status: "pending",
        createdAt: new Date(),
      });
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { kycStatus: "pending" });
      alert("KYC submitted successfully. Please wait for approval.");
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) setUserData(userDoc.data());
      setCnicFront(null);
      setCnicBack(null);
      setAddress("");
      setMobile("");
      setSelfie(null);
    } catch (err) {
      console.error(err);
      alert("Error submitting KYC");
    }
    setKycLoading(false);
  };

  const submitFundRaise = async (e) => {
    e.preventDefault();
    if (!fundAmount || Number(fundAmount) <= 0 || !fundDescription.trim()) {
      alert("Please enter valid fund details");
      return;
    }

    setFundLoading(true);
    try {
      const user = auth.currentUser;
      await addDoc(collection(db, "fundRaising"), {
        userId: user.uid,
        amount: Number(fundAmount),
        description: fundDescription.trim(),
        status: "pending",
        createdAt: new Date(),
      });
      alert("Fundraising request submitted!");
      setFundAmount("");
      setFundDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit fund request");
    }
    setFundLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white p-6">
        <p className="text-xl text-red-400 font-semibold">Please login to continue.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1e1e1e] text-white p-6"
    >
      <div className="max-w-3xl mx-auto bg-[#121212] p-8 rounded-2xl shadow-2xl space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-[#ff5528]">
          {userData.kycStatus !== "approved" ? "KYC Verification" : "Raise Fund"}
        </h1>

        {userData.kycStatus !== "approved" ? (
          <form className="space-y-6">
            {/* KYC Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-[#ff784e]">CNIC Front Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setCnicFront)}
                  className="file-input bg-[#1f1f1f] border border-[#ff5528] rounded-xl p-2"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-[#ff784e]">CNIC Back Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setCnicBack)}
                  className="file-input bg-[#1f1f1f] border border-[#ff5528] rounded-xl p-2"
                />
              </div>
            </div>

            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#1f1f1f] p-3 rounded-xl border border-[#ff5528] resize-none"
              rows={3}
            />
            <input
              type="tel"
              placeholder="03XXXXXXXXX"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full bg-[#1f1f1f] p-3 rounded-xl border border-[#ff5528]"
            />

            <div>
              <Webcam
                audio={false}
                height={240}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                videoConstraints={videoConstraints}
                className="rounded-xl border-2 border-[#ff5528] mx-auto"
              />
              <button
                type="button"
                onClick={captureSelfie}
                className="mt-2 px-4 py-2 bg-[#ff5528] text-black rounded-full font-semibold hover:bg-[#ff784e]"
              >
                Capture Selfie
              </button>
            </div>

            <motion.button
              type="button"
              onClick={submitKyc}
              disabled={kycLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-full font-bold text-black ${
                kycLoading
                  ? "bg-[#ff7f50] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#ff5528] to-[#ff784e]"
              }`}
            >
              {kycLoading ? "Submitting..." : "Submit KYC"}
            </motion.button>
          </form>
        ) : (
          <form onSubmit={submitFundRaise} className="space-y-6">
            {/* Fund Raising Fields */}
            <input
              type="number"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              placeholder="Amount (USD)"
              className="w-full bg-[#1f1f1f] p-3 rounded-xl border border-[#ff5528]"
              min="1"
              required
            />
            <textarea
              value={fundDescription}
              onChange={(e) => setFundDescription(e.target.value)}
              placeholder="Why do you need help?"
              rows={4}
              className="w-full bg-[#1f1f1f] p-3 rounded-xl border border-[#ff5528]"
              required
            />
            <motion.button
              type="submit"
              disabled={fundLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-full font-bold text-black ${
                fundLoading
                  ? "bg-[#ff7f50] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#ff5528] to-[#ff784e]"
              }`}
            >
              {fundLoading ? "Submitting..." : "Raise Fund"}
            </motion.button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default RaiseFund;

