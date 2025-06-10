


// "use client";
// import dynamic from 'next/dynamic';
// import React from 'react'
// import { motion } from "framer-motion";

// const MotionDiv = dynamic(() =>
//   import("framer-motion").then(mod => mod.motion.div),
//   { ssr: false }
// );

// const about = () => {
//   const arr = [
//     {
//       title1: "Donation Drive",
//       description1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       goal1: "6391 Elgin St. Celina, 10299",
//       image1: "/found-6.jpg"
//     },
//     {
//       title1: "Win-Win Survival",
//       description1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       goal1: "6391 Elgin St. Celina, 10299",
//       image1: "/found-7.jpg"
//     },
//     {
//       title1: "Children Education",
//       description1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       goal1: "6391 Elgin St. Celina, 10299",
//       image1: "/found-8.jpg"
//     }
//   ];

//   // Animation variants
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1 }
//   };

//   return (
//     <>
//       <div className='h-full'>
//         {/* Hero Image with Fade-in */}
//         <motion.img 
//           src="/about image.GIF" 
//           alt="About Us"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="w-full"
//         />

//         {/* About Section */}
//         <motion.section 
//           className="py-12 px-4 md:px-20 bg-white m-7"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="flex flex-col md:flex-row items-center gap-10">
//             {/* Left Side - Images */}
//             <div className="relative w-full md:w-1/2 flex justify-center">
//               <motion.img
//                 src="/about-1.jpg"
//                 alt="About 1"
//                 className="w-64 rounded-xl shadow-lg mt-20"
//                 whileHover={{ scale: 1.05 }}
//               />
//               <motion.img 
//                 src="/about-2.jpg" 
//                 alt="About 2" 
//                 className="w-64 h-64 object-cover rounded-xl shadow-xl absolute -top-10 -left-10"
//                 whileHover={{ scale: 1.05 }}
//               />
//               <motion.div 
//                 className="absolute -bottom-10 left-0 bg-yellow-400 text-black p-4 px-6 rounded-xl shadow-md flex items-center gap-3"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <div className="text-3xl">💛</div>
//                 <div>
//                   <h3 className="text-xl font-bold">250+</h3>
//                   <p className="text-sm">Services we provide</p>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Right Side - Content */}
//             <motion.div 
//               className="w-full md:w-1/2 text-center md:text-left"
//               variants={item}
//             >
//               <h4 className="text-orange-600 font-semibold mb-2">ABOUT US</h4>
//               <h2 className="text-4xl font-bold mb-4 leading-snug">
//                 Unite for a Cause<br />Change the World
//               </h2>
//               <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
//                 {["Our Mission", "Our Vision", "Our Goal"].map((text, i) => (
//                   <motion.button
//                     key={i}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className={`px-4 py-2 rounded-full cursor-pointer ${
//                       i === 1 
//                         ? "bg-green-500 text-white hover:bg-white hover:text-black hover:border"
//                         : "border border-gray-400 hover:bg-green-500"
//                     }`}
//                   >
//                     {text}
//                   </motion.button>
//                 ))}
//               </div>
//               <p className="text-gray-600 mb-4">
//                 Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
//               </p>
//               <p className="text-gray-600 mb-6">
//                 Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit.
//               </p>
//               <motion.button 
//                 whileHover={{ scale: 1.05, backgroundColor: "#ef4444", color: "white" }}
//                 whileTap={{ scale: 0.95 }}
//                 className="border border-red-500 text-red-500 px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-500 hover:text-white transition"
//               >
//                 Donate Now →
//               </motion.button>
//             </motion.div>
//           </div>
//         </motion.section>

//         {/* Charity Fund Section */}
//         <motion.section 
//           className="bg-[#343434] text-white py-12 px-4 md:px-12 lg:px-24"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="text-center mb-12">
//             <motion.h2 
//               className='mb-1 mt-5'
//               variants={item}
//             >
//               CHARITY FUND 
//             </motion.h2>
//             <motion.h2 
//               className="text-3xl md:text-4xl font-bold"
//               variants={item}
//             >
//               Together We Can <br /> <span className="text-orange-500">Make</span> a <span className="text-white">Difference</span>
//             </motion.h2>
//           </div>  

