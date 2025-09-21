import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function MM5() {
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
    id: 121,
    question: "How many 3-digit numbers can be formed using digits 1 to 9 without repetition?",
    options: [
      "504",
      "720",
      "648",
      "336"
    ],
    correct: "504",
    marks: 4,
    negative: 1
  },
  {
    id: 122,
    question: "How many ways can 5 boys be seated in a row so that two particular boys are always together?",
    options: [
      "240",
      "120",
      "48",
      "720"
    ],
    correct: "48",
    marks: 4,
    negative: 1
  },
  {
    id: 123,
    question: "How many different 5-letter words can be formed from the word 'APPLE'?",
    options: [
      "60",
      "120",
      "240",
      "180"
    ],
    correct: "60",
    marks: 4,
    negative: 1
  },
  {
    id: 124,
    question: "From a group of 7 men and 6 women, a committee of 5 is to be formed. How many ways can it be done if the committee must include at least 3 women?",
    options: [
      "756",
      "735",
      "792",
      "672"
    ],
    correct: "792",
    marks: 4,
    negative: 1
  },
  {
    id: 125,
    question: "How many ways can the letters of the word 'STATISTICS' be arranged?",
    options: [
      "50400",
      "5040",
      "2520",
      "10080"
    ],
    correct: "50400",
    marks: 4,
    negative: 1
  },
  {
    id: 126,
    question: "If 5 cards are drawn from a pack of 52, what is the probability of getting exactly 2 aces?",
    options: [
      "0.038",
      "0.039",
      "0.041",
      "0.045"
    ],
    correct: "0.039",
    marks: 4,
    negative: 1
  },
  {
    id: 127,
    question: "In how many ways can 4 boys and 3 girls be seated in a row such that no two girls sit together?",
    options: [
      "1440",
      "720",
      "2880",
      "4320"
    ],
    correct: "1440",
    marks: 4,
    negative: 1
  },
  {
    id: 128,
    question: "A coin is tossed 5 times. What is the probability of getting exactly 3 heads?",
    options: [
      "5/16",
      "10/32",
      "15/32",
      "1/2"
    ],
    correct: "10/32",
    marks: 4,
    negative: 1
  },
  {
    id: 129,
    question: "How many diagonals does a polygon with 12 sides have?",
    options: [
      "54",
      "60",
      "66",
      "72"
    ],
    correct: "54",
    marks: 4,
    negative: 1
  },
  {
    id: 130,
    question: "What is the probability of getting a sum of 9 when two dice are thrown?",
    options: [
      "1/9",
      "1/8",
      "1/6",
      "1/12"
    ],
    correct: "1/9",
    marks: 4,
    negative: 1
  },
  {
    id: 131,
    question: "How many ways are there to arrange the letters of the word ‘MISSISSIPPI’?",
    options: [
      "34650",
      "3460",
      "346500",
      "34680"
    ],
    correct: "34650",
    marks: 4,
    negative: 1
  },
  {
    id: 132,
    question: "A committee of 4 is to be chosen from 6 men and 5 women. What is the number of ways the committee includes at least one woman?",
    options: [
      "275",
      "285",
      "300",
      "320"
    ],
    correct: "320",
    marks: 4,
    negative: 1
  },
  {
    id: 133,
    question: "If 3 dice are rolled, what is the probability that the sum is 9?",
    options: [
      "25/216",
      "10/216",
      "15/216",
      "20/216"
    ],
    correct: "25/216",
    marks: 4,
    negative: 1
  },
  {
    id: 134,
    question: "A box contains 4 red and 6 green balls. Two balls are drawn. What is the probability both are red?",
    options: [
      "1/3",
      "2/15",
      "2/5",
      "3/5"
    ],
    correct: "2/15",
    marks: 4,
    negative: 1
  },
  {
    id: 135,
    question: "In how many ways can 6 people sit around a circular table?",
    options: [
      "720",
      "120",
      "60",
      "120"
    ],
    correct: "120",
    marks: 4,
    negative: 1
  },
  {
    id: 136,
    question: "A word is formed using all letters of the word ‘EXAM’. How many such words are possible?",
    options: [
      "12",
      "24",
      "36",
      "48"
    ],
    correct: "24",
    marks: 4,
    negative: 1
  },
  {
    id: 137,
    question: "If 2 dice are thrown, what is the probability that the number on the first die is greater than the number on the second?",
    options: [
      "15/36",
      "21/36",
      "10/36",
      "18/36"
    ],
    correct: "15/36",
    marks: 4,
    negative: 1
  },
  {
    id: 138,
    question: "Out of 10 students, how many ways can a President, Vice President and Secretary be chosen?",
    options: [
      "720",
      "840",
      "1000",
      "120"
    ],
    correct: "720",
    marks: 4,
    negative: 1
  },
  {
    id: 139,
    question: "In how many ways can 4 prizes be distributed among 6 students if each can get at most one prize?",
    options: [
      "360",
      "720",
      "840",
      "120"
    ],
    correct: "360",
    marks: 4,
    negative: 1
  },
  {
    id: 140,
    question: "The number of ways to choose a committee of 3 from 7 persons is:",
    options: [
      "21",
      "35",
      "42",
      "49"
    ],
    correct: "35",
    marks: 4,
    negative: 1
  },
  {
    id: 141,
    question: "In how many ways can the word ‘BALLOON’ be arranged?",
    options: [
      "1260",
      "630",
      "2520",
      "840"
    ],
    correct: "1260",
    marks: 4,
    negative: 1
  },
  {
    id: 142,
    question: "What is the probability of getting at least one head when a coin is tossed thrice?",
    options: [
      "7/8",
      "3/4",
      "1/2",
      "5/8"
    ],
    correct: "7/8",
    marks: 4,
    negative: 1
  },
  {
    id: 143,
    question: "A card is drawn from a pack of 52 cards. What is the probability that it is either a red card or a king?",
    options: [
      "15/26",
      "8/13",
      "17/26",
      "4/13"
    ],
    correct: "17/26",
    marks: 4,
    negative: 1
  },
  {
    id: 144,
    question: "In how many ways can a team of 4 be formed from 5 boys and 4 girls such that the team includes at least 2 girls?",
    options: [
      "100",
      "85",
      "75",
      "65"
    ],
    correct: "75",
    marks: 4,
    negative: 1
  },
  {
    id: 145,
    question: "If 3 dice are rolled, what is the probability of getting a number greater than 4 on all three dice?",
    options: [
      "1/36",
      "1/8",
      "1/27",
      "1/9"
    ],
    correct: "1/27",
    marks: 4,
    negative: 1
  },
  {
    id: 146,
    question: "In how many ways can 3 boys and 3 girls be seated in a row such that no two girls sit together?",
    options: [
      "120",
      "240",
      "720",
      "144"
    ],
    correct: "144",
    marks: 4,
    negative: 1
  },
  {
    id: 147,
    question: "A bag contains 5 red and 4 black balls. Two balls are drawn at random. What is the probability that one is red and one is black?",
    options: [
      "5/18",
      "10/18",
      "20/36",
      "20/36"
    ],
    correct: "20/36",
    marks: 4,
    negative: 1
  },
  {
    id: 148,
    question: "How many words can be formed from the letters of the word ‘DELHI’ if the vowels are always together?",
    options: [
      "48",
      "96",
      "120",
      "60"
    ],
    correct: "48",
    marks: 4,
    negative: 1
  },
  {
    id: 149,
    question: "What is the number of subsets of a set containing 6 elements?",
    options: [
      "36",
      "64",
      "32",
      "128"
    ],
    correct: "64",
    marks: 4,
    negative: 1
  },
  {
    id: 150,
    question: "A box has 3 defective and 7 non-defective items. Two items are selected at random. What is the probability both are non-defective?",
    options: [
      "7/15",
      "14/45",
      "21/45",
      "21/30"
    ],
    correct: "21/45",
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
  doc.text("Exam Results - Mathematics", 14, 20);

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
    `Total Score: ${finalScore} / 100`,
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
                <h1 className="text-2xl font-bold text-center mb-6">Mathematics</h1>
    
                
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
    
    
    
    
    