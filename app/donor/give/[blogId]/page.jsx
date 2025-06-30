"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig";
import { doc, getDoc, addDoc, collection, serverTimestamp, updateDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { auth } from "../../../utils/firebaseConfig";
import { useRouter } from "next/navigation";

export default function BlogDetailsPage() {
  const { blogId } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [donationMessage, setDonationMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    let unsubscribeAuth = () => { }; // Initialize with no-op function
    let unsubscribeBlog = () => { }; // Initialize with no-op function

    unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/auth/login");
        return;
      }
      setCurrentUser(user);

      // Fetch current user's full name
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setCurrentUser((prevUser) => ({
            ...prevUser,
            fullName: userDocSnap.data().fullName || "Anonymous Donor",
          }));
        } else {
          setCurrentUser((prevUser) => ({ ...prevUser, fullName: "Anonymous Donor" }));
        }
      } catch (err) {
        console.error("Error fetching current user details:", err);
        setCurrentUser((prevUser) => ({ ...prevUser, fullName: "Anonymous Donor" }));
      }

      // Fetch blog details with real-time listener
      const docRef = doc(db, "fundRequests", blogId);
      unsubscribeBlog = onSnapshot(
        docRef,
        async (docSnap) => {
          if (docSnap.exists()) {
            const fund = docSnap.data();

            // Set initial blog data immediately
            setBlog({
              id: docSnap.id,
              ...fund,
              userName: 'Unknown',
              userImg: fund.blogImg || '/default-avatar.png',
              createdAt: fund.createdAt?.toDate ? fund.createdAt.toDate() : fund.createdAt,
            });

            // Fetch needy user details asynchronously
            if (fund.userId) {
              try {
                const needyUserRef = doc(db, 'users', fund.userId);
                const needyUserSnap = await getDoc(needyUserRef);
                if (needyUserSnap.exists()) {
                  const needyUserData = needyUserSnap.data();
                  setBlog(prevBlog => ({
                    ...prevBlog,
                    userName: needyUserData.fullName || 'Unknown',
                    userImg: needyUserData.profileImageUrl || '/default-avatar.png',
                  }));
                }
              } catch (err) {
                console.error("Error fetching needy user details:", err);
              }
            }
          } else {
            setError("Fund request not found.");
          }
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching blog details:", err);
          setError("Failed to fetch fund request details.");
          setLoading(false);
        }
      );
    });

    return () => {
      unsubscribeAuth();
      unsubscribeBlog();
    };
  }, [blogId, router, db]); // Added db to dependency array as it's used in onSnapshot

  useEffect(() => {
    if (!blogId) return;

    const q = query(
      collection(db, "donations"),
      where("fundRequestId", "==", blogId),
      orderBy("donatedAt", "desc")
    );

    const unsubscribeDonations = onSnapshot(q, (snapshot) => {
      const fetchedDonations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        donatedAt: doc.data().donatedAt?.toDate ? doc.data().donatedAt.toDate() : new Date(),
      }));
      console.log("Fetched donations from Firebase:", fetchedDonations);
      setDonations(fetchedDonations);
    }, (error) => {
      console.error("Error fetching donations for this fund request:", error);
    });

    return () => unsubscribeDonations();
  }, [blogId]);

  const handleSubmitDonation = async (e) => {
    e.preventDefault();
    if (!currentUser || !currentUser.uid) {
      setSubmitMessage({ type: "error", text: "You must be logged in to donate." });
      return;
    }
    if (!blog) {
      setSubmitMessage({ type: "error", text: "Fund request details not loaded." });
      return;
    }
    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      setSubmitMessage({ type: "error", text: "Please enter a valid donation amount." });
      return;
    }

    const amountToDonate = parseFloat(donationAmount);
    const remainingAmount = (blog.amountRequested || 0) - (blog.amountRaised || 0);

    if (amountToDonate > remainingAmount) {
      setSubmitMessage({
        type: "error",
        text: `Only Rs ${remainingAmount.toLocaleString()} is remaining. Please reduce your amount.`,
      });
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const needyDoc = await getDoc(doc(db, "users", blog.userId));
      const needyName = needyDoc.exists() ? needyDoc.data().fullName : "Unknown User";

      const donationData = {
        donorId: currentUser.uid,
        donorName: currentUser.fullName || "Anonymous Donor",
        needyId: blog.userId,
        needyName: needyName,
        fundRequestId: blog.id,
        amount: amountToDonate,
        message: donationMessage,
        donatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "donations"), donationData);

      // Update amountRaised
      const fundRequestRef = doc(db, "fundRequests", blog.id);
      const docSnap = await getDoc(fundRequestRef);
      if (docSnap.exists()) {
        const currentAmountRaised = docSnap.data().amountRaised || 0;
        const newAmount = currentAmountRaised + amountToDonate;

        await updateDoc(fundRequestRef, {
          amountRaised: newAmount,
        });
      }

      setSubmitMessage({ type: "success", text: "Thank you for your donation!" });
      setDonationAmount("");
      setDonationMessage("");
    } catch (err) {
      console.error("Error submitting donation:", err);
      setSubmitMessage({ type: "error", text: "Failed to submit donation. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]"><p className="text-xl font-semibold animate-pulse">Loading fund request details...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]"><p className="text-xl font-semibold text-red-600">Error: {error}</p></div>;
  if (!blog) return <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]"><p className="text-xl font-semibold">Fund request not found.</p></div>;

  const dateObject = blog.createdAt instanceof Date ? blog.createdAt : (blog.createdAt?.toDate ? blog.createdAt.toDate() : new Date());
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = dateObject.toLocaleString('default', { month: 'short' }).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="relative">
            <img src={blog.blogImg} className="w-full h-64 object-cover" alt={blog.title} />
            <div className="absolute left-4 bottom-4 bg-orange-500 text-white rounded px-3 py-1 flex flex-col items-center shadow-md">
              <span className="text-base font-bold leading-none">{day}</span>
              <span className="text-xs font-semibold leading-none">{month}</span>
            </div>
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">{blog.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <img src={blog.userImg} className="w-12 h-12 rounded-full border object-cover" alt={blog.userName} />
              <div>
                <h3 className="text-lg font-semibold">{blog.userName}</h3>
                <p className="text-gray-500 text-xs">{dateObject.toDateString()}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6 text-base leading-relaxed">{blog.description}</p>
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p className="text-gray-800"><strong>Amount Requested:</strong> Rs {(blog.amountRequested || 0).toLocaleString()}</p>
              <p className="text-gray-800"><strong>Amount Raised:</strong> Rs {(blog.amountRaised || 0).toLocaleString()}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-orange-500 h-2.5 rounded-full"
                style={{
                  width: `${((blog.amountRaised || 0) / (blog.amountRequested || 1)) * 100 || 0}%`,
                }}
              ></div>
            </div>
            <Link href="/donor/give" className="inline-block mt-2 text-orange-500 hover:underline">
              ← Back to All Fund Requests
            </Link>
          </div>
        </div>

        {/* Add a comment section transformed into Donation box */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Make a Donation</h2>
          <p className="text-gray-600 mb-6 text-sm">Your contribution can make a significant difference. Please enter your donation details below.</p>

          <form onSubmit={handleSubmitDonation} className="space-y-6">
            <div>
              <input
                type="number"
                placeholder="Donation Amount (Rs)"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                min="1"
              />
            </div>
            <textarea
              placeholder="Your Message (Optional)"
              rows="6"
              value={donationMessage}
              onChange={(e) => setDonationMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-y"
            ></textarea>
            <div className="flex items-center justify-between">
              {submitMessage && (
                <p className={`text-sm ${submitMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {submitMessage.text}
                </p>
              )}
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full transition hover:bg-orange-600 shadow-md disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "SEND DONATION"}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Display Donations Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Donations ({donations.length})</h2>

          {donations.length === 0 ? (
            <p className="text-gray-600 text-center">No donations yet. Be the first to contribute!</p>
          ) : (
            <div className="space-y-6">
              {donations.map((donation) => (
                <div key={donation.id} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {donation.donorName ? donation.donorName.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{donation.donorName || "Anonymous Donor"}</h3>
                      <p className="text-sm text-gray-500">{new Date(donation.donatedAt).toLocaleDateString()} at {new Date(donation.donatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <p className="text-gray-700 text-base mb-2">Rs {donation.amount.toLocaleString()}</p>
                    {donation.message && (
                      <p className="text-gray-600 text-sm italic">"{donation.message}"</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 