import React from "react";
import { Routes, Route } from "react-router-dom";
import Contact from "../pages/contact";
import Home from "../pages/home";
import About from "../pages/about";
import Services from "../pages/services";
import Order from "../pages/order";

export default function Menuroutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/order" element={<Order />} />
    </Routes>
  );
}
