import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function FullExamPage() {
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
    
    const [timeLeft, setTimeLeft] = useState(10800); // 3 hour 
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
    
    const totalQuestions = 75;
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
        { id: 1, question: "Solve for x: 2x + 3 = 7", options: ["x = 1", "x = 2", "x = 3", "x = 4"], correct: "x = 2", marks: 4, negative: 1 },
        { id: 2, question: "What is the derivative of", math: "\\frac{d}{dx}(x^2 + 3x + 2)", options: ["2x + 3", "x^2 + 3", "2x", "x + 3"], correct: "2x + 3", marks: 5, negative: 2 },
        { id: 3, question: "Evaluate", math: "\\int_0^1 x^2 dx", options: ["1/2", "1/3", "1", "2/3"], correct: "1/3", marks: 6, negative: 2 },
        { id: 4, question: "Evaluate", math: "\\int_0^1 x^2 dx", options: ["1/2", "1/3", "1", "2/3"], correct: "1/3", marks: 6, negative: 2 },
        { id: 5, question: "Solve for x: 2x + 3 = 7", options: ["x = 1", "x = 2", "x = 3", "x = 4"], correct: "x = 2", marks: 4, negative: 1 },
        { id: 6, question: "What is the derivative of", math: "\\frac{d}{dx}(x^2 + 3x + 2)", options: ["2x + 3", "x^2 + 3", "2x", "x + 3"], correct: "2x + 3", marks: 5, negative: 2 },
        { id: 7, question: "Evaluate", math: "\\int_0^1 x^2 dx", options: ["1/2", "1/3", "1", "2/3"], correct: "1/3", marks: 6, negative: 2 },
        { id: 8, question: "Evaluate", math: "\\int_0^1 x^2 dx", options: ["1/2", "1/3", "1", "2/3"], correct: "1/3", marks: 6, negative: 2 },
        { id: 9, question: "Evaluate", math: "\\int_0^1 x^2 dx", options: ["1/2", "1/3", "1", "2/3"], correct: "1/3", marks: 6, negative: 2 },
        { id: 10, question: "Evaluate", math: "\\int_0^1 x^2 dx", options: ["1/2", "1/3", "1", "2/3"], correct: "1/3", marks: 6, negative: 2 },
        { id: 11, question: "Evaluate", math: "\\int_0^1 x^2 dx", options: ["1/2", "1/3", "1", "2/3"], correct: "1/3", marks: 6, negative: 2 },
        { id: 12, question: "Evaluate", math: "\\int_0^1 x^2 dx", options: ["1/2", "1/3", "1", "2/3"], correct: "1/3", marks: 6, negative: 2 },
        // ... add more questions
    ];
    const physicsquestions = [
  {
    id: 1,
    question: "Which of the following is not a fundamental quantity?",
    "options": [
      "Mass",
      "Length",
      "Time",
      "Velocity"
    ],
    correct: "Velocity",
    marks: 4,
    negative: 1
  },
  {
    id: 2,
    question: "The dimensional formula for force is:",
    "options": [
      "[M^1L^1T^{-2}]",
      "[M^1L^2T^{-2}]",
      "[M^1L^1T^{-1}]",
      "[M^0L^0T^0]"
    ],
    correct: "[M^1L^1T^{-2}]",
    marks: 4,
    negative: 1
  },
  {
    id: 3,
    question: "The unit of pressure in SI system is:",
    "options": [
      "Joule",
      "Pascal",
      "Watt",
      "Newton"
    ],
    correct: "Pascal",
    marks: 4,
    negative: 1
  },
  {
    id: 4,
    question: "Which of the following has the same dimensions as work?",
    options: [
      "Power",
      "Torque",
      "Energy",
      "Force"
    ],
    correct: "Energy",
    marks: 4,
    negative: 1
  },
  {
    id: 5,
    question: "The number of significant figures in 0.004560 is:",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    correct: "4",
    marks: 4,
    negative: 1
  },
  {
    id: 6,
    question: "The unit of Planck's constant is:",
    "options": [
      "Js",
      "N·m",
      "kg·m²/s²",
      "W"
    ],
    correct: "Js",
    marks: 4,
    negative: 1
  },
  {
    id: 7,
    question: "Dimensional formula of power is:",
    "options": [
      "[MLT^{-2}]",
      "[ML^2T^{-2}]",
      "[ML^2T^{-3}]",
      "[M^0L^0T^0]"
    ],
    correct: "[ML^2T^{-3}]",
    marks: 4,
    negative: 1
  },
  {
    id: 8,
    question: "Which of the following quantities is dimensionless?",
    "options": [
      "Angle",
      "Temperature",
      "Force",
      "Pressure"
    ],
    correct: "Angle",
    marks: 4,
    negative: 1
  },
  {
    id: 9,
    question: "If the length of a rod is given as 4.250 m, how many significant figures are there?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    correct: "4",
    marks: 4,
    negative: 1
  },
  {
    id: 10,
    question: "Which one is not a correct pair of physical quantity and its unit?",
    "options": [
      "Force - Newton",
      "Power - Watt",
      "Energy - Joule",
      "Pressure - Tesla"
    ],
    correct: "Pressure - Tesla",
    marks: 4,
    negative: 1
  },
  {
    id: 11,
    question: "The unit of dimensional formula [ML^0T^{-2}] is:",
    "options": [
      "Work",
      "Energy",
      "Pressure",
      "Weight"
    ],
    correct: "Weight",
    marks: 4,
    negative: 1
  },
  {
    id: 12,
    question: "Which of the following pairs has the same dimensions?",
    "options": [
      "Torque and Work",
      "Energy and Power",
      "Pressure and Force",
      "Work and Power"
    ],
    correct: "Torque and Work",
    marks: 4,
    negative: 1
  },
  {
    id: 13,
    question: "The unit of error is the same as that of:",
    "options": [
      "Acceleration",
      "Physical quantity being measured",
      "Force",
      "None of the above"
    ],
    correct: "Physical quantity being measured",
    marks: 4,
    negative: 1
  },
  {
    id: 14,
    question: "Which instrument is used to measure the least count accurately?",
    "options": [
      "Vernier Caliper",
      "Thermometer",
      "Ammeter",
      "Hygrometer"
    ],
    correct: "Vernier Caliper",
    marks: 4,
    negative: 1
  },
  {
    id: 15,
    question: "The SI unit of luminous intensity is:",
    "options": [
      "Candela",
      "Lux",
      "Lumen",
      "Tesla"
    ],
    correct: "Candela",
    marks: 4,
    negative: 1
  },
  {
    id: 16,
    question: "Which of the following is a derived unit?",
    "options": [
      "Kilogram",
      "Meter",
      "Second",
      "Joule"
    ],
    correct: "Joule",
    marks: 4,
    negative: 1
  },
  {
    id: 17,
    question: "The percentage error in measurement increases when:",
    "options": [
      "The measurement is large",
      "The actual value is very small",
      "The measurement is accurate",
      "All of the above"
    ],
    correct: "The actual value is very small",
    marks: 4,
    negative: 1
  },
  {
    id: 18,
    question: "The dimension of momentum is:",
    "options": [
      "[MLT^{-1}]",
      "[MLT^{-2}]",
      "[ML^2T^{-2}]",
      "[M^2LT^{-2}]"
    ],
    correct: "[MLT^{-1}]",
    marks: 4,
    negative: 1
  },
  {
    id: 19,
    question: "Which of these is not an SI base unit?",
    "options": [
      "Ampere",
      "Mole",
      "Calorie",
      "Candela"
    ],
    correct: "Calorie",
    marks: 4,
    negative: 1
  },
  {
    id: 20,
    question: "Which quantity has unit Henry?",
    "options": [
      "Capacitance",
      "Inductance",
      "Resistance",
      "Reactance"
    ],
    correct: "Inductance",
    marks: 4,
    negative: 1
  },
  {
    id: 21,
    question: "Which of the following is a scalar quantity?",
    "options": [
      "Force",
      "Acceleration",
      "Displacement",
      "Work"
    ],
    correct: "Work",
    marks: 4,
    negative: 1
  },
  {
    id: 22,
    question: "Dimensional formula of gravitational potential is:",
    "options": [
      "[L^2T^{-2}]",
      "[ML^2T^{-2}]",
      "[L^2T^2]",
      "[L^1T^{-2}]"
    ],
    correct: "[L^2T^{-2}]",
    marks: 4,
    negative: 1
  },
  {
    id: 23,
    question: "Dimension of surface tension is:",
    "options": [
      "[MT^{-2}]",
      "[ML^0T^{-2}]",
      "[ML^2T^{-2}]",
      "[ML^{-1}T^{-2}]"
    ],
    correct: "[MT^{-2}]",
    marks: 4,
    negative: 1
  },
  {
    id: 24,
    question: "Absolute error is the:",
    "options": [
      "Error expressed as a percentage",
      "Difference between measured and true value",
      "Relative deviation",
      "Ratio of true to measured value"
    ],
    correct: "Difference between measured and true value",
    marks: 4,
    negative: 1
  },
  {
    id: 25,
    question: "Which of the following is not a correct dimensional formula?",
    "options": [
      "Energy – [ML^2T^{-2}]",
      "Pressure – [ML^{-1}T^{-2}]",
      "Acceleration – [LT^{-2}]",
      "Momentum – [ML^2T^{-1}]"
    ],
    correct: "Momentum – [ML^2T^{-1}]",
    marks: 4,
    negative: 1
  },
  {
    id: 26,
    question: "Significant figures in 6.022 × 10²³ are:",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    correct: "4",
    marks: 4,
    negative: 1
  },
  {
    id: 27,
    question: "Dimensional formula of coefficient of viscosity is:",
    "options": [
      "[ML^{-1}T^{-1}]",
      "[MLT^{-2}]",
      "[ML^2T^{-2}]",
      "[ML^0T^{-1}]"
    ],
    correct: "[ML^{-1}T^{-1}]",
    marks: 4,
    negative: 1
  },
  {
    id: 28,
    question: "One parsec is approximately equal to:",
    "options": [
      "3.26 light-years",
      "9.46 × 10¹² m",
      "3.00 × 10⁸ m/s",
      "6.63 × 10⁻³⁴ Js"
    ],
    correct: "3.26 light-years",
    marks: 4,
    negative: 1
  },
  {
    id: 29,
    question: "Which of the following has same dimension as impulse?",
    "options": [
      "Energy",
      "Power",
      "Momentum",
      "Velocity"
    ],
    correct: "Momentum",
    marks: 4,
    negative: 1
  },
  {
    id: 30,
    question: "Dimensional analysis can be used to:",
    "options": [
      "Derive formulas",
      "Convert units",
      "Check correctness of equations",
      "All of the above"
    ],
    correct: "All of the above",
    marks: 4,
    negative: 1
  },
  {
    id: 31,
    question: "A particle is moving with uniform acceleration. Which of the following quantities remains constant?",
    "options": [
      "Velocity",
      "Acceleration",
      "Displacement",
      "Speed"
    ],
    correct: "Acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 32,
    question: "Which of the following graphs represents a uniformly accelerated motion?",
    "options": [
      "A straight line velocity-time graph with a negative slope",
      "A curved position-time graph",
      "A straight line position-time graph",
      "A constant velocity-time graph"
    ],
    correct: "A straight line velocity-time graph with a negative slope",
    marks: 4,
    negative: 1
  },
  {
    id: 33,
    question: "A body is projected vertically upward. The time taken to reach the maximum height is?",
    "options": [
      "u/g",
      "g/u",
      "2u/g",
      "u^2/g"
    ],
    correct: "u/g",
    marks: 4,
    negative: 1
  },
  {
    id: 34,
    question: "If a particle moves in a straight line with decreasing speed, then?",
    "options": [
      "Acceleration is zero",
      "Acceleration is positive",
      "Acceleration is negative",
      "Velocity is zero"
    ],
    correct: "Acceleration is negative",
    marks: 4,
    negative: 1
  },
  {
    id: 35,
    question: "A body starts from rest and travels 100 m in 5 seconds. What is its acceleration?",
    "options": [
      "8 m/s²",
      "5 m/s²",
      "4 m/s²",
      "2 m/s²"
    ],
    correct: "8 m/s²",
    marks: 4,
    negative: 1
  },
  {
    id: 36,
    question: "The area under a velocity-time graph gives?",
    "options": [
      "Displacement",
      "Acceleration",
      "Speed",
      "Distance only if velocity is constant"
    ],
    correct: "Displacement",
    marks: 4,
    negative: 1
  },
  {
    id: 37,
    question: "A particle travels in a circle with constant speed. Which quantity changes continuously?",
    "options": [
      "Speed",
      "Velocity",
      "Displacement",
      "Distance"
    ],
    correct: "Velocity",
    marks: 4,
    negative: 1
  },
  {
    id: 38,
    question: "Instantaneous velocity is defined as?",
    "options": [
      "Displacement per unit time",
      "dx/dt",
      "dv/dt",
      "Change in displacement over a long interval"
    ],
    correct: "dx/dt",
    marks: 4,
    negative: 1
  },
  {
    id: 39,
    question: "A particle has a constant acceleration of 3 m/s². If initial velocity is 2 m/s, what is its velocity after 4 s?",
    "options": [
      "10 m/s",
      "12 m/s",
      "14 m/s",
      "8 m/s"
    ],
    correct: "14 m/s",
    marks: 4,
    negative: 1
  },
  {
    id: 40,
    question: "Which of the following is a scalar quantity?",
    "options": [
      "Displacement",
      "Velocity",
      "Speed",
      "Acceleration"
    ],
    correct: "Speed",
    marks: 4,
    negative: 1
  },
  {
    id: 41,
    question: "What is the dimensional formula of velocity?",
    "options": [
      "[L^1 T^-1]",
      "[L T^2]",
      "[M L T^-2]",
      "[L^2 T^-1]"
    ],
    correct: "[L^1 T^-1]",
    marks: 4,
    negative: 1
  },
  {
    id: 42,
    question: "Displacement-time graph of a body is a straight line parallel to the time axis. What does it signify?",
    "options": [
      "The body is at rest",
      "The body is in uniform motion",
      "The body has constant acceleration",
      "None"
    ],
    correct: "The body is at rest",
    marks: 4,
    negative: 1
  },
  {
    id: 43,
    question: "The slope of a velocity-time graph gives?",
    "options": [
      "Displacement",
      "Acceleration",
      "Speed",
      "Jerk"
    ],
    correct: "Acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 44,
    question: "In uniformly accelerated motion, which of the following is true?",
    "options": [
      "v = u + at",
      "s = ut + ½at²",
      "v² = u² + 2as",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 45,
    question: "A body thrown up returns to the ground. Its displacement is?",
    "options": [
      "Positive",
      "Negative",
      "Zero",
      "Cannot be determined"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 46,
    question: "A body moving with uniform speed in a straight line has?",
    "options": [
      "Constant velocity",
      "Zero acceleration",
      "Both A and B",
      "Variable acceleration"
    ],
    correct: "Both A and B",
    marks: 4,
    negative: 1
  },
  {
    id: 47,
    question: "If the acceleration is in the opposite direction of velocity, the body?",
    "options": [
      "Speeds up",
      "Slows down",
      "Moves with uniform velocity",
      "Stops immediately"
    ],
    correct: "Slows down",
    marks: 4,
    negative: 1
  },
  {
    id: 48,
    question: "Which of the following pairs are vector quantities?",
    "options": [
      "Speed and velocity",
      "Displacement and distance",
      "Velocity and displacement",
      "Acceleration and speed"
    ],
    correct: "Velocity and displacement",
    marks: 4,
    negative: 1
  },
  {
    id: 49,
    question: "The numerical ratio of displacement to distance is?",
    "options": [
      "Always 1",
      "Always less than 1",
      "Always more than 1",
      "≤ 1"
    ],
    correct: "≤ 1",
    marks: 4,
    negative: 1
  },
  {
    id: 50,
    question: "A car moves with a speed of 72 km/h. Its speed in m/s is?",
    "options": [
      "18",
      "20",
      "22",
      "25"
    ],
    correct: "20",
    marks: 4,
    negative: 1
  },
  {
    id: 51,
    question: "A car accelerates from 10 m/s to 30 m/s in 4 seconds. What is its acceleration?",
    "options": [
      "4 m/s²",
      "5 m/s²",
      "6 m/s²",
      "7 m/s²"
    ],
    correct: "5 m/s²",
    marks: 4,
    negative: 1
  },
  {
    id: 52,
    question: "The total distance travelled by a body in uniform acceleration is given by?",
    "options": [
      "s = vt",
      "s = ut + ½at²",
      "s = u² + 2as",
      "s = u + at"
    ],
    correct: "s = ut + ½at²",
    marks: 4,
    negative: 1
  },
  {
    id: 53,
    question: "A particle is moving with a constant speed but changing direction. Its acceleration is?",
    "options": [
      "Zero",
      "Non-zero",
      "Constant",
      "Cannot be determined"
    ],
    correct: "Non-zero",
    marks: 4,
    negative: 1
  },
  {
    id: 54,
    question: "A body is thrown vertically upwards with velocity u. Time to reach maximum height is?",
    "options": [
      "u/g",
      "2u/g",
      "u²/2g",
      "u/2g"
    ],
    correct: "u/g",
    marks: 4,
    negative: 1
  },
  {
    id: 55,
    question: "For a body in free fall, neglecting air resistance, acceleration is?",
    "options": [
      "0",
      "g",
      "-g",
      "g/2"
    ],
    correct: "g",
    marks: 4,
    negative: 1
  },
  {
    id: 56,
    question: "Which quantity determines how fast velocity changes?",
    "options": [
      "Speed",
      "Displacement",
      "Acceleration",
      "Momentum"
    ],
    correct: "Acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 57,
    question: "A straight-line motion with constant speed implies?",
    "options": [
      "Zero acceleration",
      "Constant acceleration",
      "Varying acceleration",
      "Non-uniform motion"
    ],
    correct: "Zero acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 58,
    question: "Velocity of a body is negative and acceleration is positive. The body?",
    "options": [
      "Speeds up",
      "Slows down",
      "Moves with constant speed",
      "Remains at rest"
    ],
    correct: "Slows down",
    marks: 4,
    negative: 1
  },
  {
    id: 59,
    question: "A particle with negative acceleration and positive velocity will?",
    "options": [
      "Speed up",
      "Stop immediately",
      "Slow down",
      "Move backward"
    ],
    correct: "Slow down",
    marks: 4,
    negative: 1
  },
  {
    id: 60,
    question: "Which of the following is a vector quantity?",
    "options": [
      "Speed",
      "Distance",
      "Work",
      "Displacement"
    ],
    correct: "Displacement",
    marks: 4,
    negative: 1
  },
  {
    id: 61,
    question: "A book lying on a table is in:",
    "options": [
      "Dynamic equilibrium",
      "Translational motion",
      "Rotational motion",
      "Static equilibrium"
    ],
    correct: "Static equilibrium",
    marks: 4,
    negative: 1
  },
  {
    id: 62,
    question: "A car accelerates from rest under uniform force. Its motion is:",
    "options": [
      "Uniform",
      "Non-uniform",
      "Circular",
      "Rotational"
    ],
    correct: "Non-uniform",
    marks: 4,
    negative: 1
  },
  {
    id: 63,
    question: "The force which opposes the relative motion is:",
    "options": [
      "Gravitational force",
      "Frictional force",
      "Magnetic force",
      "Electrostatic force"
    ],
    correct: "Frictional force",
    marks: 4,
    negative: 1
  },
  {
    id: 64,
    question: "Newton’s First Law is also known as the law of:",
    "options": [
      "Inertia",
      "Momentum",
      "Energy",
      "Friction"
    ],
    correct: "Inertia",
    marks: 4,
    negative: 1
  },
  {
    id: 65,
    question: "Which law explains the recoil of a gun?",
    "options": [
      "Newton’s First Law",
      "Newton’s Second Law",
      "Newton’s Third Law",
      "Law of Gravitation"
    ],
    correct: "Newton’s Third Law",
    marks: 4,
    negative: 1
  },
  {
    id: 66,
    question: "The direction of frictional force is always:",
    "options": [
      "Perpendicular to surface",
      "Along motion",
      "Opposite to motion",
      "Downward"
    ],
    correct: "Opposite to motion",
    marks: 4,
    negative: 1
  },
  {
    id: 67,
    question: "The Third Law pair of a bat hitting a ball is:",
    "options": [
      "Bat exerts force, ball receives",
      "Ball exerts equal force on bat",
      "Ball accelerates",
      "Ball loses momentum"
    ],
    correct: "Ball exerts equal force on bat",
    marks: 4,
    negative: 1
  },
  {
    id: 68,
    question: "If net force on a body is zero, then acceleration is:",
    "options": [
      "Maximum",
      "Zero",
      "Infinite",
      "Negative"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 69,
    question: "When two equal and opposite forces act on a body, it results in:",
    "options": [
      "Acceleration",
      "No motion",
      "Equilibrium",
      "Uniform motion"
    ],
    correct: "Equilibrium",
    marks: 4,
    negative: 1
  },
  {
    id: 70,
    question: "A body of mass 10 kg moves with acceleration of 2 m/s². Force is:",
    "options": [
      "5 N",
      "20 N",
      "12 N",
      "2 N"
    ],
    correct: "20 N",
    marks: 4,
    negative: 1
  },
  {
    id: 71,
    question: "The action and reaction forces are:",
    "options": [
      "Equal in magnitude",
      "Opposite in direction",
      "Act on different bodies",
      "All of the above"
    ],
    correct: "All of the above",
    marks: 4,
    negative: 1
  },
  {
    id: 72,
    question: "When the net force acting on a body is zero, the body:",
    "options": [
      "Accelerates",
      "Moves in a circle",
      "Is at rest or moves with constant velocity",
      "Falls freely"
    ],
    correct: "Is at rest or moves with constant velocity",
    marks: 4,
    negative: 1
  },
  {
    id: 73,
    question: "The momentum of a body is defined as:",
    "options": [
      "mv",
      "ma",
      "mg",
      "v/m"
    ],
    correct: "mv",
    marks: 4,
    negative: 1
  },
  {
    id: 74,
    question: "A passenger in a moving train tends to fall backward when the train suddenly stops. This is due to:",
    "options": [
      "Inertia of motion",
      "Friction",
      "Momentum",
      "Newton's Third Law"
    ],
    correct: "Inertia of motion",
    marks: 4,
    negative: 1
  },
  {
    id: 75,
    question: "Force required to stop a moving body is called:",
    "options": [
      "Momentum",
      "Impulse",
      "Power",
      "Work"
    ],
    correct: "Impulse",
    marks: 4,
    negative: 1
  },
  {
    id: 76,
    question: "What is the force of 5 kg object accelerating at 4 m/s²?",
    "options": [
      "10 N",
      "15 N",
      "20 N",
      "25 N"
    ],
    correct: "20 N",
    marks: 4,
    negative: 1
  },
  {
    id: 77,
    question: "In the absence of external force, a moving object will:",
    "options": [
      "Stop",
      "Accelerate",
      "Move with uniform velocity",
      "Move in a circle"
    ],
    correct: "Move with uniform velocity",
    marks: 4,
    negative: 1
  },
  {
    id: 78,
    question: "The mass of a body is 2 kg, and its velocity is 3 m/s. Momentum is:",
    "options": [
      "5 kg·m/s",
      "6 kg·m/s",
      "3 kg·m/s",
      "1.5 kg·m/s"
    ],
    correct: "6 kg·m/s",
    marks: 4,
    negative: 1
  },
  {
    id: 79,
    question: "Friction always acts:",
    "options": [
      "In direction of motion",
      "Opposite to motion",
      "Perpendicular to motion",
      "Along normal"
    ],
    correct: "Opposite to motion",
    marks: 4,
    negative: 1
  },
  {
    id: 80,
    question: "The relation between impulse and momentum is:",
    "options": [
      "Impulse = Change in momentum",
      "Impulse = Force × Distance",
      "Impulse = Mass × Acceleration",
      "Impulse = Velocity × Time"
    ],
    correct: "Impulse = Change in momentum",
    marks: 4,
    negative: 1
  },
  {
    id: 81,
    question: "Rocket propulsion is an example of:",
    "options": [
      "Newton's first law",
      "Newton's second law",
      "Newton's third law",
      "Gravitation"
    ],
    correct: "Newton's third law",
    marks: 4,
    negative: 1
  },
  {
    id: 82,
    question: "The unit of force in SI system is:",
    "options": [
      "Dyne",
      "Kilogram",
      "Newton",
      "Joule"
    ],
    correct: "Newton",
    marks: 4,
    negative: 1
  },
  {
    id: 83,
    question: "Which law is also called the law of force?",
    "options": [
      "First law",
      "Second law",
      "Third law",
      "Zeroth law"
    ],
    correct: "Second law",
    marks: 4,
    negative: 1
  },
  {
    id: 84,
    question: "The net force on a body moving with uniform velocity is:",
    "options": [
      "Positive",
      "Negative",
      "Zero",
      "Depends on mass"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 85,
    question: "Newton’s second law relates:",
    "options": [
      "Force and displacement",
      "Force and momentum",
      "Force and mass",
      "Force and acceleration"
    ],
    correct: "Force and acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 86,
    question: "Which of the following quantities is a vector?",
    "options": [
      "Mass",
      "Speed",
      "Time",
      "Force"
    ],
    correct: "Force",
    marks: 4,
    negative: 1
  },
  {
    id: 87,
    question: "The inertia of a body depends on its:",
    "options": [
      "Volume",
      "Density",
      "Mass",
      "Weight"
    ],
    correct: "Mass",
    marks: 4,
    negative: 1
  },
  {
    id: 88,
    question: "The impulse experienced by a body is equal to its change in:",
    "options": [
      "Energy",
      "Mass",
      "Momentum",
      "Displacement"
    ],
    correct: "Momentum",
    marks: 4,
    negative: 1
  },
  {
    id: 89,
    question: "The unit of momentum is:",
    "options": [
      "kg·m/s",
      "kg·m²/s²",
      "N·s",
      "Both A and C"
    ],
    correct: "Both A and C",
    marks: 4,
    negative: 1
  },
  {
    id: 90,
    question: "If time of impact increases, the force experienced is:",
    "options": [
      "Increased",
      "Decreased",
      "Zero",
      "Unchanged"
    ],
    correct: "Decreased",
    marks: 4,
    negative: 1
  },
  {
    id: 91,
    question: "Work done by a constant force is maximum when the angle between force and displacement is:",
    "options": [
      "0°",
      "45°",
      "90°",
      "180°"
    ],
    correct: "0°",
    marks: 4,
    negative: 1
  },
  {
    id: 92,
    question: "Which of the following is the correct unit of power?",
    "options": [
      "Joule",
      "Newton",
      "Watt",
      "Pascal"
    ],
    correct: "Watt",
    marks: 4,
    negative: 1
  },
  {
    id: 93,
    question: "A body is said to have kinetic energy if it is:",
    "options": [
      "At rest",
      "In motion",
      "On a height",
      "Under pressure"
    ],
    correct: "In motion",
    marks: 4,
    negative: 1
  },
  {
    id: 94,
    question: "Potential energy of a body is due to its:",
    "options": [
      "Motion",
      "Size",
      "Position",
      "Temperature"
    ],
    correct: "Position",
    marks: 4,
    negative: 1
  },
  {
    id: 95,
    question: "The work-energy theorem is based on the:",
    "options": [
      "Law of inertia",
      "Law of momentum",
      "Newton’s 3rd law",
      "Newton’s 2nd law"
    ],
    correct: "Newton’s 2nd law",
    marks: 4,
    negative: 1
  },
  {
    id: 96,
    question: "A machine is said to be 100% efficient if:",
    "options": [
      "Output energy = Input energy",
      "Output > Input",
      "Input > Output",
      "No loss of energy"
    ],
    correct: "Output energy = Input energy",
    marks: 4,
    negative: 1
  },
  {
    id: 97,
    question: "Power is defined as:",
    "options": [
      "Work × Time",
      "Work / Time",
      "Force × Distance",
      "Energy × Time"
    ],
    correct: "Work / Time",
    marks: 4,
    negative: 1
  },
  {
    id: 98,
    question: "A spring has potential energy due to its:",
    "options": [
      "Velocity",
      "Acceleration",
      "Deformation",
      "Mass"
    ],
    correct: "Deformation",
    marks: 4,
    negative: 1
  },
  {
    id: 99,
    question: "One kilowatt-hour is equal to:",
    "options": [
      "3600 J",
      "3.6 × 10⁶ J",
      "1000 J",
      "1 J"
    ],
    correct: "3.6 × 10⁶ J",
    marks: 4,
    negative: 1
  },
  {
    id: 100,
    question: "Work done by friction is:",
    "options": [
      "Always positive",
      "Always negative",
      "Zero",
      "May be positive"
    ],
    correct: "Always negative",
    marks: 4,
    negative: 1
  },
  {
    id: 101,
    question: "Which of the following does not have kinetic energy?",
    "options": [
      "Moving car",
      "Flying bird",
      "Boiling water",
      "Stretched string"
    ],
    correct: "Stretched string",
    marks: 4,
    negative: 1
  },
  {
    id: 102,
    question: "The SI unit of energy is:",
    "options": [
      "Watt",
      "Joule",
      "Erg",
      "Calorie"
    ],
    correct: "Joule",
    marks: 4,
    negative: 1
  },
  {
    id: 103,
    question: "A conservative force:",
    "options": [
      "Depends on path",
      "Converts energy",
      "Has zero work in closed path",
      "Is friction"
    ],
    correct: "Has zero work in closed path",
    marks: 4,
    negative: 1
  },
  {
    id: 104,
    question: "Work done in lifting a body against gravity depends on:",
    "options": [
      "Path taken",
      "Time taken",
      "Mass and height",
      "Speed"
    ],
    correct: "Mass and height",
    marks: 4,
    negative: 1
  },
  {
    id: 105,
    question: "In an elastic collision, which quantity is conserved?",
    "options": [
      "Momentum",
      "Kinetic energy",
      "Both a and b",
      "Only energy"
    ],
    correct: "Both a and b",
    marks: 4,
    negative: 1
  },
  {
    id: 106,
    question: "A bullet fired from a gun has:",
    "options": [
      "Only KE",
      "Only PE",
      "Both KE and PE",
      "No energy"
    ],
    correct: "Only KE",
    marks: 4,
    negative: 1
  },
  {
    id: 107,
    question: "Negative work is done when:",
    "options": [
      "Force and displacement are opposite",
      "Force is zero",
      "Displacement is zero",
      "Force and displacement are perpendicular"
    ],
    correct: "Force and displacement are opposite",
    marks: 4,
    negative: 1
  },
  {
    id: 108,
    question: "The area under force vs displacement graph gives:",
    "options": [
      "Power",
      "Velocity",
      "Energy",
      "Work"
    ],
    correct: "Work",
    marks: 4,
    negative: 1
  },
  {
    id: 109,
    question: "If the velocity of an object is doubled, its kinetic energy becomes:",
    "options": [
      "Double",
      "Four times",
      "Half",
      "Same"
    ],
    correct: "Four times",
    marks: 4,
    negative: 1
  },
  {
    id: 110,
    question: "Power of a body is 1 watt when it does 1 joule work in:",
    "options": [
      "1 hour",
      "1 second",
      "1 minute",
      "1 day"
    ],
    correct: "1 second",
    marks: 4,
    negative: 1
  },
  {
    id: 111,
    question: "When is the work done by a force zero?",
    "options": [
      "When force is zero",
      "When displacement is zero",
      "When force is perpendicular to displacement",
      "All of the above"
    ],
    correct: "All of the above",
    marks: 4,
    negative: 1
  },
  {
    id: 112,
    question: "Which of the following is a non-conservative force?",
    "options": [
      "Gravitational force",
      "Frictional force",
      "Electric force",
      "Spring force"
    ],
    correct: "Frictional force",
    marks: 4,
    negative: 1
  },
  {
    id: 113,
    question: "A person climbs a staircase slowly and then quickly. Work done in both cases is:",
    "options": [
      "More in fast case",
      "Less in slow case",
      "Same in both cases",
      "Zero"
    ],
    correct: "Same in both cases",
    marks: 4,
    negative: 1
  },
  {
    id: 114,
    question: "Which of the following quantities is a scalar?",
    "options": [
      "Force",
      "Displacement",
      "Energy",
      "Velocity"
    ],
    correct: "Energy",
    marks: 4,
    negative: 1
  },
  {
    id: 115,
    question: "Which energy conversion takes place in a hydroelectric power plant?",
    "options": [
      "Chemical to electrical",
      "Kinetic to electrical",
      "Potential to electrical",
      "Thermal to electrical"
    ],
    correct: "Potential to electrical",
    marks: 4,
    negative: 1
  },
  {
    id: 116,
    question: "Work done in compressing a spring is stored as:",
    "options": [
      "Heat energy",
      "Kinetic energy",
      "Sound energy",
      "Potential energy"
    ],
    correct: "Potential energy",
    marks: 4,
    negative: 1
  },
  {
    id: 117,
    question: "What is the power output of a 60 W bulb in one minute?",
    "options": [
      "60 J",
      "360 J",
      "3600 J",
      "36000 J"
    ],
    correct: "3600 J",
    marks: 4,
    negative: 1
  },
  {
    id: 118,
    question: "A man pushes a wall and gets tired. The work done is:",
    "options": [
      "Positive",
      "Negative",
      "Zero",
      "Maximum"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 119,
    question: "Mechanical energy is the sum of:",
    "options": [
      "Kinetic and chemical energy",
      "Potential and thermal energy",
      "Kinetic and potential energy",
      "Heat and sound energy"
    ],
    correct: "Kinetic and potential energy",
    marks: 4,
    negative: 1
  },
  {
    id: 120,
    question: "The energy possessed by a stretched rubber band is:",
    "options": [
      "Kinetic energy",
      "Sound energy",
      "Chemical energy",
      "Potential energy"
    ],
    correct: "Potential energy",
    marks: 4,
    negative: 1
  },
  {
    id: 121,
    question: "Two particles of masses 3 kg and 5 kg are located at x = 0 m and x = 4 m, respectively. The centre of mass is at x =",
    "options": [
      "2 m",
      "2.5 m",
      "3 m",
      "3.5 m"
    ],
    correct: "2.5 m",
    marks: 4,
    negative: 1
  },
  {
    id: 122,
    question: "Masses 2 kg at x = –1 m and 6 kg at x = 5 m, the centre of mass is at:",
    "options": [
      "2 m",
      "4 m",
      "3.5 m",
      "2.5 m"
    ],
    correct: "3.5 m",
    marks: 4,
    negative: 1
  },
  {
    id: 123,
    question: "A uniform rod of length L and mass M has its centre of mass at:",
    "options": [
      "L/4 from one end",
      "L/2 from one end",
      "3L/4 from one end",
      "At one end"
    ],
    correct: "L/2 from one end",
    marks: 4,
    negative: 1
  },
  {
    id: 124,
    question: "A uniform semicircular wire (arc) of radius R has its centre of mass located at a distance from the centre:",
    "options": [
      "0 (at centre)",
      "2R/π",
      "R/2",
      "(πR)/2"
    ],
    correct: "2R/π",
    marks: 4,
    negative: 1
  },
  {
    id: 125,
    question: "Torque τ is defined as:",
    "options": [
      "F·r",
      "F/r",
      "r × F",
      "r/F"
    ],
    correct: "r × F",
    marks: 4,
    negative: 1
  },
  {
    id: 126,
    question: "A 10 N force acts perpendicular to a lever arm of length 0.2 m. The torque is:",
    "options": [
      "2 N·m",
      "0.5 N·m",
      "10 N·m",
      "20 N·m"
    ],
    correct: "2 N·m",
    marks: 4,
    negative: 1
  },
  {
    id: 127,
    question: "Angular momentum L is given by:",
    "options": [
      "m v r",
      "m v/r",
      "F r"
    ],
    correct: "m v r",
    marks: 4,
    negative: 1
  },
  {
    id: 128,
    question: "A figure skater spins with arms extended (I₁). She pulls arms in (I₂ < I₁). To conserve angular momentum, her angular speed:",
    "options": [
      "Decreases",
      "Increases",
      "Remains same",
      "Goes to zero"
    ],
    correct: "Increases",
    marks: 4,
    negative: 1
  },
  {
    id: 129,
    question: "Moment of inertia of a point mass m at distance R is:",
    "options": [
      "m R",
      "m R²",
      "m/R²",
      "m R³"
    ],
    correct: "m R²",
    marks: 4,
    negative: 1
  },
  {
    id: 130,
    question: "The radius of gyration k is defined by:",
    "options": [
      "k = √(I/M)",
      "k = I/M",
      "k = M/I",
      "k = I·M"
    ],
    correct: "k = √(I/M)",
    marks: 4,
    negative: 1
  },
  {
    id: 131,
    question: "Moment of inertia of a thin rod (mass M, length L) about axis through center, perpendicular to length:",
    "options": [
      "ML²/12",
      "ML²/3",
      "ML²",
      "ML²/2"
    ],
    correct: "ML²/12",
    marks: 4,
    negative: 1
  },
  {
    id: 132,
    question: "Moment of inertia of a thin rod (mass M, length L) about one end (perpendicular):",
    "options": [
      "ML²/12",
      "ML²/3",
      "ML²/2",
      "ML²"
    ],
    correct: "ML²/3",
    marks: 4,
    negative: 1
  },
  {
    id: 133,
    question: "Solid disc (mass M, radius R), I about central axis:",
    "options": [
      "(1/2)MR²",
      "(1/4)MR²",
      "(1/3)MR²",
      "MR²"
    ],
    correct: "(1/2)MR²",
    marks: 4,
    negative: 1
  },
  {
    id: 134,
    question: "Thin cylindrical shell (hoop) about central axis:",
    "options": [
      "MR²",
      "(1/2)MR²",
      "(1/4)MR²",
      "(2/3)MR²"
    ],
    correct: "MR²",
    marks: 4,
    negative: 1
  },
  {
    id: 135,
    question: "Parallel-axis theorem states:",
    "options": [
      "I = I₀ – Mh²",
      "I = I₀ + Mh²",
      "I = I₀ + M/h²",
      "I = I₀ – M/h²"
    ],
    correct: "I = I₀ + Mh²",
    marks: 4,
    negative: 1
  },
  {
    id: 136,
    question: "Perpendicular axes theorem (planar lamina in xy-plane):",
    "options": [
      "I_x + I_y = I_z",
      "I_x + I_y = I_z + I_xy",
      "I_x + I_y = I_z ⊥",
      "I_x + I_y = I_z²"
    ],
    correct: "I_x + I_y = I_z",
    marks: 4,
    negative: 1
  },
  {
    id: 137,
    question: "A body is in equilibrium if the net force and net torque are both:",
    "options": [
      "Zero, non-zero",
      "Non-zero, zero",
      "Zero, zero",
      "Non-zero, non-zero"
    ],
    correct: "Zero, zero",
    marks: 4,
    negative: 1
  },
  {
    id: 138,
    question: "A uniform beam supported at two ends, one reaction R₁ = 200 N, total weight 300 N. Reaction at the other support R₂ =",
    "options": [
      "100 N",
      "300 N",
      "200 N",
      "500 N"
    ],
    correct: "100 N",
    marks: 4,
    negative: 1
  },
  {
    id: 139,
    question: "For rigid body rotation: torque τ = Iα, where α is:",
    "options": [
      "Angular velocity",
      "Angular displacement",
      "Angular acceleration",
      "Angular momentum"
    ],
    correct: "Angular acceleration",
    marks: 4,
    negative: 1
  },
  {
    id: 140,
    question: "If constant torque acts on a rotator, angular acceleration is:",
    "options": [
      "Constant",
      "Increasing",
      "Decreasing",
      "Zero"
    ],
    correct: "Constant",
    marks: 4,
    negative: 1
  },
  {
    id: 141,
    question: "Analogy: linear momentum corresponds to:",
    "options": [
      "Torque",
      "Angular momentum",
      "Force",
      "Moment of inertia"
    ],
    correct: "Angular momentum",
    marks: 4,
    negative: 1
  },
  {
    id: 142,
    question: "Analogy: mass m in linear motion corresponds to:",
    "options": [
      "Torque",
      "Force",
      "Moment of inertia",
      "Angular velocity"
    ],
    correct: "Moment of inertia",
    marks: 4,
    negative: 1
  },
  {
    id: 143,
    question: "Analogy: Force corresponds to:",
    "options": [
      "Angular momentum",
      "Torque",
      "Mass",
      "Moment of inertia"
    ],
    correct: "Torque",
    marks: 4,
    negative: 1
  },
  {
    id: 144,
    question: "In absence of external torque, angular momentum is:",
    "options": [
      "Not conserved",
      "Conserved",
      "Increasing",
      "Decreasing"
    ],
    correct: "Conserved",
    marks: 4,
    negative: 1
  },
  {
    id: 145,
    question: "A flywheel spins freely; it catches a drop of rainwater (sticky) at edge. Its angular speed:",
    "options": [
      "Increases",
      "Decreases",
      "Remains same",
      "Becomes zero"
    ],
    correct: "Decreases",
    marks: 4,
    negative: 1
  },
  {
    id: 146,
    question: "A spaceship in deep space extends arms (no external torque); rotation rate:",
    "options": [
      "Increases",
      "Decreases",
      "Stays same",
      "Reverses"
    ],
    correct: "Decreases",
    marks: 4,
    negative: 1
  },
  {
    id: 147,
    question: "A uniform rectangular plate (mass M, sides a, b) about axis through centre, parallel to b-side: I =",
    "options": [
      "(1/12)M(a² + b²)",
      "(1/12)M(a²)",
      "(1/12)M(b²)",
      "(1/3)M(a²)"
    ],
    correct: "(1/12)M(a²)",
    marks: 4,
    negative: 1
  },
  {
    id: 148,
    question: "Radius of gyration of same plate: k =",
    "options": [
      "√(a² + b²)/√12",
      "a/√12",
      "b/√12",
      "√(ab)/√12"
    ],
    correct: "a/√12",
    marks: 4,
    negative: 1
  },
  {
    id: 149,
    question: "A wheel rolls without slipping: the instantaneous axis of rotation is at:",
    "options": [
      "Center",
      "Contact point",
      "Top of wheel",
      "Axis through hub"
    ],
    correct: "Contact point",
    marks: 4,
    negative: 1
  },
  {
    id: 150,
    question: "In rolling without slipping, relation between linear velocity v and angular speed ω:",
    "options": [
      "v = ω/R",
      "v = R/ω",
      "v = ωR",
      "v = R²ω"
    ],
    correct: "v = ωR",
    marks: 4,
    negative: 1
  }

];

    const chemistryquestions = [


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
        {
            id: 61,
            question: "The rate of reaction depends on:",
            options: [
                "Concentration of reactants",
                "Temperature",
                "Catalyst",
                "All of the above"
            ],
            correct: "All of the above",
            marks: 4,
            negative: 1
        },
        {
            id: 62,
            question: "Units of rate constant for a first-order reaction are:",
            options: [
                "mol L⁻¹ s⁻¹",
                "s⁻¹",
                "L mol⁻¹ s⁻¹",
                "mol² L⁻² s⁻¹"
            ],
            correct: "s⁻¹",
            marks: 4,
            negative: 1
        },
        {
            id: 63,
            question: "If the half-life of a first-order reaction is 10 minutes, its rate constant is:",
            options: [
                "0.0693 min⁻¹",
                "0.00693 min⁻¹",
                "0.693 min⁻¹",
                "6.93 min⁻¹"
            ],
            correct: "0.0693 min⁻¹",
            marks: 4,
            negative: 1
        },
        {
            id: 64,
            question: "For a zero-order reaction, the plot of concentration vs. time is:",
            options: [
                "Straight line with positive slope",
                "Straight line with negative slope",
                "Curve with positive slope",
                "Curve with negative slope"
            ],
            correct: "Straight line with negative slope",
            marks: 4,
            negative: 1
        },
        {
            id: 65,
            question: "A reaction has k = 2.5 × 10⁻³ s⁻¹. The half-life is:",
            options: [
                "277 s",
                "0.277 s",
                "2770 s",
                "27.7 s"
            ],
            correct: "277 s",
            marks: 4,
            negative: 1
        },
        {
            id: 66,
            question: "Order of reaction and molecularity are always equal in:",
            options: [
                "Complex reactions",
                "Elementary reactions",
                "Chain reactions",
                "Catalytic reactions"
            ],
            correct: "Elementary reactions",
            marks: 4,
            negative: 1
        },
        {
            id: 67,
            question: "If doubling the concentration of a reactant doubles the rate, the reaction order w.r.t. that reactant is:",
            options: [
                "Zero",
                "One",
                "Two",
                "Three"
            ],
            correct: "One",
            marks: 4,
            negative: 1
        },
        {
            id: 68,
            question: "The Arrhenius equation is:",
            options: [
                "k = Ae⁻ᴱᵃ/ᴿᵀ",
                "k = Aeᴱᵃ/ᴿᵀ",
                "k = A/Ea",
                "k = RT/Ea"
            ],
            correct: "k = Ae⁻ᴱᵃ/ᴿᵀ",
            marks: 4,
            negative: 1
        },
        {
            id: 69,
            question: "If temperature increases, rate constant:",
            options: [
                "Always decreases",
                "Always increases",
                "May increase or decrease",
                "Remains constant"
            ],
            correct: "Always increases",
            marks: 4,
            negative: 1
        },
        {
            id: 70,
            question: "Collision theory is applicable mainly to:",
            options: [
                "Bimolecular gaseous reactions",
                "Unimolecular reactions",
                "Complex reactions",
                "Zero-order reactions"
            ],
            correct: "Bimolecular gaseous reactions",
            marks: 4,
            negative: 1
        },
        {
            id: 71,
            question: "For a first-order reaction, if 75% of the reactant is consumed, time taken = ? (t₁/₂ = 20 min)",
            options: [
                "20 min",
                "40 min",
                "60 min",
                "80 min"
            ],
            correct: "40 min",
            marks: 4,
            negative: 1
        },
        {
            id: 72,
            question: "Which factor affects both rate constant and rate of reaction?",
            options: [
                "Concentration",
                "Temperature",
                "Pressure",
                "Catalyst"
            ],
            correct: "Temperature",
            marks: 4,
            negative: 1
        },
        {
            id: 73,
            question: "Activation energy is:",
            options: [
                "Energy released during reaction",
                "Energy required to form activated complex",
                "Energy of products minus reactants",
                "Heat of reaction"
            ],
            correct: "Energy required to form activated complex",
            marks: 4,
            negative: 1
        },
        {
            id: 74,
            question: "Rate law of a reaction is experimentally determined because:",
            options: [
                "It can’t be predicted from balanced equation",
                "It always equals stoichiometric coefficients",
                "It equals molecularity",
                "It depends on reaction order"
            ],
            correct: "It can’t be predicted from balanced equation",
            marks: 4,
            negative: 1
        },
        {
            id: 75,
            question: "In Arrhenius equation, ‘A’ is:",
            options: [
                "Activation energy",
                "Frequency factor",
                "Rate constant",
                "Reaction order"
            ],
            correct: "Frequency factor",
            marks: 4,
            negative: 1
        },
        {
            id: 76,
            question: "In a zero-order reaction, if initial concentration is doubled, half-life:",
            options: [
                "Doubles",
                "Halves",
                "Remains constant",
                "Becomes four times"
            ],
            correct: "Doubles",
            marks: 4,
            negative: 1
        },
        {
            id: 77,
            question: "Which graph is linear for a first-order reaction?",
            options: [
                "ln[A] vs. t",
                "[A] vs. t",
                "1/[A] vs. t",
                "√[A] vs. t"
            ],
            correct: "ln[A] vs. t",
            marks: 4,
            negative: 1
        },
        {
            id: 78,
            question: "Temperature coefficient of most reactions is about:",
            options: [
                "1–2",
                "2–3",
                "5–6",
                "10"
            ],
            correct: "2–3",
            marks: 4,
            negative: 1
        },
        {
            id: 79,
            question: "For 2A → Products, rate = k[A]². If [A] is halved, rate becomes:",
            options: [
                "1/2",
                "1/4",
                "2",
                "4 times original"
            ],
            correct: "1/4",
            marks: 4,
            negative: 1
        },
        {
            id: 80,
            question: "For a first-order reaction, the ratio of times for 90% and 50% completion is:",
            options: [
                "2",
                "3.32",
                "1.5",
                "4"
            ],
            correct: "3.32",
            marks: 4,
            negative: 1
        },
        {
            id: 81,
            question: "Which statement is true for physisorption?",
            options: [
                "Involves chemical bond formation",
                "Increases with rise in temperature",
                "Involves van der Waals forces",
                "Irreversible"
            ],
            correct: "Involves van der Waals forces",
            marks: 4,
            negative: 1
        },
        {
            id: 82,
            question: "In chemisorption:",
            options: [
                "Heat of adsorption is low",
                "It is multi-layer adsorption",
                "It involves high activation energy",
                "It is reversible"
            ],
            correct: "It involves high activation energy",
            marks: 4,
            negative: 1
        },
        {
            id: 83,
            question: "Freundlich adsorption isotherm equation is:",
            options: [
                "x/m = kP",
                "x/m = kPⁿ",
                "x/m = kP^(1/n)",
                "x/m = nPk"
            ],
            correct: "x/m = kP^(1/n)",
            marks: 4,
            negative: 1
        },
        {
            id: 84,
            question: "Langmuir isotherm assumes:",
            options: [
                "Multi-layer adsorption",
                "Uniform surface with identical sites",
                "Infinite adsorption sites",
                "Strong adsorbate-adsorbate interaction"
            ],
            correct: "Uniform surface with identical sites",
            marks: 4,
            negative: 1
        },
        {
            id: 85,
            question: "Which is a lyophilic colloid?",
            options: [
                "Gold sol",
                "Starch sol",
                "Ferric hydroxide sol",
                "Arsenic sulphide sol"
            ],
            correct: "Starch sol",
            marks: 4,
            negative: 1
        },
        {
            id: 86,
            question: "Micelle formation occurs:",
            options: [
                "Above Kraft temperature and CMC",
                "Below Kraft temperature",
                "At any concentration",
                "Only in organic solvents"
            ],
            correct: "Above Kraft temperature and CMC",
            marks: 4,
            negative: 1
        },
        {
            id: 87,
            question: "Tyndall effect is observed in:",
            options: [
                "True solutions only",
                "Colloids only",
                "Suspensions only",
                "Both colloids and suspensions"
            ],
            correct: "Both colloids and suspensions",
            marks: 4,
            negative: 1
        },
        {
            id: 88,
            question: "Electrophoresis is:",
            options: [
                "Movement of colloidal particles under electric field",
                "Scattering of light by particles",
                "Movement of solvent molecules through membrane",
                "Coagulation of colloids"
            ],
            correct: "Movement of colloidal particles under electric field",
            marks: 4,
            negative: 1
        },
        {
            id: 89,
            question: "Which enzyme catalyses starch hydrolysis?",
            options: [
                "Lipase",
                "Maltase",
                "Amylase",
                "Invertase"
            ],
            correct: "Amylase",
            marks: 4,
            negative: 1
        },
        {
            id: 90,
            question: "Emulsion in which oil is dispersed in water is stabilized by:",
            options: [
                "Soaps",
                "Detergents",
                "Both A and B",
                "Sugars"
            ],
            correct: "Both A and B",
            marks: 4,
            negative: 1
        },
        {
            id: 91,
            question: "For the reaction N₂(g) + 3H₂(g)  ⇌  2NH₃(g), the equilibrium constant Kc is affected by:",
            options: [
                "Temperature",
                "Pressure",
                "Catalyst",
                "Concentration"
            ],
            correct: "Temperature",
            marks: 4,
            negative: 1
        },
        {
            id: 92,
            question: "The value of Kp for a reaction is equal to Kc(RT)^Δn. What does Δn represent?",
            options: [
                "Change in temperature",
                "Change in number of moles of gas",
                "Change in volume",
                "Change in enthalpy"
            ],
            correct: "Change in number of moles of gas",
            marks: 4,
            negative: 1
        },
        {
            id: 93,
            question: "The pH of a buffer solution does not change significantly on addition of:",
            options: [
                "Large amount of acid",
                "Large amount of base",
                "Small amount of acid or base",
                "Water"
            ],
            correct: "Small amount of acid or base",
            marks: 4,
            negative: 1
        },
        {
            id: 94,
            question: "In a redox reaction, the species that gets reduced :",
            options: [
                "Gains electrons",
                "Loses electrons",
                "Donates protons",
                "Accepts protons"
            ],
            correct: "Gains electrons",
            marks: 4,
            negative: 1
        },
        {
            id: 95,
            question: "Which of the following is a disproportionation reaction?",
            options: [
                "Cl₂ + 2NaBr → 2NaCl + Br₂",
                "2H₂ + O₂ → 2H₂O",
                "Cl₂ + H₂O → HCl + HClO",
                "Zn + Cu²⁺ → Zn²⁺ + Cu"
            ],
            correct: "Cl₂ + H₂O → HCl + HClO",
            marks: 4,
            negative: 1
        },
        {
            id: 96,
            question: "What is the oxidation number of Cr in K₂Cr₂O₇?",
            options: [
                "+3",
                "+6",
                "+2",
                "+7"
            ],
            correct: "+6",
            marks: 4,
            negative: 1
        },
        {
            id: 97,
            question: "Le Chatelier’s principle is used to predict:",
            options: [
                "Rate of reaction",
                "Shift in equilibrium",
                "Reaction enthalpy",
                "Molecular geometry"
            ],
            correct: "Shift in equilibrium",
            marks: 4,
            negative: 1
        },
        {
            id: 98,
            question: "In a redox titration, KMnO₄ acts as:",
            options: [
                "Reducing agent",
                "Acid",
                "Oxidizing agent",
                "Base"
            ],
            correct: "Oxidizing agent",
            marks: 4,
            negative: 1
        },
        {
            id: 99,
            question: "Which of the following has highest oxidizing power?",
            options: [
                "Cl₂",
                "Br₂",
                "I₂",
                "F₂"
            ],
            correct: "F₂",
            marks: 4,
            negative: 1
        },
        {
            id: 100,
            question: "Which is the conjugate acid of NH₃?",
            options: [
                "NH₂⁻",
                "NH₄⁺",
                "N₂H₄",
                "NO₃⁻"
            ],
            correct: "NH₄⁺",
            marks: 4,
            negative: 1
        },
        {
            id: 101,
            question: "The equilibrium constant for a reaction is 1. What does it imply?",
            options: [
                "Forward reaction is faster",
                "Backward reaction is faster",
                "Concentration of products equals reactants",
                "Reaction is incomplete"
            ],
            correct: "Concentration of products equals reactants",
            marks: 4,
            negative: 1
        },
        {
            id: 102,
            question: "Which of the following is a redox reaction?",
            options: [
                "NaCl + AgNO₃ → AgCl + NaNO₃",
                "HCl + NaOH → NaCl + H₂O",
                "Zn + CuSO₄ → ZnSO₄ + Cu",
                "BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl"
            ],
            correct: "Zn + CuSO₄ → ZnSO₄ + Cu",
            marks: 4,
            negative: 1
        },
        {
            id: 103,
            question: "Which will increase the rate of attainment of equilibrium?",
            options: [
                "Increase in temperature",
                "Addition of catalyst",
                "Increase in pressure",
                "Removing products"
            ],
            correct: "Addition of catalyst",
            marks: 4,
            negative: 1
        },
        {
            id: 104,
            question: "The pH of a neutral solution at 25°C is:",
            options: [
                "5",
                "6",
                "7",
                "8"
            ],
            correct: "7",
            marks: 4,
            negative: 1
        },
        {
            id: 105,
            question: "Which species acts as both oxidizing and reducing agent?",
            options: [
                "H₂O₂",
                "KMnO₄",
                "NaCl",
                "SO₂"
            ],
            correct: "H₂O₂",
            marks: 4,
            negative: 1
        },
        {
            id: 106,
            question: "What is the oxidation number of Fe in Fe(CN)₆³⁻?",
            options: [
                "+2",
                "+3",
                "0",
                "+6"
            ],
            correct: "+3",
            marks: 4,
            negative: 1
        },
        {
            id: 107,
            question: "At equilibrium, which of the following is true?",
            options: [
                "Forward reaction stops",
                "No further reaction occurs",
                "Rate of forward = rate of backward",
                "Concentration of reactants is zero"
            ],
            correct: "Rate of forward = rate of backward",
            marks: 4,
            negative: 1
        },
        {
            id: 108,
            question: "Oxidation involves:",
            options: [
                "Loss of electrons",
                "Gain of electrons",
                "Gain of protons",
                "Loss of neutrons"
            ],
            correct: "Loss of electrons",
            marks: 4,
            negative: 1
        },
        {
            id: 109,
            question: "Which of the following is NOT a redox reaction?",
            options: [
                "H₂ + Cl₂ → 2HCl",
                "NaOH + HCl → NaCl + H₂O",
                "Zn + 2HCl → ZnCl₂ + H₂",
                "Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag"
            ],
            correct: "NaOH + HCl → NaCl + H₂O",
            marks: 4,
            negative: 1
        },
        {
            id: 110,
            question: "Which of the following is the strongest reducing agent?",
            options: [
                "Na",
                "Cl₂",
                "F₂",
                "O₂"
            ],
            correct: "Na",
            marks: 4,
            negative: 1
        },
        {
            id: 111,
            question: "Which of the following statements is correct regarding a reaction at equilibrium?",
            options: [
                "Only the forward reaction occurs",
                "The concentrations of reactants and products are equal",
                "The rate of forward and backward reactions are equal",
                "The reaction stops completely"
            ],
            correct: "The rate of forward and backward reactions are equal",
            marks: 4,
            negative: 1
        },
        {
            id: 112,
            question: "What happens to the equilibrium position when pressure is increased for a gaseous reaction with fewer moles on the product side?",
            options: [
                "Shifts towards reactants",
                "Shifts towards products",
                "No change",
                "Reaction stops"
            ],
            correct: "Shifts towards products",
            marks: 4,
            negative: 1
        },
        {
            id: 113,
            question: "In acidic medium, MnO₄⁻ is reduced to:",
            options: [
                "MnO₂",
                "Mn²⁺",
                "MnO₄²⁻",
                "Mn³⁺"
            ],
            correct: "Mn²⁺",
            marks: 4,
            negative: 1
        },
        {
            id: 114,
            question: "The conjugate base of H₂SO₄ is:",
            options: [
                "HSO₄⁻",
                "SO₄²⁻",
                "H₃O⁺",
                "OH⁻"
            ],
            correct: "HSO₄⁻",
            marks: 4,
            negative: 1
        },
        {
            id: 115,
            question: "Which species is oxidized in the reaction: 2Na + Cl₂ → 2NaCl?",
            options: [
                "Na",
                "Cl₂",
                "NaCl",
                "Both A and B"
            ],
            correct: "Na",
            marks: 4,
            negative: 1
        },
        {
            id: 116,
            question: "What is the oxidation number of nitrogen in NO₃⁻?",
            options: [
                "+1",
                "+2",
                "+5",
                "-1"
            ],
            correct: "+5",
            marks: 4,
            negative: 1
        },
        {
            id: 117,
            question: "Which of the following acts as a reducing agent?",
            options: [
                "Cl₂",
                "H₂",
                "O₂",
                "KMnO₄"
            ],
            correct: "H₂",
            marks: 4,
            negative: 1
        },
        {
            id: 118,
            question: "What is the color change observed when KMnO₄ is added to an acidic solution containing Fe²⁺?",
            options: [
                "Purple to colorless",
                "Colorless to green",
                "Green to blue",
                "Purple to yellow"
            ],
            correct: "Purple to colorless",
            marks: 4,
            negative: 1
        },
        {
            id: 119,
            question: "In a redox reaction, the reducing agent:",
            options: [
                "Gains electrons",
                "Loses electrons",
                "Is reduced",
                "Increases oxidation number of other species"
            ],
            correct: "Loses electrons",
            marks: 4,
            negative: 1
        },
        {
            id: 120,
            question: "The equilibrium constant of a reaction is not affected by:",
            options: [
                "Temperature",
                "Pressure",
                "Catalyst",
                "None of these"
            ],
            correct: "Catalyst",
            marks: 4,
            negative: 1
        },
        {
            id: 121,
            question: "Which of the following elements has the highest electronegativity?",
            options: [
                "Fluorine",
                "Oxygen",
                "Chlorine",
                "Nitrogen"
            ],
            correct: "Fluorine",
            marks: 4,
            negative: 1
        },
        {
            id: 122,
            question: "Which block of the periodic table does the element Iron (Fe) belong to?",
            options: [
                "s-block",
                "p-block",
                "d-block",
                "f-block"
            ],
            correct: "d-block",
            marks: 4,
            negative: 1
        },
        {
            id: 123,
            question: "Which of the following is an example of ionic bonding?",
            options: [
                "NaCl",
                "H2O",
                "CH4",
                "O2"
            ],
            correct: "NaCl",
            marks: 4,
            negative: 1
        },
        {
            id: 124,
            question: "Which of the following has the smallest atomic radius?",
            options: [
                "Na",
                "Mg",
                "Al",
                "Si"
            ],
            correct: "Si",
            marks: 4,
            negative: 1
        },
        {
            id: 125,
            question: "Which period and group does the element with atomic number 17 belong to?",
            options: [
                "Period 3, Group 17",
                "Period 2, Group 16",
                "Period 3, Group 16",
                "Period 2, Group 17"
            ],
            correct: "Period 3, Group 17",
            marks: 4,
            negative: 1
        },
        {
            id: 126,
            question: "Which element has a noble gas configuration of [Ne]3s2 3p6?",
            options: [
                "Ar",
                "Na",
                "Cl",
                "Mg"
            ],
            correct: "Ar",
            marks: 4,
            negative: 1
        },
        {
            id: 127,
            question: "The type of hybridization in methane (CH4) is:",
            options: [
                "sp",
                "sp2",
                "sp3",
                "dsp2"
            ],
            correct: "sp3",
            marks: 4,
            negative: 1
        },
        {
            id: 128,
            question: "Which of the following elements has the highest ionization enthalpy?",
            options: [
                "Li",
                "B",
                "C",
                "He"
            ],
            correct: "He",
            marks: 4,
            negative: 1
        },
        {
            id: 129,
            question: "What is the shape of the BF3 molecule?",
            options: [
                "Tetrahedral",
                "Trigonal planar",
                "Trigonal pyramidal",
                "Linear"
            ],
            correct: "Trigonal planar",
            marks: 4,
            negative: 1
        },
        {
            id: 130,
            question: "Which is the correct order of increasing metallic character?",
            options: [
                "Na < Mg < Al",
                "Al < Mg < Na",
                "Mg < Al < Na",
                "Na < Al < Mg"
            ],
            correct: "Al < Mg < Na",
            marks: 4,
            negative: 1
        },
        {
            id: 131,
            question: "Which of the following species is isoelectronic with Ne?",
            options: [
                "F⁻",
                "Na⁺",
                "O²⁻",
                "All of these"
            ],
            correct: "All of these",
            marks: 4,
            negative: 1
        },
        {
            id: 132,
            question: "Which of the following statements about covalent bonds is true?",
            options: [
                "Electrons are transferred",
                "Occurs between metals",
                "Shared electron pairs",
                "Forms crystal lattice"
            ],
            correct: "Shared electron pairs",
            marks: 4,
            negative: 1
        },
        {
            id: 133,
            question: "Which element has the highest electron affinity?",
            options: [
                "Cl",
                "F",
                "Br",
                "O"
            ],
            correct: "Cl",
            marks: 4,
            negative: 1
        },
        {
            id: 134,
            question: "What is the oxidation state of sulfur in H₂SO₄?",
            options: [
                "+4",
                "+6",
                "+2",
                "-2"
            ],
            correct: "+6",
            marks: 4,
            negative: 1
        },
        {
            id: 135,
            question: "Which is not a property of metals?",
            options: [
                "High conductivity",
                "Malleable",
                "Ductile",
                "Low melting point"
            ],
            correct: "Low melting point",
            marks: 4,
            negative: 1
        },
        {
            id: 136,
            question: "The bond angle in water (H₂O) is approximately:",
            options: [
                "104.5°",
                "90°",
                "109.5°",
                "120°"
            ],
            correct: "104.5°",
            marks: 4,
            negative: 1
        },
        {
            id: 137,
            question: "Which element is present in period 4 and group 2 of the periodic table?",
            options: [
                "Ca",
                "Mg",
                "Be",
                "Sr"
            ],
            correct: "Ca",
            marks: 4,
            negative: 1
        },
        {
            id: 138,
            question: "Which molecule has a linear shape?",
            options: [
                "CO₂",
                "H₂O",
                "NH₃",
                "CH₄"
            ],
            correct: "CO₂",
            marks: 4,
            negative: 1
        },
        {
            id: 139,
            question: "Which of the following is a characteristic of hydrogen bonding?",
            options: [
                "High melting point",
                "Low boiling point",
                "Weak interaction",
                "Found only in metals"
            ],
            correct: "High melting point",
            marks: 4,
            negative: 1
        },
        {
            id: 140,
            question: "The number of valence electrons in Phosphorus (P) is:",
            options: [
                "3",
                "4",
                "5",
                "6"
            ],
            correct: "5",
            marks: 4,
            negative: 1
        },
        {
            id: 141,
            question: "Which of the following elements has the lowest electronegativity?",
            options: [
                "Ca",
                "K",
                "Cs",
                "Na"
            ],
            correct: "Cs",
            marks: 4,
            negative: 1
        },
        {
            id: 142,
            question: "What is the most stable form of bonding in the O₂ molecule?",
            options: [
                "Single bond",
                "Double bond",
                "Triple bond",
                "Ionic bond"
            ],
            correct: "Double bond",
            marks: 4,
            negative: 1
        },
        {
            id: 143,
            question: "Which of the following species has a coordinate covalent bond?",
            options: [
                "NH₄⁺",
                "CH₄",
                "H₂O",
                "NaCl"
            ],
            correct: "NH₄⁺",
            marks: 4,
            negative: 1
        },
        {
            id: 144,
            question: "Which element shows the maximum number of oxidation states?",
            options: [
                "Fe",
                "Mn",
                "Cr",
                "Cu"
            ],
            correct: "Mn",
            marks: 4,
            negative: 1
        },
        {
            id: 145,
            question: "Which of the following is a non-polar molecule?",
            options: [
                "H₂O",
                "NH₃",
                "CO₂",
                "HF"
            ],
            correct: "CO₂",
            marks: 4,
            negative: 1
        },
        {
            id: 146,
            question: "Which of the following molecules has sp² hybridization?",
            options: [
                "C₂H₄",
                "CH₄",
                "C₂H₂",
                "NH₃"
            ],
            correct: "C₂H₄",
            marks: 4,
            negative: 1
        },
        {
            id: 147,
            question: "Which factor determines the strength of a covalent bond?",
            options: [
                "Bond length",
                "Bond angle",
                "Lattice energy",
                "Electronegativity difference"
            ],
            correct: "Bond length",
            marks: 4,
            negative: 1
        },
        {
            id: 148,
            question: "Which of the following has the largest atomic radius?",
            options: [
                "Na",
                "K",
                "Rb",
                "Cs"
            ],
            correct: "Cs",
            marks: 4,
            negative: 1
        },
        {
            id: 149,
            question: "Which type of bond is present in the N₂ molecule?",
            options: [
                "Single",
                "Double",
                "Triple",
                "Coordinate"
            ],
            correct: "Triple",
            marks: 4,
            negative: 1
        },
        {
            id: 150,
            question: "Which group contains elements that are all inert gases?",
            options: [
                "Group 17",
                "Group 16",
                "Group 1",
                "Group 18"
            ],
            correct: "Group 18",
            marks: 4,
            negative: 1
        }


    ];

    const mathquestions = [

        {
            id: 1,
            question: "Which of the following is a subset of every set?",
            options: [
                "Null set",
                "Finite set",
                "Universal set",
                "Infinite set"
            ],
            correct: "Null set",
            marks: 4,
            negative: 1
        },
        {
            id: 2,
            question: "If A = {1,2,3} and B = {3,4,5}, then A ∩ B is:",
            options: [
                "{1,2,3}",
                "{3}",
                "{4,5}",
                "{1,2}"
            ],
            correct: "{3}",
            marks: 4,
            negative: 1
        },
        {
            id: 3,
            question: "The number of subsets of a set containing n elements is:",
            options: [
                "2n",
                "n²",
                "n!",
                "n"
            ],
            correct: "2n",
            marks: 4,
            negative: 1
        },
        {
            id: 4,
            question: "A set which contains no element is called:",
            options: [
                "Singleton set",
                "Null set",
                "Universal set",
                "Finite set"
            ],
            correct: "Null set",
            marks: 4,
            negative: 1
        },
        {
            id: 5,
            question: "If A = {a, b}, then the power set of A contains:",
            options: [
                "2 elements",
                "3 elements",
                "4 elements",
                "5 elements"
            ],
            correct: "4 elements",
            marks: 4,
            negative: 1
        },
        {
            id: 6,
            question: "Which of the following is a finite set?",
            options: [
                "Set of even numbers",
                "Set of integers",
                "Set of natural numbers less than 10",
                "Set of real numbers"
            ],
            correct: "Set of natural numbers less than 10",
            marks: 4,
            negative: 1
        },
        {
            id: 7,
            question: "A function f: A → B is said to be injective if:",
            options: [
                "Every element of B is mapped",
                "Every element of A has a unique image",
                "Different elements of A have different images in B",
                "None"
            ],
            correct: "Different elements of A have different images in B",
            marks: 4,
            negative: 1
        },
        {
            id: 8,
            question: "The Cartesian product A × B is defined as:",
            options: [
                "A + B",
                "All possible ordered pairs (a, b) where a  ∈  A, b  ∈  B",
                "A ∩ B",
                "A ∪ B"
            ],
            correct: "All possible ordered pairs (a, b) where a  ∈  A, b  ∈  B",
            marks: 4,
            negative: 1
        },
        {
            id: 9,
            question: "If A has m elements and B has n elements, then A × B has:",
            options: [
                "m + n elements",
                "mn elements",
                "m - n elements",
                "m/n elements"
            ],
            correct: "mn elements",
            marks: 4,
            negative: 1
        },
        {
            id: 10,
            question: "A relation R from A to B is a subset of:",
            options: [
                "A × A",
                "B × B",
                "A × B",
                "B × A"
            ],
            correct: "A × B",
            marks: 4,
            negative: 1
        },
        {
            id: 11,
            question: "Which of the following is a symmetric relation?",
            options: [
                "R = {(a,b) | a > b}",
                "R = {(a,b) | a = b}",
                "R = {(a,b) | ab > 0}",
                "R = {(a,b) | a ≠ b}"
            ],
            correct: "R = {(a,b) | ab > 0}",
            marks: 4,
            negative: 1
        },
        {
            id: 12,
            question: "Which of the following represents a function?",
            options: [
                "{(1,2), (2,3), (1,3)}",
                "{(2,4), (3,6), (4,8)}",
                "{(a,b), (b,a), (a,a)}",
                "{(x,y) | x² + y² = 1}"
            ],
            correct: "{(2,4), (3,6), (4,8)}",
            marks: 4,
            negative: 1
        },
        {
            id: 13,
            question: "A function that is both one-one and onto is called:",
            options: [
                "Identity",
                "Surjection",
                "Injection",
                "Bijection"
            ],
            correct: "Bijection",
            marks: 4,
            negative: 1
        },
        {
            id: 14,
            question: "If A = {1,2} and B = {x,y}, then number of relations from A to B is:",
            options: [
                "2",
                "4",
                "16",
                "8"
            ],
            correct: "16",
            marks: 4,
            negative: 1
        },
        {
            id: 15,
            question: "The identity function maps:",
            options: [
                "Every element to zero",
                "Every element to itself",
                "Every element to 1",
                "Every element to a unique image"
            ],
            correct: "Every element to itself",
            marks: 4,
            negative: 1
        },
        {
            id: 16,
            question: "The domain of the function f(x) = 1/x is:",
            options: [
                "R",
                "R - {0}",
                "R+",
                "R-"
            ],
            correct: "R - {0}",
            marks: 4,
            negative: 1
        },
        {
            id: 17,
            question: "If f(x) = x², then f(-3) = ?",
            options: [
                "-3",
                "9",
                "-9",
                "3"
            ],
            correct: "9",
            marks: 4,
            negative: 1
        },
        {
            id: 18,
            question: "A relation which is reflexive, symmetric and transitive is called:",
            options: [
                "Equivalence relation",
                "Function",
                "Mapping",
                "Identity"
            ],
            correct: "Equivalence relation",
            marks: 4,
            negative: 1
        },
        {
            id: 19,
            question: "Which of the following is not a function?",
            options: [
                "f: R → R, f(x) = x²",
                "f: R → R, f(x) = 1/x",
                "f: R → R, f(x) = √x",
                "f: R → R, f(x) = ±√x"
            ],
            correct: "f: R → R, f(x) = ±√x",
            marks: 4,
            negative: 1
        },
        {
            id: 20,
            question: "Which is the correct representation of the set of integers?",
            options: [
                "N",
                "R",
                "Z",
                "Q"
            ],
            correct: "Z",
            marks: 4,
            negative: 1
        },
        {
            id: 21,
            question: "If f(x) = x + 2 and g(x) = 3x, then (f ∘ g)(x) =",
            options: [
                "3x + 2",
                "3(x + 2)",
                "x + 6",
                "3x²"
            ],
            correct: "3x + 2",
            marks: 4,
            negative: 1
        },
        {
            id: 22,
            question: "The range of f(x) = x² for x ∈ R is:",
            options: [
                "R",
                "R+",
                "[0, ∞)",
                "(-∞, ∞)"
            ],
            correct: "[0, ∞)",
            marks: 4,
            negative: 1
        },
        {
            id: 23,
            question: "The number of elements in the power set of a set with 3 elements is:",
            options: [
                "3",
                "6",
                "8",
                "9"
            ],
            correct: "8",
            marks: 4,
            negative: 1
        },
        {
            id: 24,
            question: "The empty set is:",
            options: [
                "Infinite",
                "Singleton",
                "Finite",
                "None of these"
            ],
            correct: "Finite",
            marks: 4,
            negative: 1
        },
        {
            id: 25,
            question: "If a set has n elements, then the number of equivalence relations is:",
            options: [
                "n",
                "Infinite",
                "Bell number of n",
                "2^n"
            ],
            correct: "Bell number of n",
            marks: 4,
            negative: 1
        },
        {
            id: 26,
            question: "If R = {(1,1), (2,2), (1,2), (2,1)}, then R is:",
            options: [
                "Symmetric",
                "Reflexive",
                "Transitive",
                "All of these"
            ],
            correct: "All of these",
            marks: 4,
            negative: 1
        },
        {
            id: 27,
            question: "Set of rational numbers is:",
            options: [
                "Countable",
                "Uncountable",
                "Finite",
                "Singleton"
            ],
            correct: "Countable",
            marks: 4,
            negative: 1
        },
        {
            id: 28,
            question: "If A = {1,2}, then number of binary relations on A is:",
            options: [
                "16",
                "4",
                "10",
                "8"
            ],
            correct: "16",
            marks: 4,
            negative: 1
        },
        {
            id: 29,
            question: "Which of the following is not a subset of {1,2,3}?",
            options: [
                "{1,2}",
                "{2,3,4}",
                "{}",
                "{3}"
            ],
            correct: "{2,3,4}",
            marks: 4,
            negative: 1
        },
        {
            id: 30,
            question: "The function f(x) = x³ is:",
            options: [
                "Even",
                "Odd",
                "Periodic",
                "Constant"
            ],
            correct: "Odd",
            marks: 4,
            negative: 1
        },
        {
            id: 31,
            question: "If z = 2 - 3i, then the modulus of z is:",
            options: [
                "√13",
                "√5",
                "√9",
                "√10"
            ],
            correct: "√13",
            marks: 4,
            negative: 1
        },
        {
            id: 32,
            question: "Which of the following is a purely imaginary number?",
            options: [
                "3i",
                "4",
                "1 + i",
                "2 - i"
            ],
            correct: "3i",
            marks: 4,
            negative: 1
        },
        {
            id: 33,
            question: "What is the modulus of the complex number 3 + 4i?",
            options: [
                "5",
                "7",
                "1",
                "6"
            ],
            correct: "5",
            marks: 4,
            negative: 1
        },
        {
            id: 34,
            question: "Which of the following is not a complex number?",
            options: [
                "0",
                "5",
                "3 + 2i",
                "All are complex"
            ],
            correct: "All are complex",
            marks: 4,
            negative: 1
        },
        {
            id: 35,
            question: "The equation whose roots are reciprocals of the roots of x² - 5x + 6 = 0 is:",
            options: [
                "6x² - 5x + 1 = 0",
                "x² - 5x + 6 = 0",
                "x² - 6x + 5 = 0",
                "None"
            ],
            correct: "6x² - 5x + 1 = 0",
            marks: 4,
            negative: 1
        },
        {
            id: 36,
            question: "The equation x² + 1 = 0 has:",
            options: [
                "Imaginary roots",
                "Real roots",
                "No roots",
                "Equal roots"
            ],
            correct: "Imaginary roots",
            marks: 4,
            negative: 1
        },
        {
            id: 37,
            question: "If a quadratic equation has complex roots, then its discriminant is:",
            options: [
                "< 0",
                "> 0",
                "= 0",
                "None"
            ],
            correct: "< 0",
            marks: 4,
            negative: 1
        },
        {
            id: 38,
            question: "If α and β are the roots of the equation x² - 5x + 6 = 0, then what is the value of α + β?",
            options: [
                "2",
                "5",
                "6",
                "1"
            ],
            correct: "5",
            marks: 4,
            negative: 1
        },
        {
            id: 39,
            question: "If α and β are the roots of x² - 6x + 9 = 0, then α = β = ?",
            options: [
                "3",
                "9",
                "6",
                "0"
            ],
            correct: "3",
            marks: 4,
            negative: 1
        },
        {
            id: 40,
            question: "The sum of the roots of x² + 3x + 2 = 0 is:",
            options: [
                "3",
                "-3",
                "2",
                "-2"
            ],
            correct: "-3",
            marks: 4,
            negative: 1
        },
        {
            id: 41,
            question: "If z = a + bi is a complex number, then its conjugate is:",
            options: [
                "a - bi",
                "-a + bi",
                "-a - bi",
                "a + bi"
            ],
            correct: "a - bi",
            marks: 4,
            negative: 1
        },
        {
            id: 42,
            question: "The product of the roots of x² - 7x + 12 = 0 is:",
            options: [
                "12",
                "7",
                "-12",
                "-7"
            ],
            correct: "12",
            marks: 4,
            negative: 1
        },
        {
            id: 43,
            question: "If z = 1 + i, then z² equals:",
            options: [
                "2i",
                "0",
                "2",
                "2i"
            ],
            correct: "2i",
            marks: 4,
            negative: 1
        },
        {
            id: 44,
            question: "If one root of the quadratic equation x² + px + 12 = 0 is 3, then the value of p is:",
            options: [
                "-7",
                "-3",
                "-4",
                "-5"
            ],
            correct: "-7",
            marks: 4,
            negative: 1
        },
        {
            id: 45,
            question: "What is the nature of roots of x² + 6x + 9 = 0?",
            options: [
                "Real and equal",
                "Real and distinct",
                "Imaginary",
                "None"
            ],
            correct: "Real and equal",
            marks: 4,
            negative: 1
        },
        {
            id: 46,
            question: "The roots of the equation x² - 2x + 2 = 0 are:",
            options: [
                "1 + i, 1 - i",
                "2, -1",
                "1, -1",
                "None"
            ],
            correct: "1 + i, 1 - i",
            marks: 4,
            negative: 1
        },
        {
            id: 47,
            question: "If i is the imaginary unit, then i⁴ equals:",
            options: [
                "1",
                "i",
                "-1",
                "0"
            ],
            correct: "1",
            marks: 4,
            negative: 1
        },
        {
            id: 48,
            question: "The roots of the equation x² + 4x + 13 = 0 are:",
            options: [
                "Real and equal",
                "Real and distinct",
                "Imaginary",
                "None"
            ],
            correct: "Imaginary",
            marks: 4,
            negative: 1
        },
        {
            id: 49,
            question: "Which of the following quadratic equations has real and distinct roots?",
            options: [
                "x² - 3x + 2 = 0",
                "x² + x + 1 = 0",
                "x² + 4 = 0",
                "x² + 2x + 1 = 0"
            ],
            correct: "x² - 3x + 2 = 0",
            marks: 4,
            negative: 1
        },
        {
            id: 50,
            question: "The square of imaginary unit i is:",
            options: [
                "-1",
                "1",
                "i",
                "-i"
            ],
            correct: "-1",
            marks: 4,
            negative: 1
        },
        {
            id: 51,
            question: "If α and β are roots of x² - (α+β)x + αβ = 0, then the quadratic is:",
            options: [
                "x² - (α+β)x + αβ",
                "x² + (α+β)x + αβ",
                "x² + (α+β)x - αβ",
                "x² - (α+β)x - αβ"
            ],
            correct: "x² - (α+β)x + αβ",
            marks: 4,
            negative: 1
        },
        {
            id: 52,
            question: "The conjugate of 5 - 2i is:",
            options: [
                "5 + 2i",
                "-5 + 2i",
                "-5 - 2i",
                "5 - 2i"
            ],
            correct: "5 + 2i",
            marks: 4,
            negative: 1
        },
        {
            id: 53,
            question: "What is the argument of the complex number i?",
            options: [
                "π/2",
                "π",
                "0",
                "π/4"
            ],
            correct: "π/2",
            marks: 4,
            negative: 1
        },
        {
            id: 54,
            question: "If z = 2 + i, then z̄ (conjugate) is:",
            options: [
                "2 - i",
                "-2 + i",
                "-2 - i",
                "2 + i"
            ],
            correct: "2 - i",
            marks: 4,
            negative: 1
        },
        {
            id: 55,
            question: "The value of (1 + i)⁴ is:",
            options: [
                "-4",
                "4i",
                "2",
                "0"
            ],
            correct: "-4",
            marks: 4,
            negative: 1
        },
        {
            id: 56,
            question: "If a quadratic equation has equal roots, then its discriminant is:",
            options: [
                "0",
                "> 0",
                "< 0",
                "Undefined"
            ],
            correct: "0",
            marks: 4,
            negative: 1
        },
        {
            id: 57,
            question: "Which complex number lies on the real axis?",
            options: [
                "3",
                "3i",
                "1 + i",
                "0 + i"
            ],
            correct: "3",
            marks: 4,
            negative: 1
        },
        {
            id: 58,
            question: "If α, β are roots of x² - 4x + 3 = 0, then αβ = ?",
            options: [
                "3",
                "4",
                "-3",
                "1"
            ],
            correct: "3",
            marks: 4,
            negative: 1
        },
        {
            id: 59,
            question: "What is the square of (2 + i)?",
            options: [
                "3 + 4i",
                "3 - 4i",
                "5 + 4i",
                "4 + 4i"
            ],
            correct: "3 + 4i",
            marks: 4,
            negative: 1
        },
        {
            id: 60,
            question: "Which of the following represents an equation with imaginary roots?",
            options: [
                "x² + 2x + 5 = 0",
                "x² - 4x + 3 = 0",
                "x² + 3x + 2 = 0",
                "x² - 6x + 9 = 0"
            ],
            correct: "x² + 2x + 5 = 0",
            marks: 4,
            negative: 1
        },
        {
            id: 61,
            question: "The coefficient of x² in (1 + x)^5 is:",
            options: [
                "5",
                "10",
                "15",
                "20"
            ],
            correct: "10",
            marks: 4,
            negative: 1
        },
        {
            id: 62,
            question: "The sum of an infinite geometric progression with first term a and common ratio r is:",
            options: [
                "a/(1 + r)",
                "a/(1 - r)",
                "ar/(1 - r)",
                "None"
            ],
            correct: "a/(1 - r)",
            marks: 4,
            negative: 1
        },
        {
            id: 63,
            question: "The sum to n terms of a GP is 255 and a = 1, r = 2. Then n is:",
            options: [
                "7",
                "8",
                "6",
                "9"
            ],
            correct: "8",
            marks: 4,
            negative: 1
        },
        {
            id: 64,
            question: "Middle term of (x + 1)^10 is:",
            options: [
                "T₅",
                "T₆",
                "T₁₁",
                "T₇"
            ],
            correct: "T₆",
            marks: 4,
            negative: 1
        },
        {
            id: 65,
            question: "The number of terms in the expansion of (x + y)^n is:",
            options: [
                "n",
                "n+1",
                "2n",
                "2n+1"
            ],
            correct: "n+1",
            marks: 4,
            negative: 1
        },
        {
            id: 66,
            question: "The general term in (x + a)^n is:",
            options: [
                "C(n, r) * x^r * a^(n-r)",
                "C(n, r) * x^(n-r) * a^r",
                "nCr * x^r * a^r",
                "None"
            ],
            correct: "C(n, r) * x^(n-r) * a^r",
            marks: 4,
            negative: 1
        },
        {
            id: 67,
            question: "The 10th term of a GP is 128 and 6th term is 8. First term is:",
            options: [
                "1",
                "2",
                "4",
                "None"
            ],
            correct: "1",
            marks: 4,
            negative: 1
        },
        {
            id: 68,
            question: "In a GP, the 4th term is 81 and the 7th term is 6561. The common ratio is:",
            options: [
                "3",
                "2",
                "4",
                "9"
            ],
            correct: "3",
            marks: 4,
            negative: 1
        },
        {
            id: 69,
            question: "If the sum of n terms of an AP is 2n² + 3n, then its 5th term is:",
            options: [
                "40",
                "35",
                "25",
                "30"
            ],
            correct: "30",
            marks: 4,
            negative: 1
        },
        {
            id: 70,
            question: "The sum of the first n terms of an AP is 3n² + 5n. Find the first term.",
            options: [
                "3",
                "8",
                "5",
                "None of these"
            ],
            correct: "8",
            marks: 4,
            negative: 1
        },
        {
            id: 71,
            question: "If the p-th term of an AP is q and the q-th term is p, then the r-th term is:",
            options: [
                "p + q - r",
                "r",
                "2r - p - q",
                "p + q"
            ],
            correct: "p + q - r",
            marks: 4,
            negative: 1
        },
        {
            id: 72,
            question: "The expansion of (2 + 3x)³ has how many terms?",
            options: [
                "3",
                "4",
                "5",
                "6"
            ],
            correct: "4",
            marks: 4,
            negative: 1
        },
        {
            id: 73,
            question: "Term independent of x in (x² + 1/x)⁶ is:",
            options: [
                "T₃",
                "T₄",
                "T₅",
                "T₆"
            ],
            correct: "T₅",
            marks: 4,
            negative: 1
        },
        {
            id: 74,
            question: "In (a + b)^5, the coefficient of a²b³ is:",
            options: [
                "10",
                "5",
                "20",
                "None"
            ],
            correct: "10",
            marks: 4,
            negative: 1
        },
        {
            id: 75,
            question: "If a, b, c are in AP, then which of the following is true?",
            options: [
                "2b = a + c",
                "a + b = c",
                "b = a + c",
                "a = b + c"
            ],
            correct: "2b = a + c",
            marks: 4,
            negative: 1
        },
        {
            id: 76,
            question: "Which term of the AP 3, 7, 11,... is 95?",
            options: [
                "22",
                "21",
                "23",
                "24"
            ],
            correct: "24",
            marks: 4,
            negative: 1
        },
        {
            id: 77,
            question: "If a, ar, ar²,... is a GP and ar³ = 8a, then r equals:",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            correct: "2",
            marks: 4,
            negative: 1
        },
        {
            id: 78,
            question: "The expansion of (1 - x)^6 contains:",
            options: [
                "Only positive terms",
                "Only negative terms",
                "Alternating signs",
                "Zero terms"
            ],
            correct: "Alternating signs",
            marks: 4,
            negative: 1
        },
        {
            id: 79,
            question: "The coefficient of x⁴ in (1 + x)⁸ is:",
            options: [
                "70",
                "56",
                "64",
                "60"
            ],
            correct: "70",
            marks: 4,
            negative: 1
        },
        {
            id: 80,
            question: "If the 3rd term in binomial expansion of (1 + x)^n is 120, find n.",
            options: [
                "9",
                "10",
                "11",
                "8"
            ],
            correct: "10",
            marks: 4,
            negative: 1
        },
        {
            id: 81,
            question: "In an AP, the sum of first 20 terms is 210. If the first term is 5, what is the common difference?",
            options: [
                "0.5",
                "1",
                "2",
                "None"
            ],
            correct: "1",
            marks: 4,
            negative: 1
        },
        {
            id: 82,
            question: "The nth term of a sequence is given by Tn = 3n + 2. What type of sequence is this?",
            options: [
                "AP",
                "GP",
                "HP",
                "None"
            ],
            correct: "AP",
            marks: 4,
            negative: 1
        },
        {
            id: 83,
            question: "What is the sum of the first 5 terms of the GP: 2, 4, 8, ...?",
            options: [
                "62",
                "64",
                "60",
                "66"
            ],
            correct: "62",
            marks: 4,
            negative: 1
        },
        {
            id: 84,
            question: "Which of the following sequences is a GP?",
            options: [
                "1, 2, 4, 8",
                "2, 5, 8, 11",
                "1, 1/2, 1/3",
                "3, 6, 9, 12"
            ],
            correct: "1, 2, 4, 8",
            marks: 4,
            negative: 1
        },
        {
            id: 85,
            question: "If a, b, c are in GP and b = 6, a = 3, then c equals:",
            options: [
                "9",
                "12",
                "6",
                "None"
            ],
            correct: "12",
            marks: 4,
            negative: 1
        },
        {
            id: 86,
            question: "How many terms are there in the expansion of (2x - 3y)^4?",
            options: [
                "4",
                "5",
                "6",
                "None"
            ],
            correct: "5",
            marks: 4,
            negative: 1
        },
        {
            id: 87,
            question: "The 4th term in expansion of (x + 2)^5 is:",
            options: [
                "80x²",
                "80x",
                "40x²",
                "60x²"
            ],
            correct: "80x²",
            marks: 4,
            negative: 1
        },
        {
            id: 88,
            question: "In (x + 1)^n, the ratio of coefficients of 2nd and 3rd term is 3:4. Find n.",
            options: [
                "5",
                "6",
                "7",
                "8"
            ],
            correct: "7",
            marks: 4,
            negative: 1
        },
        {
            id: 89,
            question: "What is the constant term in expansion of (x + 1/x)^6?",
            options: [
                "20",
                "15",
                "10",
                "None"
            ],
            correct: "20",
            marks: 4,
            negative: 1
        },
        {
            id: 90,
            question: "If (a + b)^6 is expanded, what is the sum of the coefficients?",
            options: [
                "64",
                "128",
                "32",
                "None"
            ],
            correct: "64",
            marks: 4,
            negative: 1
        },
        {
            id: 91,
            question: "If 10sin⁴θ + 15cos⁴θ = 6, then (27csc⁶θ + 8sec⁶θ) / (16sec⁸θ) equals:",
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
            id: 92,
            question: "In a triangle, the angles are in the ratio 1:2:7. The ratio of the greatest side to the smallest side is:",
            options: [
                "(√5 + 1)/(√5 - 1)",
                "√3",
                "2",
                "√2"
            ],
            correct: "(√5 + 1)/(√5 - 1)",
            marks: 4,
            negative: 1
        },
        {
            id: 93,
            question: "If the sides of a triangle are 13, 7, and 8, the largest angle is:",
            options: [
                "90°",
                "60°",
                "120°",
                "150°"
            ],
            correct: "120°",
            marks: 4,
            negative: 1
        },
        {
            id: 94,
            question: "If (s-a)(s-b) = s(s-c) in triangle ABC, then angle C is:",
            options: [
                "90°",
                "45°",
                "60°",
                "30°"
            ],
            correct: "90°",
            marks: 4,
            negative: 1
        },
        {
            id: 95,
            question: "In triangle ABC, (b+c)cosA + (c+a)cosB + (a+b)cosC = ?",
            options: [
                "Rr",
                "a+b+c",
                "0",
                "None"
            ],
            correct: "a+b+c",
            marks: 4,
            negative: 1
        },
        {
            id: 96,
            question: "Angles of triangle ABC are in arithmetic progression → identity among sides?",
            options: [
                "b² + c² - ac = b²",
                "c² = a² + b²",
                "c² = a² + b² + ab",
                "None"
            ],
            correct: "c² = a² + b² + ab",
            marks: 4,
            negative: 1
        },
        {
            id: 97,
            question: "If a sinA = b sinB in ΔABC → triangle is:",
            options: [
                "Right-angled isosceles",
                "Equilateral",
                "Right-angled",
                "Isosceles"
            ],
            correct: "Isosceles",
            marks: 4,
            negative: 1
        },
        {
            id: 98,
            question: "Angles A=45°, B=75° in triangle → a + c√2 equals:",
            options: [
                "a+b+c",
                "(a+b+c)/2",
                "2b",
                "a"
            ],
            correct: "2b",
            marks: 4,
            negative: 1
        },
        {
            id: 99,
            question: "Angles A,B,C in AP → relation?",
            options: [
                "b²+c²= a²",
                "a²+c²= b²",
                "a²+b²= c²",
                "None"
            ],
            correct: "None",
            marks: 4,
            negative: 1
        },
        {
            id: 100,
            question: "Perimeter of triangle ABC = 6 × mean of sines of angles; if b=2, B = ?",
            options: [
                "30°",
                "60°",
                "90°",
                "120°"
            ],
            correct: "60°",
            marks: 4,
            negative: 1
        },
        {
            id: 101,
            question: "Area = 80 cm², perimeter = 8 cm → inradius?",
            options: [
                "20 cm",
                "10 cm",
                "5 cm",
                "None"
            ],
            correct: "20 cm",
            marks: 4,
            negative: 1
        },
        {
            id: 102,
            question: "b² + c² = 3a², then cotB + cotC - cotA = ?",
            options: [
                "1",
                "0",
                "ac/4",
                "ab/4"
            ],
            correct: "1",
            marks: 4,
            negative: 1
        },
        {
            id: 103,
            question: "Angles 1:2:7 in triangle → greatest/least side ratio?",
            options: [
                "same as Q2",
                "√3",
                "2",
                "√2"
            ],
            correct: "same as Q2",
            marks: 4,
            negative: 1
        },
        {
            id: 104,
            question: "If in ΔABC, a cos²(C/2) + c cos²(A/2) = 3b/2 → sides are in?",
            options: [
                "AP",
                "GP",
                "HP",
                "None"
            ],
            correct: "AP",
            marks: 4,
            negative: 1
        },
        {
            id: 105,
            question: "a sinA = b sinB → triangle type?",
            options: [
                "Equilateral",
                "Isosceles",
                "Scalene",
                "Right-angled"
            ],
            correct: "Isosceles",
            marks: 4,
            negative: 1
        },
        {
            id: 106,
            question: "Principal value of tan⁻¹(tan(3π/5)):",
            options: [
                "2π/5",
                "-2π/5",
                "3π/5",
                "-3π/5"
            ],
            correct: "-2π/5",
            marks: 4,
            negative: 1
        },
        {
            id: 107,
            question: "sin[π/3 - sin⁻¹(-1/2)] = ?",
            options: [
                "1/2",
                "1/3",
                "-1",
                "1"
            ],
            correct: "1",
            marks: 4,
            negative: 1
        },
        {
            id: 108,
            question: "Domain of sin⁻¹(2x):",
            options: [
                "[0,1]",
                "[-1,1]",
                "[-1/2,1/2]",
                "[-2,2]"
            ],
            correct: "[-1/2,1/2]",
            marks: 4,
            negative: 1
        },
        {
            id: 109,
            question: "If sin⁻¹x + sin⁻¹y = π/2, then cos⁻¹x + cos⁻¹y = ?",
            options: [
                "π/2",
                "π",
                "0",
                "2π/3"
            ],
            correct: "π",
            marks: 4,
            negative: 1
        },
        {
            id: 110,
            question: "Principal branch of cos⁻¹x is:",
            options: [
                "[-π/2, π/2]",
                "(0, π)",
                "[0, π]",
                "(0, π)\\{π/2}"
            ],
            correct: "[0, π]",
            marks: 4,
            negative: 1
        },
        {
            id: 111,
            question: "If 2tan⁻¹(cosx) = tan⁻¹(2cscx), value of x is:",
            options: [
                "0",
                "π/4",
                "π/2",
                "π"
            ],
            correct: "π/4",
            marks: 4,
            negative: 1
        },
        {
            id: 112,
            question: "cos(sin⁻¹(3/5) + sin⁻¹(5/13) + sin⁻¹(33/65)) = ?",
            options: [
                "0",
                "1",
                "-1",
                "1/2"
            ],
            correct: "0",
            marks: 4,
            negative: 1
        },
        {
            id: 113,
            question: "Number of real solutions of 2sin⁻¹x + 3cos⁻¹x = 2π/5:",
            options: [
                "0",
                "1",
                "2",
                "3"
            ],
            correct: "2",
            marks: 4,
            negative: 1
        },
        {
            id: 114,
            question: "For n ∈ N, cot⁻¹3 + cot⁻¹4 + cot⁻¹5 + cot⁻¹n = π/4. n = ?",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            correct: "2",
            marks: 4,
            negative: 1
        },
        {
            id: 115,
            question: "Number of solutions of sin⁻¹x = 2tan⁻¹x for x ∈ (-1,1]:",
            options: [
                "0",
                "1",
                "2",
                "3"
            ],
            correct: "1",
            marks: 4,
            negative: 1
        },
        {
            id: 116,
            question: "If sin⁻¹((x+1)/√(x²+2x+2)) - sin⁻¹(x/√(x²+1)) = π/4, find x:",
            options: [
                "0",
                "1",
                "√3",
                "1/√3"
            ],
            correct: "1",
            marks: 4,
            negative: 1
        },
        {
            id: 117,
            question: "Domain of f(x) = sin⁻¹((x²–3x+2)/(x²+2x+7)):",
            options: [
                "all real",
                "[-1,1]",
                "finite subset",
                "None"
            ],
            correct: "all real",
            marks: 4,
            negative: 1
        },
        {
            id: 118,
            question: "Sum of absolute max and min of f(x) = tan⁻¹(sinx - cosx) on [0, π]:",
            options: [
                "0",
                "π/2",
                "π/4",
                "1"
            ],
            correct: "π/2",
            marks: 4,
            negative: 1
        },
        {
            id: 119,
            question: "tan(2tan⁻¹(3/5) + sin⁻¹(5/13)) = ?",
            options: [
                "0",
                "1",
                "2",
                "3"
            ],
            correct: "3",
            marks: 4,
            negative: 1
        },
        {
            id: 120,
            question: "sin⁻¹(x)² - cos⁻¹(x)² = a; find in terms of x:",
            options: [
                "-π/2",
                "π/2",
                "depends on x",
                "0"
            ],
            correct: "depends on x",
            marks: 4,
            negative: 1
        },
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


//    useEffect(() => {
//            const shuffled = [...questions].sort(() => Math.random() - 0.5);
//            setShuffledQuestions(shuffled);
//        }, []);

useEffect(() => {
  // Shuffle helper
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  // Shuffle each subject
  const shuffledPhysics = shuffle(physicsquestions).slice(0, 25);
  const shuffledChemistry = shuffle(chemistryquestions).slice(0, 25);
  const shuffledMath = shuffle(mathquestions).slice(0, 25);

  // Combine all subjects into one list
  const combined = [
    ...shuffledPhysics.map((q) => ({ ...q, subject: "Physics" })),
    ...shuffledChemistry.map((q) => ({ ...q, subject: "Chemistry" })),
    ...shuffledMath.map((q) => ({ ...q, subject: "Math" })),
  ];

  setShuffledQuestions(combined);
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
   
       const printPDF = async (finalScore = score) => {
           const doc = new jsPDF();
           const currentDateTime = new Date().toLocaleString();
   
           // Header
           doc.setFontSize(18);
           doc.text("Exam Results - MOCK", 14, 20);
   
           doc.setFontSize(12);
           doc.text(`Name: ${studentDetails.name}`, 14, 28);
           doc.text(`Class: ${studentDetails.studentClass}`, 14, 34);
           doc.text(`School: ${studentDetails.school}`, 14, 40);
           doc.text(`Date & Time: ${currentDateTime}`, 14, 46);
   
           // Table
           const tableData = shuffledQuestions.map((q, idx) => [
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
               `Total Score: ${finalScore} / ${shuffledQuestions.reduce((a, q) => a + q.marks, 0)}`,
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
   
   
   
       const totalMarks = shuffledQuestions.reduce((acc, q) => acc + q.marks, 0);
   
       const percentage = ((score / totalMarks) * 100).toFixed(2);
       // const pageSize = 10;
       // const paginatedQuestions = shuffledQuestions.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
   
   
   
   
       return (
           <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
               <h1 className="text-2xl font-bold text-center mb-6">MOC Full Syllabus</h1>
   
               
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
   
   
   
   
   