import React from 'react'

export default function page() {
  return (
    <footer className="bg-black text-gray-300 pt-12 pb-6 px-6 md:px-16">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

        {/* Column 1 - Logo & Description */}
        <div>
          <div className="flex items-center mb-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
              alt="Lift Humanity Logo"
              className="w-10 bg-amber-500 h-10 mr-2"
            />
            <span className="text-white text-xl font-bold">Lift Humanity</span>
          </div>
          <p className="text-sm leading-relaxed">
            Lift Humanity Pakistan is committed to empowering communities across the nation by providing vital support in education, healthcare, disaster relief, and poverty alleviation. Together, we uplift lives and build a brighter future.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-3 mt-4">
            <button className="p-2 border border-gray-600 rounded text-white hover:bg-gray-700" aria-label="Facebook">
              F
            </button>
            <button className="p-2 border border-gray-600 rounded text-white hover:bg-gray-700" aria-label="Twitter">
              X
            </button>
            <button className="p-2 border border-gray-600 rounded text-white hover:bg-gray-700" aria-label="Instagram">
              IG
            </button>
            <button className="p-2 border border-gray-600 rounded text-white hover:bg-gray-700" aria-label="YouTube">
              YT
            </button>
          </div>
        </div>

        {/* Column 2 - Our Services */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Emergency Disaster Response</li>
            <li>Clean Water & Sanitation</li>
            <li>Education for Underprivileged Children</li>
            <li>Healthcare & Medical Camps</li>
            <li>Women Empowerment Programs</li>
          </ul>
        </div>

        {/* Column 3 - Quick Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Get Involved</a></li>
            <li><a href="#" className="hover:text-white">Donate</a></li>
            <li><a href="#" className="hover:text-white">Events</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Column 4 - Contact Info */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center space-x-2">
              <span>📞</span>
              <a href="tel:+923001234567" className="hover:text-white">+92 306 3039620</a>
            </li>
            <li className="flex items-center space-x-2">
              <span>📧</span>
              <a href="mailto:info@lifthumanity.pk" className="hover:text-white">info@lifthumanity.pk</a>
            </li>
            <li className="flex items-start space-x-2">
              <span>📍</span>
              <address>
                House #12, Street 5 <br />
                Tariq Road, Karachi, Pakistan
              </address>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-sm">

        <p>
          &copy; 2024 <span className="font-bold text-white">Lift Humanity</span>. All Rights Reserved.
        </p>

        <div className="flex space-x-6 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Settings</a>
        </div>

      </div>

    </footer>
  )
}
