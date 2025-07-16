import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const categories = [
  { title: "Honorary Membership (By Invitation Only)", description: "Awarded to distinguished educators...", fee: "", offer: "Nill" },
  { title: "Lifetime Membership", description: "One-time membership for educators...", fee: "Rs. 5,000/-", offer: "Free Upto 31st July 2025" },
  { title: "Professional Membership", description: "Designed for teachers seeking advanced training...", fee: "Rs. 2,000/-", offer: "Free Upto 31st July 2025" },
  { title: "Student Membership", description: "Open to all high school students...", fee: "", offer: "Nill" },
  { title: "Institutional Membership", description: "Available for schools and institutions...", fee: "Rs. 10,000/-", offer: "Free Upto 31st July 2025" },
];

const Member = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", membershipType: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show "Please Wait..." message

    const scriptURL = "https://script.google.com/macros/s/AKfycbzcuoYNNJRsCGPHCDc5OT84fxAkkZca6awOvwS0N8EF_DE0jWD4VZ7-oHEFKpWSnwocmg/exec"; // Replace with the correct Google Apps Script URL
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000); // Hide success message after 3 seconds
      setFormData({ name: "", email: "", phone: "", membershipType: "" }); // Clear form
    } catch (error) {
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false); // Hide "Please Wait..." message
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 py-12 px-6">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-8" data-aos="fade-down">Membership</h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto" data-aos="fade-up">
        {categories.map((category, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">{category.title}</h2>
            <p className="text-gray-700 mb-2">{category.description}</p>
            <p className="font-semibold">Membership Fee: <span className="line-through">{category.fee}</span></p>
            <p className="font-bold">{category.offer}</p>
          </div>
        ))}
      </div>

      <section className="py-12 px-6 text-center bg-blue-600 text-white" data-aos="fade-up">
        <h2 className="text-3xl font-semibold mb-4">Membership Registration</h2>
        
        <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-gray-900" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left font-semibold">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded-md" />
          </div>
          
          <div className="mb-4">
            <label className="block text-left font-semibold">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded-md" />
          </div>
          
          <div className="mb-4">
            <label className="block text-left font-semibold">Mobile Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded-md" />
          </div>

          <div className="mb-4">
            <label className="block text-left font-semibold">Membership Type</label>
            <select name="membershipType" value={formData.membershipType} onChange={handleChange} required className="w-full p-2 border rounded-md">
              <option value="">Select Membership Type</option>
              {categories.map((category, index) => (
                <option key={index} value={category.title}>{category.title}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700" disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : "Submit"}
          </button>
        </form>

        {submitted && <p className="text-white mt-4">Form submitted successfully!</p>}
      </section>
    </div>
  );
};

export default Member;
