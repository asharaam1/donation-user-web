import React from 'react'

export default function page() {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-16 lg:px-24">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold uppercase tracking-wide mb-2">Testimonial</p>
          <h2 className="text-5xl font-serif leading-tight">
            Hope What They <br /> <span className="text-orange-500">Say</span> About Us
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between hover:shadow-2xl transition">
            {/* Stars */}
            <div className="text-yellow-400 text-xl mb-4">⭐⭐⭐⭐⭐</div>

            {/* Quote */}
            <div className="bg-orange-50 p-6 rounded-lg mb-6 text-gray-700 leading-relaxed">
              LiftHumanity truly changed lives. They listened closely and delivered support that empowered our community to thrive.
            </div>

            {/* Person */}
            <div className="flex items-center space-x-4 mt-auto">
              <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Darlene Robertson" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="text-xl font-bold">Darlene Robertson</p>
                <p className="text-gray-600 text-sm">Community Volunteer</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between hover:shadow-2xl transition">
            {/* Stars */}
            <div className="text-yellow-400 text-xl mb-4">⭐⭐⭐⭐⭐</div>

            {/* Quote */}
            <div className="bg-orange-50 p-6 rounded-lg mb-6 text-gray-700 leading-relaxed">
              Their dedication and care have brought hope where it was needed most. Proud to be part of their mission.
            </div>

            {/* Person */}
            <div className="flex items-center space-x-4 mt-auto">
              <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Floyd Miles" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="text-xl font-bold">Floyd Miles</p>
                <p className="text-gray-600 text-sm">Medical Assistant</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between hover:shadow-2xl transition">
            {/* Stars */}
            <div className="text-yellow-400 text-xl mb-4">⭐⭐⭐⭐⭐</div>

            {/* Quote */}
            <div className="bg-orange-50 p-6 rounded-lg mb-6 text-gray-700 leading-relaxed">
              The team’s compassion and effort are unmatched. They made a real difference in children's education and well-being.
            </div>

            {/* Person */}
            <div className="flex items-center space-x-4 mt-auto">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Leslie Alexander" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="text-xl font-bold">Leslie Alexander</p>
                <p className="text-gray-600 text-sm">Teacher</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