//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
//             variants={container}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//           >
//             {[
//               {
//                 title: "Help For Ecosystem",
//                 raised: "$8,025",
//                 goal: "$10,000",
//                 image: "/found-3.jpg"
//               },
//               {
//                 title: "Water For All",
//                 raised: "$6,025",
//                 goal: "$10,000",
//                 image: "/found-2.jpg"
//               },
//               {
//                 title: "Vaccine Aid Camp",
//                 raised: "$4,025",
//                 goal: "$10,000",
//                 image: "/found-01.jpg"
//               },
//             ].map((item, index) => (
//               <motion.div 
//                 key={index} 
//                 className="bg-white text-black rounded-2xl overflow-hidden shadow-lg"
//                 variants={item}
//                 whileHover={{ y: -10 }}
//               >
//                 <div className="h-48 w-full relative">
//                   <div className='m-2'>
//                     <motion.img 
//                       src={item.image} 
//                       className='object-cover rounded-2xl w-full h-full'
//                       whileHover={{ scale: 1.05 }}
//                     />
//                   </div>
//                 </div>
//                 <div className='flex items-center justify-center mt-8 font-bold'>
//                   <h2>{item.title}</h2>
//                 </div>
//                 <div className="p-4">
//                   <p className="text-sm text-gray-600 mb-2">
//                     Charity and Donation is a category that involves giving financial...
//                   </p>
//                   <div className="flex justify-between text-sm text-gray-700 mb-4">
//                     <span>Raised: {item.raised}</span>
//                     <span>Goal: {item.goal}</span>
//                   </div>
//                   <motion.button 
//                     className="w-full bg-orange-500 text-white py-2 rounded-full transition duration-300 hover:bg-gray-500 cursor-pointer"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Donate Now →
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.section>

//         {/* CTA Cards */}
//         <motion.div 
//           className="grid grid-cols-1 md:grid-cols-2 gap-6 m-20"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           {[
//             {
//               bg: "bg-orange-600",
//               title: "Help Them With Donation",
//               text: "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
//             },
//             {
//               bg: "bg-green-600",
//               title: "Join With Us To Serve As Volunteer",
//               text: "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
//             }
//           ].map((card, i) => (
//             <motion.div 
//               key={i}
//               className={`${card.bg} text-white p-8 rounded-2xl`}
//               whileHover={{ scale: 1.02 }}
//             >
//               <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
//               <p className="mb-4 text-sm">
//                 {card.text}
//               </p>
//               <motion.button 
//                 className="bg-transparent text-white border border-white py-2 px-4 rounded-full cursor-pointer hover:bg-white hover:text-black transition"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Donate Now →
//               </motion.button>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Who We Are Section */}
//         <motion.section 
//           className="bg-gray-200 text-gray-900 py-16 px-4 md:px-12 lg:px-24"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               whileInView={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <p className="text-orange-600 font-semibold uppercase tracking-wide mb-2">Who We Are</p>
//               <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
//                 Supporting Dreams <br /> Changing Lives
//               </h2>
//               <p className="text-gray-600 mb-6 text-sm md:text-base">
//                 Lorem ipsum is simply dummy of the printing and typesetting industry.
//               </p>

//               <div className="mb-4">
//                 <p className="text-sm md:text-base font-medium">
//                   Total Fund Worth: <span className="text-green-600 font-bold">450,896,070$</span>
//                 </p>
//                 <div className='h-1 bg-pink-200 rounded mt-1'>
//                   <motion.div 
//                     className='h-1 bg-red-500 rounded-full'
//                     initial={{ width: 0 }}
//                     whileInView={{ width: "85%" }}
//                     transition={{ duration: 1, delay: 0.5 }}
//                   />
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <p className="text-sm md:text-base font-medium">
//                   Total Cases Helped: <span className="text-green-600 font-bold">300+</span>
//                 </p>
//                 <div className="h-1 bg-red-200 rounded-full mt-1">
//                   <motion.div 
//                     className="h-1 bg-red-500 rounded-full"
//                     initial={{ width: 0 }}
//                     whileInView={{ width: "90%" }}
//                     transition={{ duration: 1, delay: 0.7 }}
//                   />
//                 </div>
//               </div>

//               <motion.button 
//                 className="bg-white text-gray-500 cursor-pointer hover:bg-gray-500 border border-orange-500 hover:text-white py-2 px-6 rounded-full transition duration-300 flex items-center gap-2"
//                 whileHover={{ scale: 1.05, backgroundColor: "#ef4444", color: "white", borderColor: "#ef4444" }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Donate Now →
//               </motion.button>
//             </motion.div>

