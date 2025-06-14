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
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
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

  const [fundTitle, setFundTitle] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [fundDescription, setFundDescription] = useState("");
  const [blogImgFile, setBlogImgFile] = useState(null);
  const [fundLoading, setFundLoading] = useState(false);

  const [fundRequests, setFundRequests] = useState([]);
  const [totalCases, setTotalCases] = useState(0);
  const [totalDonatedAmount, setTotalDonatedAmount] = useState(0);

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

  const handleFundImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setBlogImgFile(file);
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
    if (
      !cnicFront ||
      !cnicBack ||
      !address.trim() ||
      !mobile.trim() ||
      !selfie
    ) {
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
      const user = auth.currentUser;

      // Check if user already has a KYC request
      const kycQuery = query(
        collection(db, "kycRequests"),
        where("userId", "==", user.uid)
      );
      const kycSnapshot = await getDocs(kycQuery);

      if (!kycSnapshot.empty) {
        alert("You have already submitted KYC. Please wait for approval.");
        setKycLoading(false);
        return;
      }

      const [frontUrl, backUrl, selfieUrl] = await Promise.all([
        uploadToCloudinary(cnicFront, "kyc"),
        uploadToCloudinary(cnicBack, "kyc"),
        uploadToCloudinary(selfie, "kyc"),
      ]);
      // const user = auth.currentUser;

      await setDoc(doc(db, "kycRequests", user.uid), {
        userId: user.uid,
        cnicFrontUrl: frontUrl,
        cnicBackUrl: backUrl,
        selfieUrl: selfieUrl,
        address: address.trim(),
        mobile: mobile.trim(),
        status: "pending",
        submittedAt: new Date(),
        reviewedby: null,
      });

      alert("KYC submitted successfully. Please wait for approval.");

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
    if (!fundTitle.trim() || !fundAmount || Number(fundAmount) <= 0 || !fundDescription.trim() || !blogImgFile) {
      alert("Please fill all fund details and upload an image");
      return;
    }

    setFundLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("User not logged in.");
        setFundLoading(false);
        return;
      }

      const blogImageUrl = await uploadToCloudinary(blogImgFile, "fund_requests");

      await addDoc(collection(db, "fundRequests"), {
        userId: user.uid,
        title: fundTitle.trim(),
        description: fundDescription.trim(),
        amountRequested: Number(fundAmount),
        amountRaised: 0, // Initially 0
        status: "pending",
        createdAt: new Date(),
        blogImg: blogImageUrl,
      });

      alert("Fundraising request submitted successfully. Please wait for approval.");
      setFundTitle("");
      setFundAmount("");
      setFundDescription("");
      setBlogImgFile(null);
    } catch (err) {
      console.error("Error submitting fund request: ", err);
      alert("Failed to submit fund request");
    }
    setFundLoading(false);
  };

  useEffect(() => {
    const fundRequestsRef = collection(db, "fundRequests");
    const q = query(
      fundRequestsRef, 
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    console.log("Setting up fund requests listener for user:", auth.currentUser.uid);

    const unsubscribeFundRequests = onSnapshot(q, async (snapshot) => {
      console.log("Fund requests snapshot received, docs count:", snapshot.docs.length);
      
      let totalRaisedForAllRequests = 0;
      const fetchedRequests = [];

      for (const docSnap of snapshot.docs) {
        const fundRequestData = { id: docSnap.id, ...docSnap.data() };
        console.log("Processing fund request:", fundRequestData);
        fetchedRequests.push(fundRequestData);
        totalRaisedForAllRequests += fundRequestData.amountRaised || 0;
      }

      console.log("Setting fund requests:", fetchedRequests);
      setFundRequests(fetchedRequests);
      setTotalCases(fetchedRequests.length);
      setTotalDonatedAmount(totalRaisedForAllRequests);
      setLoading(false);
    });

    return () => {
      unsubscribeFundRequests();
    };
  }, []);

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
        <p className="text-xl text-red-400 font-semibold">
          Please login to continue.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-white text-black p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-2xl space-y-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff5528] to-[#ff784e] transform rotate-12 scale-150"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-orange-600">
            <span className="bg-gradient-to-r from-[#ff5528] to-[#ff784e] bg-clip-text text-transparent">
              {userData.kycStatus !== "approved"
                ? "KYC Verification"
                : "Raise Fund"}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-700 text-center mb-8">
            {userData.kycStatus !== "approved"
              ? "Complete your verification to start raising funds"
              : "Tell us your story and how we can help"}
          </motion.p>

          {userData.kycStatus !== "approved" ? (
            <motion.form
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}>
              {/* KYC Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="flex flex-col space-y-2 group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <label className="text-sm font-medium  text-orange-600 mb-1">
                    CNIC Front Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setCnicFront)}
                      className="file-input bg-white border-2 border-gray-300 group-hover:border-[#ff5528] rounded-xl p-3 w-full transition-all duration-300 focus:outline-none focus:border-orange-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff5528]/5 to-[#ff784e]/5 rounded-xl pointer-events-none"></div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-col space-y-2 group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <label className="text-sm font-medium  text-orange-600 mb-1">
                    CNIC Back Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setCnicBack)}
                      className="file-input bg-white border-2 border-gray-300 group-hover:border-[#ff5528] rounded-xl p-3 w-full transition-all duration-300 focus:outline-none focus:border-orange-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff5528]/5 to-[#ff784e]/5 rounded-xl pointer-events-none"></div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <label className="text-sm font-medium  text-orange-600 mb-1 block">
                  Full Address
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Enter your complete address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white p-4 rounded-xl border-2 border-gray-300 group-hover:border-[#ff5528] resize-none transition-all duration-300 focus:outline-none focus:border-orange-500"
                    rows={3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff5528]/5 to-[#ff784e]/5 rounded-xl pointer-events-none"></div>
                </div>
              </motion.div>

              <motion.div
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <label className="text-sm font-medium  text-orange-600 mb-1 block">
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="03XXXXXXXXX"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-white p-4 rounded-xl border-2 border-gray-300 group-hover:border-[#ff5528] transition-all duration-300 focus:outline-none focus:border-orange-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff5528]/5 to-[#ff784e]/5 rounded-xl pointer-events-none"></div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <label className="text-sm font-medium  text-orange-600 block">
                  Capture Selfie
                </label>
                <div className="relative rounded-xl overflow-hidden border-2 border-gray-300 group-hover:border-[#ff5528] transition-all duration-300">
                  <Webcam
                    audio={false}
                    height={240}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={320}
                    videoConstraints={videoConstraints}
                    className="w-full rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff5528]/5 to-[#ff784e]/5 pointer-events-none"></div>
                </div>
                <motion.button
                  type="button"
                  onClick={captureSelfie}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-orange-500 text-white rounded-full font-semibold transform transition-all duration-300 hover:bg-orange-600 hover:shadow-lg">
                  Capture Selfie
                </motion.button>
              </motion.div>

              <motion.button
                type="button"
                onClick={submitKyc}
                disabled={kycLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-full font-bold text-white bg-orange-500 transition-all duration-300 hover:bg-orange-600 hover:shadow-md disabled:cursor-not-allowed ${
                  kycLoading
                    ? "bg-[#ff7f50] cursor-not-allowed"
                    : "bg-gradient-to-r from-[#ff5528] to-[#ff784e] hover:shadow-[#ff5528]/20"
                }`}>
                {kycLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit KYC"
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              onSubmit={submitFundRaise}
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}>
              <motion.div
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <label className="text-sm font-medium  text-orange-600 mb-1 block">
                  Amount Needed
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    placeholder="Enter amount in USD..."
                    className="w-full bg-white p-4 rounded-xl border-2 border-gray-300 group-hover:border-[#ff5528] transition-all duration-300 focus:outline-none focus:border-orange-500"
                    min="1"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff5528]/5 to-[#ff784e]/5 rounded-xl pointer-events-none"></div>
                </div>
              </motion.div>

              <motion.div
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <label className="text-sm font-medium text-orange-600 mb-1 block">
                  Fund Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fundTitle}
                    onChange={(e) => setFundTitle(e.target.value)}
                    placeholder="e.g., Medical expenses for a child..."
                    className="w-full bg-white p-4 rounded-xl border-2 border-gray-300 group-hover:border-[#ff5528] transition-all duration-300 focus:outline-none focus:border-orange-500"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff5528]/5 to-[#ff784e]/5 rounded-xl pointer-events-none"></div>
                </div>
              </motion.div>

              <motion.div
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <label className="text-sm font-medium  text-orange-600 mb-1 block">
                  Your Story
                </label>
                <div className="relative">
                  <textarea
                    value={fundDescription}
                    onChange={(e) => setFundDescription(e.target.value)}
                    placeholder="Tell us why you need help..."
                    rows={4}
                    className="w-full bg-white p-4 rounded-xl border-2 border-gray-300 group-hover:border-[#ff5528] resize-none transition-all duration-300 focus:outline-none focus:border-orange-500"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff5528]/5 to-[#ff784e]/5 rounded-xl pointer-events-none"></div>
                </div>
              </motion.div>

              <motion.div
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <label className="text-sm font-medium text-orange-600 mb-1 block">
                  Upload Image for Fund Request
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFundImageUpload}
                    className="file-input bg-white border-2 border-gray-300 group-hover:border-[#ff5528] rounded-xl p-3 w-full transition-all duration-300 focus:outline-none focus:border-orange-500"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff5528]/5 to-[#ff784e]/5 rounded-xl pointer-events-none"></div>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={fundLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-full font-bold text-black shadow-lg transition-all duration-300 ${
                  fundLoading
                    ? "bg-[#ff7f50] cursor-not-allowed"
                    : "bg-gradient-to-r from-[#ff5528] to-[#ff784e] hover:shadow-[#ff5528]/20"
                }`}>
                {fundLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Raise Fund"
                )}
              </motion.button>
            </motion.form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RaiseFund;
