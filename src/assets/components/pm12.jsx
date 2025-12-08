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
    id: 331,
    question: "The induced emf in a moving conductor in a magnetic field does not depend on:",
    options: [
      "Velocity of conductor",
      "Magnetic flux density",
      "Resistance of circuit",
      "Length of conductor"
    ],
    correct: "Resistance of circuit",
    marks: 4,
    negative: 1
  },
  {
    id: 332,
    question: "If magnetic flux linked with a coil changes at a rate of $2 \\text{ Wb/s}$, the emf induced is:",
    options: [
      "0 V",
      "1 V",
      "2 V",
      "4 V"
    ],
    correct: "2 V",
    marks: 4,
    negative: 1
  },
  {
    id: 333,
    question: "Mutual inductance depends on:",
    options: [
      "Geometry of coils",
      "Distance between coils",
      "Medium between coils",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 334,
    question: "Eddy currents are produced when:",
    options: [
      "A conductor is placed in changing magnetic flux",
      "A conductor moves in constant magnetic field",
      "Current flows in open circuit",
      "None"
    ],
    correct: "A conductor is placed in changing magnetic flux",
    marks: 4,
    negative: 1
  },
  {
    id: 335,
    question: "The EMF induced in a coil of N turns due to change of flux $\\Delta\\phi$ in time $\\Delta t$ is:",
    options: [
      "N $\\Delta\\phi/\\Delta t$",
      "$\\Delta\\phi/\\Delta t$",
      "N$\\phi$",
      "N/$\\phi$"
    ],
    correct: "N $\\Delta\\phi/\\Delta t$",
    marks: 4,
    negative: 1
  },
  {
    id: 336,
    question: "A $220 \\text{ V}$, $50 \\text{ Hz}$ AC supply is applied to a pure resistor of $100 \\text{ Ω}$. The rms current is:",
    options: [
      "$1.1 \\text{ A}$",
      "$2.2 \\text{ A}$",
      "$3.3 \\text{ A}$",
      "$4.4 \\text{ A}$"
    ],
    correct: "$2.2 \\text{ A}$",
    marks: 4,
    negative: 1
  },
  {
    id: 337,
    question: "The peak value of a sinusoidal emf having rms value $200 \\text{ V}$ is:",
    options: [
      "$141 \\text{ V}$",
      "$200 \\text{ V}$",
      "$282 \\text{ V}$",
      "$400 \\text{ V}$"
    ],
    correct: "$282 \\text{ V}$",
    marks: 4,
    negative: 1
  },
  {
    id: 338,
    question: "The phase difference between emf and current in a purely inductive AC circuit is:",
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
    id: 339,
    question: "In a purely resistive circuit, the average power is:",
    options: [
      "VI $\\cos\\phi$",
      "0",
      "VI",
      "Infinite"
    ],
    correct: "VI",
    marks: 4,
    negative: 1
  },
  {
    id: 340,
    question: "A choke coil is preferred to a resistance in AC circuits because:",
    options: [
      "It reduces power loss",
      "It increases current",
      "It decreases inductance",
      "It increases resistance"
    ],
    correct: "It reduces power loss",
    marks: 4,
    negative: 1
  },
  {
    id: 341,
    question: "The reactance of an inductor is proportional to:",
    options: [
      "Current",
      "Frequency",
      "Voltage",
      "Resistance"
    ],
    correct: "Frequency",
    marks: 4,
    negative: 1
  },
  {
    id: 342,
    question: "The reactance of a capacitor is inversely proportional to:",
    options: [
      "Frequency",
      "Voltage",
      "Current",
      "Resistance"
    ],
    correct: "Frequency",
    marks: 4,
    negative: 1
  },
  {
    id: 343,
    question: "The instantaneous value of an AC is given by $i = 10 \\sin (100\\pi t)$. Its frequency is:",
    options: [
      "$25 \\text{ Hz}$",
      "$50 \\text{ Hz}$",
      "$100 \\text{ Hz}$",
      "$200 \\text{ Hz}$"
    ],
    correct: "$50 \\text{ Hz}$",
    marks: 4,
    negative: 1
  },
  {
    id: 344,
    question: "In an RLC series circuit at resonance, the impedance is equal to:",
    options: [
      "$X_L$",
      "$X_C$",
      "R",
      "$\\sqrt{X_L^2 + R^2}$"
    ],
    correct: "R",
    marks: 4,
    negative: 1
  },
  {
    id: 345,
    question: "At resonance, the current in an RLC circuit is:",
    options: [
      "Minimum",
      "Maximum",
      "Zero",
      "Independent of R"
    ],
    correct: "Maximum",
    marks: 4,
    negative: 1
  },
  {
    id: 346,
    question: "In a transformer, power losses occur due to:",
    options: [
      "Eddy currents",
      "Hysteresis",
      "Copper loss",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 347,
    question: "If the number of turns in the primary coil of a transformer is double that of the secondary, then:",
    options: [
      "It is a step-up transformer",
      "Step-down transformer",
      "No change in voltage",
      "Zero efficiency"
    ],
    correct: "Step-down transformer",
    marks: 4,
    negative: 1
  },
  {
    id: 348,
    question: "The efficiency of an ideal transformer is:",
    options: [
      "0%",
      "50%",
      "100%",
      "Cannot be determined"
    ],
    correct: "100%",
    marks: 4,
    negative: 1
  },
  {
    id: 349,
    question: "The average power consumed in an R-L circuit is:",
    options: [
      "VI $\\cos\\phi$",
      "VI $\\sin\\phi$",
      "VI $\\tan\\phi$",
      "Zero"
    ],
    correct: "VI $\\cos\\phi$",
    marks: 4,
    negative: 1
  },
  {
    id: 350,
    question: "In an AC circuit, the current is given by $i = I_0 \\cos (\\omega t + \\pi/3)$. The phase difference between voltage and current is:",
    options: [
      "$\\pi/6$",
      "$\\pi/3$",
      "$\\pi/2$",
      "$\\pi$"
    ],
    correct: "$\\pi/3$",
    marks: 4,
    negative: 1
  },
  {
    id: 351,
    question: "The unit of reactance is:",
    options: [
      "Volt",
      "Ampere",
      "Ohm",
      "Tesla"
    ],
    correct: "Ohm",
    marks: 4,
    negative: 1
  },
  {
    id: 352,
    question: "The rms value of current in the circuit $i = 5 \\sin(314t)$ is:",
    options: [
      "$5 \\text{ A}$",
      "$3.54 \\text{ A}$",
      "$2.5 \\text{ A}$",
      "$10 \\text{ A}$"
    ],
    correct: "$3.54 \\text{ A}$",
    marks: 4,
    negative: 1
  },
  {
    id: 353,
    question: "The EMF induced in a coil rotating in a uniform magnetic field is maximum when:",
    options: [
      "Plane of coil parallel to field",
      "Plane of coil perpendicular to field",
      "Axis of coil perpendicular to field",
      "None"
    ],
    correct: "Plane of coil parallel to field",
    marks: 4,
    negative: 1
  },
  {
    id: 354,
    question: "The average value of AC over half cycle is:",
    options: [
      "0",
      "$0.637 I_0$",
      "$0.707 I_0$",
      "$I_0$"
    ],
    correct: "$0.637 I_0$",
    marks: 4,
    negative: 1
  },
  {
    id: 355,
    question: "In an AC circuit, the apparent power is given by:",
    options: [
      "VI",
      "VI $\\cos\\phi$",
      "VI $\\sin\\phi$",
      "Zero"
    ],
    correct: "VI",
    marks: 4,
    negative: 1
  },
  {
    id: 356,
    question: "Power factor of an ideal capacitor is:",
    options: [
      "0",
      "1",
      "$\\infty$",
      "-1"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 357,
    question: "Power factor of an ideal inductor is:",
    options: [
      "0",
      "1",
      "$\\infty$",
      "-1"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 358,
    question: "In AC, the net displacement of charge over a full cycle is:",
    options: [
      "Maximum",
      "Half maximum",
      "Zero",
      "Infinite"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 359,
    question: "In a transformer, if the secondary coil has thrice the turns of primary, then $V_s/V_p$ is:",
    options: [
      "1/3",
      "3",
      "1",
      "9"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 360,
    question: "The average value of sinusoidal emf with peak value $E_0$ over half cycle is:",
    options: [
      "0",
      "$(2E_0/\\pi)$",
      "$(E_0/\\sqrt{2})$",
      "$E_0$"
    ],
    correct: "$(2E_0/\\pi)$",
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
    
    
    
    
    