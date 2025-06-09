

'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Animation configurations moved to separate object for better organization
const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true, margin: "0px 0px -50px 0px" }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    },
    viewport: { once: true }
  },
  itemFade: {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      } 
    }
  }
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form', {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        icon: "🚀"
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <motion.section {...animations.fadeUp}>
        <img 
          src="/contact.GIF" 
          alt="Contact us illustration" 
          className="w-full max-h-[500px] object-cover"
          loading="lazy"
        />
      </motion.section>

      {/* Main Content */}
      <motion.section
        className="bg-[#fffaf5] text-gray-900 py-16 px-4 md:px-12 lg:px-24 space-y-24"
        initial="hidden"
        whileInView="show"
        variants={animations.staggerContainer}
      >
        {/* Contact Form Section */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-4xl mx-auto"
          variants={animations.itemFade}
        >
          <motion.p
            className="text-orange-600 font-semibold uppercase tracking-wide mb-2 text-sm"
            variants={animations.itemFade}
          >
            Get In Touch
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl font-bold leading-snug mb-8"
            variants={animations.itemFade}
          >
            Empowering Communities <br className="hidden md:block" /> Through Donations
          </motion.h2>

          <motion.form
            className="space-y-6"
            onSubmit={handleSubmit}
            variants={animations.staggerContainer}
            initial="hidden"
            whileInView="show"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={animations.itemFade}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </motion.div>

              <motion.div variants={animations.itemFade}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </motion.div>
            </div>

            <motion.div variants={animations.itemFade}>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (123) 456-7890"
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </motion.div>

            <motion.div variants={animations.itemFade}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className={`border ${errors.message ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                required
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              ></textarea>
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600">
                  {errors.message}
                </p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-full transition duration-300 flex items-center gap-2 justify-center w-full md:w-auto disabled:opacity-70"
              variants={animations.itemFade}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <span className="text-xl">→</span>
                </>
              )}
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Contact Info & Map Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-4xl mx-auto"
          variants={animations.staggerContainer}
        >
          {/* Map Section */}
          <motion.div
            className="col-span-2 h-72 md:h-96 w-full rounded-xl overflow-hidden shadow-lg"
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
              title="Our Location on Google Maps"
              aria-label="Interactive map showing our location"
            ></iframe>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="show"
            variants={animations.staggerContainer}
          >
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">Our Office</h3>
              <motion.div
                className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                variants={animations.itemFade}
              >
                <span className="text-orange-500 text-xl mt-1">📍</span>
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-sm text-gray-600">2972 Westheimer Rd, Santa Ana, CA 92705</p>
                </div>
              </motion.div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">Contact Details</h3>
              <motion.div
                className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                variants={animations.itemFade}
              >
                <span className="text-orange-500 text-xl mt-1">✉️</span>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-sm text-gray-600">contact@newashsons.org</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow mt-4"
                variants={animations.itemFade}
              >
                <span className="text-orange-500 text-xl mt-1">📞</span>
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm text-gray-600">(704) 555-0127</p>
                  <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am-5pm EST</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default Contact