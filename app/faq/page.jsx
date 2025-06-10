


'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const faqData = [
    { question: "What is this platform about?", answer: "This is a secure donation platform helping individuals and communities through online fundraising." },
    { question: "How can I make a donation?", answer: "Simply click the 'Donate Now' button on any campaign and follow the payment steps." },
    { question: "Is my donation secure?", answer: "Yes, we use secure payment gateways and SSL encryption to protect all transactions.", category: "Security" },
    { question: "Do I need to create an account to donate?", answer: "No, but creating an account helps you track your donations and get receipts.", category: "Accounts" },
    { question: "Can I donate anonymously?", answer: "Yes, you can choose to donate anonymously by selecting that option during checkout.", category: "Privacy" },
    { question: "Is there a minimum or maximum donation amount?", answer: "There is usually no minimum, but the platform may set some limits for security purposes.", category: "Donations" },
    { question: "Will I receive a receipt for my donation?", answer: "Yes, you'll get an email confirmation with your donation details and receipt.", category: "Donations" },
    { question: "Can I support a campaign from outside my country?", answer: "Yes, international donations are accepted depending on payment options available.", category: "Donations" },
    { question: "How do I know if a campaign is genuine?", answer: "We verify campaigns before approval, and you can view updates and organizer details.", category: "Trust & Safety" },
    { question: "Can I start my own fundraising campaign?", answer: "Yes, you can sign up and create your own donation campaign for personal or charitable causes.", category: "Campaigns" },
    { question: "How are the funds used?", answer: "All funds go directly to the campaign organizer unless stated otherwise.", category: "Donations" },
    { question: "What fees does the platform charge?", answer: "We charge a small service fee to maintain the platform, shown clearly before donating.", category: "Fees" },
    { question: "Can I cancel or refund my donation?", answer: "Donations are usually non-refundable, but special cases can be reviewed upon request.", category: "Donations" },
    { question: "How can I contact support?", answer: "You can reach us via the Contact page or email us at support@example.com.", category: "Support" },
    { question: "Are donations tax deductible?", answer: "This depends on your country’s tax laws and the campaign's nature—please consult your tax advisor.", category: "Legal" },
    { question: "How does this platform ensure transparency and accountability?", answer: "We provide real-time campaign updates, verified organizer profiles, and clear breakdowns of how funds are used.", category: "Transparency" },
    { question: "Can organizations or NGOs use this platform for fundraising?", answer: "Yes, verified non-profits and NGOs can create official campaigns with enhanced tools and support.", category: "NGOs" },
    { question: "Is there any compliance with legal or tax regulations?", answer: "We follow all local and international donation laws, and campaigns are regularly reviewed for legal compliance.", category: "Legal" },
    { question: "Does the platform offer analytics or dashboards for campaign organizers?", answer: "Yes, registered users get access to a dashboard showing donations, traffic, and campaign performance.", category: "Campaigns" },
    { question: "What measures are in place to prevent fraud or misuse of donations?", answer: "We have a strict vetting system, fraud detection tools, and a reporting mechanism for suspicious campaigns.", category: "Trust & Safety" }
  ];

  const categories = ['All', ...new Set(faqData.filter(i => i.category).map(item => item.category))];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = selectedCategory === 'All'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <>
      <motion.img 
        src="/faq.GIF" 
        alt="About Us"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full"
      />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              🧾 Donation Platform – FAQs
            </h2>
            <p className="mt-3 text-xl text-gray-500">
              Find answers to common questions about using our donation platform.
            </p>
          </motion.div>

          {/* Category Filters (Optional) */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border ${selectedCategory === cat ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 cursor-pointergit br'} hover:bg-orange-100 transition`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <button
                  className="w-full px-6 py-5 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.question}
                    </h3>
                    <motion.span
                      animate={{ rotate: activeIndex === index ? 45 : 0 }}
                      className="text-2xl text-gray-400"
                    >
                      +
                    </motion.span>
                  </div>
                </button>

                <motion.div
                  id={`faq-content-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeIndex === index ? 'auto' : 0,
                    opacity: activeIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="px-6 overflow-hidden"
                >
                  <div className="pb-5">
                    <p className="text-gray-600">{item.answer}</p>
                   
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-orange-50 rounded-lg p-6 text-center"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
              Our team is happy to help with any other questions you might have.
            </p>
            <button
              onClick={() => toast.info("Contact form will open")}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
            >
              Contact Our Support Team
            </button>
          </motion.div>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
};

export default FAQ;
