export default function page() {
  return (
    <section className="bg-gray-800 h-150 text-white py-30 px-6">
      {/* Heading */}
      <div className="text-center">
        <p className="uppercase text-sm tracking-widest text-gray-400 mb-2">LiftHumanity Trust</p>
        <h2 className="text-5xl font-bold leading-tight">
          Together We Can <br />
          <span className="text-orange-500">Empower</span> Lives
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative top-15 gap-8">
        {/* Card 1 */}
        <div className="bg-white text-gray-900 rounded-3xl shadow-lg overflow-hidden flex flex-col items-center text-center p-6">
          <img
            src="https://anity.vercel.app/assets/images/resources/found-1-1.jpg"
            alt="Education Support"
            className="w-full h-72 object-cover rounded-xl mb-6"
          />
          <h3 className="text-xl font-bold mb-4">Education Support</h3>
          <p className="text-gray-600 mb-4">
            Providing access to quality education and learning resources for underprivileged children.
          </p>

          <div className="flex justify-between w-full text-sm mb-2 px-2">
            <span className="font-medium">Raised<br/>45,000$</span>
            <span className="font-medium">Goal<br/>120,000$</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: "37%" }}
            ></div>
          </div>

          <button className="flex items-center justify-center px-6 py-2 border border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition">
            DONATE NOW
            <span className="ml-2 text-lg">➜</span>
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white text-gray-900 rounded-3xl shadow-lg overflow-hidden flex flex-col items-center text-center p-6">
          <img
            src="https://anity.vercel.app/assets/images/resources/found-1-2.jpg"
            alt="Healthcare Initiatives"
            className="w-full h-72 object-cover rounded-xl mb-6"
          />
          <h3 className="text-xl font-bold mb-4">Healthcare Initiatives</h3>
          <p className="text-gray-600 mb-4">
            Ensuring access to medical care, vaccinations, and health awareness programs.
          </p>

          <div className="flex justify-between w-full text-sm mb-2 px-2">
            <span className="font-medium">Raised<br/>60,000$</span>
            <span className="font-medium">Goal<br/>150,000$</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: "40%" }}
            ></div>
          </div>

          <button className="flex items-center justify-center px-6 py-2 border border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition">
            DONATE NOW
            <span className="ml-2 text-lg">➜</span>
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-white text-gray-900 rounded-3xl shadow-lg overflow-hidden flex flex-col items-center text-center p-6">
          <img
            src="https://anity.vercel.app/assets/images/resources/found-1-3.jpg"
            alt="Community Development"
            className="w-full h-72 object-cover rounded-xl mb-6"
          />
          <h3 className="text-xl font-bold mb-4">Community Development</h3>
          <p className="text-gray-600 mb-4">
            Supporting sustainable projects that uplift communities and create long-term impact.
          </p>

          <div className="flex justify-between w-full text-sm mb-2 px-2">
            <span className="font-medium">Raised<br/>30,000$</span>
            <span className="font-medium">Goal<br/>80,000$</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: "37%" }}
            ></div>
          </div>

          <button className="flex items-center justify-center px-6 py-2 border border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition">
            DONATE NOW
            <span className="ml-2 text-lg">➜</span>
          </button>
        </div>
      </div>
    </section>
  )
}
