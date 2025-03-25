import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Code2, Smartphone, Cloud } from "lucide-react"; 
import { Link } from "react-router-dom"

const ServiceCard = ({ icon, title, desc }) => {
  return (
    <motion.div
      className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition text-center text-gray-900"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-5xl text-blue-600 mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div >
      <Navbar />

      <div className="mt-20 min-h-screen flex flex-col items-center justify-center text-center text-white px-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-[length:400%_400%] animate-gradientShift">
        <motion.h2
          className="mt-10 mb-10 text-3xl md:text-5xl font-bold mb-6 md:mb-10 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
  <Link to="/order">
    <ServiceCard
      icon={
        <Code2 className="w-12 h-12 p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg" />
      }
      title="Web Development"
      desc="High-quality web applications built with modern tech."
    />
  </Link>

  <Link to="/order">
    <ServiceCard
      icon={
        <Smartphone className="w-12 h-12 p-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full shadow-lg" />
      }
      title="Mobile Apps"
      desc="Seamless and powerful mobile applications."
    />
  </Link>

  <Link to="/order">
    <ServiceCard
      icon={
        <Cloud className="w-12 h-12 p-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg" />
      }
      title="Cloud Solutions"
      desc="Secure and scalable cloud-based services."
    />
  </Link>
</div>

      </div>
      <Footer />
    </div>
  );
};

export default Services;
