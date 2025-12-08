import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function CM5() {
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
    question: "Which of the following alkali metals forms the most stable carbonate?",
    "options": [
      "Li",
      "Na",
      "K",
      "Cs"
    ],
    correct: "K",
    marks: 4,
    negative: 1
  },
  {
    id: 152,
    question: "Which alkali metal shows diagonal relationship with Mg?",
    "options": [
      "Li",
      "Na",
      "K",
      "Rb"
    ],
    correct: "Li",
    marks: 4,
    negative: 1
  },
  {
    id: 153,
    question: "Which alkaline earth metal carbonate decomposes at lowest temperature?",
    "options": [
      "BeCO3",
      "MgCO3",
      "CaCO3",
      "BaCO3"
    ],
    correct: "BeCO3",
    marks: 4,
    negative: 1
  },
  {
    id: 154,
    question: "The solubility of hydroxides of alkaline earth metals increases down the group because:",
    "options": [
      "Lattice energy decreases faster than hydration energy",
      "Hydration energy decreases faster than lattice energy",
      "Both energies decrease equally",
      "None"
    ],
    correct: "Lattice energy decreases faster than hydration energy",
    marks: 4,
    negative: 1
  },
  {
    id: 155,
    question: "Which metal hydroxide is amphoteric?",
    "options": [
      "Be(OH)2",
      "Mg(OH)2",
      "Ca(OH)2",
      "Sr(OH)2"
    ],
    correct: "Be(OH)2",
    marks: 4,
    negative: 1
  },
  {
    id: 156,
    question: "Which alkali metal has highest hydration enthalpy?",
    "options": [
      "Li+",
      "Na+",
      "K+",
      "Cs+"
    ],
    correct: "Li+",
    marks: 4,
    negative: 1
  },
  {
    id: 157,
    question: "Which of the following compounds is used in Solvay process?",
    "options": [
      "CaCO3",
      "Na2CO3",
      "NH4Cl",
      "NaCl"
    ],
    correct: "NaCl",
    marks: 4,
    negative: 1
  },
  {
    id: 158,
    question: "Which alkaline earth metal sulphate is most soluble in water?",
    "options": [
      "BeSO4",
      "MgSO4",
      "CaSO4",
      "BaSO4"
    ],
    correct: "BeSO4",
    marks: 4,
    negative: 1
  },
  {
    id: 159,
    question: "Which metal is extracted by Down’s process?",
    "options": [
      "Na",
      "Mg",
      "K",
      "Ca"
    ],
    correct: "Na",
    marks: 4,
    negative: 1
  },
  {
    id: 160,
    question: "Which alkali metal does not form solid bicarbonate?",
    "options": [
      "Li",
      "Na",
      "K",
      "Rb"
    ],
    correct: "Li",
    marks: 4,
    negative: 1
  },
  {
    id: 161,
    question: "The anomalous behaviour of lithium is due to:",
    "options": [
      "Small size",
      "High polarising power",
      "High hydration enthalpy",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 162,
    question: "Which alkaline earth metal forms basic oxide?",
    "options": [
      "BeO",
      "MgO",
      "CaO",
      "BaO"
    ],
    correct: "CaO",
    marks: 4,
    negative: 1
  },
  {
    id: 163,
    question: "Which alkali metal is liquid at room temperature?",
    "options": [
      "Li",
      "Na",
      "K",
      "Cs"
    ],
    correct: "Cs",
    marks: 4,
    negative: 1
  },
  {
    id: 164,
    question: "Which salt is called Mohr’s salt?",
    "options": [
      "FeSO4·(NH4)2SO4·6H2O",
      "Na2SO4·10H2O",
      "MgSO4·7H2O",
      "K2SO4·Al2(SO4)3·24H2O"
    ],
    correct: "FeSO4·(NH4)2SO4·6H2O",
    marks: 4,
    negative: 1
  },
  {
    id: 165,
    question: "Which alkali metal compound is used as laboratory drying agent?",
    "options": [
      "NaOH",
      "KOH",
      "CaO",
      "CaCl2"
    ],
    correct: "CaCl2",
    marks: 4,
    negative: 1
  },
  {
    id: 166,
    question: "Which of the following has maximum catenation tendency?",
    "options": [
      "C",
      "Si",
      "Ge",
      "Sn"
    ],
    correct: "C",
    marks: 4,
    negative: 1
  },
  {
    id: 167,
    question: "Which oxide of nitrogen is neutral?",
    "options": [
      "N2O",
      "NO",
      "NO2",
      "N2O5"
    ],
    correct: "NO",
    marks: 4,
    negative: 1
  },
  {
    id: 168,
    question: "Which of the following is most stable allotrope of phosphorus?",
    "options": [
      "White P",
      "Red P",
      "Black P",
      "Violet P"
    ],
    correct: "Red P",
    marks: 4,
    negative: 1
  },
  {
    id: 169,
    question: "Which group 15 hydride has highest boiling point?",
    "options": [
      "NH3",
      "PH3",
      "AsH3",
      "SbH3"
    ],
    correct: "NH3",
    marks: 4,
    negative: 1
  },
  {
    id: 170,
    question: "Which halogen is most reactive?",
    "options": [
      "F2",
      "Cl2",
      "Br2",
      "I2"
    ],
    correct: "F2",
    marks: 4,
    negative: 1
  },
  {
    id: 171,
    question: "Which noble gas forms maximum compounds?",
    "options": [
      "He",
      "Ne",
      "Ar",
      "Xe"
    ],
    correct: "Xe",
    marks: 4,
    negative: 1
  },
  {
    id: 172,
    question: "Which of the following oxoacids is strongest?",
    "options": [
      "HClO",
      "HClO2",
      "HClO3",
      "HClO4"
    ],
    correct: "HClO4",
    marks: 4,
    negative: 1
  },
  {
    id: 173,
    question: "Which oxide of sulphur is responsible for acid rain?",
    "options": [
      "SO",
      "SO2",
      "SO3",
      "S2O3"
    ],
    correct: "SO2",
    marks: 4,
    negative: 1
  },
  {
    id: 174,
    question: "Which halogen has least electron affinity?",
    "options": [
      "F",
      "Cl",
      "Br",
      "I"
    ],
    correct: "I",
    marks: 4,
    negative: 1
  },
  {
    id: 175,
    question: "Which noble gas is used in lighting?",
    "options": [
      "He",
      "Ne",
      "Ar",
      "Kr"
    ],
    correct: "Ne",
    marks: 4,
    negative: 1
  },
  {
    id: 176,
    question: "Which form of silica is most stable?",
    "options": [
      "Quartz",
      "Cristobalite",
      "Tridymite",
      "Silica gel"
    ],
    correct: "Quartz",
    marks: 4,
    negative: 1
  },
  {
    id: 177,
    question: "Which of the following is called dry ice?",
    "options": [
      "Solid CO2",
      "Solid SO2",
      "Solid NO2",
      "Solid H2O"
    ],
    correct: "Solid CO2",
    marks: 4,
    negative: 1
  },
  {
    id: 178,
    question: "Which nitrogen compound is explosive?",
    "options": [
      "NH4NO3",
      "NH3",
      "NO",
      "N2"
    ],
    correct: "NH4NO3",
    marks: 4,
    negative: 1
  },
  {
    id: 179,
    question: "Which element shows maximum inert pair effect?",
    "options": [
      "N",
      "P",
      "Sb",
      "Bi"
    ],
    correct: "Bi",
    marks: 4,
    negative: 1
  },
  {
    id: 180,
    question: "Which halogen is strongest oxidizing agent?",
    "options": [
      "F2",
      "Cl2",
      "Br2",
      "I2"
    ],
    correct: "F2",
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
  doc.text("Exam Results - Chemistry", 14, 20);

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
    `Total Score: ${finalScore} / ${questionsForPDF.reduce((a, q) => a + q.marks, 0)}`,
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
                <h1 className="text-2xl font-bold text-center mb-6">Chemistry</h1>
    
                
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
    
    
    
    
    