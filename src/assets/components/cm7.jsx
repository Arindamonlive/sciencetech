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
    id: 181,
    question: "Which transition element shows the maximum number of oxidation states?",
    options: [
      "Fe",
      "Cr",
      "Mn",
      "V"
    ],
    correct: "Mn",
    marks: 4,
    negative: 1
  },
  {
    id: 182,
    question: "The color of transition metal ions is due to:",
    options: [
      "Charge transfer spectra",
      "d–d electronic transitions",
      "Presence of unpaired p-electrons",
      "Nuclear transitions"
    ],
    correct: "d–d electronic transitions",
    marks: 4,
    negative: 1
  },
  {
    id: 183,
    question: "Which of the following has the highest magnetic moment?",
    options: [
      "Fe²⁺ (d⁶)",
      "Co²⁺ (d⁷)",
      "Mn²⁺ (d⁵)",
      "Ni²⁺ (d⁸)"
    ],
    correct: "Mn²⁺ (d⁵)",
    marks: 4,
    negative: 1
  },
  {
    id: 184,
    question: "The stability of +2 oxidation state is maximum for:",
    options: [
      "Fe",
      "Mn",
      "Zn",
      "Cu"
    ],
    correct: "Cu",
    marks: 4,
    negative: 1
  },
  {
    id: 185,
    question: "The correct order of ionization enthalpy of 3d transition metals is:",
    options: [
      "Sc < Ti < V",
      "V < Ti < Sc",
      "Cr < Mn < Fe",
      "Cu < Ni < Co"
    ],
    correct: "Sc < Ti < V",
    marks: 4,
    negative: 1
  },
  {
    id: 186,
    question: "Which of the following is a strong oxidising agent in acidic medium?",
    options: [
      "Mn²⁺",
      "MnO₂",
      "MnO₄⁻",
      "Mn³⁺"
    ],
    correct: "MnO₄⁻",
    marks: 4,
    negative: 1
  },
  {
    id: 187,
    question: "Which transition metal forms the most stable complexes?",
    options: [
      "Zn",
      "Cu",
      "Fe",
      "Co"
    ],
    correct: "Co",
    marks: 4,
    negative: 1
  },
  {
    id: 188,
    question: "Which element of the 3d series does not form coloured compounds?",
    options: [
      "Ti",
      "Sc",
      "Cr",
      "Cu"
    ],
    correct: "Sc",
    marks: 4,
    negative: 1
  },
  {
    id: 189,
    question: "Which among the following is used in photography?",
    options: [
      "AgBr",
      "AgCl",
      "AgNO₃",
      "Ag₂O"
    ],
    correct: "AgBr",
    marks: 4,
    negative: 1
  },
  {
    id: 190,
    question: "Which among the following is paramagnetic?",
    options: [
      "Zn²⁺",
      "Ti³⁺",
      "Cu⁺",
      "Ni²⁺"
    ],
    correct: "Ti³⁺",
    marks: 4,
    negative: 1
  },
  {
    id: 191,
    question: "The +3 oxidation state is most stable for:",
    options: [
      "Lanthanides",
      "Actinides",
      "Transition elements",
      "Alkali metals"
    ],
    correct: "Lanthanides",
    marks: 4,
    negative: 1
  },
  {
    id: 192,
    question: "Lanthanide contraction is due to:",
    options: [
      "Poor shielding of 5f electrons",
      "Poor shielding of 4f electrons",
      "High effective nuclear charge",
      "Relativistic effects"
    ],
    correct: "Poor shielding of 4f electrons",
    marks: 4,
    negative: 1
  },
  {
    id: 193,
    question: "Which ion is colorless?",
    options: [
      "Ce⁴⁺ (f⁰)",
      "Nd³⁺ (f³)",
      "U³⁺ (f³)",
      "Eu²⁺ (f⁷)"
    ],
    correct: "Ce⁴⁺ (f⁰)",
    marks: 4,
    negative: 1
  },
  {
    id: 194,
    question: "Which element shows both +3 and +4 oxidation states commonly?",
    options: [
      "Ce",
      "La",
      "Yb",
      "Lu"
    ],
    correct: "Ce",
    marks: 4,
    negative: 1
  },
  {
    id: 195,
    question: "Which is used in nuclear reactors as fuel?",
    options: [
      "ThO₂",
      "UO₂",
      "PuO₂",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 196,
    question: "Which actinide exhibits the highest number of oxidation states?",
    options: [
      "U",
      "Th",
      "Np",
      "Pu"
    ],
    correct: "Pu",
    marks: 4,
    negative: 1
  },
  {
    id: 197,
    question: "The separation of lanthanides is difficult due to:",
    options: [
      "Similarity in atomic numbers",
      "Similarity in ionic sizes",
      "Same electronic configuration",
      "High density"
    ],
    correct: "Similarity in ionic sizes",
    marks: 4,
    negative: 1
  },
  {
    id: 198,
    question: "Which is the last element of the actinide series?",
    options: [
      "Lr",
      "No",
      "Fm",
      "Cf"
    ],
    correct: "Lr",
    marks: 4,
    negative: 1
  },
  {
    id: 199,
    question: "Which ion is the most paramagnetic?",
    options: [
      "Gd³⁺ (f⁷)",
      "La³⁺ (f⁰)",
      "Ce⁴⁺ (f⁰)",
      "Lu³⁺ (f¹⁴)"
    ],
    correct: "Gd³⁺ (f⁷)",
    marks: 4,
    negative: 1
  },
  {
    id: 200,
    question: "The radioisotope used in treatment of cancer is:",
    options: [
      "Co-60",
      "U-235",
      "Th-232",
      "Ra-226"
    ],
    correct: "Co-60",
    marks: 4,
    negative: 1
  },
  {
    id: 201,
    question: "The oxidation number of Cr in [Cr(NH₃)₆]Cl₃ is:",
    options: [
      "0",
      "+2",
      "+3",
      "+6"
    ],
    correct: "+3",
    marks: 4,
    negative: 1
  },
  {
    id: 202,
    question: "The coordination number of Ni in [Ni(CO)₄] is:",
    options: [
      "2",
      "3",
      "4",
      "6"
    ],
    correct: "4",
    marks: 4,
    negative: 1
  },
  {
    id: 203,
    question: "The geometry of [Ni(CN)₄]²⁻ is:",
    options: [
      "Tetrahedral",
      "Square planar",
      "Octahedral",
      "Trigonal planar"
    ],
    correct: "Square planar",
    marks: 4,
    negative: 1
  },
  {
    id: 204,
    question: "Which of the following complexes shows optical isomerism?",
    options: [
      "[Co(NH₃)₆]³⁺",
      "[Cr(C₂O₄)₃]³⁻",
      "[Ni(CO)₄]",
      "[Fe(CN)₆]³⁻"
    ],
    correct: "[Cr(C₂O₄)₃]³⁻",
    marks: 4,
    negative: 1
  },
  {
    id: 205,
    question: "Which among the following is a chelating ligand?",
    options: [
      "NH₃",
      "Cl⁻",
      "C₂O₄²⁻",
      "CN⁻"
    ],
    correct: "C₂O₄²⁻",
    marks: 4,
    negative: 1
  },
  {
    id: 206,
    question: "Which of the following complexes is diamagnetic?",
    options: [
      "[Fe(CN)₆]³⁻",
      "[Fe(CN)₆]⁴⁻",
      "[CoF₆]³⁻",
      "[Cu(NH₃)₄]²⁺"
    ],
    correct: "[Fe(CN)₆]⁴⁻",
    marks: 4,
    negative: 1
  },
  {
    id: 207,
    question: "According to Werner’s theory, secondary valency corresponds to:",
    options: [
      "Oxidation state",
      "Ionisable groups",
      "Coordination number",
      "Magnetic moment"
    ],
    correct: "Coordination number",
    marks: 4,
    negative: 1
  },
  {
    id: 208,
    question: "The IUPAC name of [Co(NH₃)₄Cl₂]Cl is:",
    options: [
      "Tetrammine dichlorocobalt(III) chloride",
      "Dichlorotetramminecobalt(III) chloride",
      "Tetrammine cobalt(II) chloride",
      "Dichlorocobalt tetrammine(III) chloride"
    ],
    correct: "Tetrammine dichlorocobalt(III) chloride",
    marks: 4,
    negative: 1
  },
  {
    id: 209,
    question: "The crystal field splitting is maximum in:",
    options: [
      "Weak field ligands",
      "Strong field ligands",
      "π-donor ligands",
      "Halide ligands"
    ],
    correct: "Strong field ligands",
    marks: 4,
    negative: 1
  },
  {
    id: 210,
    question: "Which of the following is used in qualitative analysis to detect Ni²⁺ ions?",
    options: [
      "Dimethylglyoxime",
      "Ethylenediamine",
      "NH₃",
      "CO"
    ],
    correct: "Dimethylglyoxime",
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
    
    
    
    
    