import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function PM3() {
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
    id: 61,
    question: "A book lying on a table is in:",
    "options": [
      "Dynamic equilibrium",
      "Translational motion",
      "Rotational motion",
      "Static equilibrium"
    ],
    correct: "Static equilibrium",
    marks: 4,
    negative: 1
  },
  {
    id: 62,
    question: "A car accelerates from rest under uniform force. Its motion is:",
    "options": [
      "Uniform",
      "Non-uniform",
      "Circular",
      "Rotational"
    ],
    correct: "Non-uniform",
    marks: 4,
    negative: 1
  },
  {
    id: 63,
    question: "The force which opposes the relative motion is:",
    "options": [
      "Gravitational force",
      "Frictional force",
      "Magnetic force",
      "Electrostatic force"
    ],
    correct: "Frictional force",
    marks: 4,
    negative: 1
  },
  {
    id: 64,
    question: "Newton’s First Law is also known as the law of:",
    "options": [
      "Inertia",
      "Momentum",
      "Energy",
      "Friction"
    ],
    correct: "Inertia",
    marks: 4,
    negative: 1
  },
  {
    id: 65,
    question: "Which law explains the recoil of a gun?",
    "options": [
      "Newton’s First Law",
      "Newton’s Second Law",
      "Newton’s Third Law",
      "Law of Gravitation"
    ],
    correct: "Newton’s Third Law",
    marks: 4,
    negative: 1
  },
  {
    id: 66,
    question: "The direction of frictional force is always:",
    "options": [
      "Perpendicular to surface",
      "Along motion",
      "Opposite to motion",
      "Downward"
    ],
    correct: "Opposite to motion",
    marks: 4,
    negative: 1
  },
  {
    id: 67,
    question: "The Third Law pair of a bat hitting a ball is:",
    "options": [
      "Bat exerts force, ball receives",
      "Ball exerts equal force on bat",
      "Ball accelerates",
      "Ball loses momentum"
    ],
    correct: "Ball exerts equal force on bat",
    marks: 4,
    negative: 1
  },
  {
    id: 68,
    question: "If net force on a body is zero, then acceleration is:",
    "options": [
      "Maximum",
      "Zero",
      "Infinite",
      "Negative"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 69,
    question: "When two equal and opposite forces act on a body, it results in:",
    "options": [
      "Acceleration",
      "No motion",
      "Equilibrium",
      "Uniform motion"
    ],
    correct: "Equilibrium",
    marks: 4,
    negative: 1
  },
  {
    id: 70,
    question: "A body of mass 10 kg moves with acceleration of 2 m/s². Force is:",
    "options": [
      "5 N",
      "20 N",
      "12 N",
      "2 N"
    ],
    correct: "20 N",
    marks: 4,
    negative: 1
  },
  {
    id: 71,
    question: "The action and reaction forces are:",
    "options": [
      "Equal in magnitude",
      "Opposite in direction",
      "Act on different bodies",
      "All of the above"
    ],
    correct: "All of the above",
    marks: 4,
    negative: 1
  },
  {
    id: 72,
    question: "When the net force acting on a body is zero, the body:",
    "options": [
      "Accelerates",
      "Moves in a circle",
      "Is at rest or moves with constant velocity",
      "Falls freely"
    ],
    correct: "Is at rest or moves with constant velocity",
    marks: 4,
    negative: 1
  },
  {
    id: 73,
    question: "The momentum of a body is defined as:",
    "options": [
      "mv",
      "ma",
      "mg",
      "v/m"
    ],
    correct: "mv",
    marks: 4,
    negative: 1
  },
  {
    id: 74,
    question: "A passenger in a moving train tends to fall backward when the train suddenly stops. This is due to:",
    "options": [
      "Inertia of motion",
      "Friction",
      "Momentum",
      "Newton's Third Law"
    ],
    correct: "Inertia of motion",
    marks: 4,
    negative: 1
  },
  {
    id: 75,
    question: "Force required to stop a moving body is called:",
    "options": [
      "Momentum",
      "Impulse",
      "Power",
      "Work"
    ],
    correct: "Impulse",
    marks: 4,
    negative: 1
  },
  {
    id: 76,
    question: "What is the force of 5 kg object accelerating at 4 m/s²?",
    "options": [
      "10 N",
      "15 N",
      "20 N",
      "25 N"
    ],
    correct: "20 N",
    marks: 4,
    negative: 1
  },
  {
    id: 77,
    question: "In the absence of external force, a moving object will:",
    "options": [
      "Stop",
      "Accelerate",
      "Move with uniform velocity",
      "Move in a circle"
    ],
    correct: "Move with uniform velocity",
    marks: 4,
    negative: 1
  },
  {
    id: 78,
    question: "The mass of a body is 2 kg, and its velocity is 3 m/s. Momentum is:",
    "options": [
      "5 kg·m/s",
      "6 kg·m/s",
      "3 kg·m/s",
      "1.5 kg·m/s"
    ],
    correct: "6 kg·m/s",
    marks: 4,
    negative: 1
  },
  {
    id: 79,
    question: "Friction always acts:",
    "options": [
      "In direction of motion",
      "Opposite to motion",
      "Perpendicular to motion",
      "Along normal"
    ],
    correct: "Opposite to motion",
    marks: 4,
    negative: 1
  },
  {
    id: 80,
    question: "The relation between impulse and momentum is:",
    "options": [
      "Impulse = Change in momentum",
      "Impulse = Force × Distance",
      "Impulse = Mass × Acceleration",
      "Impulse = Velocity × Time"
    ],
    correct: "Impulse = Change in momentum",
    marks: 4,
    negative: 1
  },
  {
    id: 81,
    question: "Rocket propulsion is an example of:",
    "options": [
      "Newton's first law",
      "Newton's second law",
      "Newton's third law",
      "Gravitation"
    ],
    correct: "Newton's third law",
    marks: 4,
    negative: 1
  },
  {
    id: 82,
    question: "The unit of force in SI system is:",
    "options": [
      "Dyne",
      "Kilogram",
      "Newton",
      "Joule"
    ],
    correct: "Newton",
    marks: 4,
    negative: 1
  },
  {
    id: 83,
    question: "Which law is also called the law of force?",
    "options": [
      "First law",
      "Second law",
      "Third law",
      "Zeroth law"
    ],
    correct: "Second law",
    marks: 4,
    negative: 1
  },
  {
    id: 84,
    question: "The net force on a body moving with uniform velocity is:",
    "options": [
      "Positive",
      "Negative",
      "Zero",
      "Depends on mass"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 85,
    question: "Newton’s second law relates:",
    "options": [
      "Force and displacement",
      "Force and momentum",
      "Force and mass",
      "Force and acceleration"
    ],
    correct: "Force and acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 86,
    question: "Which of the following quantities is a vector?",
    "options": [
      "Mass",
      "Speed",
      "Time",
      "Force"
    ],
    correct: "Force",
    marks: 4,
    negative: 1
  },
  {
    id: 87,
    question: "The inertia of a body depends on its:",
    "options": [
      "Volume",
      "Density",
      "Mass",
      "Weight"
    ],
    correct: "Mass",
    marks: 4,
    negative: 1
  },
  {
    id: 88,
    question: "The impulse experienced by a body is equal to its change in:",
    "options": [
      "Energy",
      "Mass",
      "Momentum",
      "Displacement"
    ],
    correct: "Momentum",
    marks: 4,
    negative: 1
  },
  {
    id: 89,
    question: "The unit of momentum is:",
    "options": [
      "kg·m/s",
      "kg·m²/s²",
      "N·s",
      "Both A and C"
    ],
    correct: "Both A and C",
    marks: 4,
    negative: 1
  },
  {
    id: 90,
    question: "If time of impact increases, the force experienced is:",
    "options": [
      "Increased",
      "Decreased",
      "Zero",
      "Unchanged"
    ],
    correct: "Decreased",
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
  doc.text("Exam Results - Physics(Laws of Motion)", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Physics(Laws of Motion)</h1>
    
                
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
    
    
    
    
    