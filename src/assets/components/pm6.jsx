import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function PhysicsExamPage() {
    const [answers, setAnswers] = useState({});
        const [submitted, setSubmitted] = useState(false);
        const [score, setScore] = useState(0);
        const [shuffledQuestions, setShuffledQuestions] = useState([]);
        const [currentPage, setCurrentPage] = useState(0);
        const [studentDetails, setStudentDetails] = useState({
            name: "Unknown",
            school: "",
            studentClass: ""
        });
    
    
    
    // Timer + qp control 
    
    const [timeLeft, setTimeLeft] = useState(1800); // 1 hour = 3600s
    // Timer countdown
    useEffect(() => {
      if (submitted) return; // stop timer when submitted
      if (timeLeft <= 0) {
        handleSubmit(); // auto-submit when time ends
        return;
      }
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }, [timeLeft, submitted]);
    const formatTime = (seconds) => {
      const m = String(Math.floor(seconds / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      return `${m}:${s}`;
    };
    useEffect(() => {
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled.slice(0, 25)); // pick only 25
    }, []);
    // Floating Timer (top-right corner)
    const TimerDisplay = () => (
    <div
      className="
        fixed top-4 right-4 
        bg-red-600 text-white 
        px-5 py-3 
        rounded-xl shadow-lg 
        font-bold 
        text-lg sm:text-xl md:text-2xl 
        z-50 border-2 border-white
      "
    >
      ⏳ {formatTime(timeLeft)}
    </div>
    );
    
    const totalQuestions = 25;
    const selectedQuestions = shuffledQuestions.slice(0, totalQuestions);
    const pageSize = 10; // show 10 per page
    const paginatedQuestions = selectedQuestions.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );
    
    
    
    
    
    // Timer + qp control 
    
    
    
        const navigate = useNavigate();
        const suuid = localStorage.getItem("suuid");
        if (!suuid) return <Navigate to="/subjects" replace />;
    
        // Load student details from localStorage
        useEffect(() => {
            const storedDetails = localStorage.getItem("studentDetails");
            if (storedDetails) {
                try {
                    const parsed = JSON.parse(storedDetails);
                    setStudentDetails({
                        name: parsed.name || "Unknown",
                        school: parsed.school || "",
                        studentClass: parsed.studentClass || ""
                    });
                } catch (err) {
                    console.error("Failed to parse studentDetails:", err);
                }
            }
        }, []);
    
        // Idle logout (15 mins)
        useEffect(() => {
            let timer;
            const resetTimer = () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    alert("You were idle for 15 minutes. Redirecting to subjects...");
                    localStorage.removeItem("suuid");
                    navigate("/subjects");
                }, 900000); // 15 mins
            };
            ["load", "mousemove", "keypress", "click", "scroll"].forEach((evt) => {
                window.addEventListener(evt, resetTimer);
            });
            resetTimer();
            return () => {
                clearTimeout(timer);
                ["load", "mousemove", "keypress", "click", "scroll"].forEach((evt) => {
                    window.removeEventListener(evt, resetTimer);
                });
            };
        }, [navigate]);
    
    const questions = [
  {
    id: 151,
    question: "The gravitational force between two masses is F. If the distance between them is doubled, the new force becomes:",
    options: [
      "F",
      "F/2",
      "F/4",
      "4F"
    ],
    correct: "F/4",
    marks: 4,
    negative: 1
  },
  {
    id: 152,
    question: "The value of acceleration due to gravity at Earth’s surface is g. Its value at height h (h << R) above the surface is approximately:",
    options: [
      "g",
      "g(1 – 2h/R)",
      "g(1 – h/R)",
      "g(1 – h/2R)"
    ],
    correct: "g(1 – h/R)",
    marks: 4,
    negative: 1
  },
  {
    id: 153,
    question: "A body weighs 72 N on the surface of Earth. What will be its weight on the surface of Moon ($g_{moon} = g/6$)?",
    options: [
      "72 N",
      "36 N",
      "12 N",
      "432 N"
    ],
    correct: "12 N",
    marks: 4,
    negative: 1
  },
  {
    id: 154,
    question: "The escape velocity from Earth’s surface is approximately:",
    options: [
      "7 km/s",
      "11.2 km/s",
      "9.8 km/s",
      "15 km/s"
    ],
    correct: "11.2 km/s",
    marks: 4,
    negative: 1
  },
  {
    id: 155,
    question: "A satellite revolves close to Earth’s surface. Its orbital velocity depends on:",
    options: [
      "Mass of Earth only",
      "Radius of Earth only",
      "Both mass and radius of Earth",
      "Independent of Earth"
    ],
    correct: "Both mass and radius of Earth",
    marks: 4,
    negative: 1
  },
  {
    id: 156,
    question: "If the radius of Earth decreases by 1% without change in mass, the acceleration due to gravity on the surface will:",
    options: [
      "Increase by 1%",
      "Increase by 2%",
      "Decrease by 1%",
      "Remain constant"
    ],
    correct: "Increase by 2%",
    marks: 4,
    negative: 1
  },
  {
    id: 157,
    question: "Gravitational potential energy of a body of mass m at a height h (h << R) is approximately:",
    options: [
      "mgh",
      "–mgh",
      "–GMm/R",
      "–GMm/(R+h)"
    ],
    correct: "mgh",
    marks: 4,
    negative: 1
  },
  {
    id: 158,
    question: "A satellite is in circular orbit around Earth. The ratio of kinetic energy to potential energy is:",
    options: [
      "1",
      "2",
      "1/2",
      "–1"
    ],
    correct: "1/2",
    marks: 4,
    negative: 1
  },
  {
    id: 159,
    question: "The time period of a geostationary satellite is:",
    options: [
      "24 h",
      "12 h",
      "6 h",
      "48 h"
    ],
    correct: "24 h",
    marks: 4,
    negative: 1
  },
  {
    id: 160,
    question: "The gravitational potential at a point due to a mass M at distance r is:",
    options: [
      "GM/r²",
      "–GM/r",
      "–GM/r²",
      "GM/r"
    ],
    correct: "–GM/r",
    marks: 4,
    negative: 1
  },
  {
    id: 161,
    question: "A body of mass m is raised to a height equal to the radius of Earth R. The increase in potential energy is:",
    options: [
      "mgR",
      "2mgR",
      "mgR/2",
      "Zero"
    ],
    correct: "mgR/2",
    marks: 4,
    negative: 1
  },
  {
    id: 162,
    question: "The value of g at the center of Earth is:",
    options: [
      "g",
      "g/2",
      "Zero",
      "Infinity"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 163,
    question: "The orbital speed of a satellite just above Earth’s surface is:",
    options: [
      "√(gR)",
      "√(2gR)",
      "gR",
      "g"
    ],
    correct: "√(gR)",
    marks: 4,
    negative: 1
  },
  {
    id: 164,
    question: "If a satellite is projected with velocity greater than escape velocity, it will:",
    options: [
      "Revolve around Earth",
      "Fall back to Earth",
      "Escape from Earth’s gravitational field",
      "Move in elliptical orbit"
    ],
    correct: "Escape from Earth’s gravitational field",
    marks: 4,
    negative: 1
  },
  {
    id: 165,
    question: "The ratio of acceleration due to gravity at poles and equator (neglecting Earth’s rotation) is:",
    options: [
      "1",
      ">1",
      "<1",
      "0"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 166,
    question: "The SI unit of Young’s modulus is:",
    options: [
      "N",
      "N/m",
      "N/m²",
      "J"
    ],
    correct: "N/m²",
    marks: 4,
    negative: 1
  },
  {
    id: 167,
    question: "Stress/strain is called:",
    options: [
      "Elastic limit",
      "Young’s modulus",
      "Bulk modulus",
      "Modulus of elasticity"
    ],
    correct: "Modulus of elasticity",
    marks: 4,
    negative: 1
  },
  {
    id: 168,
    question: "For a liquid in capillary tube, rise of liquid is due to:",
    options: [
      "Viscosity",
      "Surface tension",
      "Density",
      "Elasticity"
    ],
    correct: "Surface tension",
    marks: 4,
    negative: 1
  },
  {
    id: 169,
    question: "Terminal velocity of a spherical body of radius r falling in a viscous medium is proportional to:",
    options: [
      "r",
      "r²",
      "r³",
      "1/r"
    ],
    correct: "r²",
    marks: 4,
    negative: 1
  },
  {
    id: 170,
    question: "Bernoulli’s theorem is based on:",
    options: [
      "Conservation of mass",
      "Conservation of energy",
      "Conservation of momentum",
      "Newton’s second law"
    ],
    correct: "Conservation of energy",
    marks: 4,
    negative: 1
  },
  {
    id: 171,
    question: "A liquid drop tends to assume spherical shape due to:",
    options: [
      "Viscosity",
      "Cohesion",
      "Surface tension",
      "Pressure"
    ],
    correct: "Surface tension",
    marks: 4,
    negative: 1
  },
  {
    id: 172,
    question: "The pressure at depth h in a liquid of density $\\rho$ is:",
    options: [
      "$\\rho gh$",
      "$\\rho/h$",
      "$h/\\rho$",
      "$\\rho h^2g$"
    ],
    correct: "$\\rho gh$",
    marks: 4,
    negative: 1
  },
  {
    id: 173,
    question: "If excess pressure inside a soap bubble of radius r is P, then surface tension is:",
    options: [
      "Pr/2",
      "Pr/4",
      "P/2r",
      "2Pr"
    ],
    correct: "Pr/4",
    marks: 4,
    negative: 1
  },
  {
    id: 174,
    question: "The bulk modulus of an incompressible liquid is:",
    options: [
      "Zero",
      "Infinite",
      "Finite",
      "Equal to its density"
    ],
    correct: "Infinite",
    marks: 4,
    negative: 1
  },
  {
    id: 175,
    question: "A hydraulic press works on:",
    options: [
      "Pascal’s law",
      "Archimedes’ principle",
      "Newton’s law",
      "Hooke’s law"
    ],
    correct: "Pascal’s law",
    marks: 4,
    negative: 1
  },
  {
    id: 176,
    question: "Streamline flow is possible when:",
    options: [
      "Reynolds number is less than 2000",
      "Reynolds number is greater than 2000",
      "Velocity is very high",
      "Flow is turbulent"
    ],
    correct: "Reynolds number is less than 2000",
    marks: 4,
    negative: 1
  },
  {
    id: 177,
    question: "The dimensional formula of viscosity coefficient $\\eta$ is:",
    options: [
      "[ML⁻¹T⁻²]",
      "[ML⁻¹T⁻¹]",
      "[M⁻¹L⁻¹T]",
      "[M⁰LT⁻²]"
    ],
    correct: "[ML⁻¹T⁻¹]",
    marks: 4,
    negative: 1
  },
  {
    id: 178,
    question: "If work done in stretching a wire is W, then elastic potential energy per unit volume is:",
    options: [
      "W/V",
      "W/l",
      "W/A",
      "W/m"
    ],
    correct: "W/V",
    marks: 4,
    negative: 1
  },
  {
    id: 179,
    question: "The rise of liquid in capillary tube is inversely proportional to:",
    options: [
      "Surface tension",
      "Density",
      "Radius of tube",
      "Cohesive force"
    ],
    correct: "Radius of tube",
    marks: 4,
    negative: 1
  },
  {
    id: 180,
    question: "The Poisson’s ratio is defined as:",
    options: [
      "Longitudinal strain/lateral strain",
      "Stress/strain",
      "Lateral strain/longitudinal strain",
      "Bulk strain/longitudinal strain"
    ],
    correct: "Lateral strain/longitudinal strain",
    marks: 4,
    negative: 1
  }
  

];

    useEffect(() => {
            const shuffled = [...questions].sort(() => Math.random() - 0.5);
            setShuffledQuestions(shuffled);
        }, []);
    
        const handleChange = (qid, option) => setAnswers({ ...answers, [qid]: option });
    
        const handleSubmit = () => {
            let total = 0;
            shuffledQuestions.forEach((q) => {
                if (answers[q.id] === q.correct) total += q.marks;
                else if (answers[q.id]) total -= q.negative;
            });
            setScore(total);
            setSubmitted(true);
            printPDF(total);
        };
    
const printPDF = async (finalScore = score, questionsForPDF = selectedQuestions) => {
  const doc = new jsPDF();
  const currentDateTime = new Date().toLocaleString();

  // Header
  doc.setFontSize(18);
  doc.text("Exam Results - Physics(Rotational Motions)", 14, 20);

  doc.setFontSize(12);
  doc.text(`Name: ${studentDetails.name}`, 14, 28);
  doc.text(`Class: ${studentDetails.studentClass}`, 14, 34);
  doc.text(`School: ${studentDetails.school}`, 14, 40);
  doc.text(`Date & Time: ${currentDateTime}`, 14, 46);

  // Table
  const tableData = questionsForPDF.map((q, idx) => [
    idx + 1,
    q.question,
    answers[q.id] || "Not Answered",
    q.correct,
    answers[q.id] === q.correct ? "Correct" : "Wrong",
  ]);

  autoTable(doc, {
    head: [["No", "Question", "Your Answer", "Correct Answer", "Result"]],
    body: tableData,
    startY: 52,
  });

  // Total Score
  doc.text(
    `Total Score: ${finalScore} / ${questionsForPDF.reduce((a, q) => a + q.marks, 0)}`,
    14,
    doc.lastAutoTable.finalY + 10
  );
    
    try {
      // Get data from localStorage
      const storedDetails = JSON.parse(localStorage.getItem("studentDetails"));
    
      if (storedDetails && storedDetails.uuid) {
        // 🔄 Prepare the data in URL-encoded format
        const formData = new URLSearchParams();
        formData.append("name", storedDetails.name);
        formData.append("school", storedDetails.school);
        formData.append("mobile", storedDetails.mobile);
        formData.append("studentClass", storedDetails.studentClass);
        formData.append("uuid", storedDetails.uuid);
        
        // Get exam-specific details from localStorage
        formData.append("suuid", localStorage.getItem("suuid"));
        formData.append("subject", localStorage.getItem("subject"));
        
        // Append the final score
        formData.append("score", finalScore);
    
        // ✅ Send the URL-encoded data
        const res = await fetch("https://script.google.com/macros/s/AKfycbwSfi2FO45wghhFfTqD3TuFCijzw23lBS4wtcASLzzzPzYGNW2aZ-s07tEucU9exFQABg/exec", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData, // Send URLSearchParams object
        });
    
        const data = await res.json();
        console.log("✅ Score submitted to Google Sheet:", data);
      }
    } catch (error) {
      console.error("❌ Error submitting score:", error);
    }
    
    
            const pdfBlob = doc.output("blob");
            const blobUrl = URL.createObjectURL(pdfBlob);
            const newWindow = window.open(blobUrl, "_blank");
            if (!newWindow) alert("Popup blocked! Please allow popups to view the PDF.");
            else newWindow.focus();
        };
    
    
    
        // const totalMarks = shuffledQuestions.reduce((acc, q) => acc + q.marks, 0);
    const totalMarks=100;
        const percentage = ((score / totalMarks) * 100).toFixed(2);
        // const pageSize = 10;
        // const paginatedQuestions = shuffledQuestions.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    
    
    
    
        return (
            <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Physics(Rotational Motions)</h1>
    
                
                {!submitted && <TimerDisplay />} 
    
    {/* timmer set */}
    
    
    
                {!submitted ? (
                    <>
                        {paginatedQuestions.map((q, index) => (
                            <div key={`${q.id}-${currentPage}-${index}`} className="mb-6 p-4 border rounded-lg shadow-sm">
                                <p className="font-medium mb-2">{q.question}</p>
                                {q.math && <BlockMath math={q.math} />}
                                <div>
                                    {q.options.map((opt, idx) => (
                                        <label key={idx} className="block cursor-pointer hover:bg-gray-100 rounded px-2 py-1">
                                            <input
                                                type="radio"
                                                name={`q-${currentPage}-${q.id}`}
                                                value={opt}
                                                checked={answers[q.id] === opt}
                                                onChange={() => handleChange(q.id, opt)}
                                                className="mr-2"
                                            />
                                            {opt.includes("\\") || opt.includes("^") || opt.includes("_") || opt.includes("/") ? (
                                                <InlineMath math={opt} />
                                            ) : (
                                                <span>{opt}</span>
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
    
    
    {/* Change to the selectedQuestions */}
                        {selectedQuestions.length > pageSize && (                
                            <div className="flex justify-between mt-4">
                                {currentPage > 0 && (
                                    <button
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
                                    >
                                        ◀ Previous
                                    </button>
                                )}
                                {(currentPage + 1) * pageSize < selectedQuestions.length && (
                                    <button
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
                                    >
                                        Next ▶
                                    </button>
                                )}
                            </div>
                        )}
    
    
    
    
                        <button
                            onClick={handleSubmit}
                            className="w-full mt-6 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition duration-200 shadow-md hover:shadow-lg"
                        >
                            ✅ Submit Exam
                        </button>
                    </>
                ) : (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
                        <h2 className="text-xl font-semibold">Results:</h2>
                        <h3 className="mt-4 text-lg font-bold">
                            Total Score: {score} / {totalMarks} ({percentage}%)
                        </h3>
    
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
                            >
                                🔄 Retake Exam
                            </button>
    
                            <button
                                onClick={() => { localStorage.removeItem("suuid"); navigate("/subjects"); }}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
                            >
                                📚 Choose Another Subject
                            </button>
    
                            <button
                                onClick={() => printPDF()}
                                className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
                            >
                                📄 Download / Print PDF
                            </button>
    
                            <button
                                onClick={() => { localStorage.removeItem("suuid"); localStorage.removeItem("studentDetails"); navigate("/"); }}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
                            >
                                🚪 Exit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    
    
    
    
    