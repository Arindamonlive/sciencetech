import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function CM2() {
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
    id: 31,
    question: "What is the main difference between real and ideal gases?",
    options: [
      "Real gases occupy volume and experience intermolecular forces",
      "Real gases follow all gas laws",
      "Real gases have constant internal energy",
      "Real gases do not exert pressure"
    ],
    correct: "Real gases occupy volume and experience intermolecular forces",
    marks: 4,
    negative: 1
  },
  {
    id: 32,
    question: "Which quantity measures the disorder of a system?",
    options: [
      "Gibbs energy",
      "Enthalpy",
      "Entropy",
      "Internal energy"
    ],
    correct: "Entropy",
    marks: 4,
    negative: 1
  },
  {
    id: 33,
    question: "Which process occurs at constant pressure?",
    options: [
      "Isochoric",
      "Adiabatic",
      "Isobaric",
      "Isothermal"
    ],
    correct: "Isobaric",
    marks: 4,
    negative: 1
  },
  {
    id: 34,
    question: "Which of the following is a path function?",
    options: [
      "Work",
      "Enthalpy",
      "Internal energy",
      "Entropy"
    ],
    correct: "Work",
    marks: 4,
    negative: 1
  },
  {
    id: 35,
    question: "What is the SI unit of entropy?",
    options: [
      "J/mol",
      "J/K",
      "J/mol·K",
      "kJ/mol"
    ],
    correct: "J/mol·K",
    marks: 4,
    negative: 1
  },
  {
    id: 36,
    question: "The van der Waals equation corrects for:",
    options: [
      "Pressure and volume",
      "Temperature and pressure",
      "Enthalpy and entropy",
      "Moles and volume"
    ],
    correct: "Pressure and volume",
    marks: 4,
    negative: 1
  },
  {
    id: 37,
    question: "The value of universal gas constant R in SI units is:",
    options: [
      "8.314 J/mol·K",
      "0.0821 L·atm/mol·K",
      "1.987 cal/mol·K",
      "273 J/mol·K"
    ],
    correct: "8.314 J/mol·K",
    marks: 4,
    negative: 1
  },
  {
    id: 38,
    question: "Which of the following is not an assumption of the kinetic molecular theory of gases?",
    options: [
      "Gas particles are in constant random motion",
      "There are attractive forces between particles",
      "Collisions are perfectly elastic",
      "Volume of gas particles is negligible"
    ],
    correct: "There are attractive forces between particles",
    marks: 4,
    negative: 1
  },
  {
    id: 39,
    question: "In an adiabatic process, which of the following remains constant?",
    options: [
      "Temperature",
      "Heat exchanged",
      "Volume",
      "Pressure"
    ],
    correct: "Heat exchanged",
    marks: 4,
    negative: 1
  },
  {
    id: 40,
    question: "Which of the following represents enthalpy change at constant pressure?",
    options: [
      "q = ΔH",
      "q = ΔU",
      "q = ΔS",
      "q = ΔG"
    ],
    correct: "q = ΔH",
    marks: 4,
    negative: 1
  },
  {
    id: 41,
    question: "Which state function helps determine the spontaneity of a reaction?",
    options: [
      "Enthalpy",
      "Entropy",
      "Gibbs free energy",
      "Internal energy"
    ],
    correct: "Gibbs free energy",
    marks: 4,
    negative: 1
  },
  {
    id: 42,
    question: "Which gas law is derived from combining Boyle's, Charles's, and Avogadro's laws?",
    options: [
      "Ideal Gas Law",
      "Dalton’s Law",
      "Graham’s Law",
      "van der Waals Equation"
    ],
    correct: "Ideal Gas Law",
    marks: 4,
    negative: 1
  },
  {
    id: 43,
    question: "The energy required to raise the temperature of 1 gram of water by 1°C is called:",
    options: [
      "Calorie",
      "Joule",
      "BTU",
      "Watt"
    ],
    correct: "Calorie",
    marks: 4,
    negative: 1
  },
  {
    id: 44,
    question: "Which of the following is an intensive property?",
    options: [
      "Volume",
      "Mass",
      "Temperature",
      "Enthalpy"
    ],
    correct: "Temperature",
    marks: 4,
    negative: 1
  },
  {
    id: 45,
    question: "Which of the following gas law shows the relationship between pressure and volume at constant temperature?",
    options: [
      "Boyle’s Law",
      "Charles’s Law",
      "Avogadro’s Law",
      "Ideal Gas Law"
    ],
    correct: "Boyle’s Law",
    marks: 4,
    negative: 1
  },
  {
    id: 46,
    question: "Which thermodynamic quantity is zero at absolute zero for a perfect crystal?",
    options: [
      "Internal energy",
      "Entropy",
      "Enthalpy",
      "Gibbs free energy"
    ],
    correct: "Entropy",
    marks: 4,
    negative: 1
  },
  {
    id: 47,
    question: "What does the second law of thermodynamics state about entropy?",
    options: [
      "It always increases in an isolated system",
      "It always decreases",
      "It remains constant",
      "It is zero at 0 K"
    ],
    correct: "It always increases in an isolated system",
    marks: 4,
    negative: 1
  },
  {
    id: 48,
    question: "If ΔH is negative and ΔS is positive, the reaction is:",
    options: [
      "Always spontaneous",
      "Always non-spontaneous",
      "Spontaneous at high temperature",
      "Spontaneous at low temperature"
    ],
    correct: "Always spontaneous",
    marks: 4,
    negative: 1
  },
  {
    id: 49,
    question: "Which property is used to define the temperature scale in Kelvin?",
    options: [
      "Boiling point of water",
      "Melting point of ice",
      "Absolute zero",
      "Triple point of water"
    ],
    correct: "Absolute zero",
    marks: 4,
    negative: 1
  },
  {
    id: 50,
    question: "First law of thermodynamics is a version of:",
    options: [
      "Law of conservation of mass",
      "Law of conservation of energy",
      "Law of entropy",
      "Law of motion"
    ],
    correct: "Law of conservation of energy",
    marks: 4,
    negative: 1
  },
  {
    id: 51,
    question: "At constant pressure, the volume of a gas is directly proportional to its:",
    options: [
      "Pressure",
      "Temperature",
      "Molar mass",
      "Density"
    ],
    correct: "Temperature",
    marks: 4,
    negative: 1
  },
  {
    id: 52,
    question: "Which of the following quantities remains unchanged during an isothermal process?",
    options: [
      "Temperature",
      "Pressure",
      "Volume",
      "Enthalpy"
    ],
    correct: "Temperature",
    marks: 4,
    negative: 1
  },
  {
    id: 53,
    question: "Which gas diffuses faster according to Graham’s law?",
    options: [
      "Hydrogen",
      "Oxygen",
      "Carbon dioxide",
      "Nitrogen"
    ],
    correct: "Hydrogen",
    marks: 4,
    negative: 1
  },
  {
    id: 54,
    question: "The compressibility factor (Z) for an ideal gas is:",
    options: [
      "Greater than 1",
      "Less than 1",
      "Equal to 1",
      "Zero"
    ],
    correct: "Equal to 1",
    marks: 4,
    negative: 1
  },
  {
    id: 55,
    question: "Which gas shows maximum deviation from ideal behavior?",
    options: [
      "Helium",
      "Hydrogen",
      "Ammonia",
      "Neon"
    ],
    correct: "Ammonia",
    marks: 4,
    negative: 1
  },
  {
    id: 56,
    question: "Internal energy of an ideal gas depends only on:",
    options: [
      "Pressure",
      "Volume",
      "Temperature",
      "Entropy"
    ],
    correct: "Temperature",
    marks: 4,
    negative: 1
  },
  {
    id: 57,
    question: "A process in which system returns to its original state is called:",
    options: [
      "Spontaneous",
      "Adiabatic",
      "Reversible",
      "Cyclic"
    ],
    correct: "Cyclic",
    marks: 4,
    negative: 1
  },
  {
    id: 58,
    question: "Which thermodynamic function determines the maximum work done?",
    options: [
      "Entropy",
      "Enthalpy",
      "Internal energy",
      "Gibbs free energy"
    ],
    correct: "Gibbs free energy",
    marks: 4,
    negative: 1
  },
  {
    id: 59,
    question: "If a gas absorbs 300 J of heat and does 100 J of work, what is the change in internal energy?",
    options: [
      "200 J",
      "300 J",
      "100 J",
      "400 J"
    ],
    correct: "200 J",
    marks: 4,
    negative: 1
  },
  {
    id: 60,
    question: "Which law states that entropy of a perfect crystal is zero at absolute zero?",
    options: [
      "First law",
      "Second law",
      "Third law",
      "Zeroth law"
    ],
    correct: "Third law",
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
  doc.text("Exam Results - Chemistry(Periodic Table & Chemical Bonding)", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Chemistry(Periodic Table & Chemical Bonding)</h1>
    
                
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
    
    
    
    
    