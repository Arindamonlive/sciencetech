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
    id: 211,
    question: "The compound CH3CH2OH belongs to which homologous series?",
    options: [
      "Alkane",
      "Alkene",
      "Alcohol",
      "Ether"
    ],
    correct: "Alcohol",
    marks: 4,
    negative: 1
  },
  {
    id: 212,
    question: "The IUPAC name of CH3CH2CH=CH2 is:",
    options: [
      "Butane",
      "1-Butene",
      "2-Butene",
      "Propene"
    ],
    correct: "1-Butene",
    marks: 4,
    negative: 1
  },
  {
    id: 213,
    question: "Which of the following has sp³ hybridised carbon?",
    options: [
      "CH4",
      "C2H2",
      "C2H4",
      "CO2"
    ],
    correct: "CH4",
    marks: 4,
    negative: 1
  },
  {
    id: 214,
    question: "The correct order of stability of carbocations is:",
    options: [
      "3° > 2° > 1° > CH3⁺",
      "1° > 2° > 3°",
      "CH3⁺ > 1° > 2°",
      "2° > 3° > 1°"
    ],
    correct: "3° > 2° > 1° > CH3⁺",
    marks: 4,
    negative: 1
  },
  {
    id: 215,
    question: "Which effect is responsible for the stability of benzyl carbocation?",
    options: [
      "Inductive effect",
      "Resonance",
      "Hydrogen bonding",
      "Electromeric effect"
    ],
    correct: "Resonance",
    marks: 4,
    negative: 1
  },
  {
    id: 216,
    question: "Which of the following is not a nucleophile?",
    options: [
      "OH⁻",
      "CN⁻",
      "NH3",
      "BF3"
    ],
    correct: "BF3",
    marks: 4,
    negative: 1
  },
  {
    id: 217,
    question: "Which of the following reactions involves substitution?",
    options: [
      "CH3Cl + KOH → CH3OH",
      "CH2=CH2 + H2 → C2H6",
      "C2H5OH → C2H4 + H2O",
      "CH3CH=CH2 + HBr → CH3CHBrCH3"
    ],
    correct: "CH3Cl + KOH → CH3OH",
    marks: 4,
    negative: 1
  },
  {
    id: 218,
    question: "The hybridisation of carbon in ethene (C2H4) is:",
    options: [
      "sp",
      "sp²",
      "sp³",
      "dsp²"
    ],
    correct: "sp²",
    marks: 4,
    negative: 1
  },
  {
    id: 219,
    question: "Which of the following represents structural isomerism?",
    options: [
      "CH3CH2OH and CH3OCH3",
      "CH2=CH2 and C2H6",
      "CH3CH2CH3 and CH3CH2CH3",
      "CH3OH and C2H5OH"
    ],
    correct: "CH3CH2OH and CH3OCH3",
    marks: 4,
    negative: 1
  },
  {
    id: 220,
    question: "Optical isomerism is shown by:",
    options: [
      "CH4",
      "C2H6",
      "CH3CHBrCH3",
      "CH3CHBrCH2CH3"
    ],
    correct: "CH3CHBrCH2CH3",
    marks: 4,
    negative: 1
  },
  {
    id: 221,
    question: "The IUPAC name of isopropyl alcohol is:",
    options: [
      "1-Propanol",
      "2-Propanol",
      "Propanal",
      "Propanone"
    ],
    correct: "2-Propanol",
    marks: 4,
    negative: 1
  },
  {
    id: 222,
    question: "Which type of isomerism is shown by CH3CH=CHCH3 and CH2=CHCH2CH3?",
    options: [
      "Chain",
      "Functional",
      "Position",
      "Geometrical"
    ],
    correct: "Position",
    marks: 4,
    negative: 1
  },
  {
    id: 223,
    question: "What is the hybridisation of carbon in CO2?",
    options: [
      "sp",
      "sp²",
      "sp³",
      "dsp²"
    ],
    correct: "sp",
    marks: 4,
    negative: 1
  },
  {
    id: 224,
    question: "Which compound exhibits resonance?",
    options: [
      "CH4",
      "CH3CH3",
      "Benzene",
      "C2H6"
    ],
    correct: "Benzene",
    marks: 4,
    negative: 1
  },
  {
    id: 225,
    question: "Which is an electrophile?",
    options: [
      "Cl⁻",
      "NH3",
      "H⁺",
      "OH⁻"
    ],
    correct: "H⁺",
    marks: 4,
    negative: 1
  },
  {
    id: 226,
    question: "Which has the highest boiling point?",
    options: [
      "CH4",
      "CH3CH3",
      "CH3OH",
      "CH3OCH3"
    ],
    correct: "CH3OH",
    marks: 4,
    negative: 1
  },
  {
    id: 227,
    question: "The order of +I effect is:",
    options: [
      "CH3 < C2H5 < (CH3)2CH < (CH3)3C",
      "Reverse order",
      "Random",
      "None"
    ],
    correct: "CH3 < C2H5 < (CH3)2CH < (CH3)3C",
    marks: 4,
    negative: 1
  },
  {
    id: 228,
    question: "Which is not a reaction intermediate?",
    options: [
      "Carbocation",
      "Free radical",
      "Carbanion",
      "Alkane"
    ],
    correct: "Alkane",
    marks: 4,
    negative: 1
  },
  {
    id: 229,
    question: "Which type of reaction is dehydration of alcohol?",
    options: [
      "Addition",
      "Elimination",
      "Substitution",
      "Redox"
    ],
    correct: "Elimination",
    marks: 4,
    negative: 1
  },
  {
    id: 230,
    question: "Which pair are functional isomers?",
    options: [
      "C2H6O and C3H8O",
      "CH3CH2OH and CH3OCH3",
      "CH3CH2CH3 and CH3CH2CH3",
      "C2H4 and C2H6"
    ],
    correct: "CH3CH2OH and CH3OCH3",
    marks: 4,
    negative: 1
  },
  {
    id: 231,
    question: "The number of σ and π bonds in benzene is:",
    options: [
      "6 σ, 6 π",
      "12 σ, 3 π",
      "9 σ, 3 π",
      "6 σ, 3 π"
    ],
    correct: "12 σ, 3 π",
    marks: 4,
    negative: 1
  },
  {
    id: 232,
    question: "The compound CH3COOH is:",
    options: [
      "Alcohol",
      "Ketone",
      "Aldehyde",
      "Carboxylic acid"
    ],
    correct: "Carboxylic acid",
    marks: 4,
    negative: 1
  },
  {
    id: 233,
    question: "Which of the following has geometrical isomerism?",
    options: [
      "CH2=CH2",
      "C2H5OH",
      "CH3CH=CHCH3",
      "CH3CH2CH3"
    ],
    correct: "CH3CH=CHCH3",
    marks: 4,
    negative: 1
  },
  {
    id: 234,
    question: "Which bond has highest polarity?",
    options: [
      "C–H",
      "C–Cl",
      "C–O",
      "C–C"
    ],
    correct: "C–O",
    marks: 4,
    negative: 1
  },
  {
    id: 235,
    question: "Which of the following undergoes nucleophilic substitution easily?",
    options: [
      "CH3Cl",
      "CH3Br",
      "CH3I",
      "CH4"
    ],
    correct: "CH3I",
    marks: 4,
    negative: 1
  },
  {
    id: 236,
    question: "Which statement is true about resonance?",
    options: [
      "Involves movement of atoms",
      "Involves movement of π electrons",
      "Affects molecular weight",
      "Occurs in ionic compounds only"
    ],
    correct: "Involves movement of π electrons",
    marks: 4,
    negative: 1
  },
  {
    id: 237,
    question: "The order of acidity is:",
    options: [
      "CH4 > CH3CH2OH > CH3COOH",
      "CH3COOH > CH3CH2OH > CH4",
      "Reverse",
      "None"
    ],
    correct: "CH3COOH > CH3CH2OH > CH4",
    marks: 4,
    negative: 1
  },
  {
    id: 238,
    question: "The compound with highest % of carbon is:",
    options: [
      "CH4",
      "C2H2",
      "C6H6",
      "C2H6"
    ],
    correct: "C6H6",
    marks: 4,
    negative: 1
  },
  {
    id: 239,
    question: "Which reagent converts alcohol to aldehyde?",
    options: [
      "KMnO4",
      "PCC",
      "H2",
      "NaOH"
    ],
    correct: "PCC",
    marks: 4,
    negative: 1
  },
  {
    id: 240,
    question: "The correct order of bond strength is:",
    options: [
      "C≡C > C=C > C–C",
      "C–C > C=C > C≡C",
      "All equal",
      "None"
    ],
    correct: "C≡C > C=C > C–C",
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
    
    
    
    
    