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
    id: 301,
    question: "Which of the following will have the highest boiling point?",
    options: [
      "Acetaldehyde",
      "Ethanol",
      "Acetic acid",
      "Acetone"
    ],
    correct: "Acetic acid",
    marks: 4,
    negative: 1
  },
  {
    id: 302,
    question: "Which reagent converts a carboxylic acid into its corresponding alcohol?",
    options: [
      "LiAlH4",
      "NaBH4",
      "H2/Pd",
      "KMnO4"
    ],
    correct: "LiAlH4",
    marks: 4,
    negative: 1
  },
  {
    id: 303,
    question: "The reaction of an amine with nitrous acid gives nitrogen gas in case of:",
    options: [
      "1° aliphatic amine",
      "2° amine",
      "3° amine",
      "Aromatic amine"
    ],
    correct: "1° aliphatic amine",
    marks: 4,
    negative: 1
  },
  {
    id: 304,
    question: "The functional group –COOH can be detected by:",
    options: [
      "Lucas test",
      "2,4-DNP test",
      "NaHCO₃ test",
      "FeCl3 test"
    ],
    correct: "NaHCO₃ test",
    marks: 4,
    negative: 1
  },
  {
    id: 305,
    question: "Which is the strongest acid?",
    options: [
      "Trichloroacetic acid",
      "Acetic acid",
      "Propanoic acid",
      "Benzoic acid"
    ],
    correct: "Trichloroacetic acid",
    marks: 4,
    negative: 1
  },
  {
    id: 306,
    question: "Aniline reacts with bromine water to form:",
    options: [
      "p-Bromoaniline",
      "2,4,6-tribromoaniline",
      "m-Bromoaniline",
      "Anilinium bromide"
    ],
    correct: "2,4,6-tribromoaniline",
    marks: 4,
    negative: 1
  },
  {
    id: 307,
    question: "Amides are less basic than amines because:",
    options: [
      "High boiling point",
      "Steric hindrance",
      "Low molar mass",
      "Resonance reduces electron density on N"
    ],
    correct: "Resonance reduces electron density on N",
    marks: 4,
    negative: 1
  },
  {
    id: 308,
    question: "Which reagent converts alcohol to carboxylic acid?",
    options: [
      "KMnO4",
      "LiAlH4",
      "PCl5",
      "HBr"
    ],
    correct: "KMnO4",
    marks: 4,
    negative: 1
  },
  {
    id: 309,
    question: "The product formed when acetic acid reacts with PCl₅ is:",
    options: [
      "Chloroacetic acid",
      "Acetyl chloride",
      "Ester",
      "Acetone"
    ],
    correct: "Acetyl chloride",
    marks: 4,
    negative: 1
  },
  {
    id: 310,
    question: "Which of the following is a primary amine?",
    options: [
      "Aniline",
      "Dimethylamine",
      "Trimethylamine",
      "Diethylamine"
    ],
    correct: "Aniline",
    marks: 4,
    negative: 1
  },
  {
    id: 311,
    question: "The Hoffmann bromamide reaction converts amides to:",
    options: [
      "1° amines",
      "2° amines",
      "3° amines",
      "Alcohols"
    ],
    correct: "1° amines",
    marks: 4,
    negative: 1
  },
  {
    id: 312,
    question: "The pKa of carboxylic acids is around:",
    options: [
      "4–5",
      "1–2",
      "7–8",
      "9–10"
    ],
    correct: "4–5",
    marks: 4,
    negative: 1
  },
  {
    id: 313,
    question: "Acetic anhydride reacts with water to give:",
    options: [
      "Acetic acid",
      "Ethanol",
      "Ethanoic ester",
      "Methanoic acid"
    ],
    correct: "Acetic acid",
    marks: 4,
    negative: 1
  },
  {
    id: 314,
    question: "Ammonolysis of alkyl halides gives:",
    options: [
      "Amines",
      "Alcohols",
      "Ethers",
      "Carboxylic acids"
    ],
    correct: "Amines",
    marks: 4,
    negative: 1
  },
  {
    id: 315,
    question: "Which acid is strongest?",
    options: [
      "Acetic acid",
      "Benzoic acid",
      "Formic acid",
      "Propanoic acid"
    ],
    correct: "Formic acid",
    marks: 4,
    negative: 1
  },
  {
    id: 316,
    question: "Which reagent forms diazonium salt from aniline?",
    options: [
      "H₂SO₄",
      "KMnO₄",
      "NaNO₂/HCl (0–5°C)",
      "Cl₂"
    ],
    correct: "NaNO₂/HCl (0–5°C)",
    marks: 4,
    negative: 1
  },
  {
    id: 317,
    question: "Ethylamine is more basic than aniline because:",
    options: [
      "+I effect of alkyl group",
      "Resonance stabilization",
      "More acidic",
      "Larger size"
    ],
    correct: "+I effect of alkyl group",
    marks: 4,
    negative: 1
  },
  {
    id: 318,
    question: "Acid strength increases with:",
    options: [
      "Electron‑donating groups",
      "Electron‑withdrawing groups",
      "Higher molecular weight",
      "More alkyl groups"
    ],
    correct: "Electron‑withdrawing groups",
    marks: 4,
    negative: 1
  },
  {
    id: 319,
    question: "Amides on hydrolysis give:",
    options: [
      "Carboxylic acids + amines",
      "Alcohols",
      "Ketones",
      "Alkanes"
    ],
    correct: "Carboxylic acids + amines",
    marks: 4,
    negative: 1
  },
  {
    id: 320,
    question: "Reduction of nitriles gives:",
    options: [
      "Esters",
      "Carboxylic acids",
      "Amides",
      "Amines"
    ],
    correct: "Amines",
    marks: 4,
    negative: 1
  },
  {
    id: 321,
    question: "Carboxylic acids show dimer formation due to:",
    options: [
      "Hydrogen bonding",
      "Ionic bonding",
      "Van der Waals forces",
      "Covalent bonding"
    ],
    correct: "Hydrogen bonding",
    marks: 4,
    negative: 1
  },
  {
    id: 322,
    question: "The reaction of acyl chloride with alcohol gives:",
    options: [
      "Amide",
      "Ester",
      "Ether",
      "Aldehyde"
    ],
    correct: "Ester",
    marks: 4,
    negative: 1
  },
  {
    id: 323,
    question: "A compound giving a foul smell on reaction with NaOH and heating is:",
    options: [
      "Amide",
      "Aniline",
      "Ester",
      "Carboxylic acid"
    ],
    correct: "Ester",
    marks: 4,
    negative: 1
  },
  {
    id: 324,
    question: "Which is the weakest base?",
    options: [
      "Aniline",
      "Ethylamine",
      "p-Toluidine",
      "Dimethylamine"
    ],
    correct: "Aniline",
    marks: 4,
    negative: 1
  },
  {
    id: 325,
    question: "The functional group –CONH₂ belongs to:",
    options: [
      "Acid",
      "Amine",
      "Ester",
      "Amide"
    ],
    correct: "Amide",
    marks: 4,
    negative: 1
  },
  {
    id: 326,
    question: "Primary amines react with Hinsberg reagent to form:",
    options: [
      "Sulphonamides",
      "Nitro compounds",
      "Esters",
      "Aldehydes"
    ],
    correct: "Sulphonamides",
    marks: 4,
    negative: 1
  },
  {
    id: 327,
    question: "Which of the following does not form hydrogen bonding?",
    options: [
      "Ethylamine",
      "Trimethylamine",
      "Acetic acid",
      "Formic acid"
    ],
    correct: "Trimethylamine",
    marks: 4,
    negative: 1
  },
  {
    id: 328,
    question: "Amines behave as:",
    options: [
      "Lewis bases",
      "Lewis acids",
      "Oxidizing agents",
      "Reducing agents"
    ],
    correct: "Lewis bases",
    marks: 4,
    negative: 1
  },
  {
    id: 329,
    question: "Ethanoic acid + ethanol in presence of H₂SO₄ gives:",
    options: [
      "Aldehyde",
      "Acid chloride",
      "Ester",
      "Ether"
    ],
    correct: "Ester",
    marks: 4,
    negative: 1
  },
  {
    id: 330,
    question: "Gabriel phthalimide synthesis prepares:",
    options: [
      "Tertiary amines",
      "Secondary amines",
      "Primary amines",
      "Aromatic amines"
    ],
    correct: "Primary amines",
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
    
    
    
    
    