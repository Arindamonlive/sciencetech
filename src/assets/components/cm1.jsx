import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function CM1() {
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
    id: 1,
    question: "Which of the following is not a postulate of Dalton’s atomic theory?",
    options: [
      "Atoms are indivisible",
      "Atoms of the same element are identical",
      "Atoms can be created or destroyed in chemical reactions",
      "Compounds are formed by combination of atoms"
    ],
    correct: "Atoms can be created or destroyed in chemical reactions",
    marks: 4,
    negative: 1
  },
  {
    id: 2,
    question: "The SI unit of amount of substance is:",
    options: [
      "Mole",
      "Gram",
      "Kilogram",
      "Litre"
    ],
    correct: "Mole",
    marks: 4,
    negative: 1
  },
  {
    id: 3,
    question: "1 mole of a substance contains how many particles?",
    options: [
      "3.011 × 10²²",
      "6.022 × 10²³",
      "9.1 × 10⁻³¹",
      "1.6 × 10⁻¹⁹"
    ],
    correct: "6.022 × 10²³",
    marks: 4,
    negative: 1
  },
  {
    id: 4,
    question: "Atomic number is equal to the number of:",
    options: [
      "Neutrons",
      "Protons",
      "Electrons",
      "Protons and electrons"
    ],
    correct: "Protons",
    marks: 4,
    negative: 1
  },
  {
    id: 5,
    question: "Mass number is equal to:",
    options: [
      "Number of protons",
      "Number of neutrons",
      "Number of protons + neutrons",
      "Number of electrons"
    ],
    correct: "Number of protons + neutrons",
    marks: 4,
    negative: 1
  },
  {
    id: 6,
    question: "Which subatomic particle has no charge?",
    options: [
      "Electron",
      "Proton",
      "Neutron",
      "Positron"
    ],
    correct: "Neutron",
    marks: 4,
    negative: 1
  },
  {
    id: 7,
    question: "Isotopes have:",
    options: [
      "Same atomic number, different mass number",
      "Same number of neutrons",
      "Different atomic number",
      "Same mass number"
    ],
    correct: "Same atomic number, different mass number",
    marks: 4,
    negative: 1
  },
  {
    id: 8,
    question: "Which of the following is Avogadro's number?",
    options: [
      "6.022 × 10²²",
      "3.011 × 10²³",
      "6.022 × 10²³",
      "1.602 × 10⁻¹⁹"
    ],
    correct: "6.022 × 10²³",
    marks: 4,
    negative: 1
  },
  {
    id: 9,
    question: "Which particle was discovered by J.J. Thomson?",
    options: [
      "Proton",
      "Neutron",
      "Electron",
      "Nucleus"
    ],
    correct: "Electron",
    marks: 4,
    negative: 1
  },
  {
    id: 10,
    question: "Who discovered the nucleus of an atom?",
    options: [
      "J.J. Thomson",
      "Rutherford",
      "Bohr",
      "Dalton"
    ],
    correct: "Rutherford",
    marks: 4,
    negative: 1
  },
  {
    id: 11,
    question: "In Rutherford’s experiment, most alpha particles passed through gold foil because:",
    options: [
      "Atoms are solid",
      "Nucleus is positively charged",
      "Atom is mostly empty space",
      "Electrons are negatively charged"
    ],
    correct: "Atom is mostly empty space",
    marks: 4,
    negative: 1
  },
  {
    id: 12,
    question: "Which rule explains filling of orbitals in increasing energy order?",
    options: [
      "Hund’s Rule",
      "Pauli Exclusion Principle",
      "Aufbau Principle",
      "Octet Rule"
    ],
    correct: "Aufbau Principle",
    marks: 4,
    negative: 1
  },
  {
    id: 13,
    question: "Maximum number of electrons in an orbital is:",
    options: [
      "1",
      "2",
      "4",
      "6"
    ],
    correct: "2",
    marks: 4,
    negative: 1
  },
  {
    id: 14,
    question: "Quantum number 'l' is related to:",
    options: [
      "Size",
      "Shape",
      "Orientation",
      "Spin"
    ],
    correct: "Shape",
    marks: 4,
    negative: 1
  },
  {
    id: 15,
    question: "Number of orbitals in p-subshell is:",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 16,
    question: "Which quantum number denotes the energy level of electron?",
    options: [
      "Principal (n)",
      "Azimuthal (l)",
      "Magnetic (m)",
      "Spin (s)"
    ],
    correct: "Principal (n)",
    marks: 4,
    negative: 1
  },
  {
    id: 17,
    question: "Which of the following is a noble gas configuration?",
    options: [
      "1s² 2s² 2p⁶",
      "1s² 2s² 2p³",
      "1s² 2s² 2p⁴",
      "1s² 2s² 2p⁵"
    ],
    correct: "1s² 2s² 2p⁶",
    marks: 4,
    negative: 1
  },
  {
    id: 18,
    question: "Who proposed the quantization of energy levels in atoms?",
    options: [
      "Rutherford",
      "Bohr",
      "Dalton",
      "Thomson"
    ],
    correct: "Bohr",
    marks: 4,
    negative: 1
  },
  {
    id: 19,
    question: "Which principle states that no two electrons in an atom can have the same set of quantum numbers?",
    options: [
      "Aufbau",
      "Hund’s Rule",
      "Pauli Exclusion Principle",
      "Heisenberg Principle"
    ],
    correct: "Pauli Exclusion Principle",
    marks: 4,
    negative: 1
  },
  {
    id: 20,
    question: "Which orbital will be filled first?",
    options: [
      "3d",
      "4s",
      "4p",
      "3p"
    ],
    correct: "3p",
    marks: 4,
    negative: 1
  },
  {
    id: 21,
    question: "What is the shape of s-orbital?",
    options: [
      "Spherical",
      "Dumb-bell",
      "Double dumb-bell",
      "Complex"
    ],
    correct: "Spherical",
    marks: 4,
    negative: 1
  },
  {
    id: 22,
    question: "The charge-to-mass ratio of electron was determined by:",
    options: [
      "Bohr",
      "Rutherford",
      "Thomson",
      "Millikan"
    ],
    correct: "Thomson",
    marks: 4,
    negative: 1
  },
  {
    id: 23,
    question: "Relative atomic mass is the ratio of mass of atom to:",
    options: [
      "1/12th of C-14 atom",
      "1/12th of C-12 atom",
      "1 mole of atoms",
      "One proton"
    ],
    correct: "1/12th of C-12 atom",
    marks: 4,
    negative: 1
  },
  {
    id: 24,
    question: "Which of the following does not affect the number of moles?",
    options: [
      "Temperature",
      "Mass",
      "Molar mass",
      "Avogadro’s number"
    ],
    correct: "Temperature",
    marks: 4,
    negative: 1
  },
  {
    id: 25,
    question: "The maximum number of electrons in n=2 shell is:",
    options: [
      "2",
      "4",
      "8",
      "18"
    ],
    correct: "8",
    marks: 4,
    negative: 1
  },
  {
    id: 26,
    question: "Which is not a quantum number?",
    options: [
      "Principal",
      "Magnetic",
      "Rotational",
      "Spin"
    ],
    correct: "Rotational",
    marks: 4,
    negative: 1
  },
  {
    id: 27,
    question: "Bohr’s atomic model could not explain:",
    options: [
      "Hydrogen spectrum",
      "Stability of atom",
      "Zeeman effect",
      "Quantization"
    ],
    correct: "Zeeman effect",
    marks: 4,
    negative: 1
  },
  {
    id: 28,
    question: "The formula to calculate number of moles is:",
    options: [
      "mass × molar mass",
      "mass / molar mass",
      "molar mass / mass",
      "mass × volume"
    ],
    correct: "mass / molar mass",
    marks: 4,
    negative: 1
  },
  {
    id: 29,
    question: "The number of electrons in Mg²⁺ is:",
    options: [
      "10",
      "11",
      "12",
      "13"
    ],
    correct: "10",
    marks: 4,
    negative: 1
  },
  {
    id: 30,
    question: "An element has electronic configuration 2, 8, 1. Its valency is:",
    options: [
      "1",
      "2",
      "7",
      "8"
    ],
    correct: "1",
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
  doc.text("Exam Results - Chemistry(Basic Concepts & Atomic Structure)", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Chemistry(Basic Concepts & Atomic Structure)</h1>
    
                
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
    
    
    
    
    