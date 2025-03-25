import { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaMobile, FaCloud, FaEnvelope } from "react-icons/fa";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="font-sans bg-gray-100 text-gray-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />  
      
      {/* Hero Section */}
      <header className="shadow-lg h-screen flex flex-col items-center justify-center text-center text-white px-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-[length:400%_400%] animate-gradientShift">
      <motion.h2 
  className="text-3xl md:text-5xl font-bold mb-4 text-center px-4"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Building the Future of Technology
</motion.h2>

        <p className="text-lg max-w-2xl">
          We create scalable software solutions tailored to your business needs.
        </p>
        <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full shadow-md hover:bg-gray-200">
          Get Started
        </button>
  
        {/* Tailwind Keyframes for Animated Gradient */}
        <style>
          {`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradientShift {
              animation: gradientShift 8s ease infinite;
            }
          `}
        </style>
      </header>
      {/* Services Section */}
      <section className="py-12 sm:py-20 bg-white text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 sm:mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <Link to="/order" className="w-full">
            <ServiceCard 
              icon={<FaCode className="text-3xl sm:text-4xl" />} 
              title="Web Development" 
              desc="High-quality web applications built with modern tech." 
            />
          </Link>
          <Link to="/order" className="w-full">
            <ServiceCard 
              icon={<FaMobile className="text-3xl sm:text-4xl" />} 
              title="Mobile Apps" 
              desc="Seamless and powerful mobile applications." 
            />
          </Link>
          <Link to="/order" className="w-full">
            <ServiceCard 
              icon={<FaCloud className="text-3xl sm:text-4xl" />} 
              title="Cloud Solutions" 
              desc="Secure and scalable cloud-based services." 
            />
          </Link>
        </div>
        
        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-12 sm:mt-20 space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 mb-8 sm:mb-10 px-2">
          <motion.a
            href="https://wa.me/03286827038"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-green-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:bg-green-400 transition w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp className="text-xl sm:text-2xl" />
            <span className="text-sm sm:text-base">WhatsApp: 03286827038</span>
          </motion.a>
    
          <motion.a
            href="mailto:paragonsdigital@gmail.com"
            className="flex items-center justify-center space-x-2 bg-blue-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:bg-blue-400 transition w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope className="text-xl sm:text-2xl" />
            <span className="text-sm sm:text-base">Email: paragonsdigital@gmail.com</span>
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <motion.div 
      className="p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition h-full"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-blue-600 flex justify-center mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{desc}</p>
    </motion.div>
  );
}