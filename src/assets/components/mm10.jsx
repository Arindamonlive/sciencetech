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
    id: 271,
    question: "The value of $\\int_{0}^{\\pi/2} \\sin^3 x \\cos^2 x \\, dx$ is:",
    options: [
      "1/6",
      "2/15",
      "1/3",
      "2/9"
    ],
    correct: "2/15",
    marks: 4,
    negative: 1
  },
  {
    id: 272,
    question: "If $\\int x e^{x^2} \\, dx = \\text{?}$",
    options: [
      "$(1/2)e^{x^2}+C$",
      "$e^{x^2}+C$",
      "$x e^{x^2}+C$",
      "$2e^{x^2}+C$"
    ],
    correct: "$(1/2)e^{x^2}+C$",
    marks: 4,
    negative: 1
  },
  {
    id: 273,
    question: "The solution of $dy/dx = 3y$ is:",
    options: [
      "$y = Ce^{3x}$",
      "$y = Ce^{x/3}$",
      "$y = 3Ce^x$",
      "$y = Cx^3$"
    ],
    correct: "$y = Ce^{3x}$",
    marks: 4,
    negative: 1
  },
  {
    id: 274,
    question: "$\\int (1/(x\\sqrt{x^2-1})) \\, dx$ equals:",
    options: [
      "$\\sec^{-1}x + C$",
      "$\\cos^{-1}x + C$",
      "$\\sin^{-1}x + C$",
      "$\\tan^{-1}x + C$"
    ],
    correct: "$\\sec^{-1}x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 275,
    question: "Solution of $d^2y/dx^2 = 0$:",
    options: [
      "$y = Ax + B$",
      "$y = Ae^x + Be^{-x}$",
      "$y = A \\sin x + B \\cos x$",
      "$y = Ax^2 + B$"
    ],
    correct: "$y = Ax + B$",
    marks: 4,
    negative: 1
  },
  {
    id: 276,
    question: "$\\int \\tan x \\, dx$ equals:",
    options: [
      "$\\ln|\\sec x| + C$",
      "$\\ln|\\cos x| + C$",
      "$\\sec x + C$",
      "$\\sin x + C$"
    ],
    correct: "$\\ln|\\sec x| + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 277,
    question: "The integrating factor for $dy/dx + Py = Q$ is:",
    options: [
      "$e^{\\int P \\, dx}$",
      "$e^{\\int Q \\, dx}$",
      "$\\int P \\, dx$",
      "$\\int Q \\, dx$"
    ],
    correct: "$e^{\\int P \\, dx}$",
    marks: 4,
    negative: 1
  },
  {
    id: 278,
    question: "$\\int x/(x^2+4) \\, dx$ equals:",
    options: [
      "$(1/2) \\ln(x^2+4)+C$",
      "$\\ln(x^2+4)+C$",
      "$\\tan^{-1}(x/2)+C$",
      "$x^2/(x^2+4)+C$"
    ],
    correct: "$(1/2) \\ln(x^2+4)+C$",
    marks: 4,
    negative: 1
  },
  {
    id: 279,
    question: "The DE whose solution is $y = A \\cos 2x + B \\sin 2x$ is:",
    options: [
      "$y'' + 4y = 0$",
      "$y'' - 4y = 0$",
      "$y'' + y = 0$",
      "$y'' - y = 0$"
    ],
    correct: "$y'' + 4y = 0$",
    marks: 4,
    negative: 1
  },
  {
    id: 280,
    question: "$\\int 1/(9+x^2) \\, dx$ equals:",
    options: [
      "$(1/3) \\tan^{-1}(x/3) + C$",
      "$\\tan^{-1}(3x) + C$",
      "$3 \\tan^{-1}(x) + C$",
      "$\\tan^{-1}(x/9) + C$"
    ],
    correct: "$(1/3) \\tan^{-1}(x/3) + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 281,
    question: "The solution of $dy/dx = x^2$ is:",
    options: [
      "$y = x^3/3 + C$",
      "$y = 3x^2 + C$",
      "$y = x^2 + C$",
      "$y = x^3 + C$"
    ],
    correct: "$y = x^3/3 + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 282,
    question: "$\\int e^{3x} \\, dx$ equals:",
    options: [
      "$(1/3)e^{3x} + C$",
      "$3e^{3x} + C$",
      "$e^{3x} + C$",
      "$e^x + C$"
    ],
    correct: "$(1/3)e^{3x} + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 283,
    question: "The DE $dy/dx + y = e^x$ has solution:",
    options: [
      "$y = Ce^{-x} + (e^x)/2$",
      "$y = Ce^{-x} + e^x/2$",
      "$y = Ce^{-x} + e^x$",
      "$y = Ce^x + 1$"
    ],
    correct: "$y = Ce^{-x} + e^x/2$",
    marks: 4,
    negative: 1
  },
  {
    id: 284,
    question: "$\\int 1/(\\sqrt{1-x^2}) \\, dx$ equals:",
    options: [
      "$\\sin^{-1}x + C$",
      "$\\cos^{-1}x + C$",
      "$\\tan^{-1}x + C$",
      "$\\sec^{-1}x + C$"
    ],
    correct: "$\\sin^{-1}x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 285,
    question: "Solution of $dy/dx = y^2$ is:",
    options: [
      "$y = -1/(x + C)$",
      "$y = 1/(x + C)$",
      "$y = Cx^2$",
      "$y = e^x$"
    ],
    correct: "$y = -1/(x + C)$",
    marks: 4,
    negative: 1
  },
  {
    id: 286,
    question: "$\\int (2x)/(x^2+1) \\, dx$ equals:",
    options: [
      "$\\ln(x^2+1)+C$",
      "$2 \\ln(x^2+1)+C$",
      "$\\ln(x+1)+C$",
      "$\\tan^{-1}x + C$"
    ],
    correct: "$\\ln(x^2+1)+C$",
    marks: 4,
    negative: 1
  },
  {
    id: 287,
    question: "The DE with general solution $y = Ae^{5x}$ is:",
    options: [
      "$dy/dx = 5y$",
      "$dy/dx = y/5$",
      "$dy/dx = -5y$",
      "$dy/dx = y^2$"
    ],
    correct: "$dy/dx = 5y$",
    marks: 4,
    negative: 1
  },
  {
    id: 288,
    question: "$\\int \\cot x \\, dx$ equals:",
    options: [
      "$\\ln|\\sin x| + C$",
      "$\\ln|\\cos x| + C$",
      "$\\ln|\\tan x| + C$",
      "$\\ln|\\sin x| - \\ln|\\cos x| + C$"
    ],
    correct: "$\\ln|\\sin x| + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 289,
    question: "The solution of $y' + 4y = 0$:",
    options: [
      "$y = Ce^{-4x}$",
      "$y = Ce^{4x}$",
      "$y = 4Ce^x$",
      "$y = Cx^4$"
    ],
    correct: "$y = Ce^{-4x}$",
    marks: 4,
    negative: 1
  },
  {
    id: 290,
    question: "$\\int 1/(x\\sqrt{1+x^2}) \\, dx$ equals:",
    options: [
      "$\\sec^{-1}x + C$",
      "$\\sin^{-1}x + C$",
      "$\\tan^{-1}x + C$",
      "$\\cos^{-1}x + C$"
    ],
    correct: "$\\tan^{-1}x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 291,
    question: "$\\int x^3 \\, dx$ equals:",
    options: [
      "$x^4/4 + C$",
      "$x^2/2 + C$",
      "$x^3 + C$",
      "$x^5/5 + C$"
    ],
    correct: "$x^4/4 + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 292,
    question: "The particular solution of $dy/dx = 3x^2$, $y(0)=5$:",
    options: [
      "$y = x^3 + 5$",
      "$y = x^3/3 + 5$",
      "$y = x^3 + 3$",
      "$y = x^3$"
    ],
    correct: "$y = x^3 + 5$",
    marks: 4,
    negative: 1
  },
  {
    id: 293,
    question: "$\\int \\sec^2 x \\, dx$ equals:",
    options: [
      "$\\tan x + C$",
      "$\\sec x + C$",
      "$\\sin x + C$",
      "$\\cos x + C$"
    ],
    correct: "$\\tan x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 294,
    question: "If $\\int f'(x)/f(x) \\, dx = \\text{?}$",
    options: [
      "$\\ln|f(x)| + C$",
      "$f(x)+C$",
      "$1/f(x)+C$",
      "$f'(x)+C$"
    ],
    correct: "$\\ln|f(x)| + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 295,
    question: "The DE whose solution is $y = A + Bx$ is:",
    options: [
      "$y'' = 0$",
      "$y' = 0$",
      "$y'' + y = 0$",
      "$y'' - y = 0$"
    ],
    correct: "$y'' = 0$",
    marks: 4,
    negative: 1
  },
  {
    id: 296,
    question: "$\\int \\cos 3x \\, dx$ equals:",
    options: [
      "$(1/3) \\sin 3x + C$",
      "$3 \\sin x + C$",
      "$\\sin x + C$",
      "$\\tan x + C$"
    ],
    correct: "$(1/3) \\sin 3x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 297,
    question: "The integrating factor for $dy/dx - 2y = e^{-x}$ is:",
    options: [
      "$e^{-2x}$",
      "$e^{2x}$",
      "$e^x$",
      "$e^{-x}$"
    ],
    correct: "$e^{-2x}$",
    marks: 4,
    negative: 1
  },
  {
    id: 298,
    question: "$\\int (1/(x^2+16)) \\, dx$ equals:",
    options: [
      "$(1/4) \\tan^{-1}(x/4) + C$",
      "$\\tan^{-1}(4x)+C$",
      "$4 \\tan^{-1}(x)+C$",
      "$\\tan^{-1}(x/16)+C$"
    ],
    correct: "$(1/4) \\tan^{-1}(x/4) + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 299,
    question: "Solution of $dy/dx = \\sin x$:",
    options: [
      "$y = -\\cos x + C$",
      "$y = \\cos x + C$",
      "$y = \\tan x + C$",
      "$y = \\sec x + C$"
    ],
    correct: "$y = -\\cos x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 300,
    question: "$\\int x e^x \\, dx$ equals:",
    options: [
      "$(x-1)e^x + C$",
      "$e^x + C$",
      "$(x+1)e^x + C$",
      "$x e^x + C$"
    ],
    correct: "$(x-1)e^x + C$",
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
    
    
    
    
    