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
    id: 301,
    question: "A long straight wire carries a current I. The magnetic field at a distance r from the wire is proportional to:",
    options: [
      "1/r²",
      "1/r",
      "r",
      "r²"
    ],
    correct: "1/r",
    marks: 4,
    negative: 1
  },
  {
    id: 302,
    question: "The direction of magnetic field due to a current-carrying straight conductor can be found using:",
    options: [
      "Fleming’s left-hand rule",
      "Right-hand thumb rule",
      "Ampere’s law",
      "Faraday’s law"
    ],
    correct: "Right-hand thumb rule",
    marks: 4,
    negative: 1
  },
  {
    id: 303,
    question: "A circular coil of radius R carries current I. The magnetic field at its center is proportional to:",
    options: [
      "I/R",
      "IR",
      "I/R²",
      "IR²"
    ],
    correct: "I/R",
    marks: 4,
    negative: 1
  },
  {
    id: 304,
    question: "The SI unit of magnetic field is:",
    options: [
      "Wb",
      "T",
      "A/m",
      "H"
    ],
    correct: "T",
    marks: 4,
    negative: 1
  },
  {
    id: 305,
    question: "A current-carrying conductor experiences a force when placed in a magnetic field. This is the basis of:",
    options: [
      "Electric motor",
      "Transformer",
      "Generator",
      "Inductor"
    ],
    correct: "Electric motor",
    marks: 4,
    negative: 1
  },
  {
    id: 306,
    question: "A proton enters a uniform magnetic field perpendicular to its velocity. Its path will be:",
    options: [
      "Straight line",
      "Circular",
      "Parabolic",
      "Helical"
    ],
    correct: "Circular",
    marks: 4,
    negative: 1
  },
  {
    id: 307,
    question: "Magnitude of force on charge q moving with velocity v in magnetic field B is maximum when angle between v and B is:",
    options: [
      "0°",
      "45°",
      "90°",
      "180°"
    ],
    correct: "90°",
    marks: 4,
    negative: 1
  },
  {
    id: 308,
    question: "A solenoid has N turns per unit length and current I. Magnetic field inside the solenoid is:",
    options: [
      "μ₀NI",
      "μ₀I/N",
      "μ₀N/I",
      "μ₀I"
    ],
    correct: "μ₀NI",
    marks: 4,
    negative: 1
  },
  {
    id: 309,
    question: "The magnetic field inside an ideal solenoid is:",
    options: [
      "Zero",
      "Uniform",
      "Maximum at ends",
      "Non-uniform"
    ],
    correct: "Uniform",
    marks: 4,
    negative: 1
  },
  {
    id: 310,
    question: "Which rule gives direction of force on a current-carrying conductor?",
    options: [
      "Ampere’s rule",
      "Fleming’s left-hand rule",
      "Fleming’s right-hand rule",
      "Faraday’s rule"
    ],
    correct: "Fleming’s left-hand rule",
    marks: 4,
    negative: 1
  },
  {
    id: 311,
    question: "A charged particle moves parallel to a magnetic field. The force on it is:",
    options: [
      "Maximum",
      "Zero",
      "Infinite",
      "Depends on charge"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 312,
    question: "Magnetic field due to a current element is given by:",
    options: [
      "Faraday’s law",
      "Gauss’s law",
      "Biot–Savart law",
      "Coulomb’s law"
    ],
    correct: "Biot–Savart law",
    marks: 4,
    negative: 1
  },
  {
    id: 313,
    question: "A moving coil galvanometer works on:",
    options: [
      "Magnetic force on a current loop",
      "Electrostatic force",
      "Induction",
      "Radiation pressure"
    ],
    correct: "Magnetic force on a current loop",
    marks: 4,
    negative: 1
  },
  {
    id: 314,
    question: "Magnetic field at center of a circular loop depends on:",
    options: [
      "Radius only",
      "Current only",
      "Both radius and current",
      "Neither"
    ],
    correct: "Both radius and current",
    marks: 4,
    negative: 1
  },
  {
    id: 315,
    question: "If the current in a solenoid is doubled, magnetic field inside becomes:",
    options: [
      "Half",
      "Double",
      "No change",
      "Zero"
    ],
    correct: "Double",
    marks: 4,
    negative: 1
  },
  {
    id: 316,
    question: "Magnetic field at a point on the axis of a circular coil decreases with distance as:",
    options: [
      "1/x",
      "1/x²",
      "1/x³",
      "x"
    ],
    correct: "1/x³",
    marks: 4,
    negative: 1
  },
  {
    id: 317,
    question: "The force per unit length between two parallel current-carrying wires is given by:",
    options: [
      "Biot–Savart law",
      "Ampere’s force law",
      "Faraday's law",
      "Ohm's law"
    ],
    correct: "Ampere’s force law",
    marks: 4,
    negative: 1
  },
  {
    id: 318,
    question: "Two parallel wires carry currents in the same direction. They:",
    options: [
      "Repel",
      "Attract",
      "Rotate",
      "Remain unaffected"
    ],
    correct: "Attract",
    marks: 4,
    negative: 1
  },
  {
    id: 319,
    question: "A loop placed in a magnetic field experiences maximum torque when angle between plane of loop and field is:",
    options: [
      "0°",
      "90°",
      "45°",
      "180°"
    ],
    correct: "90°",
    marks: 4,
    negative: 1
  },
  {
    id: 320,
    question: "Magnetic moment of a current loop increases if:",
    options: [
      "Area decreases",
      "Current decreases",
      "Turns increase",
      "None"
    ],
    correct: "Turns increase",
    marks: 4,
    negative: 1
  },
  {
    id: 321,
    question: "A charged particle enters a magnetic field at an angle other than 0° or 90°. Its path is:",
    options: [
      "Circular",
      "Straight",
      "Helical",
      "Zigzag"
    ],
    correct: "Helical",
    marks: 4,
    negative: 1
  },
  {
    id: 322,
    question: "Magnetic field due to a long straight conductor forms:",
    options: [
      "Straight lines",
      "Concentric circles",
      "Parabolas",
      "Ellipses"
    ],
    correct: "Concentric circles",
    marks: 4,
    negative: 1
  },
  {
    id: 323,
    question: "The torque on a magnetic dipole in a magnetic field is:",
    options: [
      "mB",
      "m×B",
      "mB sinθ",
      "mB cosθ"
    ],
    correct: "m×B",
    marks: 4,
    negative: 1
  },
  {
    id: 324,
    question: "Magnetic field inside a toroid is:",
    options: [
      "Zero",
      "Maximum at center",
      "Confined inside core",
      "Uniform everywhere"
    ],
    correct: "Confined inside core",
    marks: 4,
    negative: 1
  },
  {
    id: 325,
    question: "The SI unit of magnetic moment is:",
    options: [
      "A·m²",
      "T·m²",
      "N/T",
      "Wb"
    ],
    correct: "A·m²",
    marks: 4,
    negative: 1
  },
  {
    id: 326,
    question: "Magnetic field inside a long solenoid does NOT depend on:",
    options: [
      "Number of turns",
      "Current",
      "Core material",
      "Radius"
    ],
    correct: "Radius",
    marks: 4,
    negative: 1
  },
  {
    id: 327,
    question: "A current loop in a magnetic field experiences:",
    options: [
      "Only force",
      "Only torque",
      "Both",
      "Neither"
    ],
    correct: "Both",
    marks: 4,
    negative: 1
  },
  {
    id: 328,
    question: "Magnetic field at distance r from center along axis of a loop varies as:",
    options: [
      "1/(r²+R²)^(3/2)",
      "1/r",
      "1/r²",
      "r"
    ],
    correct: "1/(r²+R²)^(3/2)",
    marks: 4,
    negative: 1
  },
  {
    id: 329,
    question: "A conductor of length L carries current I perpendicular to magnetic field B. Force is:",
    options: [
      "BIL sin0",
      "BIL",
      "BIL cos90",
      "Zero"
    ],
    correct: "BIL",
    marks: 4,
    negative: 1
  },
  {
    id: 330,
    question: "The magnetic force on electron and proton moving with same velocity in same magnetic field is:",
    options: [
      "Same magnitude",
      "Greater on electron",
      "Greater on proton",
      "Zero"
    ],
    correct: "Same magnitude",
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
    
    
    
    
    