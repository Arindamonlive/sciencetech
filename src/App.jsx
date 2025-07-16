import { useState, useEffect } from 'react';
import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom"; 
import NavPage from "./assets/components/Nav.jsx";
import HomePage from "./assets/components/Home.jsx"; 
import Footer from "./assets/components/Footer.jsx";
import About from "./assets/components/About.jsx";
import Misson from "./assets/components/Mission.jsx";
import Model from "./assets/components/Model.jsx";
import Contact from "./assets/components/Contact.jsx";
import Adminlogin from "./assets/components/Admin.jsx";
import logo from "./assets/images/Logo-removebg.png"; 
import Member from "./assets/components/Member.jsx";
import Advisory from './assets/components/Advisory.jsx';
import Event2024 from './assets/components/Event2024.jsx';
import Event2023 from './assets/components/Event2023.jsx';
import Event2025 from './assets/components/Event2025.jsx';
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show the splash screen for 2 seconds
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <img src={logo} alt="Loading Logo" className="w-48 h-auto animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <NavPage />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/missionvission" element={<Misson />} />
        <Route path="/activities/science" element={<Model />} />
        <Route path="/member" element={<Member />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/advisory" element={<Advisory />} />
        <Route path="/event2024" element={<Event2024 />} />
        <Route path="/event2023" element={<Event2023 />} />
        <Route path="/event2025" element={<Event2025 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
