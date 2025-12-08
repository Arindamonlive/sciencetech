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
    id: 331,
    question: "Which of the following is a **reducing sugar**?",
    "options": [
      "Sucrose",
      "Glucose",
      "Cellulose",
      "Starch"
    ],
    correct: "Glucose",
    marks: 4,
    negative: 1
  },
  {
    id: 332,
    question: "The monomer unit of **natural rubber** is:",
    "options": [
      "Isoprene",
      "Butadiene",
      "Styrene",
      "Acrylonitrile"
    ],
    correct: "Isoprene",
    marks: 4,
    negative: 1
  },
  {
    id: 333,
    question: "Which vitamin is also known as **calciferol**?",
    "options": [
      "Vitamin A",
      "Vitamin D",
      "Vitamin E",
      "Vitamin K"
    ],
    correct: "Vitamin D",
    marks: 4,
    negative: 1
  },
  {
    id: 334,
    question: "Which among the following is a **fibrous protein**?",
    "options": [
      "Hemoglobin",
      "Insulin",
      "Keratin",
      "Myoglobin"
    ],
    correct: "Keratin",
    marks: 4,
    negative: 1
  },
  {
    id: 335,
    question: "Which of the following is **not a polysaccharide**?",
    "options": [
      "Cellulose",
      "Glycogen",
      "Maltose",
      "Starch"
    ],
    correct: "Maltose",
    marks: 4,
    negative: 1
  },
  {
    id: 336,
    question: "The **monomer of Bakelite** is:",
    "options": [
      "Phenol and Formaldehyde",
      "Urea and Formaldehyde",
      "Styrene",
      "Ethylene"
    ],
    correct: "Phenol and Formaldehyde",
    marks: 4,
    negative: 1
  },
  {
    id: 337,
    question: "Which of the following is an example of a **condensation polymer**?",
    "options": [
      "Polythene",
      "PVC",
      "Nylon-6,6",
      "Polystyrene"
    ],
    correct: "Nylon-6,6",
    marks: 4,
    negative: 1
  },
  {
    id: 338,
    question: "Which among the following vitamins is **water-soluble**?",
    "options": [
      "Vitamin A",
      "Vitamin C",
      "Vitamin D",
      "Vitamin E"
    ],
    correct: "Vitamin C",
    marks: 4,
    negative: 1
  },
  {
    id: 339,
    question: "Which polymer is known as **‘Orlon’**?",
    "options": [
      "Polyacrylonitrile",
      "Polystyrene",
      "Polyvinyl chloride",
      "Teflon"
    ],
    correct: "Polyacrylonitrile",
    marks: 4,
    negative: 1
  },
  {
    id: 340,
    question: "The **linkage present in proteins** is:",
    "options": [
      "Glycosidic linkage",
      "Ester linkage",
      "Peptide linkage",
      "Disulfide bond"
    ],
    correct: "Peptide linkage",
    marks: 4,
    negative: 1
  },
  {
    id: 341,
    question: "Which sugar is called **fruit sugar**?",
    "options": [
      "Glucose",
      "Galactose",
      "Fructose",
      "Maltose"
    ],
    correct: "Fructose",
    marks: 4,
    negative: 1
  },
  {
    id: 342,
    question: "The **monomer of Teflon** is:",
    "options": [
      "Ethylene",
      "Tetrafluoroethylene",
      "Styrene",
      "Chloroprene"
    ],
    correct: "Tetrafluoroethylene",
    marks: 4,
    negative: 1
  },
  {
    id: 343,
    question: "Which of the following is a **homopolymer**?",
    "options": [
      "Nylon-6,6",
      "Bakelite",
      "PVC",
      "Nylon-6"
    ],
    correct: "PVC",
    marks: 4,
    negative: 1
  },
  {
    id: 344,
    question: "Which vitamin prevents **scurvy**?",
    "options": [
      "Vitamin A",
      "Vitamin B1",
      "Vitamin C",
      "Vitamin D"
    ],
    correct: "Vitamin C",
    marks: 4,
    negative: 1
  },
  {
    id: 345,
    question: "Which of the following is a **polysaccharide**?",
    "options": [
      "Sucrose",
      "Maltose",
      "Lactose",
      "Starch"
    ],
    correct: "Starch",
    marks: 4,
    negative: 1
  },
  {
    id: 346,
    question: "Which synthetic polymer is used in making **non-stick cookware**?",
    "options": [
      "PVC",
      "Teflon",
      "Bakelite",
      "Nylon"
    ],
    correct: "Teflon",
    marks: 4,
    negative: 1
  },
  {
    id: 347,
    question: "Which protein **carries oxygen in human blood**?",
    "options": [
      "Myoglobin",
      "Hemoglobin",
      "Collagen",
      "Keratin"
    ],
    correct: "Hemoglobin",
    marks: 4,
    negative: 1
  },
  {
    id: 348,
    question: "Which among the following is **not an amino acid**?",
    "options": [
      "Glycine",
      "Alanine",
      "Adenine",
      "Valine"
    ],
    correct: "Adenine",
    marks: 4,
    negative: 1
  },
  {
    id: 349,
    question: "Which polymer is called **artificial silk**?",
    "options": [
      "Nylon",
      "Rayon",
      "Polyester",
      "Acrylic"
    ],
    correct: "Rayon",
    marks: 4,
    negative: 1
  },
  {
    id: 350,
    question: "Which vitamin is also known as **tocopherol**?",
    "options": [
      "Vitamin A",
      "Vitamin C",
      "Vitamin E",
      "Vitamin K"
    ],
    correct: "Vitamin E",
    marks: 4,
    negative: 1
  },
  {
    id: 351,
    question: "Which of the following is **not a carbohydrate**?",
    "options": [
      "Glucose",
      "Fructose",
      "Insulin",
      "Cellulose"
    ],
    correct: "Insulin",
    marks: 4,
    negative: 1
  },
  {
    id: 352,
    question: "The **monomer of Nylon-6** is:",
    "options": [
      "Caprolactam",
      "Adipic acid",
      "Ethylene",
      "Glycol"
    ],
    correct: "Caprolactam",
    marks: 4,
    negative: 1
  },
  {
    id: 353,
    question: "Which of the following is a **globular protein**?",
    "options": [
      "Collagen",
      "Hemoglobin",
      "Keratin",
      "Fibroin"
    ],
    correct: "Hemoglobin",
    marks: 4,
    negative: 1
  },
  {
    id: 354,
    question: "Which vitamin is required for **blood clotting**?",
    "options": [
      "Vitamin A",
      "Vitamin D",
      "Vitamin E",
      "Vitamin K"
    ],
    correct: "Vitamin K",
    marks: 4,
    negative: 1
  },
  {
    id: 355,
    question: "The process of conversion of **starch into maltose is catalyzed** by:",
    "options": [
      "Maltase",
      "Amylase",
      "Invertase",
      "Lactase"
    ],
    correct: "Amylase",
    marks: 4,
    negative: 1
  },
  {
    id: 356,
    question: "Which of the following is a **biodegradable polymer**?",
    "options": [
      "PHBV",
      "PVC",
      "Polystyrene",
      "Teflon"
    ],
    correct: "PHBV",
    marks: 4,
    negative: 1
  },
  {
    id: 357,
    question: "Which of the following contains a **peptide linkage**?",
    "options": [
      "Starch",
      "Nylon",
      "Proteins",
      "Cellulose"
    ],
    correct: "Proteins",
    marks: 4,
    negative: 1
  },
  {
    id: 358,
    question: "Which vitamin is also called **retinol**?",
    "options": [
      "Vitamin A",
      "Vitamin B12",
      "Vitamin C",
      "Vitamin D"
    ],
    correct: "Vitamin A",
    marks: 4,
    negative: 1
  },
  {
    id: 359,
    question: "Which polymer is used for making **bulletproof glass**?",
    "options": [
      "Polyvinyl chloride",
      "Polystyrene",
      "Polycarbonate",
      "Bakelite"
    ],
    correct: "Polycarbonate",
    marks: 4,
    negative: 1
  },
  {
    id: 360,
    question: "Which disaccharide is composed of **glucose and galactose**?",
    "options": [
      "Maltose",
      "Sucrose",
      "Lactose",
      "Cellobiose"
    ],
    correct: "Lactose",
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
    
    
    
    
    