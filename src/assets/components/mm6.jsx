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
    id: 151,
    question: "The slope of the line passing through (3, –2) and (7, 6) is:",
    options: [
      "2",
      "1",
      "3/2",
      "2/3"
    ],
    correct: "2",
    marks: 4,
    negative: 1
  },
  {
    id: 152,
    question: "The equation of a line with slope 3 and y-intercept –2 is:",
    options: [
      "y=3x–2",
      "y=–3x–2",
      "y=3x+2",
      "y=–3x+2"
    ],
    correct: "y=3x–2",
    marks: 4,
    negative: 1
  },
  {
    id: 153,
    question: "Condition for lines $a_1x+b_1y+c_1=0$ and $a_2x+b_2y+c_2=0$ to be parallel:",
    options: [
      "a1/a2=b1/b2",
      "a1b2=a2b1",
      "a1/a2≠b1/b2",
      "none"
    ],
    correct: "a1b2=a2b1",
    marks: 4,
    negative: 1
  },
  {
    id: 154,
    question: "Angle between line $y=\\sqrt{3}x$ and x-axis is:",
    options: [
      "30°",
      "45°",
      "60°",
      "90°"
    ],
    correct: "60°",
    marks: 4,
    negative: 1
  },
  {
    id: 155,
    question: "Distance of (2,–1) from line $3x–4y+5=0$:",
    options: [
      "1",
      "2",
      "3",
      "5"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 156,
    question: "Equation of line through (1,2) perpendicular to $2x+3y=5$:",
    options: [
      "3x–2y+1=0",
      "2x+3y–8=0",
      "2x–3y+4=0",
      "3x+2y–7=0"
    ],
    correct: "3x–2y+1=0",
    marks: 4,
    negative: 1
  },
  {
    id: 157,
    question: "Intersection of $x+y=5$ and $x–y=1$:",
    options: [
      "(3,2)",
      "(2,3)",
      "(1,4)",
      "(4,1)"
    ],
    correct: "(3,2)",
    marks: 4,
    negative: 1
  },
  {
    id: 158,
    question: "Line through (–1,2) with equal intercepts:",
    options: [
      "x+y=1",
      "x–y=–3",
      "x+y=2",
      "x–y=1"
    ],
    correct: "x+y=2",
    marks: 4,
    negative: 1
  },
  {
    id: 159,
    question: "Centroid of triangle bounded by $x=0$, $y=0$, $x+y=4$:",
    options: [
      "(1,1)",
      "(2/3,2/3)",
      "(4/3,4/3)",
      "(2,2)"
    ],
    correct: "(4/3,4/3)",
    marks: 4,
    negative: 1
  },
  {
    id: 160,
    question: "Condition for perpendicular lines $lx+my+n=0$ and $ax+by+c=0$:",
    options: [
      "la+mb=0",
      "lb–ma=0",
      "ab+mn=0",
      "la–mb=0"
    ],
    correct: "la+mb=0",
    marks: 4,
    negative: 1
  },
  {
    id: 161,
    question: "Line bisecting acute angle between $3x–4y=0$ and $6x–8y+9=0$:",
    options: [
      "x/3=y/4",
      "x/6=y/8",
      "3x–4y=±9",
      "none"
    ],
    correct: "x/3=y/4",
    marks: 4,
    negative: 1
  },
  {
    id: 162,
    question: "Line with intercepts 2 and –3:",
    options: [
      "x/2+y/(–3)=1",
      "x/2+y/3=1",
      "3x+2y=6",
      "x/3+y/2=1"
    ],
    correct: "x/2+y/(–3)=1",
    marks: 4,
    negative: 1
  },
  {
    id: 163,
    question: "Line equidistant from (3,–4) and (–5,6):",
    options: [
      "x+y=0",
      "x–y=0",
      "4x+3y=0",
      "5x–y=0"
    ],
    correct: "x+y=0",
    marks: 4,
    negative: 1
  },
  {
    id: 164,
    question: "Altitude from (2,3) to base (0,0),(4,0):",
    options: [
      "x=2",
      "y=3",
      "x–2=0",
      "y–3=0"
    ],
    correct: "x=2",
    marks: 4,
    negative: 1
  },
  {
    id: 165,
    question: "Perpendicular distance from origin to $3x+4y=12$:",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correct: "2",
    marks: 4,
    negative: 1
  },
  {
    id: 166,
    question: "Centre & radius of $x²+y²–6x+8y–11=0$:",
    options: [
      "(3,–4),2",
      "(3,–4),5",
      "(–3,4),2",
      "(–3,4),5"
    ],
    correct: "(3,–4),5",
    marks: 4,
    negative: 1
  },
  {
    id: 167,
    question: "Circle with center (2,–1), radius 3:",
    options: [
      "(x–2)²+(y+1)²=9",
      "(x+2)²+(y–1)²=9",
      "(x–2)²+(y–1)²=9",
      "none"
    ],
    correct: "(x–2)²+(y+1)²=9",
    marks: 4,
    negative: 1
  },
  {
    id: 168,
    question: "Tangent length from (5,0) to $x²+y²=9$:",
    options: [
      "4",
      "√16",
      "√25",
      "2"
    ],
    correct: "4",
    marks: 4,
    negative: 1
  },
  {
    id: 169,
    question: "Tangent to $x²+y²=25$ at (3,4):",
    options: [
      "3x+4y=25",
      "3x–4y=25",
      "4x–3y=25",
      "3x+4y=12"
    ],
    correct: "3x+4y=25",
    marks: 4,
    negative: 1
  },
  {
    id: 170,
    question: "Circle with diameter (1,2),(3,4):",
    options: [
      "(x–2)²+(y–3)²=2",
      "(x–2)²+(y–3)²=4",
      "(x+2)²+(y+3)²=2",
      "(x+2)²+(y–3)²=4"
    ],
    correct: "(x–2)²+(y–3)²=2",
    marks: 4,
    negative: 1
  },
  {
    id: 171,
    question: "Radical axis of $x²+y²=25$ and $x²+y²–6x=0$:",
    options: [
      "x=3",
      "x=4",
      "x=5",
      "y=3"
    ],
    correct: "x=3",
    marks: 4,
    negative: 1
  },
  {
    id: 172,
    question: "Circle touching x-axis at (2,0), passing (3,4):",
    options: [
      "(x–2)²+(y–2)²=8",
      "(x–2)²+(y–2)²=16",
      "(x–2)²+(y–2)²=10",
      "none"
    ],
    correct: "(x–2)²+(y–2)²=16",
    marks: 4,
    negative: 1
  },
  {
    id: 173,
    question: "Circle through (0,0),(1,0), center (1,1):",
    options: [
      "(x–1)²+(y–1)²=1",
      "(x–1)²+(y–1)²=2",
      "(x–1)²+(y–1)²=3",
      "none"
    ],
    correct: "(x–1)²+(y–1)²=2",
    marks: 4,
    negative: 1
  },
  {
    id: 174,
    question: "Condition for tangency of $x²+y²=a²$ and $y=mx+c$:",
    options: [
      "|c|=√(a²(1+m²))",
      "|c|=a√(1+m²)",
      "c²=a²(1+m²)",
      "none"
    ],
    correct: "c²=a²(1+m²)",
    marks: 4,
    negative: 1
  },
  {
    id: 175,
    question: "Distance of centers if circles touch externally:",
    options: [
      "r1–r2",
      "r1+r2",
      "√(r1²+r2²)",
      "none"
    ],
    correct: "r1+r2",
    marks: 4,
    negative: 1
  },
  {
    id: 176,
    question: "Circle orthogonal to $x²+y²–4x–6y+9=0$, center origin:",
    options: [
      "x²+y²=9",
      "x²+y²=7",
      "x²+y²=5",
      "none"
    ],
    correct: "x²+y²=7",
    marks: 4,
    negative: 1
  },
  {
    id: 177,
    question: "Chord length of $x²+y²=25$ cut by $x=3$:",
    options: [
      "6",
      "8",
      "10",
      "4"
    ],
    correct: "8",
    marks: 4,
    negative: 1
  },
  {
    id: 178,
    question: "Radius if circle $x²+y²+2gx+2fy+c=0$:",
    options: [
      "√(g²+f²–c)",
      "√(g²+f²+c)",
      "g²+f²–c",
      "none"
    ],
    correct: "√(g²+f²–c)",
    marks: 4,
    negative: 1
  },
  {
    id: 179,
    question: "Circle through (0,0),(2,0), center on y-axis:",
    options: [
      "x²+y²–2x=0",
      "x²+y²–2y=0",
      "x²+y²–2x–2y=0",
      "none"
    ],
    correct: "x²+y²–2y=0",
    marks: 4,
    negative: 1
  },
  {
    id: 180,
    question: "Common chord of $x²+y²=25$ and $x²+y²–10x=0$:",
    options: [
      "x=5",
      "x=3",
      "x=4",
      "y=5"
    ],
    correct: "x=5",
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
    
    
    
    
    