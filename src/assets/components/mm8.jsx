import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function MM5() {
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

    // Original questions
    const questions = [

  
  {
    id: 211,
    question: "The value of $\\lim_{x\\to 0} (\\sin 3x / x)$ is:",
    options: [
      "0",
      "1",
      "3",
      "Does not exist"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 212,
    question: "$\\lim_{x\\to 0} (1 - \\cos 2x)/x^2 =$",
    options: [
      "0",
      "2",
      "1",
      "4"
    ],
    correct: "2",
    marks: 4,
    negative: 1
  },
  {
    id: 213,
    question: "$\\lim_{x\\to \\pi/2} (\\tan x - \\sec x) =$",
    options: [
      "$\\infty$",
      "-1",
      "0",
      "Does not exist"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 214,
    question: "$\\lim_{x\\to 0} (e^x - 1)/x =$",
    options: [
      "0",
      "1",
      "e",
      "Does not exist"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 215,
    question: "$\\lim_{x\\to 0} (a^x - 1)/x =$",
    options: [
      "1",
      "a",
      "$\\log_e a$",
      "a - 1"
    ],
    correct: "$\\log_e a$",
    marks: 4,
    negative: 1
  },
  {
    id: 216,
    question: "$\\lim_{x\\to 0} (x - \\sin x)/x^3 =$",
    options: [
      "0",
      "1/3!",
      "1/6",
      "0"
    ],
    correct: "1/6",
    marks: 4,
    negative: 1
  },
  {
    id: 217,
    question: "$\\lim_{x\\to 0} ((1 + 2x)^{(1/x)}) =$",
    options: [
      "$e^2$",
      "e",
      "1",
      "2"
    ],
    correct: "$e^2$",
    marks: 4,
    negative: 1
  },
  {
    id: 218,
    question: "$\\lim_{x\\to 0} ((\\tan x)/x) =$",
    options: [
      "0",
      "1",
      "$\\infty$",
      "Does not exist"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 219,
    question: "$\\lim_{x\\to 0} (\\ln(1 + 3x)/x) =$",
    options: [
      "3",
      "1/3",
      "$e^3$",
      "Does not exist"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 220,
    question: "$\\lim_{x\\to 0} ((1 + x)^{(1/x)}) =$",
    options: [
      "e",
      "1",
      "0",
      "$\\infty$"
    ],
    correct: "e",
    marks: 4,
    negative: 1
  },
  {
    id: 221,
    question: "Function $f(x)=|x|$ is continuous at $x=0$ because:",
    options: [
      "Left limit $\\ne$ Right limit",
      "Left limit = Right limit = $f(0)$",
      "Not defined at 0",
      "None"
    ],
    correct: "Left limit = Right limit = $f(0)$",
    marks: 4,
    negative: 1
  },
  {
    id: 222,
    question: "$f(x)=1/x$ is continuous at:",
    options: [
      "$x=0$",
      "$x=1$",
      "$x=-1$",
      "Except $x=0$"
    ],
    correct: "Except $x=0$",
    marks: 4,
    negative: 1
  },
  {
    id: 223,
    question: "Function $f(x)=x^2$ is continuous:",
    options: [
      "At all real $x$",
      "Only at $x=0$",
      "Only at $x=1$",
      "None"
    ],
    correct: "At all real $x$",
    marks: 4,
    negative: 1
  },
  {
    id: 224,
    question: "If $f(x)=\\sin x/x$, then $f$ is continuous at $x=0$ if $f(0)=$",
    options: [
      "0",
      "1",
      "Undefined",
      "-1"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 225,
    question: "Greatest integer function $[x]$ is discontinuous at:",
    options: [
      "Integer values",
      "Non-integers",
      "Rational numbers",
      "Irrationals"
    ],
    correct: "Integer values",
    marks: 4,
    negative: 1
  },
  {
    id: 226,
    question: "Function $f(x)=|x|/x$ is discontinuous at:",
    options: [
      "$x=1$",
      "$x=-1$",
      "$x=0$",
      "None"
    ],
    correct: "$x=0$",
    marks: 4,
    negative: 1
  },
  {
    id: 227,
    question: "If $f(x)=x^3-6x^2+11x-6$, continuity at $x=1$ implies:",
    options: [
      "$f(1)=0$",
      "$f(1)=1$",
      "$f(1)=2$",
      "$f(1)=3$"
    ],
    correct: "$f(1)=0$",
    marks: 4,
    negative: 1
  },
  {
    id: 228,
    question: "$f(x)=1/(x-1)$ is discontinuous at:",
    options: [
      "$x=1$",
      "$x=0$",
      "$x=-1$",
      "None"
    ],
    correct: "$x=1$",
    marks: 4,
    negative: 1
  },
  {
    id: 229,
    question: "If $f(x)=x$ for rational $x$, $-x$ for irrational $x$, then $f$ is continuous at:",
    options: [
      "$x=0$",
      "$x=1$",
      "$x=-1$",
      "None"
    ],
    correct: "$x=0$",
    marks: 4,
    negative: 1
  },
  {
    id: 230,
    question: "Function $\\sin x/x$ is continuous for:",
    options: [
      "All $x\\ne 0$",
      "Only at $x=0$",
      "Nowhere",
      "Everywhere if $f(0)=1$"
    ],
    correct: "Everywhere if $f(0)=1$",
    marks: 4,
    negative: 1
  },
  {
    id: 231,
    question: "$f(x)=|x|$ is differentiable at $x=0$?",
    options: [
      "Yes",
      "No",
      "Only right diff",
      "Only left diff"
    ],
    correct: "No",
    marks: 4,
    negative: 1
  },
  {
    id: 232,
    question: "Derivative of $\\sin x$ is:",
    options: [
      "$\\cos x$",
      "$-\\cos x$",
      "$-\\sin x$",
      "$\\tan x$"
    ],
    correct: "$\\cos x$",
    marks: 4,
    negative: 1
  },
  {
    id: 233,
    question: "Derivative of $e^x$ is:",
    options: [
      "$e^x$",
      "1",
      "$\\ln(e)$",
      "e"
    ],
    correct: "$e^x$",
    marks: 4,
    negative: 1
  },
  {
    id: 234,
    question: "$d/dx (\\ln x) =$",
    options: [
      "1/x",
      "x",
      "$e^x$",
      "$\\log_{10}x$"
    ],
    correct: "1/x",
    marks: 4,
    negative: 1
  },
  {
    id: 235,
    question: "$f(x)=x^3$ is differentiable at:",
    options: [
      "Only at $x=0$",
      "All real $x$",
      "Only positive $x$",
      "None"
    ],
    correct: "All real $x$",
    marks: 4,
    negative: 1
  },
  {
    id: 236,
    question: "Derivative of $\\tan x =$",
    options: [
      "$\\sec^2 x$",
      "$\\cos^2 x$",
      "$\\sin^2 x$",
      "$\\csc^2 x$"
    ],
    correct: "$\\sec^2 x$",
    marks: 4,
    negative: 1
  },
  {
    id: 237,
    question: "$f(x)=|x|^3$ is differentiable at:",
    options: [
      "$x=0$",
      "All $x$",
      "None",
      "$x>0$ only"
    ],
    correct: "All $x$",
    marks: 4,
    negative: 1
  },
  {
    id: 238,
    question: "If $y=\\sin^{-1} x$, $dy/dx =$",
    options: [
      "$1/\\sqrt{1-x^2}$",
      "$\\sqrt{1-x^2}$",
      "$x/\\sqrt{1-x^2}$",
      "$-1/\\sqrt{1-x^2}$"
    ],
    correct: "$1/\\sqrt{1-x^2}$",
    marks: 4,
    negative: 1
  },
  {
    id: 239,
    question: "$d/dx (x^x) =$",
    options: [
      "$x^x(1+\\ln x)$",
      "$x^x(\\ln x)$",
      "$x^x$",
      "$\\ln(x^x)$"
    ],
    correct: "$x^x(1+\\ln x)$",
    marks: 4,
    negative: 1
  },
  {
    id: 240,
    question: "If $f(x)=\\max(x, -x)$, then differentiable at:",
    options: [
      "$x=0$",
      "$x>0$ only",
      "$x<0$ only",
      "None"
    ],
    correct: "None",
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
  doc.text("Exam Results - Mathematics", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Mathematics</h1>
    
                
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
    
    
    
    
    