import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function PM4() {
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
    
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour = 3600s
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
    id: 91,
    question: "Work done by a constant force is maximum when the angle between force and displacement is:",
    "options": [
      "0°",
      "45°",
      "90°",
      "180°"
    ],
    correct: "0°",
    marks: 4,
    negative: 1
  },
  {
    id: 92,
    question: "Which of the following is the correct unit of power?",
    "options": [
      "Joule",
      "Newton",
      "Watt",
      "Pascal"
    ],
    correct: "Watt",
    marks: 4,
    negative: 1
  },
  {
    id: 93,
    question: "A body is said to have kinetic energy if it is:",
    "options": [
      "At rest",
      "In motion",
      "On a height",
      "Under pressure"
    ],
    correct: "In motion",
    marks: 4,
    negative: 1
  },
  {
    id: 94,
    question: "Potential energy of a body is due to its:",
    "options": [
      "Motion",
      "Size",
      "Position",
      "Temperature"
    ],
    correct: "Position",
    marks: 4,
    negative: 1
  },
  {
    id: 95,
    question: "The work-energy theorem is based on the:",
    "options": [
      "Law of inertia",
      "Law of momentum",
      "Newton’s 3rd law",
      "Newton’s 2nd law"
    ],
    correct: "Newton’s 2nd law",
    marks: 4,
    negative: 1
  },
  {
    id: 96,
    question: "A machine is said to be 100% efficient if:",
    "options": [
      "Output energy = Input energy",
      "Output > Input",
      "Input > Output",
      "No loss of energy"
    ],
    correct: "Output energy = Input energy",
    marks: 4,
    negative: 1
  },
  {
    id: 97,
    question: "Power is defined as:",
    "options": [
      "Work × Time",
      "Work / Time",
      "Force × Distance",
      "Energy × Time"
    ],
    correct: "Work / Time",
    marks: 4,
    negative: 1
  },
  {
    id: 98,
    question: "A spring has potential energy due to its:",
    "options": [
      "Velocity",
      "Acceleration",
      "Deformation",
      "Mass"
    ],
    correct: "Deformation",
    marks: 4,
    negative: 1
  },
  {
    id: 99,
    question: "One kilowatt-hour is equal to:",
    "options": [
      "3600 J",
      "3.6 × 10⁶ J",
      "1000 J",
      "1 J"
    ],
    correct: "3.6 × 10⁶ J",
    marks: 4,
    negative: 1
  },
  {
    id: 100,
    question: "Work done by friction is:",
    "options": [
      "Always positive",
      "Always negative",
      "Zero",
      "May be positive"
    ],
    correct: "Always negative",
    marks: 4,
    negative: 1
  },
  {
    id: 101,
    question: "Which of the following does not have kinetic energy?",
    "options": [
      "Moving car",
      "Flying bird",
      "Boiling water",
      "Stretched string"
    ],
    correct: "Stretched string",
    marks: 4,
    negative: 1
  },
  {
    id: 102,
    question: "The SI unit of energy is:",
    "options": [
      "Watt",
      "Joule",
      "Erg",
      "Calorie"
    ],
    correct: "Joule",
    marks: 4,
    negative: 1
  },
  {
    id: 103,
    question: "A conservative force:",
    "options": [
      "Depends on path",
      "Converts energy",
      "Has zero work in closed path",
      "Is friction"
    ],
    correct: "Has zero work in closed path",
    marks: 4,
    negative: 1
  },
  {
    id: 104,
    question: "Work done in lifting a body against gravity depends on:",
    "options": [
      "Path taken",
      "Time taken",
      "Mass and height",
      "Speed"
    ],
    correct: "Mass and height",
    marks: 4,
    negative: 1
  },
  {
    id: 105,
    question: "In an elastic collision, which quantity is conserved?",
    "options": [
      "Momentum",
      "Kinetic energy",
      "Both a and b",
      "Only energy"
    ],
    correct: "Both a and b",
    marks: 4,
    negative: 1
  },
  {
    id: 106,
    question: "A bullet fired from a gun has:",
    "options": [
      "Only KE",
      "Only PE",
      "Both KE and PE",
      "No energy"
    ],
    correct: "Only KE",
    marks: 4,
    negative: 1
  },
  {
    id: 107,
    question: "Negative work is done when:",
    "options": [
      "Force and displacement are opposite",
      "Force is zero",
      "Displacement is zero",
      "Force and displacement are perpendicular"
    ],
    correct: "Force and displacement are opposite",
    marks: 4,
    negative: 1
  },
  {
    id: 108,
    question: "The area under force vs displacement graph gives:",
    "options": [
      "Power",
      "Velocity",
      "Energy",
      "Work"
    ],
    correct: "Work",
    marks: 4,
    negative: 1
  },
  {
    id: 109,
    question: "If the velocity of an object is doubled, its kinetic energy becomes:",
    "options": [
      "Double",
      "Four times",
      "Half",
      "Same"
    ],
    correct: "Four times",
    marks: 4,
    negative: 1
  },
  {
    id: 110,
    question: "Power of a body is 1 watt when it does 1 joule work in:",
    "options": [
      "1 hour",
      "1 second",
      "1 minute",
      "1 day"
    ],
    correct: "1 second",
    marks: 4,
    negative: 1
  },
  {
    id: 111,
    question: "When is the work done by a force zero?",
    "options": [
      "When force is zero",
      "When displacement is zero",
      "When force is perpendicular to displacement",
      "All of the above"
    ],
    correct: "All of the above",
    marks: 4,
    negative: 1
  },
  {
    id: 112,
    question: "Which of the following is a non-conservative force?",
    "options": [
      "Gravitational force",
      "Frictional force",
      "Electric force",
      "Spring force"
    ],
    correct: "Frictional force",
    marks: 4,
    negative: 1
  },
  {
    id: 113,
    question: "A person climbs a staircase slowly and then quickly. Work done in both cases is:",
    "options": [
      "More in fast case",
      "Less in slow case",
      "Same in both cases",
      "Zero"
    ],
    correct: "Same in both cases",
    marks: 4,
    negative: 1
  },
  {
    id: 114,
    question: "Which of the following quantities is a scalar?",
    "options": [
      "Force",
      "Displacement",
      "Energy",
      "Velocity"
    ],
    correct: "Energy",
    marks: 4,
    negative: 1
  },
  {
    id: 115,
    question: "Which energy conversion takes place in a hydroelectric power plant?",
    "options": [
      "Chemical to electrical",
      "Kinetic to electrical",
      "Potential to electrical",
      "Thermal to electrical"
    ],
    correct: "Potential to electrical",
    marks: 4,
    negative: 1
  },
  {
    id: 116,
    question: "Work done in compressing a spring is stored as:",
    "options": [
      "Heat energy",
      "Kinetic energy",
      "Sound energy",
      "Potential energy"
    ],
    correct: "Potential energy",
    marks: 4,
    negative: 1
  },
  {
    id: 117,
    question: "What is the power output of a 60 W bulb in one minute?",
    "options": [
      "60 J",
      "360 J",
      "3600 J",
      "36000 J"
    ],
    correct: "3600 J",
    marks: 4,
    negative: 1
  },
  {
    id: 118,
    question: "A man pushes a wall and gets tired. The work done is:",
    "options": [
      "Positive",
      "Negative",
      "Zero",
      "Maximum"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 119,
    question: "Mechanical energy is the sum of:",
    "options": [
      "Kinetic and chemical energy",
      "Potential and thermal energy",
      "Kinetic and potential energy",
      "Heat and sound energy"
    ],
    correct: "Kinetic and potential energy",
    marks: 4,
    negative: 1
  },
  {
    id: 120,
    question: "The energy possessed by a stretched rubber band is:",
    "options": [
      "Kinetic energy",
      "Sound energy",
      "Chemical energy",
      "Potential energy"
    ],
    correct: "Potential energy",
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
  doc.text("Exam Results - Physics(Work, Power & Energy)", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Physics(Work, Power & Energy)</h1>
    
                
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
    
    
    
    
    