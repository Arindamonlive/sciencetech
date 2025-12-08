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
    id: 241,
    question: "The slope of the tangent to the curve $y = x^2 + 3x + 2$ at $x = 1$ is:",
    options: [
      "2",
      "3",
      "5",
      "7"
    ],
    correct: "5",
    marks: 4,
    negative: 1
  },
  {
    id: 242,
    question: "The equation of the tangent to $y = x^3$ at the point $(2, 8)$ is:",
    options: [
      "$y = 12x - 16$",
      "$y = 6x - 4$",
      "$y = 3x + 2$",
      "$y = 12x - 8$"
    ],
    correct: "$y = 12x - 16$",
    marks: 4,
    negative: 1
  },
  {
    id: 243,
    question: "If $y = \\sin(x^2)$, then $dy/dx = \\text{?}$",
    options: [
      "$2x \\cos(x^2)$",
      "$2x \\sin(x^2)$",
      "$\\cos(x^2)$",
      "$x \\cos(x^2)$"
    ],
    correct: "$2x \\cos(x^2)$",
    marks: 4,
    negative: 1
  },
  {
    id: 244,
    question: "The maximum value of $f(x) = -x^2 + 4x + 5$ is:",
    options: [
      "9",
      "8",
      "10",
      "11"
    ],
    correct: "9",
    marks: 4,
    negative: 1
  },
  {
    id: 245,
    question: "The function $f(x) = x^3 - 6x^2 + 9x + 1$ has a point of inflection at:",
    options: [
      "$x = 0$",
      "$x = 1$",
      "$x = 2$",
      "$x = 3$"
    ],
    correct: "$x = 2$",
    marks: 4,
    negative: 1
  },
  {
    id: 246,
    question: "If $y = e^x(x^2 + 1)$, then $dy/dx = \\text{?}$",
    options: [
      "$e^x(2x + 1)$",
      "$e^x(x^2 + 2x + 1)$",
      "$e^x(x^2 + 2x + 2)$",
      "$e^x(2x - 1)$"
    ],
    correct: "$e^x(x^2 + 2x + 1)$",
    marks: 4,
    negative: 1
  },
  {
    id: 247,
    question: "The function $f(x) = x^4 - 4x^3 + 6x^2 - 4x + 1$ is:",
    options: [
      "always increasing",
      "always decreasing",
      "constant",
      "none of these"
    ],
    correct: "always increasing",
    marks: 4,
    negative: 1
  },
  {
    id: 248,
    question: "The minimum value of $y = x + 1/x$ for $x > 0$ is:",
    options: [
      "0",
      "1",
      "2",
      "-1"
    ],
    correct: "2",
    marks: 4,
    negative: 1
  },
  {
    id: 249,
    question: "If $f(x) = |x - 3|$, then $f'(x)$ is not defined at:",
    options: [
      "0",
      "3",
      "-3",
      "1"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 250,
    question: "The equation of the normal to $y = x^2$ at $(1, 1)$ is:",
    options: [
      "$y = -\\frac{1}{2}x + \\frac{3}{2}$",
      "$y = -2x + 3$",
      "$y = 2x + 1$",
      "$y = -x + 2$"
    ],
    correct: "$y = -\\frac{1}{2}x + \\frac{3}{2}$",
    marks: 4,
    negative: 1
  },
  {
    id: 251,
    question: "If $y = \\tan^{-1}(2x)$, then $dy/dx = \\text{?}$",
    options: [
      "$2/(1 + 4x^2)$",
      "$1/(1 + x^2)$",
      "$2x/(1 + x^2)$",
      "$1/(2 + 4x^2)$"
    ],
    correct: "$2/(1 + 4x^2)$",
    marks: 4,
    negative: 1
  },
  {
    id: 252,
    question: "The rate of change of area of a circle with respect to its radius $r$ is:",
    options: [
      "$\\pi r^2$",
      "$2\\pi r$",
      "$\\pi r$",
      "$4\\pi r$"
    ],
    correct: "$2\\pi r$",
    marks: 4,
    negative: 1
  },
  {
    id: 253,
    question: "The derivative of $|x|$ at $x = 0$ is:",
    options: [
      "0",
      "1",
      "-1",
      "does not exist"
    ],
    correct: "does not exist",
    marks: 4,
    negative: 1
  },
  {
    id: 254,
    question: "If $y = \\log(x^2 + 1)$, then $dy/dx = \\text{?}$",
    options: [
      "$2x/(x^2 + 1)$",
      "$1/(x^2 + 1)$",
      "$2x \\log(x)$",
      "$x/(x^2 + 1)$"
    ],
    correct: "$2x/(x^2 + 1)$",
    marks: 4,
    negative: 1
  },
  {
    id: 255,
    question: "The increasing interval of $f(x) = x^3 - 3x^2 + 2$ is:",
    options: [
      "$(0,1)$",
      "$(1,\\infty)$",
      "$(-\\infty,1)$",
      "$(2,\\infty)$"
    ],
    correct: "$(2,\\infty)$",
    marks: 4,
    negative: 1
  },
  {
    id: 256,
    question: "The maximum slope of $y = \\sin x$ occurs at:",
    options: [
      "$x = 0$",
      "$x = \\pi/2$",
      "$x = \\pi$",
      "$x = 3\\pi/2$"
    ],
    correct: "$x = 0$",
    marks: 4,
    negative: 1
  },
  {
    id: 257,
    question: "The function $f(x) = x^3 - 9x^2 + 24x + 5$ is increasing in:",
    options: [
      "$(0,2)$",
      "$(2,4)$",
      "$(4,6)$",
      "$(6,8)$"
    ],
    correct: "$(2,4)$",
    marks: 4,
    negative: 1
  },
  {
    id: 258,
    question: "The tangent to $y = \\sqrt{x}$ at $x = 4$ is:",
    options: [
      "$y = \\frac{1}{4}x + 1$",
      "$y = \\frac{1}{4}x + 2$",
      "$y = \\frac{1}{8}x + 1$",
      "$y = \\frac{1}{8}x + 2$"
    ],
    correct: "$y = \\frac{1}{4}x + 1$",
    marks: 4,
    negative: 1
  },
  {
    id: 259,
    question: "If $y = x^3 + 2x$, find $d^2y/dx^2$.",
    options: [
      "$6x$",
      "$3x^2$",
      "$3x$",
      "$2x$"
    ],
    correct: "$6x$",
    marks: 4,
    negative: 1
  },
  {
    id: 260,
    question: "The slope of the tangent to $y = \\ln(x)$ at $x = e$ is:",
    options: [
      "1",
      "$e$",
      "$1/e$",
      "0"
    ],
    correct: "$1/e$",
    marks: 4,
    negative: 1
  },
  {
    id: 261,
    question: "If $f(x) = \\sin x + \\cos x$, then $f'(x) = \\text{?}$",
    options: [
      "$\\cos x - \\sin x$",
      "$\\sin x + \\cos x$",
      "$-\\sin x + \\cos x$",
      "$-\\cos x - \\sin x$"
    ],
    correct: "$\\cos x - \\sin x$",
    marks: 4,
    negative: 1
  },
  {
    id: 262,
    question: "The curve $y = x^3 - 3x$ has stationary points at:",
    options: [
      "$x = \\pm 1$",
      "$x = 0, \\pm\\sqrt{3}$",
      "$x = \\pm\\sqrt{3}$",
      "$x = 0, \\pm 1$"
    ],
    correct: "$x = \\pm 1$",
    marks: 4,
    negative: 1
  },
  {
    id: 263,
    question: "The rate of change of volume of a sphere with respect to its radius $r$ is:",
    options: [
      "$4\\pi r^2$",
      "$2\\pi r$",
      "$\\pi r^2$",
      "$8\\pi r$"
    ],
    correct: "$4\\pi r^2$",
    marks: 4,
    negative: 1
  },
  {
    id: 264,
    question: "If $y = e^x \\sin x$, then $dy/dx = \\text{?}$",
    options: [
      "$e^x(\\sin x + \\cos x)$",
      "$e^x(\\sin x - \\cos x)$",
      "$e^x\\cos x$",
      "$e^x\\sin x$"
    ],
    correct: "$e^x(\\sin x + \\cos x)$",
    marks: 4,
    negative: 1
  },
  {
    id: 265,
    question: "The tangent to $y = x^2 + 2x + 1$ parallel to $y = 4x + 3$ is:",
    options: [
      "$y = 4x - 3$",
      "$y = 4x + 5$",
      "$y = 4x + 1$",
      "$y = 4x - 7$"
    ],
    correct: "$y = 4x + 5$",
    marks: 4,
    negative: 1
  },
  {
    id: 266,
    question: "The point at which $y = x^3 - 6x^2 + 9x$ has a maximum is:",
    options: [
      "$x = 3$",
      "$x = 0$",
      "$x = 1$",
      "$x = 2$"
    ],
    correct: "$x = 1$",
    marks: 4,
    negative: 1
  },
  {
    id: 267,
    question: "The maximum slope of $y = \\sin x + \\cos x$ is:",
    options: [
      "$\\sqrt{2}$",
      "1",
      "0",
      "$-\\sqrt{2}$"
    ],
    correct: "$\\sqrt{2}$",
    marks: 4,
    negative: 1
  },
  {
    id: 268,
    question: "The equation of the tangent to $y = \\sqrt{x}$ at $x = 1$ is:",
    options: [
      "$y = \\frac{1}{2}x + \\frac{1}{2}$",
      "$y = \\frac{1}{2}x + 1$",
      "$y = x + \\frac{1}{2}$",
      "$y = 2x + 1$"
    ],
    correct: "$y = \\frac{1}{2}x + \\frac{1}{2}$",
    marks: 4,
    negative: 1
  },
  {
    id: 269,
    question: "If $y = \\log_{10}(x)$, then $dy/dx = \\text{?}$",
    options: [
      "$1/x$",
      "$1/(x \\ln 10)$",
      "$(\\ln 10)/x$",
      "$10/x$"
    ],
    correct: "$1/(x \\ln 10)$",
    marks: 4,
    negative: 1
  },
  {
    id: 270,
    question: "The function $f(x) = x^2 + 1/x^2$ has its minimum at:",
    options: [
      "$x = 0$",
      "$x = 1$",
      "$x = -1$",
      "both (b) and (c)"
    ],
    correct: "both (b) and (c)",
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
    
    
    
    
    