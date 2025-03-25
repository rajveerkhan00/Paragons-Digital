import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="mt-20 min-h-screen text-white bg-gradient-to-r from-blue-500 to-purple-600 bg-[length:400%_400%] animate-gradientShift">
      <Navbar />
      <section className="py-20 text-center px-6">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get in Touch
        </motion.h2>
        <p className="text-base sm:text-lg md:text-xl text-center mb-6 px-4">
          Reach out to us via WhatsApp or Email.
        </p>

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center sm:mt-20 space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 mb-8 sm:mb-10 px-2">
          <motion.a
            href="https://wa.me/923286827038?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
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
            href="mailto:paragonsdigital@gmail.com?subject=Inquiry&body=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            className="flex items-center justify-center space-x-2 bg-blue-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:bg-blue-400 transition w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope className="text-xl sm:text-2xl" />
            <span className="text-sm sm:text-base">
              Email: paragonsdigital@gmail.com
            </span>
          </motion.a>
        </div>

        {/* Feedback Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl text-gray-900">
          <h3 className="text-2xl font-bold mb-4 text-center">Contact us</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactUs;
