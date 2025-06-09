




'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

const itemFade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
      return;
    }

    // Simulate message send (API call)
    toast.success("✅ Message sent successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <>
      <motion.section {...fadeUp} viewport={{ once: true }}>
        <img src="/contact.GIF" alt="contact" className="w-full" />
      </motion.section><br />

      <motion.section
        className="bg-[#fffaf5] text-gray-900 py-16 px-4 md:px-12 lg:px-24 space-y-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >

        {/* Contact Form */}
        <motion.div className="bg-white rounded-xl shadow-md p-6 md:p-10" variants={itemFade}>
          <motion.p className="text-orange-600 font-semibold uppercase tracking-wide mb-2" variants={itemFade}>
            Contact Us
          </motion.p>
          <motion.h2 className="text-3xl md:text-4xl font-bold leading-snug mb-8" variants={itemFade}>
            Empowering Communities <br /> through Donations
          </motion.h2>

          <motion.form
            className="space-y-4"
            onSubmit={handleSubmit}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.input
                type="text"
                name="name"
                placeholder="Name"
                className="border border-gray-300 p-3 rounded-md w-full"
                value={formData.name}
                onChange={handleChange}
                variants={itemFade}
                required
              />
              <motion.input
                type="email"
                name="email"
                placeholder="Email Address"
                className="border border-gray-300 p-3 rounded-md w-full"
                value={formData.email}
                onChange={handleChange}
                variants={itemFade}
                required
              />
            </div>

            <motion.input
              type="tel"
              name="phone"
              placeholder="Your phone..."
              className="border border-gray-300 p-3 rounded-md w-full"
              value={formData.phone}
              onChange={handleChange}
              variants={itemFade}
            />

            <motion.textarea
              name="message"
              rows="4"
              placeholder="Write message..."
              className="border border-gray-300 p-3 rounded-md w-full"
              value={formData.message}
              onChange={handleChange}
              variants={itemFade}
              required
            ></motion.textarea>

            <motion.button
              type="submit"
              className="mt-4 bg-white text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white py-2 px-6 rounded-full transition duration-300 flex items-center gap-2"
              variants={itemFade}
            >
              Send Message <span className="text-xl">→</span>
            </motion.button>
          </motion.form>

          <ToastContainer newestOnTop />
        </motion.div>

        {/* Contact Info & Map */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" variants={staggerContainer}>
          {/* Map */}
          <motion.div
            className="col-span-2 h-72 md:h-96 w-full"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.898987663955!2d-118.61284768478418!3d34.16871878056427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c29669da7e5e55%3A0x2f1aa00e9e678a40!2sCostco%20Wholesale!5e0!3m2!1sen!2sus!4v1627654866711!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>

          {/* Info */}
          <motion.div className="space-y-6" initial="hidden" whileInView="show" variants={staggerContainer} viewport={{ once: true }}>
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-2">Address</h3>
              <motion.div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md" variants={itemFade}>
                <span className="text-orange-500 text-xl">📍</span>
                <p className="text-sm">2972 Westheimer Rd. Santa</p>
              </motion.div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-2">Email Address</h3>
              <motion.div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md" variants={itemFade}>
                <span className="text-orange-500 text-xl">✉️</span>
                <p className="text-sm">newash.sons@example.com</p>
              </motion.div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-2">Phone</h3>
              <motion.div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md" variants={itemFade}>
                <span className="text-orange-500 text-xl">📞</span>
                <p className="text-sm">(704) 555-0127</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Contact;
