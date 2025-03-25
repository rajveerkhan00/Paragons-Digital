import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { saveFormData } from "../firebase";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save data in Firebase Firestore
      await saveFormData(formData);

      alert("Thank you for your feedback! We will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 min-h-screen text-white bg-gradient-to-r from-blue-500 to-purple-600 animate-gradientShift">
      <Navbar />
      <section className="py-20 text-center px-6">
        <motion.h2 className="text-4xl font-bold mb-4">Get in Touch</motion.h2>
        <p className="text-lg mb-6">Reach out via WhatsApp or Email.</p>

        <div className="flex justify-center space-x-4 mb-8">
          <motion.a
            href="https://wa.me/923286827038?text=Hello"
            className="flex items-center bg-green-500 px-6 py-3 rounded-full shadow-lg hover:bg-green-400"
          >
            <FaWhatsapp className="text-2xl" /> <span>WhatsApp</span>
          </motion.a>

          <motion.a
            href="mailto:kinzarajpoot1129@gmail.com"
            className="flex items-center bg-blue-500 px-6 py-3 rounded-full shadow-lg hover:bg-blue-400"
          >
            <FaEnvelope className="text-2xl" /> <span>Email</span>
          </motion.a>
        </div>

        {/* Feedback Form */}
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-xl text-gray-900">
          <h3 className="text-2xl font-bold mb-4 text-center">Contact us</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactUs;