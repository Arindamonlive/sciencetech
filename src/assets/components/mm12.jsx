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
    id: 331,
    question: "If A is a $2\\times 2$ matrix with $\\det(A) = 5$, then $\\det(2A) = \\text{?}$",
    options: [
      "10",
      "20",
      "25",
      "40"
    ],
    correct: "20",
    marks: 4,
    negative: 1
  },
  {
    id: 332,
    question: "If $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$, then $\\det(A) = \\text{?}$",
    options: [
      "$-2$",
      "$2$",
      "$1$",
      "$-5$"
    ],
    correct: "$-2$",
    marks: 4,
    negative: 1
  },
  {
    id: 333,
    question: "Which of the following is always true for a square matrix A?",
    options: [
      "$\\det(A^T) = \\det(A)$",
      "$\\det(A^T) = -\\det(A)$",
      "$\\det(A^T) = 0$",
      "$\\det(A^T) = \\det(A^{-1})$"
    ],
    correct: "$\\det(A^T) = \\det(A)$",
    marks: 4,
    negative: 1
  },
  {
    id: 334,
    question: "If $AB = I$, then $\\det(A) \\cdot \\det(B) = \\text{?}$",
    options: [
      "0",
      "1",
      "$-1$",
      "$\\det(A)$"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 335,
    question: "For a $3\\times 3$ matrix, if one row is multiplied by 5, the determinant is multiplied by?",
    options: [
      "5",
      "10",
      "15",
      "25"
    ],
    correct: "5",
    marks: 4,
    negative: 1
  },
  {
    id: 336,
    question: "If A is invertible, then $\\det(A^{-1}) = \\text{?}$",
    options: [
      "$\\det(A)$",
      "$1/\\det(A)$",
      "0",
      "$-\\det(A)$"
    ],
    correct: "$1/\\det(A)$",
    marks: 4,
    negative: 1
  },
  {
    id: 337,
    question: "If $A = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}$, then $\\det(A) = \\text{?}$",
    options: [
      "6",
      "5",
      "0",
      "2"
    ],
    correct: "6",
    marks: 4,
    negative: 1
  },
  {
    id: 338,
    question: "Which of the following is NOT true?",
    options: [
      "$\\det(AB)=\\det(A)\\det(B)$",
      "$\\det(A+B)=\\det(A)+\\det(B)$",
      "$\\det(A^T)=\\det(A)$",
      "$\\det(I)=1$"
    ],
    correct: "$\\det(A+B)=\\det(A)+\\det(B)$",
    marks: 4,
    negative: 1
  },
  {
    id: 339,
    question: "The adjoint of a matrix A is defined as:",
    options: [
      "Transpose of A",
      "Inverse of A",
      "Transpose of cofactor matrix",
      "Determinant of A"
    ],
    correct: "Transpose of cofactor matrix",
    marks: 4,
    negative: 1
  },
  {
    id: 340,
    question: "If $A = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$, then $A^2 = \\text{?}$",
    options: [
      "$I$",
      "$-I$",
      "$A$",
      "0"
    ],
    correct: "$-I$",
    marks: 4,
    negative: 1
  },
  {
    id: 341,
    question: "If $\\det(A) = 0$, then A is:",
    options: [
      "Invertible",
      "Non-singular",
      "Singular",
      "Orthogonal"
    ],
    correct: "Singular",
    marks: 4,
    negative: 1
  },
  {
    id: 342,
    question: "The rank of the zero matrix of order 3 is:",
    options: [
      "3",
      "0",
      "1",
      "2"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 343,
    question: "If A is an orthogonal matrix, then $A^{-1} = \\text{?}$",
    options: [
      "$A$",
      "$A^T$",
      "$-A$",
      "None"
    ],
    correct: "$A^T$",
    marks: 4,
    negative: 1
  },
  {
    id: 344,
    question: "If A is a skew-symmetric matrix of odd order, then $\\det(A) = \\text{?}$",
    options: [
      "Positive",
      "Negative",
      "0",
      "1"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 345,
    question: "If $A = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}$, $\\det(A) = \\text{?}$",
    options: [
      "1",
      "2",
      "6",
      "0"
    ],
    correct: "6",
    marks: 4,
    negative: 1
  },
  {
    id: 346,
    question: "Which of the following matrices is symmetric?",
    options: [
      "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$",
      "$\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$",
      "$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$",
      "$\\begin{pmatrix} 2 & 0 \\\\ 1 & 2 \\end{pmatrix}$"
    ],
    correct: "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$",
    marks: 4,
    negative: 1
  },
  {
    id: 347,
    question: "If A and B are square matrices of same order, $\\det(AB) = \\text{?}$",
    options: [
      "$\\det(A) + \\det(B)$",
      "$\\det(A)\\det(B)$",
      "$\\det(A-B)$",
      "$\\det(A)+\\det(B)-1$"
    ],
    correct: "$\\det(A)\\det(B)$",
    marks: 4,
    negative: 1
  },
  {
    id: 348,
    question: "If $A = I$, then $\\det(A) = \\text{?}$",
    options: [
      "0",
      "1",
      "$n$",
      "Depends on $n$"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 349,
    question: "If two rows of a determinant are identical, its value is:",
    options: [
      "1",
      "0",
      "Depends",
      "Infinite"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 350,
    question: "For a $2\\times 2$ matrix A, if $\\det(A)=k$, then $\\det(A^2)=\\text{?}$",
    options: [
      "$k^2$",
      "$2k$",
      "$k$",
      "0"
    ],
    correct: "$k^2$",
    marks: 4,
    negative: 1
  },
  {
    id: 351,
    question: "If $A = \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}$, then $\\det(A) = \\text{?}$",
    options: [
      "$-3$",
      "$3$",
      "0",
      "1"
    ],
    correct: "$-3$",
    marks: 4,
    negative: 1
  },
  {
    id: 352,
    question: "If $\\det(A)=7$ and $\\det(B)=3$, then $\\det(AB)=\\text{?}$",
    options: [
      "10",
      "21",
      "4",
      "1"
    ],
    correct: "21",
    marks: 4,
    negative: 1
  },
  {
    id: 353,
    question: "Which of the following is always true for determinant?",
    options: [
      "$\\det(kA)=k \\det(A)$",
      "$\\det(kA)=k^n \\det(A)$",
      "$\\det(kA)=\\det(A)^k$",
      "$\\det(kA)=0$"
    ],
    correct: "$\\det(kA)=k^n \\det(A)$",
    marks: 4,
    negative: 1
  },
  {
    id: 354,
    question: "If $A = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$, then $\\det(A) = \\text{?}$",
    options: [
      "0",
      "1",
      "$-1$",
      "$\\cos 2\\theta$"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 355,
    question: "If A is a diagonal matrix, then $\\det(A) = \\text{?}$",
    options: [
      "Sum of diagonal entries",
      "Product of diagonal entries",
      "Trace of A",
      "Always 1"
    ],
    correct: "Product of diagonal entries",
    marks: 4,
    negative: 1
  },
  {
    id: 356,
    question: "The determinant of identity matrix of order 3 is:",
    options: [
      "0",
      "1",
      "3",
      "Depends on order"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 357,
    question: "If A is skew-symmetric of order 2, then $\\det(A) = \\text{?}$",
    options: [
      "0",
      "1",
      "-1",
      "Positive"
    ],
    correct: "Positive",
    marks: 4,
    negative: 1
  },
  {
    id: 358,
    question: "Which of the following is true for an invertible matrix A?",
    options: [
      "$\\det(A)=0$",
      "$\\det(A)\\ne 0$",
      "$\\det(A) < 0$",
      "$\\det(A)=1$"
    ],
    correct: "$\\det(A)\\ne 0$",
    marks: 4,
    negative: 1
  },
  {
    id: 359,
    question: "If A and B are $2\\times 2$ matrices with $\\det(A)=2$ and $\\det(B)=5$, then $\\det(A^{-1}B) = \\text{?}$",
    options: [
      "10",
      "5/2",
      "2/5",
      "1/10"
    ],
    correct: "5/2",
    marks: 4,
    negative: 1
  },
  {
    id: 360,
    question: "If a row of a determinant is multiplied by $-1$, then determinant is multiplied by:",
    options: [
      "0",
      "$-1$",
      "1",
      "2"
    ],
    correct: "$-1$",
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
    
    
    
    
    