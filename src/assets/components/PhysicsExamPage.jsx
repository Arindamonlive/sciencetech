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
  },
    {
    id: 151,
    question: "The gravitational force between two masses is F. If the distance between them is doubled, the new force becomes:",
    options: [
      "F",
      "F/2",
      "F/4",
      "4F"
    ],
    correct: "F/4",
    marks: 4,
    negative: 1
  },
  {
    id: 152,
    question: "The value of acceleration due to gravity at Earth’s surface is g. Its value at height h (h << R) above the surface is approximately:",
    options: [
      "g",
      "g(1 – 2h/R)",
      "g(1 – h/R)",
      "g(1 – h/2R)"
    ],
    correct: "g(1 – h/R)",
    marks: 4,
    negative: 1
  },
  {
    id: 153,
    question: "A body weighs 72 N on the surface of Earth. What will be its weight on the surface of Moon ($g_{moon} = g/6$)?",
    options: [
      "72 N",
      "36 N",
      "12 N",
      "432 N"
    ],
    correct: "12 N",
    marks: 4,
    negative: 1
  },
  {
    id: 154,
    question: "The escape velocity from Earth’s surface is approximately:",
    options: [
      "7 km/s",
      "11.2 km/s",
      "9.8 km/s",
      "15 km/s"
    ],
    correct: "11.2 km/s",
    marks: 4,
    negative: 1
  },
  {
    id: 155,
    question: "A satellite revolves close to Earth’s surface. Its orbital velocity depends on:",
    options: [
      "Mass of Earth only",
      "Radius of Earth only",
      "Both mass and radius of Earth",
      "Independent of Earth"
    ],
    correct: "Both mass and radius of Earth",
    marks: 4,
    negative: 1
  },
  {
    id: 156,
    question: "If the radius of Earth decreases by 1% without change in mass, the acceleration due to gravity on the surface will:",
    options: [
      "Increase by 1%",
      "Increase by 2%",
      "Decrease by 1%",
      "Remain constant"
    ],
    correct: "Increase by 2%",
    marks: 4,
    negative: 1
  },
  {
    id: 157,
    question: "Gravitational potential energy of a body of mass m at a height h (h << R) is approximately:",
    options: [
      "mgh",
      "–mgh",
      "–GMm/R",
      "–GMm/(R+h)"
    ],
    correct: "mgh",
    marks: 4,
    negative: 1
  },
  {
    id: 158,
    question: "A satellite is in circular orbit around Earth. The ratio of kinetic energy to potential energy is:",
    options: [
      "1",
      "2",
      "1/2",
      "–1"
    ],
    correct: "1/2",
    marks: 4,
    negative: 1
  },
  {
    id: 159,
    question: "The time period of a geostationary satellite is:",
    options: [
      "24 h",
      "12 h",
      "6 h",
      "48 h"
    ],
    correct: "24 h",
    marks: 4,
    negative: 1
  },
  {
    id: 160,
    question: "The gravitational potential at a point due to a mass M at distance r is:",
    options: [
      "GM/r²",
      "–GM/r",
      "–GM/r²",
      "GM/r"
    ],
    correct: "–GM/r",
    marks: 4,
    negative: 1
  },
  {
    id: 161,
    question: "A body of mass m is raised to a height equal to the radius of Earth R. The increase in potential energy is:",
    options: [
      "mgR",
      "2mgR",
      "mgR/2",
      "Zero"
    ],
    correct: "mgR/2",
    marks: 4,
    negative: 1
  },
  {
    id: 162,
    question: "The value of g at the center of Earth is:",
    options: [
      "g",
      "g/2",
      "Zero",
      "Infinity"
    ],
    correct: "Zero",
    marks: 4,
    negative: 1
  },
  {
    id: 163,
    question: "The orbital speed of a satellite just above Earth’s surface is:",
    options: [
      "√(gR)",
      "√(2gR)",
      "gR",
      "g"
    ],
    correct: "√(gR)",
    marks: 4,
    negative: 1
  },
  {
    id: 164,
    question: "If a satellite is projected with velocity greater than escape velocity, it will:",
    options: [
      "Revolve around Earth",
      "Fall back to Earth",
      "Escape from Earth’s gravitational field",
      "Move in elliptical orbit"
    ],
    correct: "Escape from Earth’s gravitational field",
    marks: 4,
    negative: 1
  },
  {
    id: 165,
    question: "The ratio of acceleration due to gravity at poles and equator (neglecting Earth’s rotation) is:",
    options: [
      "1",
      ">1",
      "<1",
      "0"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 166,
    question: "The SI unit of Young’s modulus is:",
    options: [
      "N",
      "N/m",
      "N/m²",
      "J"
    ],
    correct: "N/m²",
    marks: 4,
    negative: 1
  },
  {
    id: 167,
    question: "Stress/strain is called:",
    options: [
      "Elastic limit",
      "Young’s modulus",
      "Bulk modulus",
      "Modulus of elasticity"
    ],
    correct: "Modulus of elasticity",
    marks: 4,
    negative: 1
  },
  {
    id: 168,
    question: "For a liquid in capillary tube, rise of liquid is due to:",
    options: [
      "Viscosity",
      "Surface tension",
      "Density",
      "Elasticity"
    ],
    correct: "Surface tension",
    marks: 4,
    negative: 1
  },
  {
    id: 169,
    question: "Terminal velocity of a spherical body of radius r falling in a viscous medium is proportional to:",
    options: [
      "r",
      "r²",
      "r³",
      "1/r"
    ],
    correct: "r²",
    marks: 4,
    negative: 1
  },
  {
    id: 170,
    question: "Bernoulli’s theorem is based on:",
    options: [
      "Conservation of mass",
      "Conservation of energy",
      "Conservation of momentum",
      "Newton’s second law"
    ],
    correct: "Conservation of energy",
    marks: 4,
    negative: 1
  },
  {
    id: 171,
    question: "A liquid drop tends to assume spherical shape due to:",
    options: [
      "Viscosity",
      "Cohesion",
      "Surface tension",
      "Pressure"
    ],
    correct: "Surface tension",
    marks: 4,
    negative: 1
  },
  {
    id: 172,
    question: "The pressure at depth h in a liquid of density $\\rho$ is:",
    options: [
      "$\\rho gh$",
      "$\\rho/h$",
      "$h/\\rho$",
      "$\\rho h^2g$"
    ],
    correct: "$\\rho gh$",
    marks: 4,
    negative: 1
  },
  {
    id: 173,
    question: "If excess pressure inside a soap bubble of radius r is P, then surface tension is:",
    options: [
      "Pr/2",
      "Pr/4",
      "P/2r",
      "2Pr"
    ],
    correct: "Pr/4",
    marks: 4,
    negative: 1
  },
  {
    id: 174,
    question: "The bulk modulus of an incompressible liquid is:",
    options: [
      "Zero",
      "Infinite",
      "Finite",
      "Equal to its density"
    ],
    correct: "Infinite",
    marks: 4,
    negative: 1
  },
  {
    id: 175,
    question: "A hydraulic press works on:",
    options: [
      "Pascal’s law",
      "Archimedes’ principle",
      "Newton’s law",
      "Hooke’s law"
    ],
    correct: "Pascal’s law",
    marks: 4,
    negative: 1
  },
  {
    id: 176,
    question: "Streamline flow is possible when:",
    options: [
      "Reynolds number is less than 2000",
      "Reynolds number is greater than 2000",
      "Velocity is very high",
      "Flow is turbulent"
    ],
    correct: "Reynolds number is less than 2000",
    marks: 4,
    negative: 1
  },
  {
    id: 177,
    question: "The dimensional formula of viscosity coefficient $\\eta$ is:",
    options: [
      "[ML⁻¹T⁻²]",
      "[ML⁻¹T⁻¹]",
      "[M⁻¹L⁻¹T]",
      "[M⁰LT⁻²]"
    ],
    correct: "[ML⁻¹T⁻¹]",
    marks: 4,
    negative: 1
  },
  {
    id: 178,
    question: "If work done in stretching a wire is W, then elastic potential energy per unit volume is:",
    options: [
      "W/V",
      "W/l",
      "W/A",
      "W/m"
    ],
    correct: "W/V",
    marks: 4,
    negative: 1
  },
  {
    id: 179,
    question: "The rise of liquid in capillary tube is inversely proportional to:",
    options: [
      "Surface tension",
      "Density",
      "Radius of tube",
      "Cohesive force"
    ],
    correct: "Radius of tube",
    marks: 4,
    negative: 1
  },
  {
    id: 180,
    question: "The Poisson’s ratio is defined as:",
    options: [
      "Longitudinal strain/lateral strain",
      "Stress/strain",
      "Lateral strain/longitudinal strain",
      "Bulk strain/longitudinal strain"
    ],
    correct: "Lateral strain/longitudinal strain",
    marks: 4,
    negative: 1
  },
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
  },
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
  },
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
  },
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
  },
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
  doc.text("Exam Results - Physics", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Physics</h1>
    
                
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
    
    
    
    
    