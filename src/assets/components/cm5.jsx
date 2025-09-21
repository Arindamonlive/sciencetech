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
    id: 121,
    question: "Which of the following elements has the highest electronegativity?",
    options: [
      "Fluorine",
      "Oxygen",
      "Chlorine",
      "Nitrogen"
    ],
    correct: "Fluorine",
    marks: 4,
    negative: 1
  },
  {
    id: 122,
    question: "Which block of the periodic table does the element Iron (Fe) belong to?",
    options: [
      "s-block",
      "p-block",
      "d-block",
      "f-block"
    ],
    correct: "d-block",
    marks: 4,
    negative: 1
  },
  {
    id: 123,
    question: "Which of the following is an example of ionic bonding?",
    options: [
      "NaCl",
      "H2O",
      "CH4",
      "O2"
    ],
    correct: "NaCl",
    marks: 4,
    negative: 1
  },
  {
    id: 124,
    question: "Which of the following has the smallest atomic radius?",
    options: [
      "Na",
      "Mg",
      "Al",
      "Si"
    ],
    correct: "Si",
    marks: 4,
    negative: 1
  },
  {
    id: 125,
    question: "Which period and group does the element with atomic number 17 belong to?",
    options: [
      "Period 3, Group 17",
      "Period 2, Group 16",
      "Period 3, Group 16",
      "Period 2, Group 17"
    ],
    correct: "Period 3, Group 17",
    marks: 4,
    negative: 1
  },
  {
    id: 126,
    question: "Which element has a noble gas configuration of [Ne]3s2 3p6?",
    options: [
      "Ar",
      "Na",
      "Cl",
      "Mg"
    ],
    correct: "Ar",
    marks: 4,
    negative: 1
  },
  {
    id: 127,
    question: "The type of hybridization in methane (CH4) is:",
    options: [
      "sp",
      "sp2",
      "sp3",
      "dsp2"
    ],
    correct: "sp3",
    marks: 4,
    negative: 1
  },
  {
    id: 128,
    question: "Which of the following elements has the highest ionization enthalpy?",
    options: [
      "Li",
      "B",
      "C",
      "He"
    ],
    correct: "He",
    marks: 4,
    negative: 1
  },
  {
    id: 129,
    question: "What is the shape of the BF3 molecule?",
    options: [
      "Tetrahedral",
      "Trigonal planar",
      "Trigonal pyramidal",
      "Linear"
    ],
    correct: "Trigonal planar",
    marks: 4,
    negative: 1
  },
  {
    id: 130,
    question: "Which is the correct order of increasing metallic character?",
    options: [
      "Na < Mg < Al",
      "Al < Mg < Na",
      "Mg < Al < Na",
      "Na < Al < Mg"
    ],
    correct: "Al < Mg < Na",
    marks: 4,
    negative: 1
  },
  {
    id: 131,
    question: "Which of the following species is isoelectronic with Ne?",
    options: [
      "F⁻",
      "Na⁺",
      "O²⁻",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 132,
    question: "Which of the following statements about covalent bonds is true?",
    options: [
      "Electrons are transferred",
      "Occurs between metals",
      "Shared electron pairs",
      "Forms crystal lattice"
    ],
    correct: "Shared electron pairs",
    marks: 4,
    negative: 1
  },
  {
    id: 133,
    question: "Which element has the highest electron affinity?",
    options: [
      "Cl",
      "F",
      "Br",
      "O"
    ],
    correct: "Cl",
    marks: 4,
    negative: 1
  },
  {
    id: 134,
    question: "What is the oxidation state of sulfur in H₂SO₄?",
    options: [
      "+4",
      "+6",
      "+2",
      "-2"
    ],
    correct: "+6",
    marks: 4,
    negative: 1
  },
  {
    id: 135,
    question: "Which is not a property of metals?",
    options: [
      "High conductivity",
      "Malleable",
      "Ductile",
      "Low melting point"
    ],
    correct: "Low melting point",
    marks: 4,
    negative: 1
  },
  {
    id: 136,
    question: "The bond angle in water (H₂O) is approximately:",
    options: [
      "104.5°",
      "90°",
      "109.5°",
      "120°"
    ],
    correct: "104.5°",
    marks: 4,
    negative: 1
  },
  {
    id: 137,
    question: "Which element is present in period 4 and group 2 of the periodic table?",
    options: [
      "Ca",
      "Mg",
      "Be",
      "Sr"
    ],
    correct: "Ca",
    marks: 4,
    negative: 1
  },
  {
    id: 138,
    question: "Which molecule has a linear shape?",
    options: [
      "CO₂",
      "H₂O",
      "NH₃",
      "CH₄"
    ],
    correct: "CO₂",
    marks: 4,
    negative: 1
  },
  {
    id: 139,
    question: "Which of the following is a characteristic of hydrogen bonding?",
    options: [
      "High melting point",
      "Low boiling point",
      "Weak interaction",
      "Found only in metals"
    ],
    correct: "High melting point",
    marks: 4,
    negative: 1
  },
  {
    id: 140,
    question: "The number of valence electrons in Phosphorus (P) is:",
    options: [
      "3",
      "4",
      "5",
      "6"
    ],
    correct: "5",
    marks: 4,
    negative: 1
  },
  {
    id: 141,
    question: "Which of the following elements has the lowest electronegativity?",
    options: [
      "Ca",
      "K",
      "Cs",
      "Na"
    ],
    correct: "Cs",
    marks: 4,
    negative: 1
  },
  {
    id: 142,
    question: "What is the most stable form of bonding in the O₂ molecule?",
    options: [
      "Single bond",
      "Double bond",
      "Triple bond",
      "Ionic bond"
    ],
    correct: "Double bond",
    marks: 4,
    negative: 1
  },
  {
    id: 143,
    question: "Which of the following species has a coordinate covalent bond?",
    options: [
      "NH₄⁺",
      "CH₄",
      "H₂O",
      "NaCl"
    ],
    correct: "NH₄⁺",
    marks: 4,
    negative: 1
  },
  {
    id: 144,
    question: "Which element shows the maximum number of oxidation states?",
    options: [
      "Fe",
      "Mn",
      "Cr",
      "Cu"
    ],
    correct: "Mn",
    marks: 4,
    negative: 1
  },
  {
    id: 145,
    question: "Which of the following is a non-polar molecule?",
    options: [
      "H₂O",
      "NH₃",
      "CO₂",
      "HF"
    ],
    correct: "CO₂",
    marks: 4,
    negative: 1
  },
  {
    id: 146,
    question: "Which of the following molecules has sp² hybridization?",
    options: [
      "C₂H₄",
      "CH₄",
      "C₂H₂",
      "NH₃"
    ],
    correct: "C₂H₄",
    marks: 4,
    negative: 1
  },
  {
    id: 147,
    question: "Which factor determines the strength of a covalent bond?",
    options: [
      "Bond length",
      "Bond angle",
      "Lattice energy",
      "Electronegativity difference"
    ],
    correct: "Bond length",
    marks: 4,
    negative: 1
  },
  {
    id: 148,
    question: "Which of the following has the largest atomic radius?",
    options: [
      "Na",
      "K",
      "Rb",
      "Cs"
    ],
    correct: "Cs",
    marks: 4,
    negative: 1
  },
  {
    id: 149,
    question: "Which type of bond is present in the N₂ molecule?",
    options: [
      "Single",
      "Double",
      "Triple",
      "Coordinate"
    ],
    correct: "Triple",
    marks: 4,
    negative: 1
  },
  {
    id: 150,
    question: "Which group contains elements that are all inert gases?",
    options: [
      "Group 17",
      "Group 16",
      "Group 1",
      "Group 18"
    ],
    correct: "Group 18",
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
    
    
    
    
    