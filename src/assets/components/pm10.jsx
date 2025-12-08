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
    id: 271,
    question: "The drift velocity of electrons in a conductor is proportional to:",
    options: [
      "Current",
      "Resistance",
      "Potential difference",
      "Electron charge"
    ],
    correct: "Current",
    marks: 4,
    negative: 1
  },
  {
    id: 272,
    question: "Ohm’s law is valid when:",
    options: [
      "Temperature remains constant",
      "Temperature varies",
      "Current is large",
      "Material is non-ohmic"
    ],
    correct: "Temperature remains constant",
    marks: 4,
    negative: 1
  },
  {
    id: 273,
    question: "The SI unit of resistivity is:",
    options: [
      "ohm",
      "ohm-m",
      "ohm/m",
      "ohm-m²"
    ],
    correct: "ohm-m",
    marks: 4,
    negative: 1
  },
  {
    id: 274,
    question: "A wire of length L is stretched to twice its length. Its resistance becomes:",
    options: [
      "R/2",
      "2R",
      "4R",
      "R"
    ],
    correct: "4R",
    marks: 4,
    negative: 1
  },
  {
    id: 275,
    question: "Which graph represents Ohmic behavior?",
    options: [
      "Parabolic V-I",
      "Linear V-I",
      "Exponential V-I",
      "Hyperbolic V-I"
    ],
    correct: "Linear V-I",
    marks: 4,
    negative: 1
  },
  {
    id: 276,
    question: "The current through a resistor is doubled. Power dissipated becomes:",
    options: [
      "P/2",
      "P",
      "2P",
      "4P"
    ],
    correct: "4P",
    marks: 4,
    negative: 1
  },
  {
    id: 277,
    question: "Kirchhoff’s current law is based on:",
    options: [
      "Conservation of energy",
      "Conservation of charge",
      "Conservation of momentum",
      "Conservation of mass"
    ],
    correct: "Conservation of charge",
    marks: 4,
    negative: 1
  },
  {
    id: 278,
    question: "Equivalent resistance of two resistors in parallel is:",
    options: [
      "Greater than largest",
      "Less than smallest",
      "Sum of resistances",
      "Product of resistances"
    ],
    correct: "Less than smallest",
    marks: 4,
    negative: 1
  },
  {
    id: 279,
    question: "A battery of emf E and internal resistance r gives maximum power to a load when:",
    options: [
      "R = 0",
      "R = r",
      "R → ∞",
      "R = 2r"
    ],
    correct: "R = r",
    marks: 4,
    negative: 1
  },
  {
    id: 280,
    question: "Current through a conductor is inversely proportional to:",
    options: [
      "Resistivity",
      "Voltage",
      "Charge density",
      "Drift velocity"
    ],
    correct: "Resistivity",
    marks: 4,
    negative: 1
  },
  {
    id: 281,
    question: "Conductance is:",
    options: [
      "Reciprocal of resistance",
      "Product of R and V",
      "Proportional to resistivity",
      "None"
    ],
    correct: "Reciprocal of resistance",
    marks: 4,
    negative: 1
  },
  {
    id: 282,
    question: "Current density J is given by:",
    options: [
      "J = σV",
      "J = I/A",
      "J = AV",
      "J = ρI"
    ],
    correct: "J = I/A",
    marks: 4,
    negative: 1
  },
  {
    id: 283,
    question: "A copper wire and iron wire of same length and radius are connected in series. The current is:",
    options: [
      "Same in both",
      "More in copper",
      "More in iron",
      "Zero in iron"
    ],
    correct: "Same in both",
    marks: 4,
    negative: 1
  },
  {
    id: 284,
    question: "Resistivity of a semiconductor:",
    options: [
      "Increases with temperature",
      "Decreases with temperature",
      "Constant",
      "Zero"
    ],
    correct: "Decreases with temperature",
    marks: 4,
    negative: 1
  },
  {
    id: 285,
    question: "A voltmeter is connected in:",
    options: [
      "Series",
      "Parallel",
      "Either",
      "Depends"
    ],
    correct: "Parallel",
    marks: 4,
    negative: 1
  },
  {
    id: 286,
    question: "What happens to resistance if temperature increases for a metallic conductor?",
    options: [
      "Decreases",
      "Increases",
      "Remains same",
      "Zero"
    ],
    correct: "Increases",
    marks: 4,
    negative: 1
  },
  {
    id: 287,
    question: "Internal resistance of a cell increases when:",
    options: [
      "Temperature decreases",
      "Electrolyte concentration increases",
      "Plate area increases",
      "Distance between plates decreases"
    ],
    correct: "Temperature decreases",
    marks: 4,
    negative: 1
  },
  {
    id: 288,
    question: "Electric power is given by:",
    options: [
      "VI",
      "IR",
      "V/R",
      "1/IR"
    ],
    correct: "VI",
    marks: 4,
    negative: 1
  },
  {
    id: 289,
    question: "The slope of V–I graph gives:",
    options: [
      "Power",
      "Resistance",
      "Current density",
      "Resistivity"
    ],
    correct: "Resistance",
    marks: 4,
    negative: 1
  },
  {
    id: 290,
    question: "The heating effect of current is due to:",
    options: [
      "Drift velocity",
      "Collisions of electrons with ions",
      "Voltage drop",
      "Resistance"
    ],
    correct: "Collisions of electrons with ions",
    marks: 4,
    negative: 1
  },
  {
    id: 291,
    question: "In a conductor, electrons move:",
    options: [
      "Randomly with zero drift",
      "Only due to drift",
      "Opposite to electric field",
      "Along electric field"
    ],
    correct: "Opposite to electric field",
    marks: 4,
    negative: 1
  },
  {
    id: 292,
    question: "Wheatstone bridge is balanced when:",
    options: [
      "No current in galvanometer",
      "Sum of currents equal",
      "Potential equal",
      "Resistances equal"
    ],
    correct: "No current in galvanometer",
    marks: 4,
    negative: 1
  },
  {
    id: 293,
    question: "Resistivity depends on:",
    options: [
      "Length",
      "Area",
      "Material",
      "Temperature only"
    ],
    correct: "Material",
    marks: 4,
    negative: 1
  },
  {
    id: 294,
    question: "The emf of a cell is:",
    options: [
      "Work done per unit charge",
      "Power per charge",
      "Force per charge",
      "Charge per volt"
    ],
    correct: "Work done per unit charge",
    marks: 4,
    negative: 1
  },
  {
    id: 295,
    question: "A fuse works on the principle of:",
    options: [
      "Magnetic effect",
      "Chemical effect",
      "Heating effect",
      "Photoelectric effect"
    ],
    correct: "Heating effect",
    marks: 4,
    negative: 1
  },
  {
    id: 296,
    question: "The unit of current is:",
    options: [
      "Volt",
      "Coulomb",
      "Ampere",
      "Ohm"
    ],
    correct: "Ampere",
    marks: 4,
    negative: 1
  },
  {
    id: 297,
    question: "Which material has lowest resistivity?",
    options: [
      "Silver",
      "Copper",
      "Nichrome",
      "Iron"
    ],
    correct: "Silver",
    marks: 4,
    negative: 1
  },
  {
    id: 298,
    question: "Superconductors have resistivity:",
    options: [
      "High",
      "Zero",
      "Infinite",
      "Constant"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 299,
    question: "Resistance of a wire is doubled when:",
    options: [
      "Length doubled",
      "Area doubled",
      "Resistivity halved",
      "Temperature decreased"
    ],
    correct: "Length doubled",
    marks: 4,
    negative: 1
  },
  {
    id: 300,
    question: "Which of the following is non-ohmic?",
    options: [
      "Copper wire",
      "Graphite",
      "Nichrome",
      "LED"
    ],
    correct: "LED",
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
    
    
    
    
    