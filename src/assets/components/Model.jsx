import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import model2k23 from "../images/model2K23.jpg";
import model2k24 from "../images/model2K24.jpg";
import prize2k24 from "../images/prize2k23_1.jpg";
import prize2k24_2 from "../images/prize2k24_2.jpg";
import { X } from "lucide-react"; // Close Icon

const images = [
  { src: model2k23, title: "Model Presentation 2023", desc: "An innovative showcase of student projects." },
  { src: model2k24, title: "Model Presentation 2024", desc: "Students exhibited their cutting-edge scientific models." },
  { src: prize2k24, title: "Prize Distribution 2023", desc: "Recognizing the outstanding contributions in model competitions." },
  { src: prize2k24_2, title: "Prize Distribution 2024", desc: "Winners received recognition for their innovative projects." },
];

const Model = () => {
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

export default Model;
