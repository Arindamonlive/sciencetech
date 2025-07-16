import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../images/2025stech1.png";
import img2 from "../images/2025stech2.png";
import img3 from "../images/2025stech3.png";
import img4 from "../images/2025stech4.png";
import img5 from "../images/2025stech5.png";
import img6 from "../images/2025stech6.png";
import img7 from "../images/2025stech7.png";
import img8 from "../images/2025stech8.png";
import img9 from "../images/2025stech9.png";
import img10 from "../images/2025stech10.png";
import img11 from "../images/2025stech11.png";
import img12 from "../images/2025stech12.png";

import { X } from "lucide-react"; // Close Icon

const images = [
  
//   { src: model2k24, title: "Model Presentation 2024", desc: "Students exhibited their cutting-edge scientific models." },
//   { src: prize2k24_2, title: "Prize Distribution 2024", desc: "Winners received recognition for their innovative projects." },
//   { src: quiz2k24, title: "Quiz 2024", desc: "A thrilling event with exceptional performances." },

{ src: img1, title: "", desc: "." },
{ src: img2, title: "", desc: "." },
{ src: img3, title: "", desc: "." },
{ src: img4, title: "", desc: "." },
{ src: img5, title: "", desc: "." },
{ src: img6, title: "", desc: "." },
{ src: img7, title: "", desc: "." },
{ src: img8, title: "", desc: "." },
{ src: img9, title: "", desc: "." },
{ src: img10, title: "", desc: "." },
{ src: img11, title: "", desc: "." },
{ src: img12, title: "", desc: "." },



];

const Event2024 = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6" data-aos="fade-down">
        Annual ScienceTech Academy Model Exhibition
      </h1>
  
      {/* Description */}
      <p className="text-lg text-gray-700 text-center mb-8" data-aos="fade-up">
        The ScienceTech Academy successfully organized its annual model presentation for 
        2023 and 2024. Students showcased their innovative projects, demonstrating creativity 
        and technical skills across various disciplines.
      </p>
  
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {images.map((item, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition transform duration-300"
            onClick={() => setSelectedImage(item)}
            data-aos="zoom-in"
          >
            <img src={item.src} alt={item.title} className="w-full h-[300px] object-cover" />
            <div className="p-4 bg-gray-100">
              <h3 className="text-xl font-semibold text-blue-700">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
  
      {/* Embedded YouTube Videos */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/WUTDQ-bchY8?start=178"
            title="YouTube video 1"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/X2OSd136S_A?start=66"
            title="YouTube video 2"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/mTn_x2tkGVs?start=1167"
            title="YouTube video 3"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
  
      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative bg-white p-6 rounded-lg max-w-4xl w-full shadow-lg" data-aos="fade-in">
            <button
              className="absolute top-2 right-2 text-white bg-black p-2 rounded-full hover:bg-gray-800 transition"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="w-full max-h-[80vh] object-contain rounded-lg" 
            />
            <h2 className="text-2xl font-bold text-center text-blue-600 mt-4">{selectedImage.title}</h2>
            <p className="text-lg text-center text-gray-700">{selectedImage.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Event2024;
