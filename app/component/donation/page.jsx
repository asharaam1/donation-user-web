import React from 'react'

export default function Donation() {
  const amounts = [
    { label: "Rs. 1,000", value: 1000 },
    { label: "Rs. 2,000", value: 2000 },
    { label: "Rs. 3,000", value: 3000 },
    { label: "Rs. 4,000", value: 4000 },
    { label: "Rs. 5,000", value: 5000 },
    { label: "Rs. 10,000", value: 10000 },
    { label: "Rs. 50,000", value: 50000 },
  ];

  return (
      <main className="max-h-screen py-10 flex items-center justify-center">
        <div className="flex flex-col md:flex-row shadow-xl rounded-lg overflow-hidden max-w-7xl w-full">
          <div className="flex-1 p-10 flex flex-col justify-center">
            <p className="text-sm text-orange-500 uppercase mb-2">Welcome to LiftHumanity</p>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Every Rupee Makes <br /> a Difference.
            </h1>
            <p className="text-gray-600 mb-6">
              In a world where many face challenges, your generosity can bring hope.
              At LiftHumanity, we’re dedicated to helping those in need, but we can’t do it alone.
              We need the support of kind-hearted individuals like you to continue our work.
            </p>
            <div className="flex space-x-10 mb-8">
              <div className="flex flex-col items-center">
                <div className="text-orange-500 text-4xl mb-2">1200</div>
                <div className="text-lg font-semibold">Volunteers</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-orange-500 text-4xl mb-2">2200</div>
                <div className="text-lg font-semibold">Trusted Funds</div>
              </div>
            </div>
            <button className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-orange-500 hover:text-white transition">
              <span>Become a Volunteer</span>
              <span className="text-xl">→</span>
            </button>
          </div>

          <div className="flex-1 bg-white p-6">
            <h2 className="text-3xl font-serif mb-6">Easy Donation</h2>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Name...."
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <input
                type="email"
                placeholder="Email...."
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <select className="w-full border border-gray-300 p-3 rounded-md">
                <option>Select Causes</option>
                <option>Cause 1</option>
                <option>Cause 2</option>
              </select>

              {/* Amount */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Amount</label>
                <div className="flex flex-wrap gap-4">
                  {amounts.map(({ label, value }) => (
                    <label key={value} className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="amount" value={value} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Custom Amount...."
                  className="w-full mt-4 border border-gray-300 p-3 rounded-md"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                <div className="flex flex-wrap gap-6">
                  {["Test Donation", "Offline Donation", "Credit Card"].map((method) => (
                    <label key={method} className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="paymentMethod" value={method} />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Donate Button */}
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition w-full"
              >
                <span>Donate Now</span>
                <span className="text-xl">→</span>
              </button>
            </form>
          </div>
        </div>
      </main>
  )
}
