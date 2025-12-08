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
    id: 241,
    question: "The SI unit of electric charge is:",
    options: [
      "Coulomb",
      "Volt",
      "Farad",
      "Ohm"
    ],
    correct: "Coulomb",
    marks: 4,
    negative: 1
  },
  {
    id: 242,
    question: "The force between two point charges in vacuum is inversely proportional to:",
    options: [
      "Product of charges",
      "Square of distance between them",
      "Distance between them",
      "Cube of distance between them"
    ],
    correct: "Square of distance between them",
    marks: 4,
    negative: 1
  },
  {
    id: 243,
    question: "Electric field due to a point charge varies as:",
    options: [
      "1/r",
      "1/r²",
      "1/r³",
      "r"
    ],
    correct: "1/r²",
    marks: 4,
    negative: 1
  },
  {
    id: 244,
    question: "The electric potential at a point due to a point charge is proportional to:",
    options: [
      "1/r",
      "1/r²",
      "r",
      "r²"
    ],
    correct: "1/r",
    marks: 4,
    negative: 1
  },
  {
    id: 245,
    question: "A positive test charge is moved against an electric field. The potential energy of the charge will:",
    options: [
      "Decrease",
      "Increase",
      "Remain same",
      "Become zero"
    ],
    correct: "Increase",
    marks: 4,
    negative: 1
  },
  {
    id: 246,
    question: "The lines of force due to a point charge are:",
    options: [
      "Circular",
      "Straight lines",
      "Parabolic",
      "Elliptical"
    ],
    correct: "Straight lines",
    marks: 4,
    negative: 1
  },
  {
    id: 247,
    question: "The flux through a closed surface due to a charge outside the surface is:",
    options: [
      "Zero",
      "Infinite",
      "Depends on shape",
      "Positive"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 248,
    question: "Electric field inside a conductor is:",
    options: [
      "Zero",
      "Infinite",
      "Constant",
      "Variable"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 249,
    question: "The total electric flux through a closed surface enclosing charge q is:",
    options: [
      "q/ε₀",
      "qε₀",
      "q²/ε₀",
      "Zero"
    ],
    correct: "q/ε₀",
    marks: 4,
    negative: 1
  },
  {
    id: 250,
    question: "The work done in moving a unit positive charge from one point to another in an electric field is called:",
    options: [
      "Electric potential",
      "Electric field",
      "Electric current",
      "Capacitance"
    ],
    correct: "Electric potential",
    marks: 4,
    negative: 1
  },
  {
    id: 251,
    question: "The potential at the center of a uniformly charged ring is:",
    options: [
      "Zero",
      "Infinite",
      "Constant",
      "Depends on radius"
    ],
    correct: "Constant",
    marks: 4,
    negative: 1
  },
  {
    id: 252,
    question: "The direction of electric field at a point is the direction of:",
    options: [
      "Force on a positive test charge",
      "Force on a negative test charge",
      "Potential gradient",
      "Dipole moment"
    ],
    correct: "Force on a positive test charge",
    marks: 4,
    negative: 1
  },
  {
    id: 253,
    question: "The electric potential difference between two points is zero if:",
    options: [
      "They lie on the same equipotential surface",
      "They are at different potentials",
      "Field is zero",
      "None of these"
    ],
    correct: "They lie on the same equipotential surface",
    marks: 4,
    negative: 1
  },
  {
    id: 254,
    question: "The electric dipole moment is a:",
    options: [
      "Scalar",
      "Vector",
      "Tensor",
      "Dimensionless quantity"
    ],
    correct: "Vector",
    marks: 4,
    negative: 1
  },
  {
    id: 255,
    question: "The field at a distant point on axial line of a dipole varies as:",
    options: [
      "1/r²",
      "1/r³",
      "1/r⁴",
      "r"
    ],
    correct: "1/r³",
    marks: 4,
    negative: 1
  },
  {
    id: 256,
    question: "The capacitance of a parallel plate capacitor increases if:",
    options: [
      "Distance between plates increases",
      "Area of plates decreases",
      "Dielectric constant increases",
      "None"
    ],
    correct: "Dielectric constant increases",
    marks: 4,
    negative: 1
  },
  {
    id: 257,
    question: "The energy stored in a capacitor is:",
    options: [
      "½CV²",
      "CV",
      "QV",
      "½QV²"
    ],
    correct: "½CV²",
    marks: 4,
    negative: 1
  },
  {
    id: 258,
    question: "The equivalent capacitance of two capacitors C₁ and C₂ in series is:",
    options: [
      "C₁ + C₂",
      "(C₁C₂)/(C₁ + C₂)",
      "C₁ - C₂",
      "(C₁ + C₂)/2"
    ],
    correct: "(C₁C₂)/(C₁ + C₂)",
    marks: 4,
    negative: 1
  },
  {
    id: 259,
    question: "The potential due to an electric dipole at a point on its equatorial line is:",
    options: [
      "Zero",
      "Maximum",
      "Minimum",
      "Infinite"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 260,
    question: "The dimension of permittivity ε₀ is:",
    options: [
      "M⁻¹L⁻³T⁴A²",
      "M⁻¹L⁻³T⁴A²",
      "M⁻¹L⁻³T⁴A²",
      "M⁻¹L⁻³T⁴A²"
    ],
    correct: "M⁻¹L⁻³T⁴A²",
    marks: 4,
    negative: 1
  },
  {
    id: 261,
    question: "Coulomb’s law in vector form is:",
    options: [
      "F = (1/4πε₀)(q₁q₂/r²)r̂",
      "F = qE",
      "F = qvB",
      "F = ma"
    ],
    correct: "F = (1/4πε₀)(q₁q₂/r²)r̂",
    marks: 4,
    negative: 1
  },
  {
    id: 262,
    question: "The potential at a point due to a dipole depends on:",
    options: [
      "Distance only",
      "Dipole moment and angle",
      "Angle only",
      "None"
    ],
    correct: "Dipole moment and angle",
    marks: 4,
    negative: 1
  },
  {
    id: 263,
    question: "The electric flux through a closed surface depends on:",
    options: [
      "Electric field lines crossing it",
      "Charge enclosed",
      "Both A and B",
      "None"
    ],
    correct: "Charge enclosed",
    marks: 4,
    negative: 1
  },
  {
    id: 264,
    question: "The unit of electric field is:",
    options: [
      "N/C",
      "V/m",
      "Both A and B",
      "J/C"
    ],
    correct: "Both A and B",
    marks: 4,
    negative: 1
  },
  {
    id: 265,
    question: "A conductor has:",
    options: [
      "Free electrons",
      "Bound electrons",
      "Positive ions only",
      "None"
    ],
    correct: "Free electrons",
    marks: 4,
    negative: 1
  },
  {
    id: 266,
    question: "The potential inside a charged spherical conductor is:",
    options: [
      "Constant",
      "Zero",
      "Varies as 1/r²",
      "Infinite"
    ],
    correct: "Constant",
    marks: 4,
    negative: 1
  },
  {
    id: 267,
    question: "A capacitor of capacitance C is charged to potential V. The energy stored is:",
    options: [
      "½CV²",
      "CV",
      "V²/C",
      "Q²V"
    ],
    correct: "½CV²",
    marks: 4,
    negative: 1
  },
  {
    id: 268,
    question: "If distance between two charges is doubled, force between them becomes:",
    options: [
      "Half",
      "One-fourth",
      "Double",
      "Four times"
    ],
    correct: "One-fourth",
    marks: 4,
    negative: 1
  },
  {
    id: 269,
    question: "The electric potential due to a point charge at infinity is taken as:",
    options: [
      "Zero",
      "Infinite",
      "One",
      "Undefined"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 270,
    question: "The unit of electric flux is:",
    options: [
      "N·m²/C",
      "C/m²",
      "V/m",
      "J/C"
    ],
    correct: "N·m²/C",
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
    
    
    
    
    