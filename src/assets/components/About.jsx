import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NG from "../images/nadan.png"
import SG from "../images/sonali.png"
import SR from "../images/somnathroy.png";
import SND from "../images/somnathdas.png";
import Pritam from "../images/pritam.jpg";
import Kartik from "../images/kartik.jpg";
import Arpan from "../images/arpan.png";
import logo from "../images/indrajit.png";
import bonomali from "../images/bonomali.png"
import sourabh from "../images/sourabh.png"
import arindam from "../images/arindam.png"

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation happens once per scroll
      easing: "ease-in-out",
    });
  }, []);

  const committeeMembers = [
    {
      name: "Dr. Nandan Gupta",
      role: "President",
      image: NG,
      description: "MBBS from NRS Medical College, MBA from IIM Kolkata",
    },
    {
      name: "Dr. Sonali Ghosh",
      role: "Vice-President",
      image: SG,
      description: "B.Sc.(H), B.Tech., M.Tech.(CU), Ph.D from IIT KGP",
    },
    {
      name: "Dr. Banamali Roy",
      role: "Chairman",
      image: bonomali,
      description: "M.Sc, Ph.D from Jadavpur University",
    },
    {
      name: "Dr. Sourabh Bal",
      role: "Vice-Chairman",
      image: sourabh,
      description: "M.Sc, Ph.D from Jadavpur University, PostDoc from Freie University, Berlin",
    },
    {
      name: "Dr. Somnath Das",
      role: "Secretary",
      image: SND,
      description: "M.E & PhD from Jadavpur University, Kolkata",
    },
    {
      name: "Mr. Somnath Roy",
      role: "Assistant Secretary",
      image: SR,
      description: "",
    },
    {
      name: "Mr. Indrajit Roy",
      role: "Assistant Secretary",
      image: logo,
      description: "",
    },
    {
      name: "Mr. Krishna Chandra",
      role: "General Manager",
      image: Kartik,
    },
    {
      name: "Mr. Pritam Dutta",
      role: "Treasurer",
      image: Pritam,
    },
    {
      name: "Mr. Arindam Chakraborty",
      role: "Information Technology Administrator",
      image: arindam,
    },
    {
      name: "Mr. Arpan Doloi",
      role: "Relationship Manager",
      image: Arpan,
    },
  ];

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Who We Are Section */}
      <section className="text-center py-12 px-6" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Who We Are</h1>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          ScienceTech Academy is a pioneering institution committed to fostering
          scientific curiosity, education, and research. Our mission is to inspire
          the next generation of innovators and thinkers.
        </p>
      </section>

      {/* Committee Members Section */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6" data-aos="fade-up">
          Meet Our Members
        </h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 max-w-5xl mx-auto">
          {committeeMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center"
              data-aos="zoom-in"
              data-aos-delay={index * 200} // Staggered animations
            >
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto rounded-full h-32 w-32 border-4 border-blue-400 shadow-md"
              />
              <h3 className="text-xl font-bold mt-4">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
              <p className="mt-2 text-gray-700">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 px-6 text-center bg-blue-600 text-white" data-aos="fade-up">
        <h2 className="text-3xl font-semibold mb-4">What We Do</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          At ScienceTech Academy, we organize competitions, scientific research programs,
          mentorship sessions, and educational initiatives to promote knowledge and innovation.
          Join us in shaping the future of science and technology!
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
