import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../images/Logo-removebg.png";


const NavPage = () => {
  const marqueeRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let scrollAmount = 0;

    const scroll = () => {
      if (marquee) {
        scrollAmount += 1;
        if (scrollAmount >= marquee.scrollWidth / 2) {
          scrollAmount = 0;
        }
        marquee.style.transform = `translateX(-${scrollAmount}px)`;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Row 1: Auto-scrolling text */}
      {/* <div className="w-full bg-gray-900 text-white py-2 overflow-hidden whitespace-nowrap">
        <div ref={marqueeRef} className="inline-block text-lg font-semibold" style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
          <span className="mr-10">🔥 Participate in the  Interschool Events for Science Exibition and Quiz Competition at Swami Vivekananda Institute of Science & Technology on 11th April 2025  🔥</span>
          <span className="mr-10">🔥 Participate in the  Interschool Events for Science Exibition and Quiz Competition at Swami Vivekananda Institute of Science & Technology on 11th April 2025  🔥</span>
        </div>
      </div> */}

      {/* Row 2: Title */}
      <div className="w-full text-center py-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white text-4xl font-extrabold tracking-wider shadow-lg ">
  <span className="text-yellow-300 drop-shadow-md">ScienceTech</span> Academy
</div>


      {/* Row 3: Navbar */}
      <div className="w-full flex justify-between items-center px-4 py-3 bg-gray-200 relative z-50">
        {/* Logo */}
        <div className="block md:hidden">
          <img src={logo} alt="Logo" className="h-16" />
        </div>

        {/* Burger Menu for Mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white flex flex-col items-center justify-start text-xl z-50 transition-all duration-300 ${menuOpen ? "opacity-100 visible p-6" : "opacity-0 invisible"}`}>
        <button className="absolute top-4 right-6" onClick={() => setMenuOpen(false)}>
          <X size={32} />
        </button>
        <nav className="md:hidden flex flex-col gap-4 text-lg font-semibold w-full text-center">
          <Link to="/" className="hover:text-blue-600 py-2" onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link to="/about" className="hover:text-blue-600 py-2" onClick={() => setMenuOpen(false)}>ABOUT US</Link>
          <Link to="/advisory" className="hover:text-blue-600 py-2" onClick={() => setMenuOpen(false)}>ADVISORY COMMITTEE</Link>
          <Link to="/missionvission" className="hover:text-blue-600 py-2" onClick={() => setMenuOpen(false)}>MISSION & VISION</Link>
          <Link to="/currentyear" className="hover:text-blue-600 py-2" onClick={() => setMenuOpen(false)}>ScienceTech2026</Link>

          {/* Mobile Dropdown Menu */}
          <div className="w-full text-center">
  <button 
    className="hover:text-blue-600 w-full py-2 text-center" 
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    ACTIVITIES ▾
  </button>
  <div className={`w-full bg-gray-100 rounded-md overflow-hidden transition-all duration-300 ${dropdownOpen ? "max-h-96 p-2" : "max-h-0 p-0 hidden"}`}>
    <Link to="/event2023" className="block px-3 py-2 text-center hover:bg-gray-300" onClick={() => setMenuOpen(false)}>2023</Link>
    <Link to="/event2024" className="block px-3 py-2 text-center hover:bg-gray-300" onClick={() => setMenuOpen(false)}>2024</Link>
    <Link to="/event2025" className="block px-3 py-2 text-center hover:bg-gray-300" onClick={() => setMenuOpen(false)}>2025</Link>
  </div>
</div>

          <Link to="/member" className="hover:text-blue-600 py-2" onClick={() => setMenuOpen(false)}>MEMBERSHIP</Link>
          <Link to="/examlogin" className="hover:text-blue-600 py-2" onClick={() => setMenuOpen(false)}>MOCK EXAM</Link>
          <Link to="/contact" className="hover:text-blue-600 py-2" onClick={() => setMenuOpen(false)}>CONTACT US</Link>
          {/* <Link to="/admin" className="hover:text-blue-600 py-2" onClick={() => setMenuOpen(false)}>ADMIN CORNER</Link> */}
        </nav>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-wrap justify-between items-center px-4 py-3 bg-gray-200 relative z-50">
        {/* Left: Logo */}
        <div>
          <img src={logo} alt="Logo" className="h-20" />
        </div>
        {/* Right: Menu Options */}
        <nav className="flex flex-wrap gap-8 text-lg font-semibold">
          <Link to="/" className="hover:text-blue-600">HOME</Link>
          <Link to="/about" className="hover:text-blue-600">ABOUT US</Link>
          <Link to="/advisory" className="hover:text-blue-600">ADVISORY COMMITTEE</Link>
          <Link to="/missionvission" className="hover:text-blue-600">MISSION & VISION</Link>
          <Link to="/currentyear" className="hover:text-blue-600" >ScienceTech2026</Link>
          
          {/* Dropdown Menu */}
          <div className="group relative">
            <button className="hover:text-blue-600">ACTIVITIES ▾</button>
            <div className="absolute left-0 hidden bg-white shadow-md rounded-md p-2 group-hover:block w-48">
              <Link to="/event2023" className="block px-3 py-2 hover:bg-gray-100">2023</Link>
              <Link to="/event2024" className="block px-3 py-2 hover:bg-gray-100">2024</Link>
              <Link to="/event2025" className="block px-3 py-2 hover:bg-gray-100">2025</Link>
              
            </div>
          </div>
          <Link to="/member" className="hover:text-blue-600">MEMBERSHIP</Link>
          <Link to="/examlogin" className="hover:text-blue-600">MOCK EXAM</Link>
          <Link to="/contact" className="hover:text-blue-600">CONTACT US</Link>
          {/* <Link to="/admin" className="hover:text-blue-600">ADMIN CORNER</Link> */}
        </nav>
      </div>
    </div>
  );
};

export default NavPage;
