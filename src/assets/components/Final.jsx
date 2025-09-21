import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function MathExamPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  const navigate = useNavigate();

  const [studentDetails, setStudentDetails] = useState({
    name: "Unknown",
    school: "",
    studentClass: ""
  });

  // Check login/session
  const suuid = localStorage.getItem("suuid");
  if (!suuid) return <Navigate to="/subjects" replace />;

  // Timer
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour
  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);
  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60
    ).padStart(2, "0")}`;

  const TimerDisplay = () => (
    <div className="fixed top-4 right-4 bg-red-600 text-white px-5 py-3 rounded-xl shadow-lg font-bold text-lg sm:text-xl md:text-2xl z-50 border-2 border-white">
      ⏳ {formatTime(timeLeft)}
    </div>
  );

  // Load student details
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

  // Idle logout
  useEffect(() => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        alert("Idle for 15 minutes. Redirecting...");
        localStorage.removeItem("suuid");
        navigate("/subjects");
      }, 900000);
    };
    ["load", "mousemove", "keypress", "click", "scroll"].forEach((evt) =>
      window.addEventListener(evt, resetTimer)
    );
    resetTimer();
    return () => {
      clearTimeout(timer);
      ["load", "mousemove", "keypress", "click", "scroll"].forEach((evt) =>
        window.removeEventListener(evt, resetTimer)
      );
    };
  }, [navigate]);

  // Questions
   const questions = [

  { id: 1, question: "A particle is moving with uniform acceleration. Which of the following quantities remains constant?", options: ["Velocity", "Acceleration", "Displacement", "Speed"], correct: "Acceleration", marks: 4, negative: 1 },
        { id: 2, question: "Which of the following graphs represents a uniformly accelerated motion?", options: ["A straight line velocity-time graph with a negative slope", "A curved position-time graph", "A straight line position-time graph", "A constant velocity-time graph"], correct: "A straight line velocity-time graph with a negative slope", marks: 4, negative: 1 },
        { id: 3, question: "A body is projected vertically upward. The time taken to reach the maximum height is?", options: ["u/g", "g/u", "2u/g", "u^2/g"], correct: "u/g", marks: 4, negative: 1 },
       
    ];

  // Pick 25 random questions
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled.slice(0, 25));
  }, []);

  const totalQuestions = 25;
  const selectedQuestions = shuffledQuestions.slice(0, totalQuestions);
  const pageSize = 10;
  const paginatedQuestions = selectedQuestions.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  // Tab / Browser change security
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((c) => c + 1);
        alert("⚠️ Tab change detected!");
      }
    };
    const handleBlur = () => {
      setTabSwitchCount((c) => c + 1);
      alert("⚠️ Browser change detected!");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // Auto-submit after 3 violations
  useEffect(() => {
    if (tabSwitchCount >= 3 && !submitted) {
      alert("❌ Too many violations. Exam auto-submitted.");
      handleSubmit();
    }
  }, [tabSwitchCount, submitted]);

  const handleChange = (qid, option) =>
    setAnswers({ ...answers, [qid]: option });

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

  const printPDF = async (finalScore = score) => {
    const doc = new jsPDF();
    const currentDateTime = new Date().toLocaleString();

    doc.setFontSize(18);
    doc.text("Exam Results - Mathematics", 14, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${studentDetails.name}`, 14, 28);
    doc.text(`Class: ${studentDetails.studentClass}`, 14, 34);
    doc.text(`School: ${studentDetails.school}`, 14, 40);
    doc.text(`Date & Time: ${currentDateTime}`, 14, 46);

    const tableData = shuffledQuestions.map((q, idx) => [
      idx + 1,
      q.question,
      answers[q.id] || "Not Answered",
      q.correct,
      answers[q.id] === q.correct ? "Correct" : "Wrong"
    ]);

    autoTable(doc, {
      head: [["No", "Question", "Your Answer", "Correct Answer", "Result"]],
      body: tableData,
      startY: 52
    });

    doc.text(
      `Total Score: ${finalScore} / ${shuffledQuestions.reduce(
        (a, q) => a + q.marks,
        0
      )}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    const newWindow = window.open(blobUrl, "_blank");
    if (!newWindow) alert("Popup blocked!");
  };

  const totalMarks = shuffledQuestions.reduce((a, q) => a + q.marks, 0);
  const percentage = ((score / totalMarks) * 100).toFixed(2);

  // ---------------- RETURN ----------------
return (
  <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white border-4 border-white rounded-xl shadow-lg">
    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
      Mathematics
    </h1>

    {/* Timer only before submission */}
    {!submitted && <TimerDisplay />}

    {!submitted ? (
      <>
        {/* Show current page questions */}
        {paginatedQuestions.map((q, index) => (
          <div
            key={`${q.id}-${currentPage}-${index}`}
            className="mb-6 p-4 sm:p-6 border border-gray-300 rounded-lg shadow-md bg-gray-50"
          >
            <p className="font-medium mb-2 text-base sm:text-lg">{q.question}</p>
            {q.math && <BlockMath math={q.math} />}
            <div className="mt-2">
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="block cursor-pointer hover:bg-gray-200 rounded px-3 py-2 text-base sm:text-lg"
                >
                  <input
                    type="radio"
                    name={`q-${currentPage}-${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                    className="mr-2"
                  />
                  {opt.includes("\\") ||
                  opt.includes("^") ||
                  opt.includes("_") ||
                  opt.includes("/") ? (
                    <InlineMath math={opt} />
                  ) : (
                    <span>{opt}</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Pagination buttons */}
        {selectedQuestions.length > pageSize && (
          <div className="flex justify-between mt-4">
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                ◀ Previous
              </button>
            )}
            {(currentPage + 1) * pageSize < selectedQuestions.length && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                Next ▶
              </button>
            )}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-md transition"
        >
          ✅ Submit Exam
        </button>
      </>
    ) : (
      // After submission -> Results
      <div className="mt-6 p-6 bg-gray-100 rounded-lg text-center shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Results:
        </h2>
        <h3 className="mt-4 text-lg sm:text-xl font-bold text-gray-700">
          Total Score: {score} / {totalMarks} ({percentage}%)
        </h3>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            🔄 Retake Exam
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("suuid");
              navigate("/subjects");
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            📚 Choose Another Subject
          </button>
          <button
            onClick={() => printPDF()}
            className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            📄 Download / Print PDF
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("suuid");
              localStorage.removeItem("studentDetails");
              navigate("/");
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            🚪 Exit
          </button>
        </div>
      </div>
    )}
  </div>
);

}
