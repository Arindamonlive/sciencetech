import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function MM4() {
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
    id: 91,
    question: "If 10sin⁴θ + 15cos⁴θ = 6, then (27csc⁶θ + 8sec⁶θ) / (16sec⁸θ) equals:",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 92,
    question: "In a triangle, the angles are in the ratio 1:2:7. The ratio of the greatest side to the smallest side is:",
    options: [
      "(√5 + 1)/(√5 - 1)",
      "√3",
      "2",
      "√2"
    ],
    correct: "(√5 + 1)/(√5 - 1)",
    marks: 4,
    negative: 1
  },
  {
    id: 93,
    question: "If the sides of a triangle are 13, 7, and 8, the largest angle is:",
    options: [
      "90°",
      "60°",
      "120°",
      "150°"
    ],
    correct: "120°",
    marks: 4,
    negative: 1
  },
  {
    id: 94,
    question: "If (s-a)(s-b) = s(s-c) in triangle ABC, then angle C is:",
    options: [
      "90°",
      "45°",
      "60°",
      "30°"
    ],
    correct: "90°",
    marks: 4,
    negative: 1
  },
  {
    id: 95,
    question: "In triangle ABC, (b+c)cosA + (c+a)cosB + (a+b)cosC = ?",
    options: [
      "Rr",
      "a+b+c",
      "0",
      "None"
    ],
    correct: "a+b+c",
    marks: 4,
    negative: 1
  },
  {
    id: 96,
    question: "Angles of triangle ABC are in arithmetic progression → identity among sides?",
    options: [
      "b² + c² - ac = b²",
      "c² = a² + b²",
      "c² = a² + b² + ab",
      "None"
    ],
    correct: "c² = a² + b² + ab",
    marks: 4,
    negative: 1
  },
  {
    id: 97,
    question: "If a sinA = b sinB in ΔABC → triangle is:",
    options: [
      "Right-angled isosceles",
      "Equilateral",
      "Right-angled",
      "Isosceles"
    ],
    correct: "Isosceles",
    marks: 4,
    negative: 1
  },
  {
    id: 98,
    question: "Angles A=45°, B=75° in triangle → a + c√2 equals:",
    options: [
      "a+b+c",
      "(a+b+c)/2",
      "2b",
      "a"
    ],
    correct: "2b",
    marks: 4,
    negative: 1
  },
  {
    id: 99,
    question: "Angles A,B,C in AP → relation?",
    options: [
      "b²+c²= a²",
      "a²+c²= b²",
      "a²+b²= c²",
      "None"
    ],
    correct: "None",
    marks: 4,
    negative: 1
  },
  {
    id: 100,
    question: "Perimeter of triangle ABC = 6 × mean of sines of angles; if b=2, B = ?",
    options: [
      "30°",
      "60°",
      "90°",
      "120°"
    ],
    correct: "60°",
    marks: 4,
    negative: 1
  },
  {
    id: 101,
    question: "Area = 80 cm², perimeter = 8 cm → inradius?",
    options: [
      "20 cm",
      "10 cm",
      "5 cm",
      "None"
    ],
    correct: "20 cm",
    marks: 4,
    negative: 1
  },
  {
    id: 102,
    question: "b² + c² = 3a², then cotB + cotC - cotA = ?",
    options: [
      "1",
      "0",
      "ac/4",
      "ab/4"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 103,
    question: "Angles 1:2:7 in triangle → greatest/least side ratio?",
    options: [
      "same as Q2",
      "√3",
      "2",
      "√2"
    ],
    correct: "same as Q2",
    marks: 4,
    negative: 1
  },
  {
    id: 104,
    question: "If in ΔABC, a cos²(C/2) + c cos²(A/2) = 3b/2 → sides are in?",
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
    id: 105,
    question: "a sinA = b sinB → triangle type?",
    options: [
      "Equilateral",
      "Isosceles",
      "Scalene",
      "Right-angled"
    ],
    correct: "Isosceles",
    marks: 4,
    negative: 1
  },
  {
    id: 106,
    question: "Principal value of tan⁻¹(tan(3π/5)):",
    options: [
      "2π/5",
      "-2π/5",
      "3π/5",
      "-3π/5"
    ],
    correct: "-2π/5",
    marks: 4,
    negative: 1
  },
  {
    id: 107,
    question: "sin[π/3 - sin⁻¹(-1/2)] = ?",
    options: [
      "1/2",
      "1/3",
      "-1",
      "1"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 108,
    question: "Domain of sin⁻¹(2x):",
    options: [
      "[0,1]",
      "[-1,1]",
      "[-1/2,1/2]",
      "[-2,2]"
    ],
    correct: "[-1/2,1/2]",
    marks: 4,
    negative: 1
  },
  {
    id: 109,
    question: "If sin⁻¹x + sin⁻¹y = π/2, then cos⁻¹x + cos⁻¹y = ?",
    options: [
      "π/2",
      "π",
      "0",
      "2π/3"
    ],
    correct: "π",
    marks: 4,
    negative: 1
  },
  {
    id: 110,
    question: "Principal branch of cos⁻¹x is:",
    options: [
      "[-π/2, π/2]",
      "(0, π)",
      "[0, π]",
      "(0, π)\\{π/2}"
    ],
    correct: "[0, π]",
    marks: 4,
    negative: 1
  },
  {
    id: 111,
    question: "If 2tan⁻¹(cosx) = tan⁻¹(2cscx), value of x is:",
    options: [
      "0",
      "π/4",
      "π/2",
      "π"
    ],
    correct: "π/4",
    marks: 4,
    negative: 1
  },
  {
    id: 112,
    question: "cos(sin⁻¹(3/5) + sin⁻¹(5/13) + sin⁻¹(33/65)) = ?",
    options: [
      "0",
      "1",
      "-1",
      "1/2"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 113,
    question: "Number of real solutions of 2sin⁻¹x + 3cos⁻¹x = 2π/5:",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correct: "2",
    marks: 4,
    negative: 1
  },
  {
    id: 114,
    question: "For n ∈ N, cot⁻¹3 + cot⁻¹4 + cot⁻¹5 + cot⁻¹n = π/4. n = ?",
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
    id: 115,
    question: "Number of solutions of sin⁻¹x = 2tan⁻¹x for x ∈ (-1,1]:",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 116,
    question: "If sin⁻¹((x+1)/√(x²+2x+2)) - sin⁻¹(x/√(x²+1)) = π/4, find x:",
    options: [
      "0",
      "1",
      "√3",
      "1/√3"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 117,
    question: "Domain of f(x) = sin⁻¹((x²–3x+2)/(x²+2x+7)):",
    options: [
      "all real",
      "[-1,1]",
      "finite subset",
      "None"
    ],
    correct: "all real",
    marks: 4,
    negative: 1
  },
  {
    id: 118,
    question: "Sum of absolute max and min of f(x) = tan⁻¹(sinx - cosx) on [0, π]:",
    options: [
      "0",
      "π/2",
      "π/4",
      "1"
    ],
    correct: "π/2",
    marks: 4,
    negative: 1
  },
  {
    id: 119,
    question: "tan(2tan⁻¹(3/5) + sin⁻¹(5/13)) = ?",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 120,
    question: "sin⁻¹(x)² - cos⁻¹(x)² = a; find in terms of x:",
    options: [
      "-π/2",
      "π/2",
      "depends on x",
      "0"
    ],
    correct: "depends on x",
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
  doc.text("Exam Results - Mathematics(Permutations, Combinations & Probability)", 14, 20);

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
    answers[q.id] === q.correct ? "correct" : "Wrong",
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
                <h1 className="text-2xl font-bold text-center mb-6">Mathematics(Permutations, Combinations & Probability)</h1>
    
                
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
    
    
    
    
    