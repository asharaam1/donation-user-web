import React from 'react'

export default function page() {
  return (
    <div className="w-full bg-[#f5f3f0] py-16">
      <div className="max-w-5xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Top Distributors <span className="text-orange-500">Around</span> World
        </h2>

        {/* Distributors List */}
        <div className="flex flex-wrap justify-center gap-6">

          {/* Distributor Item */}
          {[
            { name: "South Africa", flag: "https://flagcdn.com/w80/za.png", alt: "South Africa" },
            { name: "Germany", flag: "https://flagcdn.com/w80/de.png", alt: "Germany" },
            { name: "South Korea", flag: "https://flagcdn.com/w80/kr.png", alt: "South Korea" },
            { name: "Japan", flag: "https://flagcdn.com/w80/jp.png", alt: "Japan" },
            { name: "Turkey", flag: "https://flagcdn.com/w80/tr.png", alt: "Turkey" },
            { name: "Indonesia", flag: "https://flagcdn.com/w80/id.png", alt: "Indonesia" }
          ].map(({ name, flag, alt }) => (
            <div
              key={name}
              className="flex items-center bg-white px-6 py-3 rounded-full shadow-md hover:shadow-xl transition cursor-pointer space-x-4"
            >
              <img
                src={flag}
                alt={alt}
                className="w-15 h-15 rounded-full object-cover border"
              />
              <span className="text-lg font-medium">{name}</span>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
