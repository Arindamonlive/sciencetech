import { useState, useEffect } from 'react';
import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import NavPage from "./assets/components/Nav.jsx";
import HomePage from "./assets/components/Home.jsx";
import Footer from "./assets/components/Footer.jsx";
import About from "./assets/components/About.jsx";
import Misson from "./assets/components/Mission.jsx";
import Model from "./assets/components/Model.jsx";
import Contact from "./assets/components/Contact.jsx";
import Adminlogin from "./assets/components/Admin.jsx";
import Member from "./assets/components/Member.jsx";
import Advisory from './assets/components/Advisory.jsx';
import Event2024 from './assets/components/Event2024.jsx';
import Event2023 from './assets/components/Event2023.jsx';
import Event2025 from './assets/components/Event2025.jsx';
import Login from './assets/components/Login.jsx';
import SubjectSelection from './assets/components/ExamSelection.jsx';
import MathExamPage from './assets/components/MathExamPage.jsx';

import logo from "./assets/images/Logo-removebg.png";
import PhysicsExamPage from './assets/components/PhysicsExamPage.jsx';
import ChemistryExamPage from './assets/components/ChemistryExamPage.jsx';
import FullExamPage from './assets/components/FullExamPage.jsx';
// import Sample from './assets/components/Sample.jsx';
import PM1 from './assets/components/pm1.jsx';
import PM2 from './assets/components/pm2.jsx';
import PM3 from './assets/components/pm3.jsx';
import PM4 from './assets/components/pm4.jsx';
import PM5 from './assets/components/pm5.jsx';
import CM1 from './assets/components/cm1.jsx';
import CM2 from './assets/components/cm2.jsx';
import CM3 from './assets/components/cm3.jsx';
import CM4 from './assets/components/cm4.jsx';
import CM5 from './assets/components/cm5.jsx';
import MM1 from './assets/components/mm1.jsx';
import MM2 from './assets/components/mm2.jsx';
import MM3 from './assets/components/mm3.jsx';
import MM4 from './assets/components/mm4.jsx';
import MM5 from './assets/components/mm5.jsx';
function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("studentDetails")
  );

  useEffect(() => {
    // Splash screen for 1 second
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // 👇 Listen for login changes (when localStorage updates)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("studentDetails"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
        {/* Public Pages */}
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

        {/* Exam Flow */}
        <Route path="/examlogin" element={<Login />} />
        <Route path="/subjects" element={<SubjectSelection />} />
        <Route path="/pm1" element={<PM1 />} />
        <Route path="/pm2" element={<PM2 />} />
        <Route path="/pm3" element={<PM3 />} />
        <Route path="/pm4" element={<PM4 />} />
        <Route path="/pm5" element={<PM5 />} />
        <Route path="/cm1" element={<CM1 />} />
        <Route path="/cm2" element={<CM2 />} />
        <Route path="/cm3" element={<CM3 />} />
        <Route path="/cm4" element={<CM4 />} />
        <Route path="/cm5" element={<CM5 />} />
        <Route path="/mm1" element={<MM1 />} />
        <Route path="/mm2" element={<MM2 />} />
        <Route path="/mm3" element={<MM3 />} />
        <Route path="/mm4" element={<MM4 />} />
        <Route path="/mm5" element={<MM5 />} />
        <Route
          path="/subjects"
          element={localStorage.getItem("studentDetails") ? <SubjectSelection /> : <Navigate to="/examlogin" />}
        />
        <Route
          path="/math"
          element={localStorage.getItem("studentDetails") ? <MathExamPage /> : <Navigate to="/examlogin" />}
        />
                      <Route
          path="/physics"
          element={localStorage.getItem("studentDetails") ? <PhysicsExamPage /> : <Navigate to="/examlogin" />}
        />
                <Route
          path="/chemistry"
          element={localStorage.getItem("studentDetails") ? <ChemistryExamPage /> : <Navigate to="/examlogin" />}
        />
                        <Route
          path="/fullcourse"
          element={localStorage.getItem("studentDetails") ? <FullExamPage /> : <Navigate to="/examlogin" />}
        />
                                {/* <Route
          path="/test"
          element={localStorage.getItem("studentDetails") ? <Sample /> : <Navigate to="/examlogin" />}
        /> */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
