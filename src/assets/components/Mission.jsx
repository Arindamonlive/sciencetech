import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const MissionVision = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation happens once per scroll
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white text-center py-20 rounded-lg shadow-lg" data-aos="fade-down">
        <h1 className="text-4xl font-bold">Our Mission & Vision</h1>
        <p className="text-lg mt-2">Empowering the Future with Knowledge & Innovation</p>
      </div>

      {/* Vision Section */}
      <div className="mt-12 flex flex-col items-center text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Vision</h2>
        <p className="max-w-2xl text-gray-700 text-lg">
          The Institute is driven to encourage students' innovation, excellence, and inclusivity
          in specific fields or a broader context.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6" data-aos="fade-up">Our Mission</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mission Points */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md" data-aos="fade-right">
            <h3 className="text-xl font-bold text-blue-600 mb-2">01. Innovative Curriculum</h3>
            <p className="text-gray-700">
              To provide a rigorous and innovative curriculum that fosters critical thinking,
              creativity, and lifelong learning.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md" data-aos="fade-left">
            <h3 className="text-xl font-bold text-blue-600 mb-2">02. Community Engagement</h3>
            <p className="text-gray-700">
              To build strong partnerships with local and global communities to enhance
              learning opportunities and contribute to societal well-being.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md" data-aos="fade-right">
            <h3 className="text-xl font-bold text-blue-600 mb-2">03. Inclusive Environment</h3>
            <p className="text-gray-700">
              To cultivate a welcoming and respectful campus where all individuals feel valued
              and supported.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md" data-aos="fade-left">
            <h3 className="text-xl font-bold text-blue-600 mb-2">04. Leadership & Growth</h3>
            <p className="text-gray-700">
              To encourage personal development and leadership through a wide range of
              extracurricular activities and support services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
