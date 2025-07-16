import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import suman from "../images/suman.png"
import utpal from "../images/utpal.png"
import sudipta from "../images/sudipta.png"
import manasi from "../images/manasi.png"
import arpan from "../images/arpandutta.png"
import anindya from "../images/anindya.png"
import sourav from "../images/sourav.png"
import samrat from "../images/smrat.png"
import rajashree from "../images/rajashree.png"
import somnath from "../images/somnatheee.png"


const Advisory = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation happens once per scroll
      easing: "ease-in-out",
    });
  }, []);

  const committeeMembers = [
    {
      name: "Dr. Suman Das",
      image: suman,
      description: "B.E.(BESU), M.E.(BESU), PhD(JU)",interest:"Refrigeration and Air conditioning, Ergonomics, Strength of Materials",
    },
    {
      name: "Dr. Manasi Mukhopadhyay",
      image: manasi,
      description: "B.Sc.(Chemistry ), B.Tech, M.tech, Chem Engg.(CU) Petrochemicals and Petroleum Refinery Engg.Ph.D , Chem Engg.",interest:"Petrochemicals and Petroleum Refinery",
    },
    {
      name: "Dr. Samrat Paul",
      image: samrat,
      description: "PhD (Electrical Engineering) from IIT (ISM) Dhanbad (2023)",interest:"Electrical engineering is the study and application of electricity, electronics, and electromagnetism to design and develop electrical systems and devices.",
    },
    {
      name: "Mr. Utpal Madhu",
      image: utpal,
      description: "B.E.(NIT Surat), M.Tech(BESU, Shibpur)",interest:"Renewable Energy, Agricultural Automation",
    },
    {
      name: "Mr. Sudipta Nath",
      image: sudipta,
      description: "M.Tech(BESU, Shibpur)",interest:"Theory of Machines, Materials Engineering",
    },

    {
      name: "Dr Arpan Dutta",
      image: arpan,
      description: "PhD, Jadavpur University",interest:"Organic hybrid material, Catalysis, Sensors",
    },
    {
      name: "Mr Anindya Ghosh",
      image: anindya,
      description: "M. E. from B. E. College (IIEST)",interest:"Experience 25 years",
    },
    {
      name: "Dr. Sourav Debnath",
      image: sourav,
      description: "PhD (Engineering) from Jadavpur University (2021)",interest:"Core electrical engineering involves designing and optimizing electrical systems by leveraging advanced materials to enhance performance, efficiency, and sustainability.",
    },

    {
      name: "Dr. Rajashree Dhua",
      image: rajashree,
      description: "PhD (Electrical Engineering) from Jadavpur University (2021)",interest:"Electrical engineering is the field of engineering that deals with the study, design, and application of electrical systems, including circuits, power generation, control systems, and telecommunications.",
    },
    {
      name: "Dr. Somnath Das",
      image: somnath,
      description: "PhD (Electrical Engineering) from NIT Jamshedpur (2019)",interest:"A renewable energy system harnesses natural resources like sunlight, wind, and water to generate clean, sustainable power with minimal environmental impact.",
    }, 
    
  ];

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Who We Are Section */}
      <section className="text-center py-12 px-6" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Advisory Committee</h1>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
        At ScienceTech Academy, we believe that expert guidance and strategic insights are essential for driving academic excellence and innovation. Our Advisory Committee comprises distinguished professionals, academicians, and industry leaders who provide valuable counsel in shaping the institution’s vision, policies, and academic programs.

This esteemed committee plays a pivotal role in enhancing research opportunities, curriculum development, and fostering industry-academia collaboration. By leveraging their vast experience and expertise, the Advisory Committee ensures that ScienceTech Academy remains at the forefront of scientific education, research advancements, and technological innovation.

Through their continuous engagement and mentorship, our committee members help us cultivate an environment where students and researchers can explore, innovate, and contribute meaningfully to the ever-evolving scientific landscape.
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
                className="mx-auto rounded-full h-32 w-32 border-4 border-green-200 shadow-md" 
              />
              <h3 className="text-xl font-bold mt-4">{member.name}</h3>
              <p className="mt-2 text-gray-700">{member.description}</p>
              <p className="text-gray-500">{member.interest}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do Section
      <section className="py-12 px-6 text-center bg-blue-600 text-white" data-aos="fade-up">
        <h2 className="text-3xl font-semibold mb-4">What We Do</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          At ScienceTech Academy, we organize competitions, scientific research programs, 
          mentorship sessions, and educational initiatives to promote knowledge and innovation. 
          Join us in shaping the future of science and technology!
        </p>
      </section> */}
    </div>
  );
};

export default Advisory;
