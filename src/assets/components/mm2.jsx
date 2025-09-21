import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function MM2() {
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

    // Original questions
    const questions = [

  
  {
    id: 31,
    question: "If z = 2 - 3i, then the modulus of z is:",
    options: [
      "√13",
      "√5",
      "√9",
      "√10"
    ],
    correct: "√13",
    marks: 4,
    negative: 1
  },
  {
    id: 32,
    question: "Which of the following is a purely imaginary number?",
    options: [
      "3i",
      "4",
      "1 + i",
      "2 - i"
    ],
    correct: "3i",
    marks: 4,
    negative: 1
  },
  {
    id: 33,
    question: "What is the modulus of the complex number 3 + 4i?",
    options: [
      "5",
      "7",
      "1",
      "6"
    ],
    correct: "5",
    marks: 4,
    negative: 1
  },
  {
    id: 34,
    question: "Which of the following is not a complex number?",
    options: [
      "0",
      "5",
      "3 + 2i",
      "All are complex"
    ],
    correct: "All are complex",
    marks: 4,
    negative: 1
  },
  {
    id: 35,
    question: "The equation whose roots are reciprocals of the roots of x² - 5x + 6 = 0 is:",
    options: [
      "6x² - 5x + 1 = 0",
      "x² - 5x + 6 = 0",
      "x² - 6x + 5 = 0",
      "None"
    ],
    correct: "6x² - 5x + 1 = 0",
    marks: 4,
    negative: 1
  },
  {
    id: 36,
    question: "The equation x² + 1 = 0 has:",
    options: [
      "Imaginary roots",
      "Real roots",
      "No roots",
      "Equal roots"
    ],
    correct: "Imaginary roots",
    marks: 4,
    negative: 1
  },
  {
    id: 37,
    question: "If a quadratic equation has complex roots, then its discriminant is:",
    options: [
      "< 0",
      "> 0",
      "= 0",
      "None"
    ],
    correct: "< 0",
    marks: 4,
    negative: 1
  },
  {
    id: 38,
    question: "If α and β are the roots of the equation x² - 5x + 6 = 0, then what is the value of α + β?",
    options: [
      "2",
      "5",
      "6",
      "1"
    ],
    correct: "5",
    marks: 4,
    negative: 1
  },
  {
    id: 39,
    question: "If α and β are the roots of x² - 6x + 9 = 0, then α = β = ?",
    options: [
      "3",
      "9",
      "6",
      "0"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 40,
    question: "The sum of the roots of x² + 3x + 2 = 0 is:",
    options: [
      "3",
      "-3",
      "2",
      "-2"
    ],
    correct: "-3",
    marks: 4,
    negative: 1
  },
  {
    id: 41,
    question: "If z = a + bi is a complex number, then its conjugate is:",
    options: [
      "a - bi",
      "-a + bi",
      "-a - bi",
      "a + bi"
    ],
    correct: "a - bi",
    marks: 4,
    negative: 1
  },
  {
    id: 42,
    question: "The product of the roots of x² - 7x + 12 = 0 is:",
    options: [
      "12",
      "7",
      "-12",
      "-7"
    ],
    correct: "12",
    marks: 4,
    negative: 1
  },
  {
    id: 43,
    question: "If z = 1 + i, then z² equals:",
    options: [
      "2i",
      "0",
      "2",
      "2i"
    ],
    correct: "2i",
    marks: 4,
    negative: 1
  },
  {
    id: 44,
    question: "If one root of the quadratic equation x² + px + 12 = 0 is 3, then the value of p is:",
    options: [
      "-7",
      "-3",
      "-4",
      "-5"
    ],
    correct: "-7",
    marks: 4,
    negative: 1
  },
  {
    id: 45,
    question: "What is the nature of roots of x² + 6x + 9 = 0?",
    options: [
      "Real and equal",
      "Real and distinct",
      "Imaginary",
      "None"
    ],
    correct: "Real and equal",
    marks: 4,
    negative: 1
  },
  {
    id: 46,
    question: "The roots of the equation x² - 2x + 2 = 0 are:",
    options: [
      "1 + i, 1 - i",
      "2, -1",
      "1, -1",
      "None"
    ],
    correct: "1 + i, 1 - i",
    marks: 4,
    negative: 1
  },
  {
    id: 47,
    question: "If i is the imaginary unit, then i⁴ equals:",
    options: [
      "1",
      "i",
      "-1",
      "0"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 48,
    question: "The roots of the equation x² + 4x + 13 = 0 are:",
    options: [
      "Real and equal",
      "Real and distinct",
      "Imaginary",
      "None"
    ],
    correct: "Imaginary",
    marks: 4,
    negative: 1
  },
  {
    id: 49,
    question: "Which of the following quadratic equations has real and distinct roots?",
    options: [
      "x² - 3x + 2 = 0",
      "x² + x + 1 = 0",
      "x² + 4 = 0",
      "x² + 2x + 1 = 0"
    ],
    correct: "x² - 3x + 2 = 0",
    marks: 4,
    negative: 1
  },
  {
    id: 50,
    question: "The square of imaginary unit i is:",
    options: [
      "-1",
      "1",
      "i",
      "-i"
    ],
    correct: "-1",
    marks: 4,
    negative: 1
  },
  {
    id: 51,
    question: "If α and β are roots of x² - (α+β)x + αβ = 0, then the quadratic is:",
    options: [
      "x² - (α+β)x + αβ",
      "x² + (α+β)x + αβ",
      "x² + (α+β)x - αβ",
      "x² - (α+β)x - αβ"
    ],
    correct: "x² - (α+β)x + αβ",
    marks: 4,
    negative: 1
  },
  {
    id: 52,
    question: "The conjugate of 5 - 2i is:",
    options: [
      "5 + 2i",
      "-5 + 2i",
      "-5 - 2i",
      "5 - 2i"
    ],
    correct: "5 + 2i",
    marks: 4,
    negative: 1
  },
  {
    id: 53,
    question: "What is the argument of the complex number i?",
    options: [
      "π/2",
      "π",
      "0",
      "π/4"
    ],
    correct: "π/2",
    marks: 4,
    negative: 1
  },
  {
    id: 54,
    question: "If z = 2 + i, then z̄ (conjugate) is:",
    options: [
      "2 - i",
      "-2 + i",
      "-2 - i",
      "2 + i"
    ],
    correct: "2 - i",
    marks: 4,
    negative: 1
  },
  {
    id: 55,
    question: "The value of (1 + i)⁴ is:",
    options: [
      "-4",
      "4i",
      "2",
      "0"
    ],
    correct: "-4",
    marks: 4,
    negative: 1
  },
  {
    id: 56,
    question: "If a quadratic equation has equal roots, then its discriminant is:",
    options: [
      "0",
      "> 0",
      "< 0",
      "Undefined"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 57,
    question: "Which complex number lies on the real axis?",
    options: [
      "3",
      "3i",
      "1 + i",
      "0 + i"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 58,
    question: "If α, β are roots of x² - 4x + 3 = 0, then αβ = ?",
    options: [
      "3",
      "4",
      "-3",
      "1"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 59,
    question: "What is the square of (2 + i)?",
    options: [
      "3 + 4i",
      "3 - 4i",
      "5 + 4i",
      "4 + 4i"
    ],
    correct: "3 + 4i",
    marks: 4,
    negative: 1
  },
  {
    id: 60,
    question: "Which of the following represents an equation with imaginary roots?",
    options: [
      "x² + 2x + 5 = 0",
      "x² - 4x + 3 = 0",
      "x² + 3x + 2 = 0",
      "x² - 6x + 9 = 0"
    ],
    correct: "x² + 2x + 5 = 0",
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
  doc.text("Exam Results - Mathematics(Quadratic Equations & Complex Numbers)", 14, 20);

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
    `Total Score: ${finalScore} / 100`,
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
                <h1 className="text-2xl font-bold text-center mb-6">Mathematics(Quadratic Equations & Complex Numbers)</h1>
    
                
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
    
    
    
    
    