//             <motion.div 
//               className="relative w-full h-[400px] md:h-[500px]"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               <motion.div 
//                 className="absolute top-0 left-0 w-[70%] h-[70%] rounded-xl overflow-hidden"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <img src="/found-4.jpg" alt="Support Image" className='object-cover w-full h-full' />
//               </motion.div>
//               <motion.div 
//                 className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-xl overflow-hidden border-4 border-white shadow-xl"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <img src="/found-5.jpg" alt="Support Image 2" className='object-cover w-full h-full'/>
//               </motion.div>
//             </motion.div>
//           </div>
//         </motion.section>

//         {/* Events Section */}
//         <motion.section 
//           className='bg-white text-gray-900 py-16 px-4'
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className='text-center mb-12'>
//             <motion.p 
//               className='text-orange-500'
//               initial={{ y: 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               OUR EVENTS
//             </motion.p>
//             <motion.h2 
//               className="text-3xl md:text-4xl font-bold"
//               initial={{ y: 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               Join Us in the Fight <br /> Against Poverty
//             </motion.h2>
//           </div>

//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10"
//             variants={container}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//           >
//             {arr.map((response, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white text-black rounded-2xl overflow-hidden shadow-lg"
//                 variants={item}
//                 whileHover={{ y: -10 }}
//               >
//                 <div className='m-5 rounded-2xl'>
//                   <div className="h-48 w-full overflow-hidden">
//                     <motion.img
//                       src={response.image1}
//                       alt={response.title1}
//                       className="w-full h-full object-cover rounded-2xl"
//                       whileHover={{ scale: 1.1 }}
//                     />
//                   </div>
//                 </div>

//                 <div className="p-4">
//                   <h2 className='text-gray-800 text-2xl'>{response.title1}</h2>
//                   <p className="text-gray-400 font-semibold mb-2 mt-3">{response.description1}</p>
//                   <p className="text-sm text-gray-600 mb-4">
//                     {response.goal1}
//                   </p>
//                   <motion.button 
//                     className="w-full bg-orange-500 text-white py-2 rounded-full transition duration-300 hover:bg-gray-500 cursor-pointer"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Donate Now →
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.section>
//       </div>
//     </>
//   )
// }

// export default about;


// 'use client';

// import dynamic from 'next/dynamic';
// import Head from 'next/head';
// import React from 'react';
// import { motion } from 'framer-motion';

// const MotionDiv = dynamic(
//   () => import('framer-motion').then((mod) => mod.motion.div),
//   { ssr: false }
// );

// // Animation variants
// const container = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.2 } },
// };
// const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

// const heroImage = "/about-image.gif";

// const charityItems = [
//   { title: "Help For Ecosystem", raised: "$8,025", goal: "$10,000", image: "/found-3.jpg" },
//   { title: "Water For All", raised: "$6,025", goal: "$10,000", image: "/found-2.jpg" },
//   { title: "Vaccine Aid Camp", raised: "$4,025", goal: "$10,000", image: "/found-01.jpg" },
// ];

// const events = [
//   {
//     title: "Donation Drive",
//     description: "Join hands to support our local communities.",
//     goal: "6391 Elgin St. Celina, 10299",
//     image: "/found-6.jpg",
//   },
//   {
//     title: "Win‑Win Survival",
//     description: "Empowering through sustainable survival programs.",
//     goal: "6391 Elgin St. Celina, 10299",
//     image: "/found-7.jpg",
//   },
//   {
//     title: "Children Education",
//     description: "Supporting bright futures with education.",
//     goal: "6391 Elgin St. Celina, 10299",
//     image: "/found-8.jpg",
//   },
// ];

// const StatsIndicator = () => (
//   <motion.div
//     className="absolute -bottom-10 left-0 bg-yellow-400 text-black p-4 px-6 rounded-xl shadow-md flex items-center gap-3"
//     initial={{ scale: 0 }}
//     animate={{ scale: 1 }}
//     transition={{ delay: 0.5 }}
//   >
//     <div className="text-3xl">💛</div>
//     <div>
//       <h3 className="text-xl font-bold">250+</h3>
//       <p className="text-sm">Services we provide</p>
//     </div>
//   </motion.div>
// );

