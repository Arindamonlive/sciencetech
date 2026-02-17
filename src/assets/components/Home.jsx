import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import directorImage from "../images/somnathdas.png"; 
// import slide1 from "../images/hs1.jpg";
// import slide2 from "../images/hs2.jpg";
// import slide3 from "../images/hs3.jpg";
// import slide4 from "../images/mock_test_series_2026.jpg";
import slide1 from "../images/heroslide1.jpeg";
import slide2 from "../images/heroslide2.jpeg";
import slide3 from "../images/heroslide3.jpeg";
import slide4 from "../images/heroslide4.jpeg";
import slide5 from "../images/heroslide5.jpeg";
import slide6 from "../images/heroslide6.jpeg";
import slide7 from "../images/heroslide7.jpeg";
import slide8 from "../images/heroslide8.jpeg";
import slide9 from "../images/heroslide9.jpeg";
import slide10 from "../images/heroslide10.jpeg";
import slide11 from "../images/heroslide11.jpeg";
import slide12 from "../images/heroslide12.jpeg";
import slide13 from "../images/heroslide13.jpeg";
import slide14 from "../images/heroslide14.jpeg";
import slide15 from "../images/heroslide15.jpeg";
import slide16 from "../images/heroslide16.jpeg";
import slide17 from "../images/heroslide17.jpeg";
import slide18 from "../images/heroslide18.jpeg";
import slide19 from "../images/heroslide19.jpeg";
import announcment from "/currentyearassests/2026bro.jpeg";
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
          <div>
            <img src={slide4} alt="Slide 4" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide5} alt="Slide 5" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide6} alt="Slide 6" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide7} alt="Slide 7" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide8} alt="Slide 8" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide9} alt="Slide 9" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide10} alt="Slide 10" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide11} alt="Slide 11" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide12} alt="Slide 12" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide13} alt="Slide 13" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide14} alt="Slide 14" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide15} alt="Slide 15" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide16} alt="Slide 16" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide17} alt="Slide 17" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide18} alt="Slide 18" className="w-full h-full object-cover" />
          </div>
                    <div>
            <img src={slide19} alt="Slide 19" className="w-full h-full object-cover" />
          </div>
        </Carousel>
      </section>

      {/* Section 2: Deputy Registrar's Note */}
{/* Section 2: Deputy Registrar's Note */}
<section className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
  
  {/* LEFT: Secretary Message */}
  <div className="flex flex-col md:flex-row items-center gap-8 md:w-2/3">
    
    {/* Image */}
    <div className="flex-shrink-0" data-aos="zoom-in">
      <img
        src={directorImage}
        alt="Secretary"
        className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-lg"
      />
    </div>

    {/* Text Content */}
    <div className="text-justify" data-aos="fade-left">
      <h2 className="text-3xl font-bold text-blue-600">
        Secretary’s Message
      </h2>
      <p className="mt-4 text-gray-700 leading-relaxed">
        Welcome to ScienceTech Academy, where curiosity meets innovation! 
        We empower high school students with cutting-edge science & technology education, 
        hands-on experiments, and real-world applications.
      </p>
      <p className="mt-4 font-semibold text-gray-900">
        – Dr. Somnath Das, Secretary
      </p>
    </div>
  </div>

  {/* RIGHT: ANNOUNCEMENTS */}
  <div
    className="md:w-1/3 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-md"
    data-aos="fade-up"
  >
    <h3 className="text-2xl font-bold text-blue-700 mb-4">
      📢 Announcements
    </h3>

    <ul className="space-y-4 text-gray-700">
<li>
  <a
    href={announcment}
    download="ScienceTech_2026_Brochure.jpg"
    className="flex items-start gap-2 cursor-pointer hover:text-blue-700 transition"
  >
    <span className="font-semibold text-red-600">🔴 New:</span>
    <span className="underline">
      ScienceTech 2026 registration is now open.
    </span>
  </a>
</li>


      <li>
        📅 <strong>Event Date:</strong> 18 April 2026 (Saturday)
      </li>

      <li>
        🏫 <strong>Venue:</strong> SVIST Campus, Sonarpur
      </li>

      <li>
        🆓 <strong>Free Registration</strong> for all participants.
      </li>

      <li>
        🏆 <strong>Attractive Cash Prizes</strong> for winners.
      </li>

      <li>
        ⏰ <strong>Last Date:</strong>{" "}
        <span className="text-red-700 font-semibold">
          01 April 2026
        </span>
      </li>
    </ul>
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
