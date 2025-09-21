import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function MM1() {
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
    id: 1,
    question: "Which of the following is a subset of every set?",
    options: [
      "Null set",
      "Finite set",
      "Universal set",
      "Infinite set"
    ],
    correct: "Null set",
    marks: 4,
    negative: 1
  },
  {
    id: 2,
    question: "If A = {1,2,3} and B = {3,4,5}, then A ∩ B is:",
    options: [
      "{1,2,3}",
      "{3}",
      "{4,5}",
      "{1,2}"
    ],
    correct: "{3}",
    marks: 4,
    negative: 1
  },
  {
    id: 3,
    question: "The number of subsets of a set containing n elements is:",
    options: [
      "2n",
      "n²",
      "n!",
      "n"
    ],
    correct: "2n",
    marks: 4,
    negative: 1
  },
  {
    id: 4,
    question: "A set which contains no element is called:",
    options: [
      "Singleton set",
      "Null set",
      "Universal set",
      "Finite set"
    ],
    correct: "Null set",
    marks: 4,
    negative: 1
  },
  {
    id: 5,
    question: "If A = {a, b}, then the power set of A contains:",
    options: [
      "2 elements",
      "3 elements",
      "4 elements",
      "5 elements"
    ],
    correct: "4 elements",
    marks: 4,
    negative: 1
  },
  {
    id: 6,
    question: "Which of the following is a finite set?",
    options: [
      "Set of even numbers",
      "Set of integers",
      "Set of natural numbers less than 10",
      "Set of real numbers"
    ],
    correct: "Set of natural numbers less than 10",
    marks: 4,
    negative: 1
  },
  {
    id: 7,
    question: "A function f: A → B is said to be injective if:",
    options: [
      "Every element of B is mapped",
      "Every element of A has a unique image",
      "Different elements of A have different images in B",
      "None"
    ],
    correct: "Different elements of A have different images in B",
    marks: 4,
    negative: 1
  },
  {
    id: 8,
    question: "The Cartesian product A × B is defined as:",
    options: [
      "A + B",
      "All possible ordered pairs (a, b) where a  ∈  A, b  ∈  B",
      "A ∩ B",
      "A ∪ B"
    ],
    correct: "All possible ordered pairs (a, b) where a  ∈  A, b  ∈  B",
    marks: 4,
    negative: 1
  },
  {
    id: 9,
    question: "If A has m elements and B has n elements, then A × B has:",
    options: [
      "m + n elements",
      "mn elements",
      "m - n elements",
      "m/n elements"
    ],
    correct: "mn elements",
    marks: 4,
    negative: 1
  },
  {
    id: 10,
    question: "A relation R from A to B is a subset of:",
    options: [
      "A × A",
      "B × B",
      "A × B",
      "B × A"
    ],
    correct: "A × B",
    marks: 4,
    negative: 1
  },
  {
    id: 11,
    question: "Which of the following is a symmetric relation?",
    options: [
      "R = {(a,b) | a > b}",
      "R = {(a,b) | a = b}",
      "R = {(a,b) | ab > 0}",
      "R = {(a,b) | a ≠ b}"
    ],
    correct: "R = {(a,b) | ab > 0}",
    marks: 4,
    negative: 1
  },
  {
    id: 12,
    question: "Which of the following represents a function?",
    options: [
      "{(1,2), (2,3), (1,3)}",
      "{(2,4), (3,6), (4,8)}",
      "{(a,b), (b,a), (a,a)}",
      "{(x,y) | x² + y² = 1}"
    ],
    correct: "{(2,4), (3,6), (4,8)}",
    marks: 4,
    negative: 1
  },
  {
    id: 13,
    question: "A function that is both one-one and onto is called:",
    options: [
      "Identity",
      "Surjection",
      "Injection",
      "Bijection"
    ],
    correct: "Bijection",
    marks: 4,
    negative: 1
  },
  {
    id: 14,
    question: "If A = {1,2} and B = {x,y}, then number of relations from A to B is:",
    options: [
      "2",
      "4",
      "16",
      "8"
    ],
    correct: "16",
    marks: 4,
    negative: 1
  },
  {
    id: 15,
    question: "The identity function maps:",
    options: [
      "Every element to zero",
      "Every element to itself",
      "Every element to 1",
      "Every element to a unique image"
    ],
    correct: "Every element to itself",
    marks: 4,
    negative: 1
  },
  {
    id: 16,
    question: "The domain of the function f(x) = 1/x is:",
    options: [
      "R",
      "R - {0}",
      "R+",
      "R-"
    ],
    correct: "R - {0}",
    marks: 4,
    negative: 1
  },
  {
    id: 17,
    question: "If f(x) = x², then f(-3) = ?",
    options: [
      "-3",
      "9",
      "-9",
      "3"
    ],
    correct: "9",
    marks: 4,
    negative: 1
  },
  {
    id: 18,
    question: "A relation which is reflexive, symmetric and transitive is called:",
    options: [
      "Equivalence relation",
      "Function",
      "Mapping",
      "Identity"
    ],
    correct: "Equivalence relation",
    marks: 4,
    negative: 1
  },
  {
    id: 19,
    question: "Which of the following is not a function?",
    options: [
      "f: R → R, f(x) = x²",
      "f: R → R, f(x) = 1/x",
      "f: R → R, f(x) = √x",
      "f: R → R, f(x) = ±√x"
    ],
    correct: "f: R → R, f(x) = ±√x",
    marks: 4,
    negative: 1
  },
  {
    id: 20,
    question: "Which is the correct representation of the set of integers?",
    options: [
      "N",
      "R",
      "Z",
      "Q"
    ],
    correct: "Z",
    marks: 4,
    negative: 1
  },
  {
    id: 21,
    question: "If f(x) = x + 2 and g(x) = 3x, then (f ∘ g)(x) =",
    options: [
      "3x + 2",
      "3(x + 2)",
      "x + 6",
      "3x²"
    ],
    correct: "3x + 2",
    marks: 4,
    negative: 1
  },
  {
    id: 22,
    question: "The range of f(x) = x² for x ∈ R is:",
    options: [
      "R",
      "R+",
      "[0, ∞)",
      "(-∞, ∞)"
    ],
    correct: "[0, ∞)",
    marks: 4,
    negative: 1
  },
  {
    id: 23,
    question: "The number of elements in the power set of a set with 3 elements is:",
    options: [
      "3",
      "6",
      "8",
      "9"
    ],
    correct: "8",
    marks: 4,
    negative: 1
  },
  {
    id: 24,
    question: "The empty set is:",
    options: [
      "Infinite",
      "Singleton",
      "Finite",
      "None of these"
    ],
    correct: "Finite",
    marks: 4,
    negative: 1
  },
  {
    id: 25,
    question: "If a set has n elements, then the number of equivalence relations is:",
    options: [
      "n",
      "Infinite",
      "Bell number of n",
      "2^n"
    ],
    correct: "Bell number of n",
    marks: 4,
    negative: 1
  },
  {
    id: 26,
    question: "If R = {(1,1), (2,2), (1,2), (2,1)}, then R is:",
    options: [
      "Symmetric",
      "Reflexive",
      "Transitive",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 27,
    question: "Set of rational numbers is:",
    options: [
      "Countable",
      "Uncountable",
      "Finite",
      "Singleton"
    ],
    correct: "Countable",
    marks: 4,
    negative: 1
  },
  {
    id: 28,
    question: "If A = {1,2}, then number of binary relations on A is:",
    options: [
      "16",
      "4",
      "10",
      "8"
    ],
    correct: "16",
    marks: 4,
    negative: 1
  },
  {
    id: 29,
    question: "Which of the following is not a subset of {1,2,3}?",
    options: [
      "{1,2}",
      "{2,3,4}",
      "{}",
      "{3}"
    ],
    correct: "{2,3,4}",
    marks: 4,
    negative: 1
  },
  {
    id: 30,
    question: "The function f(x) = x³ is:",
    options: [
      "Even",
      "Odd",
      "Periodic",
      "Constant"
    ],
    correct: "Odd",
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
  doc.text("Exam Results - Mathematics(Sets, Relations, Functions)", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Mathematics(Sets, Relations, Functions)</h1>
    
                
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
    
    
    
    
    