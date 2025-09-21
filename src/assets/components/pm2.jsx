import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function PM2() {
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
    id: 31,
    question: "A particle is moving with uniform acceleration. Which of the following quantities remains constant?",
    "options": [
      "Velocity",
      "Acceleration",
      "Displacement",
      "Speed"
    ],
    correct: "Acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 32,
    question: "Which of the following graphs represents a uniformly accelerated motion?",
    "options": [
      "A straight line velocity-time graph with a negative slope",
      "A curved position-time graph",
      "A straight line position-time graph",
      "A constant velocity-time graph"
    ],
    correct: "A straight line velocity-time graph with a negative slope",
    marks: 4,
    negative: 1
  },
  {
    id: 33,
    question: "A body is projected vertically upward. The time taken to reach the maximum height is?",
    "options": [
      "u/g",
      "g/u",
      "2u/g",
      "u^2/g"
    ],
    correct: "u/g",
    marks: 4,
    negative: 1
  },
  {
    id: 34,
    question: "If a particle moves in a straight line with decreasing speed, then?",
    "options": [
      "Acceleration is zero",
      "Acceleration is positive",
      "Acceleration is negative",
      "Velocity is zero"
    ],
    correct: "Acceleration is negative",
    marks: 4,
    negative: 1
  },
  {
    id: 35,
    question: "A body starts from rest and travels 100 m in 5 seconds. What is its acceleration?",
    "options": [
      "8 m/s²",
      "5 m/s²",
      "4 m/s²",
      "2 m/s²"
    ],
    correct: "8 m/s²",
    marks: 4,
    negative: 1
  },
  {
    id: 36,
    question: "The area under a velocity-time graph gives?",
    "options": [
      "Displacement",
      "Acceleration",
      "Speed",
      "Distance only if velocity is constant"
    ],
    correct: "Displacement",
    marks: 4,
    negative: 1
  },
  {
    id: 37,
    question: "A particle travels in a circle with constant speed. Which quantity changes continuously?",
    "options": [
      "Speed",
      "Velocity",
      "Displacement",
      "Distance"
    ],
    correct: "Velocity",
    marks: 4,
    negative: 1
  },
  {
    id: 38,
    question: "Instantaneous velocity is defined as?",
    "options": [
      "Displacement per unit time",
      "dx/dt",
      "dv/dt",
      "Change in displacement over a long interval"
    ],
    correct: "dx/dt",
    marks: 4,
    negative: 1
  },
  {
    id: 39,
    question: "A particle has a constant acceleration of 3 m/s². If initial velocity is 2 m/s, what is its velocity after 4 s?",
    "options": [
      "10 m/s",
      "12 m/s",
      "14 m/s",
      "8 m/s"
    ],
    correct: "14 m/s",
    marks: 4,
    negative: 1
  },
  {
    id: 40,
    question: "Which of the following is a scalar quantity?",
    "options": [
      "Displacement",
      "Velocity",
      "Speed",
      "Acceleration"
    ],
    correct: "Speed",
    marks: 4,
    negative: 1
  },
  {
    id: 41,
    question: "What is the dimensional formula of velocity?",
    "options": [
      "[L^1 T^-1]",
      "[L T^2]",
      "[M L T^-2]",
      "[L^2 T^-1]"
    ],
    correct: "[L^1 T^-1]",
    marks: 4,
    negative: 1
  },
  {
    id: 42,
    question: "Displacement-time graph of a body is a straight line parallel to the time axis. What does it signify?",
    "options": [
      "The body is at rest",
      "The body is in uniform motion",
      "The body has constant acceleration",
      "None"
    ],
    correct: "The body is at rest",
    marks: 4,
    negative: 1
  },
  {
    id: 43,
    question: "The slope of a velocity-time graph gives?",
    "options": [
      "Displacement",
      "Acceleration",
      "Speed",
      "Jerk"
    ],
    correct: "Acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 44,
    question: "In uniformly accelerated motion, which of the following is true?",
    "options": [
      "v = u + at",
      "s = ut + ½at²",
      "v² = u² + 2as",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 45,
    question: "A body thrown up returns to the ground. Its displacement is?",
    "options": [
      "Positive",
      "Negative",
      "Zero",
      "Cannot be determined"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 46,
    question: "A body moving with uniform speed in a straight line has?",
    "options": [
      "Constant velocity",
      "Zero acceleration",
      "Both A and B",
      "Variable acceleration"
    ],
    correct: "Both A and B",
    marks: 4,
    negative: 1
  },
  {
    id: 47,
    question: "If the acceleration is in the opposite direction of velocity, the body?",
    "options": [
      "Speeds up",
      "Slows down",
      "Moves with uniform velocity",
      "Stops immediately"
    ],
    correct: "Slows down",
    marks: 4,
    negative: 1
  },
  {
    id: 48,
    question: "Which of the following pairs are vector quantities?",
    "options": [
      "Speed and velocity",
      "Displacement and distance",
      "Velocity and displacement",
      "Acceleration and speed"
    ],
    correct: "Velocity and displacement",
    marks: 4,
    negative: 1
  },
  {
    id: 49,
    question: "The numerical ratio of displacement to distance is?",
    "options": [
      "Always 1",
      "Always less than 1",
      "Always more than 1",
      "≤ 1"
    ],
    correct: "≤ 1",
    marks: 4,
    negative: 1
  },
  {
    id: 50,
    question: "A car moves with a speed of 72 km/h. Its speed in m/s is?",
    "options": [
      "18",
      "20",
      "22",
      "25"
    ],
    correct: "20",
    marks: 4,
    negative: 1
  },
  {
    id: 51,
    question: "A car accelerates from 10 m/s to 30 m/s in 4 seconds. What is its acceleration?",
    "options": [
      "4 m/s²",
      "5 m/s²",
      "6 m/s²",
      "7 m/s²"
    ],
    correct: "5 m/s²",
    marks: 4,
    negative: 1
  },
  {
    id: 52,
    question: "The total distance travelled by a body in uniform acceleration is given by?",
    "options": [
      "s = vt",
      "s = ut + ½at²",
      "s = u² + 2as",
      "s = u + at"
    ],
    correct: "s = ut + ½at²",
    marks: 4,
    negative: 1
  },
  {
    id: 53,
    question: "A particle is moving with a constant speed but changing direction. Its acceleration is?",
    "options": [
      "Zero",
      "Non-zero",
      "Constant",
      "Cannot be determined"
    ],
    correct: "Non-zero",
    marks: 4,
    negative: 1
  },
  {
    id: 54,
    question: "A body is thrown vertically upwards with velocity u. Time to reach maximum height is?",
    "options": [
      "u/g",
      "2u/g",
      "u²/2g",
      "u/2g"
    ],
    correct: "u/g",
    marks: 4,
    negative: 1
  },
  {
    id: 55,
    question: "For a body in free fall, neglecting air resistance, acceleration is?",
    "options": [
      "0",
      "g",
      "-g",
      "g/2"
    ],
    correct: "g",
    marks: 4,
    negative: 1
  },
  {
    id: 56,
    question: "Which quantity determines how fast velocity changes?",
    "options": [
      "Speed",
      "Displacement",
      "Acceleration",
      "Momentum"
    ],
    correct: "Acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 57,
    question: "A straight-line motion with constant speed implies?",
    "options": [
      "Zero acceleration",
      "Constant acceleration",
      "Varying acceleration",
      "Non-uniform motion"
    ],
    correct: "Zero acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 58,
    question: "Velocity of a body is negative and acceleration is positive. The body?",
    "options": [
      "Speeds up",
      "Slows down",
      "Moves with constant speed",
      "Remains at rest"
    ],
    correct: "Slows down",
    marks: 4,
    negative: 1
  },
  {
    id: 59,
    question: "A particle with negative acceleration and positive velocity will?",
    "options": [
      "Speed up",
      "Stop immediately",
      "Slow down",
      "Move backward"
    ],
    correct: "Slow down",
    marks: 4,
    negative: 1
  },
  {
    id: 60,
    question: "Which of the following is a vector quantity?",
    "options": [
      "Speed",
      "Distance",
      "Work",
      "Displacement"
    ],
    correct: "Displacement",
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
  doc.text("Exam Results - Physics(Kinematics)", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Physics(Kinematics)</h1>
    
                
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
    
    
    
    
    