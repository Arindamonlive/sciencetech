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
    id: 181,
    question: "The eccentricity of a circle is:",
    options: [
      "0",
      "1",
      "Between 0 and 1",
      "Greater than 1"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 182,
    question: "The equation of a circle with centre (h, k) and radius r is:",
    options: [
      "(x+h)²+(y+k)²=r²",
      "(x-h)²+(y-k)²=r²",
      "(x+h)²+(y+k)²=r",
      "(x-h)²+(y-k)²=r"
    ],
    correct: "(x-h)²+(y-k)²=r²",
    marks: 4,
    negative: 1
  },
  {
    id: 183,
    question: "The length of the diameter of the circle $x²+y²-6x-8y+9=0$ is:",
    options: [
      "10",
      "12",
      "14",
      "8"
    ],
    correct: "10",
    marks: 4,
    negative: 1
  },
  {
    id: 184,
    question: "The equation of circle passing through (0,0) and having center at (a, b) is:",
    options: [
      "x²+y²+2ax+2by=0",
      "(x-a)²+(y-b)²=a²+b²",
      "(x-a)²+(y-b)²=a²-b²",
      "None"
    ],
    correct: "(x-a)²+(y-b)²=a²+b²",
    marks: 4,
    negative: 1
  },
  {
    id: 185,
    question: "Equation of the circle concentric with $x²+y²-4x-6y+9=0$ and passing through (1,2) is:",
    options: [
      "x²+y²-4x-6y+9=0",
      "x²+y²-4x-6y+14=0",
      "x²+y²-4x-6y+13=0",
      "None"
    ],
    correct: "x²+y²-4x-6y+13=0",
    marks: 4,
    negative: 1
  },
  {
    id: 186,
    question: "The equation of the parabola whose vertex is at origin and focus at (0, a) is:",
    options: [
      "x²=4ay",
      "y²=4ax",
      "x²=-4ay",
      "y²=-4ax"
    ],
    correct: "x²=4ay",
    marks: 4,
    negative: 1
  },
  {
    id: 187,
    question: "The length of latus rectum of the parabola $y²=4ax$ is:",
    options: [
      "2a",
      "4a",
      "a",
      "None of these"
    ],
    correct: "4a",
    marks: 4,
    negative: 1
  },
  {
    id: 188,
    question: "The equation of directrix of parabola $y²=4ax$ is:",
    options: [
      "x=a",
      "x=-a",
      "y=a",
      "y=-a"
    ],
    correct: "x=-a",
    marks: 4,
    negative: 1
  },
  {
    id: 189,
    question: "The slope of tangent to parabola $y²=4ax$ at point $(x₁,y₁)$ is:",
    options: [
      "y₁/x₁",
      "x₁/y₁",
      "a/x₁",
      "None"
    ],
    correct: "y₁/x₁",
    marks: 4,
    negative: 1
  },
  {
    id: 190,
    question: "The focus of parabola $x²=8y$ is:",
    options: [
      "(0,2)",
      "(0,4)",
      "(0,1)",
      "(0,8)"
    ],
    correct: "(0,2)",
    marks: 4,
    negative: 1
  },
  {
    id: 191,
    question: "The length of latus rectum of parabola $x²=12y$ is:",
    options: [
      "3",
      "6",
      "12",
      "9"
    ],
    correct: "12",
    marks: 4,
    negative: 1
  },
  {
    id: 192,
    question: "The vertex of parabola $(y+3)²=8(x-1)$ is:",
    options: [
      "(1,-3)",
      "(-1,3)",
      "(3,1)",
      "(0,0)"
    ],
    correct: "(1,-3)",
    marks: 4,
    negative: 1
  },
  {
    id: 193,
    question: "The eccentricity of ellipse $x²/a²+y²/b²=1$ (a>b) is:",
    options: [
      "√(a²-b²)/a",
      "√(b²-a²)/a",
      "√(a²+b²)/a",
      "b/a"
    ],
    correct: "√(a²-b²)/a",
    marks: 4,
    negative: 1
  },
  {
    id: 194,
    question: "The coordinates of foci of ellipse $x²/9+y²/5=1$ are:",
    options: [
      "(±√14,0)",
      "(0,±√14)",
      "(±2,0)",
      "(0,±5)"
    ],
    correct: "(±2,0)",
    marks: 4,
    negative: 1
  },
  {
    id: 195,
    question: "The length of latus rectum of ellipse $x²/a²+y²/b²=1$ is:",
    options: [
      "2a²/b",
      "2b²/a",
      "a²/b",
      "b²/a"
    ],
    correct: "2b²/a",
    marks: 4,
    negative: 1
  },
  {
    id: 196,
    question: "Equation of ellipse with foci (±5,0) and major axis length 12 is:",
    options: [
      "x²/36+y²/25=1",
      "x²/25+y²/36=1",
      "x²/144+y²/25=1",
      "None"
    ],
    correct: "x²/36+y²/11=1",
    marks: 4,
    negative: 1
  },
  {
    id: 197,
    question: "The eccentricity of ellipse $9x²+16y²=144$ is:",
    options: [
      "5/3",
      "3/5",
      "√7/4",
      "5/4"
    ],
    correct: "√7/4",
    marks: 4,
    negative: 1
  },
  {
    id: 198,
    question: "The length of minor axis of ellipse $x²/25+y²/16=1$ is:",
    options: [
      "10",
      "8",
      "5",
      "4"
    ],
    correct: "8",
    marks: 4,
    negative: 1
  },
  {
    id: 199,
    question: "The transverse axis of hyperbola $x²/a²-y²/b²=1$ lies along:",
    options: [
      "y-axis",
      "x-axis",
      "line y=x",
      "line y=-x"
    ],
    correct: "x-axis",
    marks: 4,
    negative: 1
  },
  {
    id: 200,
    question: "Eccentricity of hyperbola $x²/9-y²/16=1$ is:",
    options: [
      "5/3",
      "3/5",
      "4/3",
      "3/4"
    ],
    correct: "5/3",
    marks: 4,
    negative: 1
  },
  {
    id: 201,
    question: "The coordinates of foci of hyperbola $x²/25-y²/9=1$ are:",
    options: [
      "(±√34,0)",
      "(0,±√34)",
      "(±5,0)",
      "(0,±3)"
    ],
    correct: "(±√34,0)",
    marks: 4,
    negative: 1
  },
  {
    id: 202,
    question: "The length of latus rectum of hyperbola $x²/a²-y²/b²=1$ is:",
    options: [
      "2b²/a",
      "2a²/b",
      "a²/b",
      "b²/a"
    ],
    correct: "2b²/a",
    marks: 4,
    negative: 1
  },
  {
    id: 203,
    question: "The asymptotes of hyperbola $x²/16-y²/9=1$ are:",
    options: [
      "y=±(3/4)x",
      "y=±(4/3)x",
      "y=±x",
      "y=±2x"
    ],
    correct: "y=±(3/4)x",
    marks: 4,
    negative: 1
  },
  {
    id: 204,
    question: "The equation of conjugate hyperbola of $x²/a²-y²/b²=1$ is:",
    options: [
      "y²/a²-x²/b²=1",
      "x²/a²+y²/b²=1",
      "y²/b²-x²/a²=1",
      "None"
    ],
    correct: "y²/b²-x²/a²=1",
    marks: 4,
    negative: 1
  },
  {
    id: 205,
    question: "The eccentricity of rectangular hyperbola is:",
    options: [
      "√2",
      "1",
      "2",
      "√3"
    ],
    correct: "√2",
    marks: 4,
    negative: 1
  },
  {
    id: 206,
    question: "The general equation of second degree in x and y represents:",
    options: [
      "Pair of lines",
      "Circle",
      "Conic",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 207,
    question: "The equation $x²+2y²-4x+6y+3=0$ represents:",
    options: [
      "Circle",
      "Ellipse",
      "Hyperbola",
      "Parabola"
    ],
    correct: "Ellipse",
    marks: 4,
    negative: 1
  },
  {
    id: 208,
    question: "The condition for general equation $ax²+2hxy+by²+2gx+2fy+c=0$ to represent a circle is:",
    options: [
      "a=b,h=0",
      "a=b,h≠0",
      "a≠b,h=0",
      "None"
    ],
    correct: "a=b,h=0",
    marks: 4,
    negative: 1
  },
  {
    id: 209,
    question: "The eccentricity of parabola is always:",
    options: [
      "0",
      "1",
      "<1",
      ">1"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 210,
    question: "The locus of a point which moves such that its distance from a fixed point is proportional to its distance from a fixed line is:",
    options: [
      "Circle",
      "Ellipse",
      "Parabola",
      "Conic"
    ],
    correct: "Conic",
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
    
    
    
    
    