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
    id: 181,
    question: "A particle executes SHM with amplitude 5 cm and frequency 10 Hz. Its maximum velocity is:",
    "options": [
      "50π cm/s",
      "25π cm/s",
      "100 cm/s",
      "200 cm/s"
    ],
    correct: "50π cm/s",
    marks: 4,
    negative: 1
  },
  {
    id: 182,
    question: "The time period of a simple pendulum is doubled when:",
    "options": [
      "its length is doubled",
      "its length is quadrupled",
      "g is halved",
      "g is doubled"
    ],
    correct: "its length is quadrupled",
    marks: 4,
    negative: 1
  },
  {
    id: 183,
    question: "A mass-spring system executes SHM. If the spring constant is k and mass is m, the time period is:",
    "options": [
      "2π√(k/m)",
      "2π√(m/k)",
      "π√(m/k)",
      "√(m/k)"
    ],
    correct: "2π√(m/k)",
    marks: 4,
    negative: 1
  },
  {
    id: 184,
    question: "The energy of a simple harmonic oscillator is proportional to:",
    "options": [
      "A",
      "A²",
      "A³",
      "1/A"
    ],
    correct: "A²",
    marks: 4,
    negative: 1
  },
  {
    id: 185,
    question: "The displacement of a particle in SHM is given by x = 5 sin(2πt + π/4). Its amplitude is:",
    "options": [
      "5",
      "2π",
      "π/4",
      "cannot be determined"
    ],
    correct: "5",
    marks: 4,
    negative: 1
  },
  {
    id: 186,
    question: "Which of the following is not a characteristic of SHM?",
    "options": [
      "Restoring force proportional to displacement",
      "Motion is periodic",
      "Acceleration is constant",
      "Mean position is stable equilibrium"
    ],
    correct: "Acceleration is constant",
    marks: 4,
    negative: 1
  },
  {
    id: 187,
    question: "A particle has maximum velocity 20 m/s and amplitude 0.1 m in SHM. Its angular frequency is:",
    "options": [
      "100 rad/s",
      "200 rad/s",
      "20 rad/s",
      "10 rad/s"
    ],
    correct: "200 rad/s",
    marks: 4,
    negative: 1
  },
  {
    id: 188,
    question: "In SHM, velocity is maximum at:",
    "options": [
      "extreme position",
      "mean position",
      "between mean and extreme",
      "always constant"
    ],
    correct: "mean position",
    marks: 4,
    negative: 1
  },
  {
    id: 189,
    question: "If the total energy of SHM is E, then kinetic energy at displacement x is:",
    "options": [
      "E(1 - x²/A²)",
      "Ex²/A²",
      "Ex/A",
      "E/A²"
    ],
    correct: "E(1 - x²/A²)",
    marks: 4,
    negative: 1
  },
  {
    id: 190,
    question: "The time period of a pendulum on moon ($g = 1/6 g$ on Earth) compared to that on Earth is:",
    "options": [
      "same",
      "√6 times",
      "1/√6 times",
      "6 times"
    ],
    correct: "√6 times",
    marks: 4,
    negative: 1
  },
  {
    id: 191,
    question: "The frequency of a tuning fork is 256 Hz. The wavelength of sound produced in air (velocity = 340 m/s) is:",
    "options": [
      "1.33 m",
      "0.75 m",
      "2.65 m",
      "0.50 m"
    ],
    correct: "1.33 m",
    marks: 4,
    negative: 1
  },
  {
    id: 192,
    question: "The fundamental frequency of a closed organ pipe of length 85 cm (velocity of sound = 340 m/s) is:",
    "options": [
      "100 Hz",
      "200 Hz",
      "400 Hz",
      "50 Hz"
    ],
    correct: "100 Hz",
    marks: 4,
    negative: 1
  },
  {
    id: 193,
    question: "The beat frequency between two tuning forks of frequencies 256 Hz and 260 Hz is:",
    "options": [
      "256 Hz",
      "260 Hz",
      "4 Hz",
      "2 Hz"
    ],
    correct: "4 Hz",
    marks: 4,
    negative: 1
  },
  {
    id: 194,
    question: "A progressive wave is given by y = 0.02 sin(2πt – 0.5x). The wavelength is:",
    "options": [
      "2π m",
      "4π m",
      "12.56 m",
      "none of these"
    ],
    correct: "12.56 m",
    marks: 4,
    negative: 1
  },
  {
    id: 195,
    question: "The velocity of a transverse wave on a stretched string increases if:",
    "options": [
      "mass per unit length increases",
      "tension increases",
      "both tension and mass per unit length increase",
      "none"
    ],
    correct: "tension increases",
    marks: 4,
    negative: 1
  },
  {
    id: 196,
    question: "In a stationary wave, the distance between two consecutive nodes is:",
    "options": [
      "λ",
      "λ/4",
      "λ/2",
      "2λ"
    ],
    correct: "λ/2",
    marks: 4,
    negative: 1
  },
  {
    id: 197,
    question: "If two identical waves superimpose in phase, the resultant amplitude is:",
    "options": [
      "A",
      "2A",
      "√2 A",
      "0"
    ],
    correct: "2A",
    marks: 4,
    negative: 1
  },
  {
    id: 198,
    question: "The equation of a wave is y = 0.05 sin(100πt – 4πx). The velocity of wave is:",
    "options": [
      "25 m/s",
      "50 m/s",
      "100 m/s",
      "200 m/s"
    ],
    correct: "25 m/s",
    marks: 4,
    negative: 1
  },
  {
    id: 199,
    question: "Which of the following is not a property of longitudinal waves?",
    "options": [
      "They can travel through solids",
      "They can travel through gases",
      "They can travel through vacuum",
      "They involve compressions and rarefactions"
    ],
    correct: "They can travel through vacuum",
    marks: 4,
    negative: 1
  },
  {
    id: 200,
    question: "Two waves have amplitudes A each and phase difference 120°. The resultant amplitude is:",
    "options": [
      "A",
      "√3 A",
      "2A",
      "A/2"
    ],
    correct: "A",
    marks: 4,
    negative: 1
  },
  {
    id: 201,
    question: "A source of sound moves towards a stationary observer with velocity v/2, where v is velocity of sound. If emitted frequency is f, observed frequency is:",
    "options": [
      "f",
      "2f",
      "3f/2",
      "f/2"
    ],
    correct: "2f",
    marks: 4,
    negative: 1
  },
  {
    id: 202,
    question: "The frequency of beats heard when two sources of sound are of nearly equal frequencies is:",
    "options": [
      "mean of the two frequencies",
      "sum of the two frequencies",
      "difference of the two frequencies",
      "product of the two frequencies"
    ],
    correct: "difference of the two frequencies",
    marks: 4,
    negative: 1
  },
  {
    id: 203,
    question: "Resonance occurs when:",
    "options": [
      "driving frequency < natural frequency",
      "driving frequency > natural frequency",
      "driving frequency = natural frequency",
      "no relation"
    ],
    correct: "driving frequency = natural frequency",
    marks: 4,
    negative: 1
  },
  {
    id: 204,
    question: "In damped oscillation, amplitude decreases:",
    "options": [
      "linearly with time",
      "exp",
      "inversely with time",
      "uniformly"
    ],
    correct: "exponentially with time",
    marks: 4,
    negative: 1
  },
  {
    id: 205,
    question: "A pendulum resonates with a frequency of 2 Hz. If forced at 2 Hz, the amplitude:",
    "options": [
      "increases indefinitely",
      "becomes zero",
      "becomes constant",
      "decreases exponentially"
    ],
    correct: "becomes constant",
    marks: 4,
    negative: 1
  },
  {
    id: 206,
    question: "In a stretched string, third harmonic has:",
    "options": [
      "1 node",
      "2 nodes",
      "3 nodes",
      "4 nodes"
    ],
    correct: "4 nodes",
    marks: 4,
    negative: 1
  },
  {
    id: 207,
    question: "In SHM, phase difference between velocity and displacement is:",
    "options": [
      "0",
      "π/2",
      "π",
      "2π"
    ],
    correct: "π/2",
    marks: 4,
    negative: 1
  },
  {
    id: 208,
    question: "For a particle in SHM, maximum acceleration occurs at:",
    "options": [
      "mean position",
      "extreme position",
      "between mean and extreme",
      "always constant"
    ],
    correct: "extreme position",
    marks: 4,
    negative: 1
  },
  {
    id: 209,
    question: "In Doppler effect, if source and observer move towards each other, the apparent frequency is:",
    "options": [
      "increased",
      "decreased",
      "unchanged",
      "zero"
    ],
    correct: "increased",
    marks: 4,
    negative: 1
  },
  {
    id: 210,
    question: "The speed of sound in air depends on:",
    "options": [
      "pressure",
      "density only",
      "temperature",
      "volume"
    ],
    correct: "temperature",
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
    
    
    
    
    