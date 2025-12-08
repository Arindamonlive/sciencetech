import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function PhysicsExamPage() {
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
    
    const questions = [
  {
    id: 211,
    question: "The Zeroth Law of Thermodynamics establishes the concept of:",
    options: [
      "Internal energy",
      "Temperature",
      "Heat capacity",
      "Entropy"
    ],
    correct: "Temperature",
     marks: 4,
    negative: 1
  },
  {
    id: 212,
    question: "If no heat enters or leaves a system during a process, the process is called:",
    options: [
      "Isothermal",
      "Adiabatic",
      "Isochoric",
      "Isobaric"
    ],
    correct: "Adiabatic",
     marks: 4,
    negative: 1
  },
  {
    id: 213,
    question: "In an isothermal process for an ideal gas, the internal energy change (ΔU) is:",
    options: [
      "Zero",
      "Positive",
      "Negative",
      "Infinite"
    ],
    correct: "Zero",
     marks: 4,
    negative: 1
  },
  {
    id: 214,
    question: "The work done during an isothermal expansion of an ideal gas is given by:",
    options: [
      "W = nRT",
      "W = nRT ln(V2/V1)",
      "W = nR(T2−T1)",
      "W = PΔV"
    ],
    correct: "W = nRT ln(V2/V1)",
     marks: 4,
    negative: 1
  },
  {
    id: 215,
    question: "The First Law of Thermodynamics is a statement of:",
    options: [
      "Conservation of mass",
      "Conservation of momentum",
      "Conservation of energy",
      "Conservation of charge"
    ],
    correct: "Conservation of energy",
     marks: 4,
    negative: 1
  },
  {
    id: 216,
    question: "For an adiabatic process, PV^γ = constant. Here γ is:",
    options: [
      "Cp/Cv",
      "Cv/Cp",
      "Cp−Cv",
      "1/(Cp−Cv)"
    ],
    correct: "Cp/Cv",
     marks: 4,
    negative: 1
  },
  {
    id: 217,
    question: "The efficiency of a Carnot engine depends on:",
    options: [
      "Nature of working substance",
      "Temperatures of source and sink",
      "Pressure difference",
      "Type of gas used"
    ],
    correct: "Temperatures of source and sink",
     marks: 4,
    negative: 1
  },
  {
    id: 218,
    question: "In an adiabatic expansion of an ideal gas:",
    options: [
      "Temperature increases",
      "Temperature decreases",
      "Temperature remains constant",
      "Temperature becomes zero"
    ],
    correct: "Temperature decreases",
     marks: 4,
    negative: 1
  },
  {
    id: 219,
    question: "A cyclic process obeying the First Law must satisfy:",
    options: [
      "ΔU = 0",
      "ΔQ = 0",
      "ΔW = 0",
      "ΔS = 0"
    ],
    correct: "ΔU = 0",
     marks: 4,
    negative: 1
  },
  {
    id: 220,
    question: "The SI unit of heat is:",
    options: [
      "Calorie",
      "Joule",
      "Erg",
      "Watt"
    ],
    correct: "Joule",
     marks: 4,
    negative: 1
  },
  {
    id: 221,
    question: "The internal energy of an ideal gas depends only on:",
    options: [
      "Volume",
      "Pressure",
      "Temperature",
      "Mass"
    ],
    correct: "Temperature",
     marks: 4,
    negative: 1
  },
  {
    id: 222,
    question: "In an isochoric process, the work done is:",
    options: [
      "Maximum",
      "Minimum",
      "Zero",
      "Infinite"
    ],
    correct: "Zero",
     marks: 4,
    negative: 1
  },
  {
    id: 223,
    question: "The efficiency of a Carnot engine operating between 500 K and 300 K is:",
    options: [
      "0.4",
      "0.6",
      "0.2",
      "0.8"
    ],
    correct: "0.4",
     marks: 4,
    negative: 1
  },
  {
    id: 224,
    question: "The ratio of Cp to Cv for a monoatomic ideal gas is:",
    options: [
      "1.33",
      "1.4",
      "1.67",
      "1.2"
    ],
    correct: "1.67",
     marks: 4,
    negative: 1
  },
  {
    id: 225,
    question: "For a cyclic process, the net work done is equal to:",
    options: [
      "ΔU",
      "ΔQ",
      "Area enclosed on P–V diagram",
      "Zero"
    ],
    correct: "Area enclosed on P–V diagram",
     marks: 4,
    negative: 1
  },
  {
    id: 226,
    question: "The Second Law of Thermodynamics introduces the concept of:",
    options: [
      "Heat",
      "Work",
      "Entropy",
      "Temperature"
    ],
    correct: "Entropy",
     marks: 4,
    negative: 1
  },
  {
    id: 227,
    question: "For a reversible process, the change in entropy is:",
    options: [
      "Positive",
      "Negative",
      "Zero",
      "Infinite"
    ],
    correct: "Zero",
     marks: 4,
    negative: 1
  },
  {
    id: 228,
    question: "Which of the following is a state function?",
    options: [
      "Work",
      "Heat",
      "Entropy",
      "Path length"
    ],
    correct: "Entropy",
     marks: 4,
    negative: 1
  },
  {
    id: 229,
    question: "The efficiency of a Carnot refrigerator is given by:",
    options: [
      "T2/(T1−T2)",
      "(T1−T2)/T1",
      "T1/(T1−T2)",
      "T1/T2"
    ],
    correct: "T2/(T1−T2)",
     marks: 4,
    negative: 1
  },
  {
    id: 230,
    question: "Work done in an isobaric process is given by:",
    options: [
      "W = PΔV",
      "W = nRT ln(V2/V1)",
      "W = 0",
      "W = nCvΔT"
    ],
    correct: "W = PΔV",
     marks: 4,
    negative: 1
  },
  {
    id: 231,
    question: "The First Law of Thermodynamics in differential form is:",
    options: [
      "dQ = dU + dW",
      "dQ = dW + PdV",
      "dQ = dU − dW",
      "dU = dQ − dW"
    ],
    correct: "dU = dQ − dW",
     marks: 4,
    negative: 1
  },
  {
    id: 232,
    question: "The unit of specific heat in SI is:",
    options: [
      "J/kg·K",
      "cal/g·K",
      "erg/g·K",
      "W/kg"
    ],
    correct: "J/kg·K",
     marks: 4,
    negative: 1
  },
  {
    id: 233,
    question: "For a Carnot engine, as the sink temperature decreases, its efficiency:",
    options: [
      "Increases",
      "Decreases",
      "Remains constant",
      "Becomes zero"
    ],
    correct: "Increases",
     marks: 4,
    negative: 1
  },
  {
    id: 234,
    question: "The process in which pressure remains constant is:",
    options: [
      "Isothermal",
      "Isochoric",
      "Isobaric",
      "Adiabatic"
    ],
    correct: "Isobaric",
     marks: 4,
    negative: 1
  },
  {
    id: 235,
    question: "The slope of an adiabatic curve for an ideal gas on P–V diagram is:",
    options: [
      "Greater than that of isothermal",
      "Less than isothermal",
      "Equal to isothermal",
      "Zero"
    ],
    correct: "Greater than that of isothermal",
     marks: 4,
    negative: 1
  },
  {
    id: 236,
    question: "Heat capacity at constant volume is related to the change in:",
    options: [
      "Pressure",
      "Volume",
      "Internal energy",
      "Enthalpy"
    ],
    correct: "Internal energy",
     marks: 4,
    negative: 1
  },
  {
    id: 237,
    question: "The ratio of work done in isothermal expansion to that in adiabatic expansion is:",
    options: [
      "1",
      ">1",
      "<1",
      "0"
    ],
    correct: ">1",
     marks: 4,
    negative: 1
  },
  {
    id: 238,
    question: "The device that converts heat energy into mechanical work is called:",
    options: [
      "Heat pump",
      "Refrigerator",
      "Heat engine",
      "Compressor"
    ],
    correct: "Heat engine",
     marks: 4,
    negative: 1
  },
  {
    id: 239,
    question: "In a reversible cyclic process, the total change in internal energy is:",
    options: [
      "Maximum",
      "Minimum",
      "Zero",
      "Constant"
    ],
    correct: "Zero",
     marks: 4,
    negative: 1
  },
  {
    id: 240,
    question: "The coefficient of performance (COP) of a refrigerator is:",
    options: [
      "Heat rejected/Work done",
      "Heat absorbed/Work done",
      "Work done/Heat absorbed",
      "Temperature ratio"
    ],
    correct: "Heat absorbed/Work done",
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
  doc.text("Exam Results - Physics(Rotational Motions)", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Physics(Rotational Motions)</h1>
    
                
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
    
    
    
    
    