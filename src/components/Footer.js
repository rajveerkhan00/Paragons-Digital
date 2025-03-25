import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-20 text-white text-center px-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-[length:400%_400%] animate-gradientShift">
<h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center">
  Contact Us
</h2>
      <p className="mb-6">Have a project in mind? Let's build something amazing together!</p>
      <Link to="/contact">
  <button className="bg-blue-500 px-6 py-3 rounded-full hover:bg-blue-400">
    <FaEnvelope className="inline-block mr-2" /> Get in Touch
  </button>
</Link>
      <p className="text-gray-300 text-sm mt-6">&copy; {new Date().getFullYear()} Paragons Digital. All rights reserved.</p>

      {/* Add Tailwind Keyframes Inside the Component */}
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
    </footer>
  );
};

export default Footer;
