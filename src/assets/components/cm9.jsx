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
    id: 241,
    question: "Which of the following compounds undergoes addition reaction most readily?",
    options: [
      "Ethane",
      "Ethene",
      "Benzene",
      "Ethyne"
    ],
    correct: "Ethene",
    marks: 4,
    negative: 1
  },
  {
    id: 242,
    question: "Which of the following reactions is used for the preparation of alkanes from alkyl halides?",
    options: [
      "Wurtz reaction",
      "Friedel–Crafts reaction",
      "Kolbe’s reaction",
      "Cannizzaro reaction"
    ],
    correct: "Wurtz reaction",
    marks: 4,
    negative: 1
  },
  {
    id: 243,
    question: "The major product obtained when 2-bromo-2-methylpropane reacts with alcoholic KOH is:",
    options: [
      "2-methylpropene",
      "2-butanol",
      "1-butene",
      "2-bromobutane"
    ],
    correct: "2-methylpropene",
    marks: 4,
    negative: 1
  },
  {
    id: 244,
    question: "Which of the following shows geometrical isomerism?",
    options: [
      "Butane",
      "2-butene",
      "1-butene",
      "2-methylpropene"
    ],
    correct: "2-butene",
    marks: 4,
    negative: 1
  },
  {
    id: 245,
    question: "Which reagent converts ethyne to ethane?",
    options: [
      "H₂/Ni",
      "HBr",
      "HCl",
      "NaNH₂"
    ],
    correct: "H₂/Ni",
    marks: 4,
    negative: 1
  },
  {
    id: 246,
    question: "Which of the following follows Markovnikov’s rule?",
    options: [
      "CH₂=CH₂ + HBr",
      "CH₃CH=CH₂ + HBr",
      "CH≡CH + HBr",
      "C₆H₆ + Br₂"
    ],
    correct: "CH₃CH=CH₂ + HBr",
    marks: 4,
    negative: 1
  },
  {
    id: 247,
    question: "Which of the following compounds will give a white precipitate with AgNO₃ in ethanol?",
    options: [
      "CH₃Cl",
      "CH₃Br",
      "CH₃I",
      "CCl₄"
    ],
    correct: "CH₃I",
    marks: 4,
    negative: 1
  },
  {
    id: 248,
    question: "Which compound is most reactive towards nucleophilic substitution?",
    options: [
      "CH₃Cl",
      "CH₃Br",
      "CH₃I",
      "CH₃F"
    ],
    correct: "CH₃I",
    marks: 4,
    negative: 1
  },
  {
    id: 249,
    question: "Which one gives the highest yield of ethane in Wurtz reaction?",
    options: [
      "Methyl chloride",
      "Ethyl chloride",
      "Propyl chloride",
      "Butyl chloride"
    ],
    correct: "Methyl chloride",
    marks: 4,
    negative: 1
  },
  {
    id: 250,
    question: "What is the IUPAC name of neopentane?",
    options: [
      "2-methylbutane",
      "2,2-dimethylpropane",
      "3-methylbutane",
      "Pentane"
    ],
    correct: "2,2-dimethylpropane",
    marks: 4,
    negative: 1
  },
  {
    id: 251,
    question: "Which hydrocarbon gives soot on burning?",
    options: [
      "Ethane",
      "Ethene",
      "Benzene",
      "Methane"
    ],
    correct: "Benzene",
    marks: 4,
    negative: 1
  },
  {
    id: 252,
    question: "Which reaction is used for conversion of alkyl halide to alcohol?",
    options: [
      "Reaction with KOH (aq)",
      "Reaction with NaOH (alc)",
      "Reaction with Zn",
      "Reaction with NH₃"
    ],
    correct: "Reaction with KOH (aq)",
    marks: 4,
    negative: 1
  },
  {
    id: 253,
    question: "In Kolbe’s electrolysis, the main product from sodium acetate is:",
    options: [
      "Ethane",
      "Ethene",
      "Ethyne",
      "Methane"
    ],
    correct: "Ethane",
    marks: 4,
    negative: 1
  },
  {
    id: 254,
    question: "The hybridization of carbon in ethyne is:",
    options: [
      "sp³",
      "sp²",
      "sp",
      "dsp²"
    ],
    correct: "sp",
    marks: 4,
    negative: 1
  },
  {
    id: 255,
    question: "Which alkyl halide undergoes SN1 reaction most readily?",
    options: [
      "CH₃Br",
      "C₂H₅Br",
      "(CH₃)₃CBr",
      "CH₂=CH–CH₂Br"
    ],
    correct: "(CH₃)₃CBr",
    marks: 4,
    negative: 1
  },
  {
    id: 256,
    question: "What is the major product in chlorination of methane in presence of sunlight?",
    options: [
      "CH₃Cl",
      "CH₂Cl₂",
      "CHCl₃",
      "CCl₄"
    ],
    correct: "CH₃Cl",
    marks: 4,
    negative: 1
  },
  {
    id: 257,
    question: "Which reaction is known as dehydrohalogenation?",
    options: [
      "Elimination of HX from alkyl halide",
      "Addition of HX to alkene",
      "Substitution of halogen",
      "Oxidation of alcohol"
    ],
    correct: "Elimination of HX from alkyl halide",
    marks: 4,
    negative: 1
  },
  {
    id: 258,
    question: "Which alkene gives two products on ozonolysis?",
    options: [
      "Ethene",
      "Propene",
      "2-butene",
      "Cyclohexene"
    ],
    correct: "Propene",
    marks: 4,
    negative: 1
  },
  {
    id: 259,
    question: "Which of the following is not an electrophilic addition reaction?",
    options: [
      "Halogenation",
      "Hydrogenation",
      "Hydrohalogenation",
      "Hydration"
    ],
    correct: "Hydrogenation",
    marks: 4,
    negative: 1
  },
  {
    id: 260,
    question: "Which compound gives isomeric products with HBr addition in presence of peroxide?",
    options: [
      "Propene",
      "Ethene",
      "2-butene",
      "1-butene"
    ],
    correct: "1-butene",
    marks: 4,
    negative: 1
  },
  {
    id: 261,
    question: "What is the major product formed in Friedel–Crafts alkylation of benzene with CH₃Cl and AlCl₃?",
    options: [
      "Toluene",
      "Chlorobenzene",
      "Benzyl chloride",
      "Xylene"
    ],
    correct: "Toluene",
    marks: 4,
    negative: 1
  },
  {
    id: 262,
    question: "Which of the following follows anti-Markovnikov rule?",
    options: [
      "Addition of HBr in presence of peroxide",
      "Addition of HCl",
      "Addition of HI",
      "Addition of Br₂"
    ],
    correct: "Addition of HBr in presence of peroxide",
    marks: 4,
    negative: 1
  },
  {
    id: 263,
    question: "Which is the correct order of reactivity of alkyl halides towards SN2 reaction?",
    options: [
      "3° > 2° > 1°",
      "1° > 2° > 3°",
      "2° > 1° > 3°",
      "3° > 1° > 2°"
    ],
    correct: "1° > 2° > 3°",
    marks: 4,
    negative: 1
  },
  {
    id: 264,
    question: "Which compound gives chloroform on halogenation?",
    options: [
      "Methane",
      "Ethane",
      "Propane",
      "Ethene"
    ],
    correct: "Methane",
    marks: 4,
    negative: 1
  },
  {
    id: 265,
    question: "The IUPAC name of isobutylene is:",
    options: [
      "2-methylprop-1-ene",
      "1-butene",
      "2-butene",
      "2-methylpropane"
    ],
    correct: "2-methylprop-1-ene",
    marks: 4,
    negative: 1
  },
  {
    id: 266,
    question: "Which reagent converts alkyl halide to alkene?",
    options: [
      "Alcoholic KOH",
      "Aqueous KOH",
      "NH₃",
      "NaOH (aq)"
    ],
    correct: "Alcoholic KOH",
    marks: 4,
    negative: 1
  },
  {
    id: 267,
    question: "The product of bromination of ethene is:",
    options: [
      "Ethyl bromide",
      "1,2-dibromoethane",
      "Bromoethene",
      "Vinyl bromide"
    ],
    correct: "1,2-dibromoethane",
    marks: 4,
    negative: 1
  },
  {
    id: 268,
    question: "Which of the following is used as anesthetic gas?",
    options: [
      "CHCl₃",
      "CH₂Cl₂",
      "CCl₄",
      "CH₃Cl"
    ],
    correct: "CHCl₃",
    marks: 4,
    negative: 1
  },
  {
    id: 269,
    question: "The product of reaction of propene with HBr in presence of peroxide is:",
    options: [
      "1-bromopropane",
      "2-bromopropane",
      "Propyl bromide",
      "Allyl bromide"
    ],
    correct: "1-bromopropane",
    marks: 4,
    negative: 1
  },
  {
    id: 270,
    question: "Which of the following has the highest boiling point?",
    options: [
      "CH₄",
      "C₂H₆",
      "C₃H₈",
      "C₄H₁₀"
    ],
    correct: "C₄H₁₀",
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
    
    
    
    
    