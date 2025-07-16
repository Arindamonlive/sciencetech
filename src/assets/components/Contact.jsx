import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Loader2 } from "lucide-react"; // Loader Icon

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    classSem: "",
    schoolCollege: "",
    question: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Google Apps Script Deployment URL (Replace with your actual deployment URL)
  const API_URL = "https://script.google.com/macros/s/AKfycbwYJ0wvLfElU4tmhoJo4I7FrF42sLZEq5syfOendwSUcAUNPQaEgwFNYQ6_VuEgzP4iXw/exec";

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        mode: "no-cors", // Temporary workaround
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      console.log("Response:", response);
  
      setMessage("✅ Form submitted successfully!");
      setFormData({ name: "", classSem: "", schoolCollege: "", question: "" }); // Clear form
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("❌ Failed to submit the form. Please try again.");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6" data-aos="fade-down">
        📩 Contact Us
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6"
        data-aos="fade-up"
      >
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Class/Sem */}
        <div className="mb-4">
          <label htmlFor="classSem" className="block text-lg font-medium">
            Class / Semester
          </label>
          <input
            id="classSem"
            type="text"
            name="classSem"
            value={formData.classSem}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., 10th Grade / 2nd Semester"
          />
        </div>

        {/* School / College */}
        <div className="mb-4">
          <label htmlFor="schoolCollege" className="block text-lg font-medium">
            School / College
          </label>
          <input
            id="schoolCollege"
            type="text"
            name="schoolCollege"
            value={formData.schoolCollege}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your institution's name"
          />
        </div>

        {/* Question */}
        <div className="mb-4">
          <label htmlFor="question" className="block text-lg font-medium">
            Your Message
          </label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Type your query here..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Submit"}
        </button>

        {/* Response Message */}
        {message && (
          <p className="mt-4 text-center font-medium">
            {message.includes("✅") ? (
              <span className="text-green-600">{message}</span>
            ) : (
              <span className="text-red-600">{message}</span>
            )}
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;
