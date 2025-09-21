import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export default function SubjectSelection() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("studentDetails"));
  // ✅ NEW state for subject + module selection
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedModule, setSelectedModule] = useState("");


  // Idle timer
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        alert("You were idle for 7 minutes. Logging out...");
        localStorage.removeItem("studentDetails");
        localStorage.removeItem("suuid");
        navigate("/");
      }, 250000);
    };

    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onkeypress = resetTimer;
    window.onclick = resetTimer;
    window.onscroll = resetTimer;

    resetTimer();

    return () => clearTimeout(timer);
  }, [navigate]);

  // ✅ Redirect to login if no student info
  if (!student) {
    return <Navigate to="/examlogin" replace />;
  }


  // Example module list per subject
  const modules = {
    Physics: ["Units, Dimensions & Errors", "Kinematics", "Laws of Motion","Work, Power & Energy","Rotational Motion"],
    Chemistry: ["Basic Concepts & Atomic Structure", "Periodic Table & Chemical Bonding", "States of Matter & Thermodynamics","Equilibrium & Redox","Chemical Kinetics & Surface Chemistry"],
    Mathematics: ["Sets, Relations, Functions", "Quadratic Equations & Complex Numbers", "Sequence & Series, Binomial Theorem","Permutations, Combinations & Probability","Trigonometry & Inverse Trigonometry"],
  };
// ✅ Utility to make the route
const getModulePath = (subject, module) => {
  const subjectPrefix = {
    Physics: "p",
    Chemistry: "c",
    Mathematics: "m",
  }[subject];

  const index = modules[subject].indexOf(module) + 1; // 1-based index

  return `/${subjectPrefix}m${index}`;
};

// ✅ Handle exam start
const handleChapterExam = () => {
  if (!selectedSubject || !selectedModule) {
    alert("Please select both subject and module!");
    return;
  }

  localStorage.setItem("suuid", crypto.randomUUID());
  localStorage.setItem("subject", selectedSubject);
  localStorage.setItem("module", selectedModule);

  // 🚀 Direct redirect according to dropdown
  const path = getModulePath(selectedSubject, selectedModule);
  navigate(path);
};

  const handleSelect = (subject) => {
    // ✅ Generate a session uuid (suuid) so exam page can verify
    localStorage.setItem("suuid", crypto.randomUUID());
    localStorage.setItem("subject", subject);

    alert(`You selected ${subject}. Exam will start now.`);

    if (subject === "Mathematics") {
      navigate("/math");
    } else if (subject === "Physics") {
      navigate("/physics");
    } else if (subject === "Chemistry") {
      navigate("/chemistry");
    }
    else if (subject === "FullCourse") {
      navigate("/fullcourse");
    }
    else if (subject === "Test") {
      navigate("/test");
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-7xl w-full text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Welcome, {student.name}
        </h2>

        <div className="space-y-3 ">

          <div className="mt-8 text-gray-700 border-t pt-6 
                grid grid-cols-1 lg:grid-cols-3 gap-8 
                items-stretch">   {/* ensures equal height */}

            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow h-full flex flex-col ">
              <p className="text-lg font-bold mb-4">Module MOCK</p>
                              <p className="mb-4">Please review the details carefully before starting:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Duration:</strong> 1 hours</li>
                  <li><strong>Total Marks:</strong> 100 </li>
                  <li><strong>Total Questions:</strong> 25 </li>
                  <li>
                    <strong>Marking Scheme:</strong>
                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1 text-gray-600">
                      <li>Correct Answer: <span className="text-green-600 font-medium">+4 marks</span></li>
                      <li>Incorrect Answer: <span className="text-red-600 font-medium">-1 mark</span></li>
                      <li>Unattempted: <span className="text-gray-500 font-medium">0 marks</span></li>
                    </ul>
                  </li>
                </ul>
              {/* Subject dropdown */}
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setSelectedModule("");
                }}
                className="w-full border p-2 rounded mb-3"
              >
                <option value="">-- Select Subject --</option>
                {Object.keys(modules).map((subj) => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>

              {/* Module dropdown */}
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                disabled={!selectedSubject}
                className="w-full border p-2 rounded mb-3"
              >
                <option value="">-- Select Module --</option>
                {selectedSubject &&
                  modules[selectedSubject].map((mod) => (
                    <option key={mod} value={mod}>{mod}</option>
                  ))}
              </select>

              <button
                onClick={handleChapterExam}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg mt-auto"
              >
                Start Chapter Exam
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow h-full flex flex-col">
              <div className="flex-1">
                <p className="text-lg font-bold mb-2">Subject MOCK</p>
                <p className="mb-4">Please review the details carefully before starting:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Duration:</strong> 1 hours</li>
                  <li><strong>Total Marks:</strong> 100 </li>
                  <li><strong>Total Questions:</strong> 25 </li>
                  <li>
                    <strong>Marking Scheme:</strong>
                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1 text-gray-600">
                      <li>Correct Answer: <span className="text-green-600 font-medium">+4 marks</span></li>
                      <li>Incorrect Answer: <span className="text-red-600 font-medium">-1 mark</span></li>
                      <li>Unattempted: <span className="text-gray-500 font-medium">0 marks</span></li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 mt-4">
                <button
                  onClick={() => handleSelect("Physics")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Physics
                </button>
                <button
                  onClick={() => handleSelect("Chemistry")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                  Chemistry
                </button>
                <button
                  onClick={() => handleSelect("Mathematics")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
                >
                  Mathematics
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow h-full flex flex-col">
              <div className="flex-1">
                <p className="text-lg font-bold mb-2">Full MOCK</p>
                <p className="mb-4">Please review the details carefully before starting:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Duration:</strong> 3 hours</li>
                  <li><strong>Total Marks:</strong> 300 (100 per subject)</li>
                  <li><strong>Total Questions:</strong> 75 (25 per subject)</li>
                  <li>
                    <strong>Marking Scheme:</strong>
                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1 text-gray-600">
                      <li>Correct Answer: <span className="text-green-600 font-medium">+4 marks</span></li>
                      <li>Incorrect Answer: <span className="text-red-600 font-medium">-1 mark</span></li>
                      <li>Unattempted: <span className="text-gray-500 font-medium">0 marks</span></li>
                    </ul>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSelect("FullCourse")}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg mt-4"
              >
                Full MOCK (PCM)
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
