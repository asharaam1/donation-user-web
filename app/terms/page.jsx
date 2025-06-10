"use client"

import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiAlertTriangle, FiLock, FiCreditCard, FiCode, FiShield } from 'react-icons/fi';

const TermsConditions = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <Head>
        <title>Terms and Conditions | Lift Humanity Platform</title>
        <meta name="description" content="Legal terms governing use of our donation platform" />
      </Head>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-12 max-w-6xl"
      >
        {/* Animated Header */}
        <motion.div 
          variants={itemVariants}
          className="bg-white p-8 rounded-xl shadow-lg mb-8 border-l-8 border-blue-500"
        >
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FiShield className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Terms & Conditions</h1>
              <p className="text-gray-600 flex items-center">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mr-2">Updated</span>
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Introduction with animation */}
        <motion.div 
          variants={itemVariants}
          className="bg-white p-8 rounded-xl shadow-md mb-8"
        >
          <motion.p 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-700 mb-6 text-lg leading-relaxed"
          >
            Welcome to <span className="font-semibold text-blue-600">Lift Humanity Platform</span>, a platform dedicated to connecting generous donors with verified charities and meaningful causes. These Terms and Conditions outline the rules and regulations for using our services.
          </motion.p>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start"
          >
            <FiAlertTriangle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <p className="text-gray-700">
              <span className="font-semibold">Important:</span> By accessing or using Lift Humanity Platform, you agree to be bound by these Terms, our Privacy Policy, and Refund Policy. If you disagree, please refrain from using our platform.
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content Sections */}
        <motion.div 
          variants={containerVariants}
          className="space-y-8"
        >
          {/* 1. Definitions */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <FiCode className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">1. Definitions</h2>
            </div>
            
            <ul className="space-y-4">
              <motion.li 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-start text-gray-700"
              >
                <FiArrowRight className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                <strong>Platform</strong> - Our website, mobile applications, APIs, and related services under Lift Humanity Platform
              </motion.li>
              <motion.li 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-start text-gray-700"
              >
                <FiArrowRight className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                <strong>Donor</strong> - Any individual or entity making donations through our platform
              </motion.li>
              <motion.li 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-start text-gray-700"
              >
                <FiArrowRight className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                <strong>Recipient</strong> - Registered non-profits, charities, and verified causes
              </motion.li>
              <motion.li 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-start text-gray-700"
              >
                <FiArrowRight className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                <strong>Service Fee</strong> - 2.9% + PKR 50 per transaction for payment processing
              </motion.li>
              <motion.li 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-start text-gray-700"
              >
                <FiArrowRight className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                <strong>Content</strong> - All text, images, videos, data, and materials on our platform
              </motion.li>
            </ul>
          </motion.div>

          {/* 2. Account Registration */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <FiLock className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">2. Account Registration</h2>
            </div>
            
            <div className="space-y-4">
              <motion.p 
                variants={fadeIn}
                className="text-gray-700"
              >
                To access certain features of Lift Humanity Platform, you may need to register an account. By creating an account, you agree to:
              </motion.p>
              
              <ul className="space-y-3 pl-2">
                {[
                  "Provide accurate, current, and complete information",
                  "Maintain and promptly update your account details",
                  "Keep your password secure and confidential",
                  "Be responsible for all activities under your account",
                  "Be at least 18 years old or use under parental supervision"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index + 0.3 }}
                    className="flex items-start text-gray-700"
                  >
                    <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                variants={fadeIn}
                className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mt-4"
              >
                <p className="text-gray-700">
                  <span className="font-semibold">Note:</span> Lift Humanity Platform reserves the right to suspend or terminate accounts that violate these terms or engage in fraudulent activities.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* 3. Donation Services */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
                <FiCreditCard className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">3. Donation Services</h2>
            </div>
            
            <div className="space-y-6">
              <motion.p 
                variants={fadeIn}
                className="text-gray-700"
              >
                Lift Humanity Platform provides a trusted space to facilitate charitable giving with these key conditions:
              </motion.p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-blue-50 p-5 rounded-lg border border-blue-200"
                >
                  <h3 className="font-semibold text-blue-700 mb-2 flex items-center">
                    <FiCheck className="mr-2" /> Donation Processing
                  </h3>
                  <p className="text-gray-700 text-sm">
                    All donations are processed within 1-3 business days. A receipt will be issued by the recipient organization.
                  </p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-purple-50 p-5 rounded-lg border border-purple-200"
                >
                  <h3 className="font-semibold text-purple-700 mb-2 flex items-center">
                    <FiCheck className="mr-2" /> Service Fees
                  </h3>
                  <p className="text-gray-700 text-sm">
                    We deduct a small service fee (2.9% + PKR 50 per transaction) to maintain our platform. 100% of your donation (minus fees) goes to the recipient.
                  </p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-green-50 p-5 rounded-lg border border-green-200"
                >
                  <h3 className="font-semibold text-green-700 mb-2 flex items-center">
                    <FiCheck className="mr-2" /> Tax Deductions
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Tax receipts are issued by recipient organizations according to their policies and local laws. Please consult a tax professional.
                  </p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-yellow-50 p-5 rounded-lg border border-yellow-200"
                >
                  <h3 className="font-semibold text-yellow-700 mb-2 flex items-center">
                    <FiCheck className="mr-2" /> Refund Policy
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Donations are generally non-refundable. In exceptional cases, contact us within 7 days of donation.
                  </p>
                </motion.div>
              </div>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-700 text-sm italic"
              >
                Lift Humanity Platform acts as an intermediary and is not responsible for how recipients ultimately use donated funds.
              </motion.p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-8 rounded-xl shadow-md mt-8 border-t-4 border-blue-500"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Lift Humanity Platform</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Email
                </h3>
                <p className="text-gray-700">legal@lifthumanityplatform.com</p>
                <p className="text-gray-700">support@lifthumanityplatform.com</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Registered Office
                </h3>
                <p className="text-gray-700">Saylani Welfare International Trust</p>
                <p className="text-gray-700">A-25, Bahadurabad Chowrangi Karachi</p>
                <p className="text-gray-700">Pakistan</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsConditions;