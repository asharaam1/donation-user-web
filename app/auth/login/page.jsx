"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../utils/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function Login() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const role = userData.role;

        if (role === 'donor') {
          router.push('/donor-dashboard');
        } else if (role === 'needy') {
          const kycQuery = query(
            collection(db, "kycRequests"),
            where("userId", "==", user.uid)
          );
          const kycSnapshot = await getDocs(kycQuery);

          if (!kycSnapshot.empty) {
            const lastKYC = kycSnapshot.docs[kycSnapshot.docs.length - 1].data();
            if (lastKYC.status === "approved") {
              router.push('/needy/home');
            } else {
              router.push('/needy/kyc');
            }
          } else {
            router.push('/needy/kyc');
          }
        }
      } else {
        setError('User data not found!');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#2a2a2a]">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Login</h2>
          <p className="mt-1 text-gray-400">Welcome back to <span className="text-[#ff5528] font-semibold">Life Humanity</span></p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 text-white rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#ff5528] focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 text-white rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#ff5528] focus:outline-none"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#ff5528] to-[#ff784e] text-black font-semibold py-3 rounded-full hover:opacity-90 transition-all"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-[#ff5528] hover:underline font-medium">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