// const About = () => (
//   <>
//     <Head>
//       <title>About Us – Charity Organisation</title>
//       <meta
//         name="description"
//         content="Learn about our mission, vision, charity initiatives and events. Join us in making a difference."
//       />
//     </Head>

//     <div className="h-full">
//       {/* Hero Image */}
//       <motion.img
//        src="/about image.GIF" 
//         alt="About Us"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="w-full"
//       />

//       {/* About Section */}
//       <motion.section
//         className="py-12 px-4 md:px-20 bg-white m-7"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="flex flex-col md:flex-row items-center gap-10">
//           {/* Images & Stats */}
//           <div className="relative w-full md:w-1/2 flex justify-center">
//             <motion.img
//               src="/about-1.jpg"
//               alt="About Team"
//               className="w-64 rounded-xl shadow-lg mt-20"
//               whileHover={{ scale: 1.05 }}
//             />
//             <motion.img
//               src="/about-2.jpg"
//               alt="Community"
//               className="w-64 h-64 object-cover rounded-xl shadow-xl absolute -top-10 -left-10"
//               whileHover={{ scale: 1.05 }}
//             />
//             <StatsIndicator />
//           </div>

//           {/* Text Content */}
//           <MotionDiv className="w-full md:w-1/2 text-center md:text-left" variants={item}>
//             <h4 className="text-orange-600 font-semibold mb-2">ABOUT US</h4>
//             <h2 className="text-4xl font-bold mb-4 leading-snug">
//               Unite for a Cause
//               <br />
//               Change the World
//             </h2>
//             <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
//               {["Our Mission", "Our Vision", "Our Goal"].map((text, i) => (
//                 <motion.button
//                   key={i}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`px-4 py-2 rounded-full cursor-pointer ${
//                     i === 1
//                       ? "bg-green-500 text-white hover:bg-white hover:text-black hover:border"
//                       : "border border-gray-400 hover:bg-green-500"
//                   }`}
//                 >
//                   {text}
//                 </motion.button>
//               ))}
//             </div>
//             <p className="text-gray-600 mb-4">
//               We work with dedication and integrity to help communities thrive through impactful charity initiatives.
//             </p>
//             <p className="text-gray-600 mb-6">
//               Together we bring education, healthcare, and sustainable change to those who need it most.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05, backgroundColor: "#ef4444", color: "white" }}
//               whileTap={{ scale: 0.95 }}
//               className="border border-red-500 text-red-500 px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-500 hover:text-white transition"
//             >
//               Donate Now →
//             </motion.button>
//           </MotionDiv>
//         </div>
//       </motion.section>

//       {/* Charity Fund Section */}
//       <motion.section
//         className="bg-[#343434] text-white py-12 px-4 md:px-12 lg:px-24"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="text-center mb-12">
//           <motion.h2 variants={item} className="mb-1 mt-5">
//             CHARITY FUND
//           </motion.h2>
//           <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold">
//             Together We Can <br /> <span className="text-orange-500">Make</span> a{' '}
//             <span className="text-white">Difference</span>
//           </motion.h2>
//         </div>

//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
//           variants={container}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           {charityItems.map((c, idx) => (
//             <motion.div
//               key={idx}
//               className="bg-white text-black rounded-2xl overflow-hidden shadow-lg"
//               variants={item}
//               whileHover={{ y: -10 }}
//             >
//               <div className="h-48 w-full relative">
//                 <motion.img src={c.image} className="object-cover rounded-2xl w-full h-full" whileHover={{ scale: 1.05 }} />
//               </div>
//               <div className="p-4 text-center font-bold">{c.title}</div>
//               <div className="p-4">
//                 <p className="text-sm text-gray-600 mb-2">Supporting health & community wellbeing.</p>
//                 <div className="flex justify-between text-sm text-gray-700 mb-4">
//                   <span>Raised: {c.raised}</span>
//                   <span>Goal: {c.goal}</span>
//                 </div>
//                 <motion.button
//                   className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-gray-500 transition"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Donate Now →
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.section>

