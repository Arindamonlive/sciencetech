import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function CM3() {
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
    id: 61,
    question: "The rate of reaction depends on:",
    options: [
      "Concentration of reactants",
      "Temperature",
      "Catalyst",
      "All of the above"
    ],
    correct: "All of the above",
    marks: 4,
    negative: 1
  },
  {
    id: 62,
    question: "Units of rate constant for a first-order reaction are:",
    options: [
      "mol L⁻¹ s⁻¹",
      "s⁻¹",
      "L mol⁻¹ s⁻¹",
      "mol² L⁻² s⁻¹"
    ],
    correct: "s⁻¹",
    marks: 4,
    negative: 1
  },
  {
    id: 63,
    question: "If the half-life of a first-order reaction is 10 minutes, its rate constant is:",
    options: [
      "0.0693 min⁻¹",
      "0.00693 min⁻¹",
      "0.693 min⁻¹",
      "6.93 min⁻¹"
    ],
    correct: "0.0693 min⁻¹",
    marks: 4,
    negative: 1
  },
  {
    id: 64,
    question: "For a zero-order reaction, the plot of concentration vs. time is:",
    options: [
      "Straight line with positive slope",
      "Straight line with negative slope",
      "Curve with positive slope",
      "Curve with negative slope"
    ],
    correct: "Straight line with negative slope",
    marks: 4,
    negative: 1
  },
  {
    id: 65,
    question: "A reaction has k = 2.5 × 10⁻³ s⁻¹. The half-life is:",
    options: [
      "277 s",
      "0.277 s",
      "2770 s",
      "27.7 s"
    ],
    correct: "277 s",
    marks: 4,
    negative: 1
  },
  {
    id: 66,
    question: "Order of reaction and molecularity are always equal in:",
    options: [
      "Complex reactions",
      "Elementary reactions",
      "Chain reactions",
      "Catalytic reactions"
    ],
    correct: "Elementary reactions",
    marks: 4,
    negative: 1
  },
  {
    id: 67,
    question: "If doubling the concentration of a reactant doubles the rate, the reaction order w.r.t. that reactant is:",
    options: [
      "Zero",
      "One",
      "Two",
      "Three"
    ],
    correct: "One",
    marks: 4,
    negative: 1
  },
  {
    id: 68,
    question: "The Arrhenius equation is:",
    options: [
      "k = Ae⁻ᴱᵃ/ᴿᵀ",
      "k = Aeᴱᵃ/ᴿᵀ",
      "k = A/Ea",
      "k = RT/Ea"
    ],
    correct: "k = Ae⁻ᴱᵃ/ᴿᵀ",
    marks: 4,
    negative: 1
  },
  {
    id: 69,
    question: "If temperature increases, rate constant:",
    options: [
      "Always decreases",
      "Always increases",
      "May increase or decrease",
      "Remains constant"
    ],
    correct: "Always increases",
    marks: 4,
    negative: 1
  },
  {
    id: 70,
    question: "Collision theory is applicable mainly to:",
    options: [
      "Bimolecular gaseous reactions",
      "Unimolecular reactions",
      "Complex reactions",
      "Zero-order reactions"
    ],
    correct: "Bimolecular gaseous reactions",
    marks: 4,
    negative: 1
  },
  {
    id: 71,
    question: "For a first-order reaction, if 75% of the reactant is consumed, time taken = ? (t₁/₂ = 20 min)",
    options: [
      "20 min",
      "40 min",
      "60 min",
      "80 min"
    ],
    correct: "40 min",
    marks: 4,
    negative: 1
  },
  {
    id: 72,
    question: "Which factor affects both rate constant and rate of reaction?",
    options: [
      "Concentration",
      "Temperature",
      "Pressure",
      "Catalyst"
    ],
    correct: "Temperature",
    marks: 4,
    negative: 1
  },
  {
    id: 73,
    question: "Activation energy is:",
    options: [
      "Energy released during reaction",
      "Energy required to form activated complex",
      "Energy of products minus reactants",
      "Heat of reaction"
    ],
    correct: "Energy required to form activated complex",
    marks: 4,
    negative: 1
  },
  {
    id: 74,
    question: "Rate law of a reaction is experimentally determined because:",
    options: [
      "It can’t be predicted from balanced equation",
      "It always equals stoichiometric coefficients",
      "It equals molecularity",
      "It depends on reaction order"
    ],
    correct: "It can’t be predicted from balanced equation",
    marks: 4,
    negative: 1
  },
  {
    id: 75,
    question: "In Arrhenius equation, ‘A’ is:",
    options: [
      "Activation energy",
      "Frequency factor",
      "Rate constant",
      "Reaction order"
    ],
    correct: "Frequency factor",
    marks: 4,
    negative: 1
  },
  {
    id: 76,
    question: "In a zero-order reaction, if initial concentration is doubled, half-life:",
    options: [
      "Doubles",
      "Halves",
      "Remains constant",
      "Becomes four times"
    ],
    correct: "Doubles",
    marks: 4,
    negative: 1
  },
  {
    id: 77,
    question: "Which graph is linear for a first-order reaction?",
    options: [
      "ln[A] vs. t",
      "[A] vs. t",
      "1/[A] vs. t",
      "√[A] vs. t"
    ],
    correct: "ln[A] vs. t",
    marks: 4,
    negative: 1
  },
  {
    id: 78,
    question: "Temperature coefficient of most reactions is about:",
    options: [
      "1–2",
      "2–3",
      "5–6",
      "10"
    ],
    correct: "2–3",
    marks: 4,
    negative: 1
  },
  {
    id: 79,
    question: "For 2A → Products, rate = k[A]². If [A] is halved, rate becomes:",
    options: [
      "1/2",
      "1/4",
      "2",
      "4 times original"
    ],
    correct: "1/4",
    marks: 4,
    negative: 1
  },
  {
    id: 80,
    question: "For a first-order reaction, the ratio of times for 90% and 50% completion is:",
    options: [
      "2",
      "3.32",
      "1.5",
      "4"
    ],
    correct: "3.32",
    marks: 4,
    negative: 1
  },
  {
    id: 81,
    question: "Which statement is true for physisorption?",
    options: [
      "Involves chemical bond formation",
      "Increases with rise in temperature",
      "Involves van der Waals forces",
      "Irreversible"
    ],
    correct: "Involves van der Waals forces",
    marks: 4,
    negative: 1
  },
  {
    id: 82,
    question: "In chemisorption:",
    options: [
      "Heat of adsorption is low",
      "It is multi-layer adsorption",
      "It involves high activation energy",
      "It is reversible"
    ],
    correct: "It involves high activation energy",
    marks: 4,
    negative: 1
  },
  {
    id: 83,
    question: "Freundlich adsorption isotherm equation is:",
    options: [
      "x/m = kP",
      "x/m = kPⁿ",
      "x/m = kP^(1/n)",
      "x/m = nPk"
    ],
    correct: "x/m = kP^(1/n)",
    marks: 4,
    negative: 1
  },
  {
    id: 84,
    question: "Langmuir isotherm assumes:",
    options: [
      "Multi-layer adsorption",
      "Uniform surface with identical sites",
      "Infinite adsorption sites",
      "Strong adsorbate-adsorbate interaction"
    ],
    correct: "Uniform surface with identical sites",
    marks: 4,
    negative: 1
  },
  {
    id: 85,
    question: "Which is a lyophilic colloid?",
    options: [
      "Gold sol",
      "Starch sol",
      "Ferric hydroxide sol",
      "Arsenic sulphide sol"
    ],
    correct: "Starch sol",
    marks: 4,
    negative: 1
  },
  {
    id: 86,
    question: "Micelle formation occurs:",
    options: [
      "Above Kraft temperature and CMC",
      "Below Kraft temperature",
      "At any concentration",
      "Only in organic solvents"
    ],
    correct: "Above Kraft temperature and CMC",
    marks: 4,
    negative: 1
  },
  {
    id: 87,
    question: "Tyndall effect is observed in:",
    options: [
      "True solutions only",
      "Colloids only",
      "Suspensions only",
      "Both colloids and suspensions"
    ],
    correct: "Both colloids and suspensions",
    marks: 4,
    negative: 1
  },
  {
    id: 88,
    question: "Electrophoresis is:",
    options: [
      "Movement of colloidal particles under electric field",
      "Scattering of light by particles",
      "Movement of solvent molecules through membrane",
      "Coagulation of colloids"
    ],
    correct: "Movement of colloidal particles under electric field",
    marks: 4,
    negative: 1
  },
  {
    id: 89,
    question: "Which enzyme catalyses starch hydrolysis?",
    options: [
      "Lipase",
      "Maltase",
      "Amylase",
      "Invertase"
    ],
    correct: "Amylase",
    marks: 4,
    negative: 1
  },
  {
    id: 90,
    question: "Emulsion in which oil is dispersed in water is stabilized by:",
    options: [
      "Soaps",
      "Detergents",
      "Both A and B",
      "Sugars"
    ],
    correct: "Both A and B",
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
  doc.text("Exam Results - Chemistry(States of Matter & Thermodynamics)", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Chemistry(States of Matter & Thermodynamics)</h1>
    
                
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
    
    
    
    
    