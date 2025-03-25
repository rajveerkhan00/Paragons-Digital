import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="Favicon.png"
            alt="Favicon"
            className="w-8 h-8 rounded-full animate-zoom"
          />
          <h1 className="text-2xl font-bold">Paragons Digital</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/Services" className="hover:text-gray-300">Services</a></li>
          <li><a href="/About" className="hover:text-gray-300">About Us</a></li>
          <li><a href="/Contact" className="hover:text-gray-300">Contact Us</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-blue-500 md:hidden flex flex-col items-center space-y-4 py-4">
          <li><a href="/" className="block w-full text-center hover:bg-blue-600 py-2">Home</a></li>
          <li><a href="/Services" className="block w-full text-center hover:bg-blue-600 py-2">Services</a></li>
          <li><a href="/About" className="block w-full text-center hover:bg-blue-600 py-2">About Us</a></li>
          <li><a href="/Contact" className="block w-full text-center hover:bg-blue-600 py-2">Contact Us</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
