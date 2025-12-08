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
    id: 271,
    question: "Which of the following alcohols will show a positive Lucas test most rapidly?",
    options: [
      "Methanol",
      "Ethanol",
      "2-Propanol",
      "2-Methyl-2-propanol"
    ],
    correct: "2-Methyl-2-propanol",
    marks: 4,
    negative: 1
  },
  {
    id: 272,
    question: "Dehydration of alcohols using conc. H₂SO₄ at 443 K mainly gives:",
    options: [
      "Alkanes",
      "Alkenes",
      "Aldehydes",
      "Ethers"
    ],
    correct: "Alkenes",
    marks: 4,
    negative: 1
  },
  {
    id: 273,
    question: "Williamson ether synthesis is best suited for preparing:",
    options: [
      "Tertiary alkyl ethers",
      "Aryl ethers",
      "Primary alkyl ethers",
      "Vinyl ethers"
    ],
    correct: "Primary alkyl ethers",
    marks: 4,
    negative: 1
  },
  {
    id: 274,
    question: "Which reagent converts aldehydes selectively into alcohols?",
    options: [
      "PCC",
      "LiAlH₄",
      "KMnO₄",
      "Br₂/H₂O"
    ],
    correct: "LiAlH₄",
    marks: 4,
    negative: 1
  },
  {
    id: 275,
    question: "Which of the following shows the highest boiling point?",
    options: [
      "Diethyl ether",
      "Ethanol",
      "Propanal",
      "Methanal"
    ],
    correct: "Ethanol",
    marks: 4,
    negative: 1
  },
  {
    id: 276,
    question: "Oxidation of secondary alcohol yields:",
    options: [
      "Aldehyde",
      "Ketone",
      "Carboxylic acid",
      "Ether"
    ],
    correct: "Ketone",
    marks: 4,
    negative: 1
  },
  {
    id: 277,
    question: "Which compound gives a positive Tollen’s test?",
    options: [
      "Acetone",
      "Formaldehyde",
      "Diethyl ether",
      "2-butanone"
    ],
    correct: "Formaldehyde",
    marks: 4,
    negative: 1
  },
  {
    id: 278,
    question: "Clemmensen reduction converts aldehydes/ketones into:",
    options: [
      "Alcohols",
      "Alkanes",
      "Ethers",
      "Acids"
    ],
    correct: "Alkanes",
    marks: 4,
    negative: 1
  },
  {
    id: 279,
    question: "Which alcohol shows maximum acidic nature?",
    options: [
      "t-Butyl alcohol",
      "Ethanol",
      "Phenol",
      "Methanol"
    ],
    correct: "Phenol",
    marks: 4,
    negative: 1
  },
  {
    id: 280,
    question: "Reaction of an aldehyde with HCN forms:",
    options: [
      "Cyanohydrin",
      "Carboxylic acid",
      "Ketone",
      "Ether"
    ],
    correct: "Cyanohydrin",
    marks: 4,
    negative: 1
  },
  {
    id: 281,
    question: "Ether cleavage with HI proceeds through:",
    options: [
      "Radical pathway",
      "SN2 mechanism",
      "E1 elimination",
      "Pericyclic reaction"
    ],
    correct: "SN2 mechanism",
    marks: 4,
    negative: 1
  },
  {
    id: 282,
    question: "Which carbonyl compound is most reactive towards nucleophilic addition?",
    options: [
      "Acetone",
      "Formaldehyde",
      "Acetaldehyde",
      "Benzaldehyde"
    ],
    correct: "Formaldehyde",
    marks: 4,
    negative: 1
  },
  {
    id: 283,
    question: "Aldol condensation occurs in:",
    options: [
      "Carbonyls without α-H",
      "Only aldehydes",
      "Carbonyls with α-H",
      "Carboxylic acids"
    ],
    correct: "Carbonyls with α-H",
    marks: 4,
    negative: 1
  },
  {
    id: 284,
    question: "The product of oxidation of ethanol using PCC is:",
    options: [
      "Acetic acid",
      "Acetaldehyde",
      "Ethene",
      "Ethyl acetate"
    ],
    correct: "Acetaldehyde",
    marks: 4,
    negative: 1
  },
  {
    id: 285,
    question: "Ethers show low boiling points due to:",
    options: [
      "Strong H-bonding",
      "Ionic bonding",
      "Weak dipole interactions",
      "Metallic bonding"
    ],
    correct: "Weak dipole interactions",
    marks: 4,
    negative: 1
  },
  {
    id: 286,
    question: "Cannizzaro reaction occurs with:",
    options: [
      "Aldehydes with α-H",
      "Ketones only",
      "Aldehydes without α-H",
      "Carboxylic acids"
    ],
    correct: "Aldehydes without α-H",
    marks: 4,
    negative: 1
  },
  {
    id: 287,
    question: "Which reagent distinguishes aldehydes from ketones?",
    options: [
      "PCC",
      "Brady’s reagent",
      "Schiff’s reagent",
      "H₂/Pd"
    ],
    correct: "Schiff’s reagent",
    marks: 4,
    negative: 1
  },
  {
    id: 288,
    question: "Treatment of ethanol with PCl₅ gives:",
    options: [
      "Ethene",
      "Chloroethane",
      "Ethyl acetate",
      "Ether"
    ],
    correct: "Chloroethane",
    marks: 4,
    negative: 1
  },
  {
    id: 289,
    question: "Acetone on reaction with NH₂OH forms:",
    options: [
      "Oxime",
      "Hydrazone",
      "Cyanohydrin",
      "Aldol"
    ],
    correct: "Oxime",
    marks: 4,
    negative: 1
  },
  {
    id: 290,
    question: "Phenol reacts with PBr₃ to give:",
    options: [
      "Bromophenol",
      "Anisole",
      "Bromoalkane",
      "No reaction"
    ],
    correct: "No reaction",
    marks: 4,
    negative: 1
  },
  {
    id: 291,
    question: "Which is the strongest reducing agent?",
    options: [
      "NaBH₄",
      "LiAlH₄",
      "H₂SO₄",
      "KMnO₄"
    ],
    correct: "LiAlH₄",
    marks: 4,
    negative: 1
  },
  {
    id: 292,
    question: "Carboxylic acids can be reduced to alcohols using:",
    options: [
      "PCC",
      "LiAlH₄",
      "H₂O₂",
      "AgNO₃"
    ],
    correct: "LiAlH₄",
    marks: 4,
    negative: 1
  },
  {
    id: 293,
    question: "Reaction of ethanol with hot CuO gives:",
    options: [
      "Methane",
      "Acetaldehyde",
      "Ethanoic acid",
      "Ethene"
    ],
    correct: "Acetaldehyde",
    marks: 4,
    negative: 1
  },
  {
    id: 294,
    question: "Ethanal reacts with NaHSO₃ to form:",
    options: [
      "Sulfonic acid",
      "Alcohol",
      "Bisulfite adduct",
      "Ether"
    ],
    correct: "Bisulfite adduct",
    marks: 4,
    negative: 1
  },
  {
    id: 295,
    question: "Which carbonyl test gives an orange precipitate?",
    options: [
      "Tollen’s test",
      "Fehling’s test",
      "DNPH test",
      "Lucas test"
    ],
    correct: "DNPH test",
    marks: 4,
    negative: 1
  },
  {
    id: 296,
    question: "Ethoxyethane is commonly prepared by:",
    options: [
      "Dehydrogenation",
      "Williamson synthesis",
      "Ozonolysis",
      "Photolysis"
    ],
    correct: "Williamson synthesis",
    marks: 4,
    negative: 1
  },
  {
    id: 297,
    question: "Which reagent oxidizes aldehydes to acids but not ketones?",
    options: [
      "CrO₃",
      "KMnO₄",
      "Tollen’s reagent",
      "PCC"
    ],
    correct: "Tollen’s reagent",
    marks: 4,
    negative: 1
  },
  {
    id: 298,
    question: "Benzaldehyde does not undergo aldol condensation because:",
    options: [
      "No carbonyl group",
      "No hydrogen bonding",
      "No α-H",
      "Weak electrophile"
    ],
    correct: "No α-H",
    marks: 4,
    negative: 1
  },
  {
    id: 299,
    question: "Dehydration of primary alcohol at 413 K gives:",
    options: [
      "Ethers",
      "Ketones",
      "Carboxylic acids",
      "Aldehydes"
    ],
    correct: "Ethers",
    marks: 4,
    negative: 1
  },
  {
    id: 300,
    question: "Identify the major product when acetone reacts with CH₃MgBr followed by hydrolysis:",
    options: [
      "3° alcohol",
      "2° alcohol",
      "1° alcohol",
      "Ethanone"
    ],
    correct: "3° alcohol",
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
    
    
    
    
    