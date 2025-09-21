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
    id: 121,
    question: "Two particles of masses 3 kg and 5 kg are located at x = 0 m and x = 4 m, respectively. The centre of mass is at x =",
    "options": [
      "2 m",
      "2.5 m",
      "3 m",
      "3.5 m"
    ],
    correct: "2.5 m",
    marks: 4,
    negative: 1
  },
  {
    id: 122,
    question: "Masses 2 kg at x = –1 m and 6 kg at x = 5 m, the centre of mass is at:",
    "options": [
      "2 m",
      "4 m",
      "3.5 m",
      "2.5 m"
    ],
    correct: "3.5 m",
    marks: 4,
    negative: 1
  },
  {
    id: 123,
    question: "A uniform rod of length L and mass M has its centre of mass at:",
    "options": [
      "L/4 from one end",
      "L/2 from one end",
      "3L/4 from one end",
      "At one end"
    ],
    correct: "L/2 from one end",
    marks: 4,
    negative: 1
  },
  {
    id: 124,
    question: "A uniform semicircular wire (arc) of radius R has its centre of mass located at a distance from the centre:",
    "options": [
      "0 (at centre)",
      "2R/π",
      "R/2",
      "(πR)/2"
    ],
    correct: "2R/π",
    marks: 4,
    negative: 1
  },
  {
    id: 125,
    question: "Torque τ is defined as:",
    "options": [
      "F·r",
      "F/r",
      "r × F",
      "r/F"
    ],
    correct: "r × F",
    marks: 4,
    negative: 1
  },
  {
    id: 126,
    question: "A 10 N force acts perpendicular to a lever arm of length 0.2 m. The torque is:",
    "options": [
      "2 N·m",
      "0.5 N·m",
      "10 N·m",
      "20 N·m"
    ],
    correct: "2 N·m",
    marks: 4,
    negative: 1
  },
  {
    id: 127,
    question: "Angular momentum L is given by:",
    "options": [
      "m v r",
      "m v/r",
      "F r"
    ],
    correct: "m v r",
    marks: 4,
    negative: 1
  },
  {
    id: 128,
    question: "A figure skater spins with arms extended (I₁). She pulls arms in (I₂ < I₁). To conserve angular momentum, her angular speed:",
    "options": [
      "Decreases",
      "Increases",
      "Remains same",
      "Goes to zero"
    ],
    correct: "Increases",
    marks: 4,
    negative: 1
  },
  {
    id: 129,
    question: "Moment of inertia of a point mass m at distance R is:",
    "options": [
      "m R",
      "m R²",
      "m/R²",
      "m R³"
    ],
    correct: "m R²",
    marks: 4,
    negative: 1
  },
  {
    id: 130,
    question: "The radius of gyration k is defined by:",
    "options": [
      "k = √(I/M)",
      "k = I/M",
      "k = M/I",
      "k = I·M"
    ],
    correct: "k = √(I/M)",
    marks: 4,
    negative: 1
  },
  {
    id: 131,
    question: "Moment of inertia of a thin rod (mass M, length L) about axis through center, perpendicular to length:",
    "options": [
      "ML²/12",
      "ML²/3",
      "ML²",
      "ML²/2"
    ],
    correct: "ML²/12",
    marks: 4,
    negative: 1
  },
  {
    id: 132,
    question: "Moment of inertia of a thin rod (mass M, length L) about one end (perpendicular):",
    "options": [
      "ML²/12",
      "ML²/3",
      "ML²/2",
      "ML²"
    ],
    correct: "ML²/3",
    marks: 4,
    negative: 1
  },
  {
    id: 133,
    question: "Solid disc (mass M, radius R), I about central axis:",
    "options": [
      "(1/2)MR²",
      "(1/4)MR²",
      "(1/3)MR²",
      "MR²"
    ],
    correct: "(1/2)MR²",
    marks: 4,
    negative: 1
  },
  {
    id: 134,
    question: "Thin cylindrical shell (hoop) about central axis:",
    "options": [
      "MR²",
      "(1/2)MR²",
      "(1/4)MR²",
      "(2/3)MR²"
    ],
    correct: "MR²",
    marks: 4,
    negative: 1
  },
  {
    id: 135,
    question: "Parallel-axis theorem states:",
    "options": [
      "I = I₀ – Mh²",
      "I = I₀ + Mh²",
      "I = I₀ + M/h²",
      "I = I₀ – M/h²"
    ],
    correct: "I = I₀ + Mh²",
    marks: 4,
    negative: 1
  },
  {
    id: 136,
    question: "Perpendicular axes theorem (planar lamina in xy-plane):",
    "options": [
      "I_x + I_y = I_z",
      "I_x + I_y = I_z + I_xy",
      "I_x + I_y = I_z ⊥",
      "I_x + I_y = I_z²"
    ],
    correct: "I_x + I_y = I_z",
    marks: 4,
    negative: 1
  },
  {
    id: 137,
    question: "A body is in equilibrium if the net force and net torque are both:",
    "options": [
      "Zero, non-zero",
      "Non-zero, zero",
      "Zero, zero",
      "Non-zero, non-zero"
    ],
    correct: "Zero, zero",
    marks: 4,
    negative: 1
  },
  {
    id: 138,
    question: "A uniform beam supported at two ends, one reaction R₁ = 200 N, total weight 300 N. Reaction at the other support R₂ =",
    "options": [
      "100 N",
      "300 N",
      "200 N",
      "500 N"
    ],
    correct: "100 N",
    marks: 4,
    negative: 1
  },
  {
    id: 139,
    question: "For rigid body rotation: torque τ = Iα, where α is:",
    "options": [
      "Angular velocity",
      "Angular displacement",
      "Angular acceleration",
      "Angular momentum"
    ],
    correct: "Angular acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 140,
    question: "If constant torque acts on a rotator, angular acceleration is:",
    "options": [
      "Constant",
      "Increasing",
      "Decreasing",
      "Zero"
    ],
    correct: "Constant",
    marks: 4,
    negative: 1
  },
  {
    id: 141,
    question: "Analogy: linear momentum corresponds to:",
    "options": [
      "Torque",
      "Angular momentum",
      "Force",
      "Moment of inertia"
    ],
    correct: "Angular momentum",
    marks: 4,
    negative: 1
  },
  {
    id: 142,
    question: "Analogy: mass m in linear motion corresponds to:",
    "options": [
      "Torque",
      "Force",
      "Moment of inertia",
      "Angular velocity"
    ],
    correct: "Moment of inertia",
    marks: 4,
    negative: 1
  },
  {
    id: 143,
    question: "Analogy: Force corresponds to:",
    "options": [
      "Angular momentum",
      "Torque",
      "Mass",
      "Moment of inertia"
    ],
    correct: "Torque",
    marks: 4,
    negative: 1
  },
  {
    id: 144,
    question: "In absence of external torque, angular momentum is:",
    "options": [
      "Not conserved",
      "Conserved",
      "Increasing",
      "Decreasing"
    ],
    correct: "Conserved",
    marks: 4,
    negative: 1
  },
  {
    id: 145,
    question: "A flywheel spins freely; it catches a drop of rainwater (sticky) at edge. Its angular speed:",
    "options": [
      "Increases",
      "Decreases",
      "Remains same",
      "Becomes zero"
    ],
    correct: "Decreases",
    marks: 4,
    negative: 1
  },
  {
    id: 146,
    question: "A spaceship in deep space extends arms (no external torque); rotation rate:",
    "options": [
      "Increases",
      "Decreases",
      "Stays same",
      "Reverses"
    ],
    correct: "Decreases",
    marks: 4,
    negative: 1
  },
  {
    id: 147,
    question: "A uniform rectangular plate (mass M, sides a, b) about axis through centre, parallel to b-side: I =",
    "options": [
      "(1/12)M(a² + b²)",
      "(1/12)M(a²)",
      "(1/12)M(b²)",
      "(1/3)M(a²)"
    ],
    correct: "(1/12)M(a²)",
    marks: 4,
    negative: 1
  },
  {
    id: 148,
    question: "Radius of gyration of same plate: k =",
    "options": [
      "√(a² + b²)/√12",
      "a/√12",
      "b/√12",
      "√(ab)/√12"
    ],
    correct: "a/√12",
    marks: 4,
    negative: 1
  },
  {
    id: 149,
    question: "A wheel rolls without slipping: the instantaneous axis of rotation is at:",
    "options": [
      "Center",
      "Contact point",
      "Top of wheel",
      "Axis through hub"
    ],
    correct: "Contact point",
    marks: 4,
    negative: 1
  },
  {
    id: 150,
    question: "In rolling without slipping, relation between linear velocity v and angular speed ω:",
    "options": [
      "v = ω/R",
      "v = R/ω",
      "v = ωR",
      "v = R²ω"
    ],
    correct: "v = ωR",
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
    
    
    
    
    