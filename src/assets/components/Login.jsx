import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function ExamLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    school: "",
    mobile: "",
    studentClass: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.school || !form.mobile || !form.studentClass) {
      alert("Please fill in all fields");
      return;
    }

    // ✅ Generate uuid
    const studentData = {
      ...form,
      uuid: uuidv4(),
    };

    // ✅ Save to localStorage
    localStorage.setItem("studentDetails", JSON.stringify(studentData));
    localStorage.removeItem("suuid");

try {
  // ✅ Retrieve data from localStorage
  const localData = JSON.parse(localStorage.getItem("studentDetails"));

  // 🔄 Convert JSON data to URL-encoded format
  const formData = new URLSearchParams();
  for (const key in localData) {
    if (Object.prototype.hasOwnProperty.call(localData, key)) {
      formData.append(key, localData[key]);
    }
  }

  // ✅ Send the URL-encoded data
  const res2 = await fetch("https://script.google.com/macros/s/AKfycbxDj9dpI-2Af-1_tW1HU38f6QOKnvqeTAVkwR-fAWCI1AuaKRefn_ePcPOraF-_kekG/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData, // Send URLSearchParams object
  });

  const result2 = await res2.json();
  console.log("✅ API Response (localStorage):", result2);

  navigate("/subjects");
} catch (error) {
  console.error("❌ Error posting student:", error);
  alert("Failed to register student!");
}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Exam Login
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block font-medium text-gray-700 mb-1">
            Student Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg mb-3"
            required
          />

          <label className="block font-medium text-gray-700 mb-1">
            School Name
          </label>
          <input
            type="text"
            name="school"
            value={form.school}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg mb-3"
            required
          />

<label className="block font-medium text-gray-700 mb-1">
  Mobile Number
</label>
<input
  type="tel"
  name="mobile"
  value={form.mobile}
  onChange={handleChange}
  className="w-full px-3 py-2 border rounded-lg mb-3"
  required
  maxLength={10}                         
  pattern="\d{10}"  
  inputMode="numeric"                   
  title="Mobile number must be 10 digits"
/>

          <label className="block font-medium text-gray-700 mb-1">
            Class
          </label>
          <select
            name="studentClass"
            value={form.studentClass}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg mb-5"
            required
          >
            <option value="">-- Select Class --</option>
            <option>Class XI</option>
            <option>Class XII</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
