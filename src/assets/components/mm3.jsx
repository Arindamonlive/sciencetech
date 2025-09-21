import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function MM3() {
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
    id: 61,
    question: "The coefficient of x² in (1 + x)^5 is:",
    options: [
      "5",
      "10",
      "15",
      "20"
    ],
    correct: "10",
    marks: 4,
    negative: 1
  },
  {
    id: 62,
    question: "The sum of an infinite geometric progression with first term a and common ratio r is:",
    options: [
      "a/(1 + r)",
      "a/(1 - r)",
      "ar/(1 - r)",
      "None"
    ],
    correct: "a/(1 - r)",
    marks: 4,
    negative: 1
  },
  {
    id: 63,
    question: "The sum to n terms of a GP is 255 and a = 1, r = 2. Then n is:",
    options: [
      "7",
      "8",
      "6",
      "9"
    ],
    correct: "8",
    marks: 4,
    negative: 1
  },
  {
    id: 64,
    question: "Middle term of (x + 1)^10 is:",
    options: [
      "T₅",
      "T₆",
      "T₁₁",
      "T₇"
    ],
    correct: "T₆",
    marks: 4,
    negative: 1
  },
  {
    id: 65,
    question: "The number of terms in the expansion of (x + y)^n is:",
    options: [
      "n",
      "n+1",
      "2n",
      "2n+1"
    ],
    correct: "n+1",
    marks: 4,
    negative: 1
  },
  {
    id: 66,
    question: "The general term in (x + a)^n is:",
    options: [
      "C(n, r) * x^r * a^(n-r)",
      "C(n, r) * x^(n-r) * a^r",
      "nCr * x^r * a^r",
      "None"
    ],
    correct: "C(n, r) * x^(n-r) * a^r",
    marks: 4,
    negative: 1
  },
  {
    id: 67,
    question: "The 10th term of a GP is 128 and 6th term is 8. First term is:",
    options: [
      "1",
      "2",
      "4",
      "None"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 68,
    question: "In a GP, the 4th term is 81 and the 7th term is 6561. The common ratio is:",
    options: [
      "3",
      "2",
      "4",
      "9"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 69,
    question: "If the sum of n terms of an AP is 2n² + 3n, then its 5th term is:",
    options: [
      "40",
      "35",
      "25",
      "30"
    ],
    correct: "30",
    marks: 4,
    negative: 1
  },
  {
    id: 70,
    question: "The sum of the first n terms of an AP is 3n² + 5n. Find the first term.",
    options: [
      "3",
      "8",
      "5",
      "None of these"
    ],
    correct: "8",
    marks: 4,
    negative: 1
  },
  {
    id: 71,
    question: "If the p-th term of an AP is q and the q-th term is p, then the r-th term is:",
    options: [
      "p + q - r",
      "r",
      "2r - p - q",
      "p + q"
    ],
    correct: "p + q - r",
    marks: 4,
    negative: 1
  },
  {
    id: 72,
    question: "The expansion of (2 + 3x)³ has how many terms?",
    options: [
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
    id: 73,
    question: "Term independent of x in (x² + 1/x)⁶ is:",
    options: [
      "T₃",
      "T₄",
      "T₅",
      "T₆"
    ],
    correct: "T₅",
    marks: 4,
    negative: 1
  },
  {
    id: 74,
    question: "In (a + b)^5, the coefficient of a²b³ is:",
    options: [
      "10",
      "5",
      "20",
      "None"
    ],
    correct: "10",
    marks: 4,
    negative: 1
  },
  {
    id: 75,
    question: "If a, b, c are in AP, then which of the following is true?",
    options: [
      "2b = a + c",
      "a + b = c",
      "b = a + c",
      "a = b + c"
    ],
    correct: "2b = a + c",
    marks: 4,
    negative: 1
  },
  {
    id: 76,
    question: "Which term of the AP 3, 7, 11,... is 95?",
    options: [
      "22",
      "21",
      "23",
      "24"
    ],
    correct: "24",
    marks: 4,
    negative: 1
  },
  {
    id: 77,
    question: "If a, ar, ar²,... is a GP and ar³ = 8a, then r equals:",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct: "2",
    marks: 4,
    negative: 1
  },
  {
    id: 78,
    question: "The expansion of (1 - x)^6 contains:",
    options: [
      "Only positive terms",
      "Only negative terms",
      "Alternating signs",
      "Zero terms"
    ],
    correct: "Alternating signs",
    marks: 4,
    negative: 1
  },
  {
    id: 79,
    question: "The coefficient of x⁴ in (1 + x)⁸ is:",
    options: [
      "70",
      "56",
      "64",
      "60"
    ],
    correct: "70",
    marks: 4,
    negative: 1
  },
  {
    id: 80,
    question: "If the 3rd term in binomial expansion of (1 + x)^n is 120, find n.",
    options: [
      "9",
      "10",
      "11",
      "8"
    ],
    correct: "10",
    marks: 4,
    negative: 1
  },
  {
    id: 81,
    question: "In an AP, the sum of first 20 terms is 210. If the first term is 5, what is the common difference?",
    options: [
      "0.5",
      "1",
      "2",
      "None"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 82,
    question: "The nth term of a sequence is given by Tn = 3n + 2. What type of sequence is this?",
    options: [
      "AP",
      "GP",
      "HP",
      "None"
    ],
    correct: "AP",
    marks: 4,
    negative: 1
  },
  {
    id: 83,
    question: "What is the sum of the first 5 terms of the GP: 2, 4, 8, ...?",
    options: [
      "62",
      "64",
      "60",
      "66"
    ],
    correct: "62",
    marks: 4,
    negative: 1
  },
  {
    id: 84,
    question: "Which of the following sequences is a GP?",
    options: [
      "1, 2, 4, 8",
      "2, 5, 8, 11",
      "1, 1/2, 1/3",
      "3, 6, 9, 12"
    ],
    correct: "1, 2, 4, 8",
    marks: 4,
    negative: 1
  },
  {
    id: 85,
    question: "If a, b, c are in GP and b = 6, a = 3, then c equals:",
    options: [
      "9",
      "12",
      "6",
      "None"
    ],
    correct: "12",
    marks: 4,
    negative: 1
  },
  {
    id: 86,
    question: "How many terms are there in the expansion of (2x - 3y)^4?",
    options: [
      "4",
      "5",
      "6",
      "None"
    ],
    correct: "5",
    marks: 4,
    negative: 1
  },
  {
    id: 87,
    question: "The 4th term in expansion of (x + 2)^5 is:",
    options: [
      "80x²",
      "80x",
      "40x²",
      "60x²"
    ],
    correct: "80x²",
    marks: 4,
    negative: 1
  },
  {
    id: 88,
    question: "In (x + 1)^n, the ratio of coefficients of 2nd and 3rd term is 3:4. Find n.",
    options: [
      "5",
      "6",
      "7",
      "8"
    ],
    correct: "7",
    marks: 4,
    negative: 1
  },
  {
    id: 89,
    question: "What is the constant term in expansion of (x + 1/x)^6?",
    options: [
      "20",
      "15",
      "10",
      "None"
    ],
    correct: "20",
    marks: 4,
    negative: 1
  },
  {
    id: 90,
    question: "If (a + b)^6 is expanded, what is the sum of the coefficients?",
    options: [
      "64",
      "128",
      "32",
      "None"
    ],
    correct: "64",
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
  doc.text("Exam Results - Mathematics(Sequence & Series, Binomial Theorem)", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Mathematics(Sequence & Series, Binomial Theorem)</h1>
    
                
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
    
    
    
    
    