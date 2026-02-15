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
import PM6 from './assets/components/pm6.jsx';
import PM7 from './assets/components/pm7.jsx';
import PM8 from './assets/components/pm8.jsx';
import PM9 from './assets/components/pm9.jsx';
import PM10 from './assets/components/pm10.jsx';
import PM11 from './assets/components/pm11.jsx';
import PM12 from './assets/components/pm12.jsx';
import CM1 from './assets/components/cm1.jsx';
import CM2 from './assets/components/cm2.jsx';
import CM3 from './assets/components/cm3.jsx';
import CM4 from './assets/components/cm4.jsx';
import CM5 from './assets/components/cm5.jsx';
import CM6 from './assets/components/cm6.jsx';
import CM7 from './assets/components/cm7.jsx';
import CM8 from './assets/components/cm8.jsx';
import CM9 from './assets/components/cm9.jsx';
import CM10 from './assets/components/cm10.jsx';
import CM11 from './assets/components/cm11.jsx';
import CM12 from './assets/components/cm12.jsx';
import MM1 from './assets/components/mm1.jsx';
import MM2 from './assets/components/mm2.jsx';
import MM3 from './assets/components/mm3.jsx';
import MM4 from './assets/components/mm4.jsx';
import MM5 from './assets/components/mm5.jsx';
import MM6 from './assets/components/mm6.jsx';
import MM7 from './assets/components/mm7.jsx';
import MM8 from './assets/components/mm8.jsx';
import MM9 from './assets/components/mm9.jsx';
import MM10 from './assets/components/mm10.jsx';
import MM11 from './assets/components/mm11.jsx';
import MM12 from './assets/components/mm12.jsx';
import Currentyear from './assets/components/currentyear.jsx';
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
        <Route path="/currentyear" element={<Currentyear />} />
        <Route path="/about" element={<About />} />
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
        <Route path="/pm6" element={<PM6 />} />
        <Route path="/pm7" element={<PM7 />} />
        <Route path="/pm8" element={<PM8 />} />
        <Route path="/pm9" element={<PM9 />} />
        <Route path="/pm10" element={<PM10 />} />
        <Route path="/pm11" element={<PM11 />} />
        <Route path="/pm12" element={<PM12 />} />
        <Route path="/cm1" element={<CM1 />} />
        <Route path="/cm2" element={<CM2 />} />
        <Route path="/cm3" element={<CM3 />} />
        <Route path="/cm4" element={<CM4 />} />
        <Route path="/cm5" element={<CM5 />} />
        <Route path="/cm6" element={<CM6 />} />
        <Route path="/cm7" element={<CM7 />} />
        <Route path="/cm8" element={<CM8 />} />
        <Route path="/cm9" element={<CM9 />} />
        <Route path="/cm10" element={<CM10 />} />
        <Route path="/cm11" element={<CM11 />} />
        <Route path="/cm12" element={<CM12 />} />
        <Route path="/mm1" element={<MM1 />} />
        <Route path="/mm2" element={<MM2 />} />
        <Route path="/mm3" element={<MM3 />} />
        <Route path="/mm4" element={<MM4 />} />
        <Route path="/mm5" element={<MM5 />} />
        <Route path="/mm6" element={<MM6 />} />
        <Route path="/mm7" element={<MM7 />} />
        <Route path="/mm8" element={<MM8 />} />
        <Route path="/mm9" element={<MM9 />} />
        <Route path="/mm10" element={<MM10 />} />
        <Route path="/mm11" element={<MM11 />} />
        <Route path="/mm12" element={<MM12 />} />
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
