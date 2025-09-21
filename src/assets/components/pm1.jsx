import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function PM1() {
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
    id: 1,
    question: "Which of the following is not a fundamental quantity?",
    "options": [
      "Mass",
      "Length",
      "Time",
      "Velocity"
    ],
    correct: "Velocity",
    marks: 4,
    negative: 1
  },
  {
    id: 2,
    question: "The dimensional formula for force is:",
    "options": [
      "[M^1L^1T^{-2}]",
      "[M^1L^2T^{-2}]",
      "[M^1L^1T^{-1}]",
      "[M^0L^0T^0]"
    ],
    correct: "[M^1L^1T^{-2}]",
    marks: 4,
    negative: 1
  },
  {
    id: 3,
    question: "The unit of pressure in SI system is:",
    "options": [
      "Joule",
      "Pascal",
      "Watt",
      "Newton"
    ],
    correct: "Pascal",
    marks: 4,
    negative: 1
  },
  {
    id: 4,
    question: "Which of the following has the same dimensions as work?",
    options: [
      "Power",
      "Torque",
      "Energy",
      "Force"
    ],
    correct: "Energy",
    marks: 4,
    negative: 1
  },
  {
    id: 5,
    question: "The number of significant figures in 0.004560 is:",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    correct: "4",
    marks: 4,
    negative: 1
  },
  {
    id: 6,
    question: "The unit of Planck's constant is:",
    "options": [
      "Js",
      "N·m",
      "kg·m²/s²",
      "W"
    ],
    correct: "Js",
    marks: 4,
    negative: 1
  },
  {
    id: 7,
    question: "Dimensional formula of power is:",
    "options": [
      "[MLT^{-2}]",
      "[ML^2T^{-2}]",
      "[ML^2T^{-3}]",
      "[M^0L^0T^0]"
    ],
    correct: "[ML^2T^{-3}]",
    marks: 4,
    negative: 1
  },
  {
    id: 8,
    question: "Which of the following quantities is dimensionless?",
    "options": [
      "Angle",
      "Temperature",
      "Force",
      "Pressure"
    ],
    correct: "Angle",
    marks: 4,
    negative: 1
  },
  {
    id: 9,
    question: "If the length of a rod is given as 4.250 m, how many significant figures are there?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    correct: "4",
    marks: 4,
    negative: 1
  },
  {
    id: 10,
    question: "Which one is not a correct pair of physical quantity and its unit?",
    "options": [
      "Force - Newton",
      "Power - Watt",
      "Energy - Joule",
      "Pressure - Tesla"
    ],
    correct: "Pressure - Tesla",
    marks: 4,
    negative: 1
  },
  {
    id: 11,
    question: "The unit of dimensional formula [ML^0T^{-2}] is:",
    "options": [
      "Work",
      "Energy",
      "Pressure",
      "Weight"
    ],
    correct: "Weight",
    marks: 4,
    negative: 1
  },
  {
    id: 12,
    question: "Which of the following pairs has the same dimensions?",
    "options": [
      "Torque and Work",
      "Energy and Power",
      "Pressure and Force",
      "Work and Power"
    ],
    correct: "Torque and Work",
    marks: 4,
    negative: 1
  },
  {
    id: 13,
    question: "The unit of error is the same as that of:",
    "options": [
      "Acceleration",
      "Physical quantity being measured",
      "Force",
      "None of the above"
    ],
    correct: "Physical quantity being measured",
    marks: 4,
    negative: 1
  },
  {
    id: 14,
    question: "Which instrument is used to measure the least count accurately?",
    "options": [
      "Vernier Caliper",
      "Thermometer",
      "Ammeter",
      "Hygrometer"
    ],
    correct: "Vernier Caliper",
    marks: 4,
    negative: 1
  },
  {
    id: 15,
    question: "The SI unit of luminous intensity is:",
    "options": [
      "Candela",
      "Lux",
      "Lumen",
      "Tesla"
    ],
    correct: "Candela",
    marks: 4,
    negative: 1
  },
  {
    id: 16,
    question: "Which of the following is a derived unit?",
    "options": [
      "Kilogram",
      "Meter",
      "Second",
      "Joule"
    ],
    correct: "Joule",
    marks: 4,
    negative: 1
  },
  {
    id: 17,
    question: "The percentage error in measurement increases when:",
    "options": [
      "The measurement is large",
      "The actual value is very small",
      "The measurement is accurate",
      "All of the above"
    ],
    correct: "The actual value is very small",
    marks: 4,
    negative: 1
  },
  {
    id: 18,
    question: "The dimension of momentum is:",
    "options": [
      "[MLT^{-1}]",
      "[MLT^{-2}]",
      "[ML^2T^{-2}]",
      "[M^2LT^{-2}]"
    ],
    correct: "[MLT^{-1}]",
    marks: 4,
    negative: 1
  },
  {
    id: 19,
    question: "Which of these is not an SI base unit?",
    "options": [
      "Ampere",
      "Mole",
      "Calorie",
      "Candela"
    ],
    correct: "Calorie",
    marks: 4,
    negative: 1
  },
  {
    id: 20,
    question: "Which quantity has unit Henry?",
    "options": [
      "Capacitance",
      "Inductance",
      "Resistance",
      "Reactance"
    ],
    correct: "Inductance",
    marks: 4,
    negative: 1
  },
  {
    id: 21,
    question: "Which of the following is a scalar quantity?",
    "options": [
      "Force",
      "Acceleration",
      "Displacement",
      "Work"
    ],
    correct: "Work",
    marks: 4,
    negative: 1
  },
  {
    id: 22,
    question: "Dimensional formula of gravitational potential is:",
    "options": [
      "[L^2T^{-2}]",
      "[ML^2T^{-2}]",
      "[L^2T^2]",
      "[L^1T^{-2}]"
    ],
    correct: "[L^2T^{-2}]",
    marks: 4,
    negative: 1
  },
  {
    id: 23,
    question: "Dimension of surface tension is:",
    "options": [
      "[MT^{-2}]",
      "[ML^0T^{-2}]",
      "[ML^2T^{-2}]",
      "[ML^{-1}T^{-2}]"
    ],
    correct: "[MT^{-2}]",
    marks: 4,
    negative: 1
  },
  {
    id: 24,
    question: "Absolute error is the:",
    "options": [
      "Error expressed as a percentage",
      "Difference between measured and true value",
      "Relative deviation",
      "Ratio of true to measured value"
    ],
    correct: "Difference between measured and true value",
    marks: 4,
    negative: 1
  },
  {
    id: 25,
    question: "Which of the following is not a correct dimensional formula?",
    "options": [
      "Energy – [ML^2T^{-2}]",
      "Pressure – [ML^{-1}T^{-2}]",
      "Acceleration – [LT^{-2}]",
      "Momentum – [ML^2T^{-1}]"
    ],
    correct: "Momentum – [ML^2T^{-1}]",
    marks: 4,
    negative: 1
  },
  {
    id: 26,
    question: "Significant figures in 6.022 × 10²³ are:",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    correct: "4",
    marks: 4,
    negative: 1
  },
  {
    id: 27,
    question: "Dimensional formula of coefficient of viscosity is:",
    "options": [
      "[ML^{-1}T^{-1}]",
      "[MLT^{-2}]",
      "[ML^2T^{-2}]",
      "[ML^0T^{-1}]"
    ],
    correct: "[ML^{-1}T^{-1}]",
    marks: 4,
    negative: 1
  },
  {
    id: 28,
    question: "One parsec is approximately equal to:",
    "options": [
      "3.26 light-years",
      "9.46 × 10¹² m",
      "3.00 × 10⁸ m/s",
      "6.63 × 10⁻³⁴ Js"
    ],
    correct: "3.26 light-years",
    marks: 4,
    negative: 1
  },
  {
    id: 29,
    question: "Which of the following has same dimension as impulse?",
    "options": [
      "Energy",
      "Power",
      "Momentum",
      "Velocity"
    ],
    correct: "Momentum",
    marks: 4,
    negative: 1
  },
  {
    id: 30,
    question: "Dimensional analysis can be used to:",
    "options": [
      "Derive formulas",
      "Convert units",
      "Check correctness of equations",
      "All of the above"
    ],
    correct: "All of the above",
    marks: 4,
    negative: 1
  },

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
  doc.text("Exam Results - Physics(Units, Dimensions & Errors)", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Physics(Units, Dimensions & Errors)</h1>
    
                
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
    
    
    
    
    