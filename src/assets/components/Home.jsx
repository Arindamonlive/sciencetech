import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import directorImage from "../images/somnathdas.png"; 
// import slide1 from "../images/hs1.jpg"; 
import slide2 from "../images/hs2.jpg";
import slide3 from "../images/hs3.jpg";
import slide1 from "../images/mock_test_series_2026.png";
const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation happens once per scroll
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      {/* Section 1: Full-Width Slideshow */}
      <section className="w-full h-full" data-aos="fade-up">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          <div>
            <img src={slide1} alt="Slide 1" className="w-full h-full object-cover" />
          </div>
          <div>
            <img src={slide2} alt="Slide 2" className="w-full h-full object-cover" />
          </div>
          <div>
            <img src={slide3} alt="Slide 3" className="w-full h-full object-cover" />
          </div>
        </Carousel>
      </section>

      {/* Section 2: Deputy Registrar's Note */}
      <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <div className="flex-shrink-0" data-aos="zoom-in">
          <img
            src={directorImage}
            alt="President"
            className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-justify" data-aos="fade-left">
          <h2 className="text-3xl font-bold text-blue-600">Secretary Message</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Welcome to ScienceTech Academy, where curiosity meets innovation! We empower high school students with cutting-edge science & technology education, hands-on experiments, and real-world applications. Join us on the journey of discovery.
          </p>
          <p className="mt-4 font-semibold text-gray-900">- Dr. Somnath Das, Secretary</p>
        </div>
      </section>

      {/* Section 3: History of the Academy */}
      <section className="bg-gray-100 py-12" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-600 text-center" data-aos="fade-up">History of the Academy</h2>
          <p className="mt-6 text-gray-700 leading-relaxed text-justify" data-aos="fade-right">
            Founded in 2022, ScienceTech Academy has been at the forefront of
            scientific education and research. Over the years, we have conducted numerous 
            programs, competitions, and workshops, inspiring students to push the boundaries 
            of knowledge. Our legacy is built on excellence, commitment, and innovation in 
            the field of science and technology.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
