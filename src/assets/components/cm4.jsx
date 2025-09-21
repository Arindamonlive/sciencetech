import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function CM4() {
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
    id: 91,
    question: "For the reaction N₂(g) + 3H₂(g)  ⇌  2NH₃(g), the equilibrium constant Kc is affected by:",
    options: [
      "Temperature",
      "Pressure",
      "Catalyst",
      "Concentration"
    ],
    correct: "Temperature",
    marks: 4,
    negative: 1
  },
  {
    id: 92,
    question: "The value of Kp for a reaction is equal to Kc(RT)^Δn. What does Δn represent?",
    options: [
      "Change in temperature",
      "Change in number of moles of gas",
      "Change in volume",
      "Change in enthalpy"
    ],
    correct: "Change in number of moles of gas",
    marks: 4,
    negative: 1
  },
  {
    id: 93,
    question: "The pH of a buffer solution does not change significantly on addition of:",
    options: [
      "Large amount of acid",
      "Large amount of base",
      "Small amount of acid or base",
      "Water"
    ],
    correct: "Small amount of acid or base",
    marks: 4,
    negative: 1
  },
  {
    id: 94,
    question: "In a redox reaction, the species that gets reduced :",
    options: [
      "Gains electrons",
      "Loses electrons",
      "Donates protons",
      "Accepts protons"
    ],
    correct: "Gains electrons",
    marks: 4,
    negative: 1
  },
  {
    id: 95,
    question: "Which of the following is a disproportionation reaction?",
    options: [
      "Cl₂ + 2NaBr → 2NaCl + Br₂",
      "2H₂ + O₂ → 2H₂O",
      "Cl₂ + H₂O → HCl + HClO",
      "Zn + Cu²⁺ → Zn²⁺ + Cu"
    ],
    correct: "Cl₂ + H₂O → HCl + HClO",
    marks: 4,
    negative: 1
  },
  {
    id: 96,
    question: "What is the oxidation number of Cr in K₂Cr₂O₇?",
    options: [
      "+3",
      "+6",
      "+2",
      "+7"
    ],
    correct: "+6",
    marks: 4,
    negative: 1
  },
  {
    id: 97,
    question: "Le Chatelier’s principle is used to predict:",
    options: [
      "Rate of reaction",
      "Shift in equilibrium",
      "Reaction enthalpy",
      "Molecular geometry"
    ],
    correct: "Shift in equilibrium",
    marks: 4,
    negative: 1
  },
  {
    id: 98,
    question: "In a redox titration, KMnO₄ acts as:",
    options: [
      "Reducing agent",
      "Acid",
      "Oxidizing agent",
      "Base"
    ],
    correct: "Oxidizing agent",
    marks: 4,
    negative: 1
  },
  {
    id: 99,
    question: "Which of the following has highest oxidizing power?",
    options: [
      "Cl₂",
      "Br₂",
      "I₂",
      "F₂"
    ],
    correct: "F₂",
    marks: 4,
    negative: 1
  },
  {
    id: 100,
    question: "Which is the conjugate acid of NH₃?",
    options: [
      "NH₂⁻",
      "NH₄⁺",
      "N₂H₄",
      "NO₃⁻"
    ],
    correct: "NH₄⁺",
    marks: 4,
    negative: 1
  },
  {
    id: 101,
    question: "The equilibrium constant for a reaction is 1. What does it imply?",
    options: [
      "Forward reaction is faster",
      "Backward reaction is faster",
      "Concentration of products equals reactants",
      "Reaction is incomplete"
    ],
    correct: "Concentration of products equals reactants",
    marks: 4,
    negative: 1
  },
  {
    id: 102,
    question: "Which of the following is a redox reaction?",
    options: [
      "NaCl + AgNO₃ → AgCl + NaNO₃",
      "HCl + NaOH → NaCl + H₂O",
      "Zn + CuSO₄ → ZnSO₄ + Cu",
      "BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl"
    ],
    correct: "Zn + CuSO₄ → ZnSO₄ + Cu",
    marks: 4,
    negative: 1
  },
  {
    id: 103,
    question: "Which will increase the rate of attainment of equilibrium?",
    options: [
      "Increase in temperature",
      "Addition of catalyst",
      "Increase in pressure",
      "Removing products"
    ],
    correct: "Addition of catalyst",
    marks: 4,
    negative: 1
  },
  {
    id: 104,
    question: "The pH of a neutral solution at 25°C is:",
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
    id: 105,
    question: "Which species acts as both oxidizing and reducing agent?",
    options: [
      "H₂O₂",
      "KMnO₄",
      "NaCl",
      "SO₂"
    ],
    correct: "H₂O₂",
    marks: 4,
    negative: 1
  },
  {
    id: 106,
    question: "What is the oxidation number of Fe in Fe(CN)₆³⁻?",
    options: [
      "+2",
      "+3",
      "0",
      "+6"
    ],
    correct: "+3",
    marks: 4,
    negative: 1
  },
  {
    id: 107,
    question: "At equilibrium, which of the following is true?",
    options: [
      "Forward reaction stops",
      "No further reaction occurs",
      "Rate of forward = rate of backward",
      "Concentration of reactants is zero"
    ],
    correct: "Rate of forward = rate of backward",
    marks: 4,
    negative: 1
  },
  {
    id: 108,
    question: "Oxidation involves:",
    options: [
      "Loss of electrons",
      "Gain of electrons",
      "Gain of protons",
      "Loss of neutrons"
    ],
    correct: "Loss of electrons",
    marks: 4,
    negative: 1
  },
  {
    id: 109,
    question: "Which of the following is NOT a redox reaction?",
    options: [
      "H₂ + Cl₂ → 2HCl",
      "NaOH + HCl → NaCl + H₂O",
      "Zn + 2HCl → ZnCl₂ + H₂",
      "Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag"
    ],
    correct: "NaOH + HCl → NaCl + H₂O",
    marks: 4,
    negative: 1
  },
  {
    id: 110,
    question: "Which of the following is the strongest reducing agent?",
    options: [
      "Na",
      "Cl₂",
      "F₂",
      "O₂"
    ],
    correct: "Na",
    marks: 4,
    negative: 1
  },
  {
    id: 111,
    question: "Which of the following statements is correct regarding a reaction at equilibrium?",
    options: [
      "Only the forward reaction occurs",
      "The concentrations of reactants and products are equal",
      "The rate of forward and backward reactions are equal",
      "The reaction stops completely"
    ],
    correct: "The rate of forward and backward reactions are equal",
    marks: 4,
    negative: 1
  },
  {
    id: 112,
    question: "What happens to the equilibrium position when pressure is increased for a gaseous reaction with fewer moles on the product side?",
    options: [
      "Shifts towards reactants",
      "Shifts towards products",
      "No change",
      "Reaction stops"
    ],
    correct: "Shifts towards products",
    marks: 4,
    negative: 1
  },
  {
    id: 113,
    question: "In acidic medium, MnO₄⁻ is reduced to:",
    options: [
      "MnO₂",
      "Mn²⁺",
      "MnO₄²⁻",
      "Mn³⁺"
    ],
    correct: "Mn²⁺",
    marks: 4,
    negative: 1
  },
  {
    id: 114,
    question: "The conjugate base of H₂SO₄ is:",
    options: [
      "HSO₄⁻",
      "SO₄²⁻",
      "H₃O⁺",
      "OH⁻"
    ],
    correct: "HSO₄⁻",
    marks: 4,
    negative: 1
  },
  {
    id: 115,
    question: "Which species is oxidized in the reaction: 2Na + Cl₂ → 2NaCl?",
    options: [
      "Na",
      "Cl₂",
      "NaCl",
      "Both A and B"
    ],
    correct: "Na",
    marks: 4,
    negative: 1
  },
  {
    id: 116,
    question: "What is the oxidation number of nitrogen in NO₃⁻?",
    options: [
      "+1",
      "+2",
      "+5",
      "-1"
    ],
    correct: "+5",
    marks: 4,
    negative: 1
  },
  {
    id: 117,
    question: "Which of the following acts as a reducing agent?",
    options: [
      "Cl₂",
      "H₂",
      "O₂",
      "KMnO₄"
    ],
    correct: "H₂",
    marks: 4,
    negative: 1
  },
  {
    id: 118,
    question: "What is the color change observed when KMnO₄ is added to an acidic solution containing Fe²⁺?",
    options: [
      "Purple to colorless",
      "Colorless to green",
      "Green to blue",
      "Purple to yellow"
    ],
    correct: "Purple to colorless",
    marks: 4,
    negative: 1
  },
  {
    id: 119,
    question: "In a redox reaction, the reducing agent:",
    options: [
      "Gains electrons",
      "Loses electrons",
      "Is reduced",
      "Increases oxidation number of other species"
    ],
    correct: "Loses electrons",
    marks: 4,
    negative: 1
  },
  {
    id: 120,
    question: "The equilibrium constant of a reaction is not affected by:",
    options: [
      "Temperature",
      "Pressure",
      "Catalyst",
      "None of these"
    ],
    correct: "Catalyst",
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
  doc.text("Exam Results - Chemistry(Equilibrium & Redox)", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Chemistry(Equilibrium & Redox)</h1>
    
                
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
    
    
    
    
    