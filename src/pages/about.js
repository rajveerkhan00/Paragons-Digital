import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from "framer-motion";
import Footer from '../components/Footer';

const AboutUs = () => {
  const developers = [
    { name: "Ali Khan", role: "Frontend Developer", image: "../assets/abdullah.jfif" },
    { name: "Ali Javed", role: "Backend Developer", image: "../assets/dev2.jpg" },
    { name: "Elisha Rana", role: "UI/UX Designer", image: "../assets/dev3.jpg" },
    { name: "Abdullah Rana", role: "UI/UX Designer", image: "../assets/dev3.jpg" },
    { name: "Abdul moiz", role: "Backend Developer", image: "../assets/dev3.jpg" },
    { name: "Ahmad Khan", role: "UI/UX Designer", image: "../assets/dev3.jpg" },
    { name: "Hafiza Esha", role: "Backend Developer", image: "../assets/dev3.jpg" },
  
  ];

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-blue-500 to-purple-600 bg-[length:400%_400%] animate-gradientShift">
      <Navbar />
      <section className="py-20 text-center px-6 mt-20">
      <motion.h2 
  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center px-4"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Meet Our Team
</motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {developers.map((dev, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition text-center text-gray-900"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={dev.image} 
                alt={dev.name} 
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500" 
              />
              <h3 className="text-xl font-semibold mb-2">{dev.name}</h3>
              <p className="text-gray-600">{dev.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />  

    </div>
    
  );
};

export default AboutUs;