//       {/* CTA Cards */}
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-2 gap-6 m-20"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//       >
//         {[
//           {
//             bg: "bg-orange-600",
//             title: "Help Them With Donation",
//             text: "Join us to make real change in people’s lives."
//           },
//           {
//             bg: "bg-green-600",
//             title: "Join Us as a Volunteer",
//             text: "Be the heart behind our impact. Volunteer today."
//           }
//         ].map((card, i) => (
//           <motion.div key={i} className={`${card.bg} text-white p-8 rounded-2xl`} whileHover={{ scale: 1.02 }}>
//             <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
//             <p className="mb-4 text-sm">{card.text}</p>
//             <motion.button
//               className="border border-white text-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Donate Now →
//             </motion.button>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Who We Are Section */}
//       <motion.section
//         className="bg-gray-200 text-gray-900 py-16 px-4 md:px-12 lg:px-24"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
//             <p className="text-orange-600 font-semibold uppercase tracking-wide mb-2">Who We Are</p>
//             <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
//               Supporting Dreams <br /> Changing Lives
//             </h2>
//             <p className="text-gray-600 mb-6">
//               With decades of combined experience, we partner with local communities to deliver education, healthcare, and social support.
//             </p>

//             <div className="mb-4">
//               <p className="text-sm md:text-base font-medium">
//                 Total Funds Raised: <span className="text-green-600 font-bold">450,896,070 $</span>
//               </p>
//               <div className="h-1 bg-pink-200 rounded mt-1">
//                 <motion.div className="h-1 bg-red-500 rounded-full" initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 1, delay: 0.5 }} />
//               </div>
//             </div>

//             <div className="mb-6">
//               <p className="text-sm md:text-base font-medium">
//                 Total Cases Helped: <span className="text-green-600 font-bold">300+</span>
//               </p>
//               <div className="h-1 bg-red-200 rounded-full mt-1">
//                 <motion.div className="h-1 bg-red-500 rounded-full" initial={{ width: 0 }} whileInView={{ width: "90%" }} transition={{ duration: 1, delay: 0.7 }} />
//               </div>
//             </div>

//             <motion.button
//               className="bg-white text-gray-500 cursor-pointer hover:bg-gray-500 border border-orange-500 hover:text-white py-2 px-6 rounded-full transition duration-300 flex items-center gap-2"
//               whileHover={{ scale: 1.05, backgroundColor: "#ef4444", color: "white", borderColor: "#ef4444" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Donate Now →
//             </motion.button>
//           </motion.div>

//           <motion.div className="relative w-full h-[400px] md:h-[500px]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
//             <motion.div className="absolute top-0 left-0 w-[70%] h-[70%] rounded-xl overflow-hidden" whileHover={{ scale: 1.05 }}>
//               <img src="/found-4.jpg" alt="Supporting Image 1" className="object-cover w-full h-full" />
//             </motion.div>
//             <motion.div className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-xl overflow-hidden border-4 border-white shadow-xl" whileHover={{ scale: 1.05 }}>
//               <img src="/found-5.jpg" alt="Supporting Image 2" className="object-cover w-full h-full" />
//             </motion.div>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Events Section */}
//       <motion.section className="bg-white text-gray-900 py-16 px-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
//         <div className="text-center mb-12">
//           <motion.p className="text-orange-500" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
//             OUR EVENTS
//           </motion.p>
//           <motion.h2 className="text-3xl md:text-4xl font-bold" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
//             Join Us in the Fight <br /> Against Poverty
//           </motion.h2>
//         </div>

//         <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
//           {events.map((ev, i) => (
//             <motion.div key={i} className="bg-white text-black rounded-2xl overflow-hidden shadow-lg" variants={item} whileHover={{ y: -10 }}>
//               <div className="m-5 rounded-2xl">
//                 <div className="h-48 w-full overflow-hidden">
//                   <motion.img src={ev.image} alt={ev.title} className="w-full h-full object-cover rounded-2xl" whileHover={{ scale: 1.1 }} />
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h2 className="text-gray-800 text-2xl">{ev.title}</h2>
//                 <p className="text-gray-400 font-semibold mb-2 mt-3">{ev.description}</p>
//                 <p className="text-sm text-gray-600 mb-4">{ev.goal}</p>
//                 <motion.button className="w-full bg-orange-500 text-white py-2 rounded-full transition duration-300 hover:bg-gray-500" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   Donate Now →
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.section>
//     </div>
//   </>
// );

// export default About;





















"use client";
import dynamic from 'next/dynamic';
import React from 'react'
import { motion } from "framer-motion";

const MotionDiv = dynamic(() =>
  import("framer-motion").then(mod => mod.motion.div),
  { ssr: false }
);

const about = () => {
  const arr = [
    {
      title1: "Annual Charity Gala",
      description1: "Join our black-tie fundraising event featuring live auctions, celebrity guests, and inspiring stories of lives changed through your generosity.",
      goal1: "Grand Ballroom, Marina Bay Sands, Singapore",
      image1: "/found-6.jpg"
    },
    {
      title1: "Disaster Relief Campaign",
      description1: "Emergency response initiative providing food, shelter, and medical aid to communities affected by natural disasters worldwide.",
      goal1: "Global deployment centers",
      image1: "/found-7.jpg"
    },
    {
      title1: "Education Equity Program",
      description1: "Building schools, training teachers, and providing scholarships to underprivileged children in developing nations.",
      goal1: "Operating across 12 countries",
      image1: "/found-8.jpg"
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <>
      <div className='h-full'>
        <motion.img 
          src="/faq.GIF" 
          alt="About Us"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full"
        />

        {/* About Section */}
        <motion.section 
          className="py-12 px-4 md:px-20 bg-white m-7"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left Side - Images */}
            <div className="relative w-full md:w-1/2 flex justify-center">
              <motion.img
                src="/about-1.jpg"
                alt="About 1"
                className="w-64 rounded-xl shadow-lg mt-20"
                whileHover={{ scale: 1.05 }}
              />
              <motion.img 
                src="/about-2.jpg" 
                alt="About 2" 
                className="w-64 h-64 object-cover rounded-xl shadow-xl absolute -top-10 -left-10"
                whileHover={{ scale: 1.05 }}
              />
              <motion.div 
                className="absolute -bottom-10 left-0 bg-yellow-400 text-black p-4 px-6 rounded-xl shadow-md flex items-center gap-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl">💛</div>
                <div>
                  <h3 className="text-xl font-bold">250+</h3>
                  <p className="text-sm">Successful Campaigns</p>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Content */}
            <motion.div 
              className="w-full md:w-1/2 text-center md:text-left"
              variants={item}
            >
              <h4 className="text-orange-600 font-semibold mb-2">ABOUT US</h4>
              <h2 className="text-4xl font-bold mb-4 leading-snug">
                Empowering Generosity, <br />Transforming Lives
              </h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                {["Our Mission", "Our Vision", "Our Impact"].map((text, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full cursor-pointer ${
                      i === 1 
                        ? "bg-green-500 text-white hover:bg-white hover:text-black hover:border"
                        : "border border-gray-400 hover:bg-green-500"
                    }`}
                  >
                    {text}
                  </motion.button>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                We bridge the gap between compassionate donors and critical causes through our transparent, technology-driven donation platform. Since 2010, we've facilitated over $450M in charitable giving.
              </p>
              <p className="text-gray-600 mb-6">
                Our verified nonprofit partners undergo rigorous vetting to ensure your contributions create maximum impact where it's needed most.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#ef4444", color: "white" }}
                whileTap={{ scale: 0.95 }}
                className="border border-red-500 text-red-500 px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-500 hover:text-white transition"
              >
                Join Our Movement →
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Charity Fund Section */}
        <motion.section 
          className="bg-[#343434] text-white py-12 px-4 md:px-12 lg:px-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className='mb-1 mt-5'
              variants={item}
            >
              ACTIVE CAMPAIGNS 
            </motion.h2>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold"
              variants={item}
            >
              Current Initiatives <br /> <span className="text-orange-500">Needing</span> Your <span className="text-white">Support</span>
            </motion.h2>
          </div>  

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Rainforest Conservation",
                raised: "$8,025",
                goal: "$10,000",
                description: "Protecting 5,000 acres of Amazon rainforest and its biodiversity through sustainable community partnerships.",
                image: "/found-3.jpg"
              },
              {
                title: "Clean Water Initiative",
                raised: "$6,025",
                goal: "$10,000",
                description: "Installing solar-powered water purification systems in Sub-Saharan African villages.",
                image: "/found-2.jpg"
              },
              {
                title: "Global Vaccination Drive",
                raised: "$4,025",
                goal: "$10,000",
                description: "Providing life-saving immunizations to children in conflict zones and remote areas.",
                image: "/found-01.jpg"
              },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-white text-black rounded-2xl overflow-hidden shadow-lg"
                variants={item}
                whileHover={{ y: -10 }}
              >
                <div className="h-48 w-full relative">
                  <div className='m-2'>
                    <motion.img 
                      src={item.image} 
                      className='object-cover rounded-2xl w-full h-full'
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>
                </div>
                <div className='flex items-center justify-center mt-8 font-bold'>
                  <h2>{item.title}</h2>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between text-sm text-gray-700 mb-4">
                    <span>Raised: {item.raised}</span>
                    <span>Goal: {item.goal}</span>
                  </div>
                  <motion.button 
                    className="w-full bg-orange-500 text-white py-2 rounded-full transition duration-300 hover:bg-gray-500 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Donate  Now →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 m-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            {
              bg: "bg-orange-600",
              title: "Transform Lives With Your Gift",
              text: "Every donation creates ripple effects of change. 92% of contributions go directly to program services, with complete financial transparency."
            },
            {
              bg: "bg-green-600",
              title: "Become a Changemaker",
              text: "Join our network of 15,000+ volunteers worldwide. Receive training and support while making tangible differences in communities."
            }
          ].map((card, i) => (
            <motion.div 
              key={i}
              className={`${card.bg} text-white p-8 rounded-2xl`}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
              <p className="mb-4 text-sm">
                {card.text}
              </p>
              <motion.button 
                className="bg-transparent text-white border border-white py-2 px-4 rounded-full cursor-pointer hover:bg-white hover:text-black transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Involved →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Who We Are Section */}
        <motion.section 
          className="bg-gray-200 text-gray-900 py-16 px-4 md:px-12 lg:px-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-orange-600 font-semibold uppercase tracking-wide mb-2">Our Track Record</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
                Proven Impact <br /> Measurable Results
              </h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                CharityWatch Top-Rated nonprofit with 14 consecutive 4-star ratings for accountability and financial efficiency.
              </p>

              <div className="mb-4">
                <p className="text-sm md:text-base font-medium">
                  Funds Deployed: <span className="text-green-600 font-bold">$450,896,070</span>
                </p>
                <div className='h-1 bg-pink-200 rounded mt-1'>
                  <motion.div 
                    className='h-1 bg-red-500 rounded-full'
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm md:text-base font-medium">
                  Lives Impacted: <span className="text-green-600 font-bold">3.2M+</span>
                </p>
                <div className="h-1 bg-red-200 rounded-full mt-1">
                  <motion.div 
                    className="h-1 bg-red-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>

              <motion.button 
                className="bg-white text-gray-500 cursor-pointer hover:bg-gray-500 border border-orange-500 hover:text-white py-2 px-6 rounded-full transition duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, backgroundColor: "#ef4444", color: "white", borderColor: "#ef4444" }}
                whileTap={{ scale: 0.95 }}
              >
                View Annual Report →
              </motion.button>
            </motion.div>

            <motion.div 
              className="relative w-full h-[400px] md:h-[500px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="absolute top-0 left-0 w-[70%] h-[70%] rounded-xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img src="/found-4.jpg" alt="Medical Mission Team" className='object-cover w-full h-full' />
              </motion.div>
              <motion.div 
                className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-xl overflow-hidden border-4 border-white shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                <img src="/found-5.jpg" alt="School Construction Project" className='object-cover w-full h-full'/>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Events Section */}
        <motion.section 
          className='bg-white text-gray-900 py-16 px-4'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='text-center mb-12'>
            <motion.p 
              className='text-orange-500'
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              UPCOMING EVENTS
            </motion.p>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Engage With Our <br /> Global Community
            </motion.h2>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {arr.map((response, index) => (
              <motion.div
                key={index}
                className="bg-white text-black rounded-2xl overflow-hidden shadow-lg"
                variants={item}
                whileHover={{ y: -10 }}
              >
                <div className='m-5 rounded-2xl'>
                  <div className="h-48 w-full overflow-hidden">
                    <motion.img
                      src={response.image1}
                      alt={response.title1}
                      className="w-full h-full object-cover rounded-2xl"
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                </div>

                <div className="p-4">
                  <h2 className='text-gray-800 text-2xl'>{response.title1}</h2>
                  <p className="text-gray-400 font-semibold mb-2 mt-3">{response.description1}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Location:</strong> {response.goal1}
                  </p>
                  <motion.button 
                    className="w-full bg-orange-500 text-white py-2 rounded-full transition duration-300 hover:bg-gray-500 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                   Donate Now →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </>
  )
}

export default about;