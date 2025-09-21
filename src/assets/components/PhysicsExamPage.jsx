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
    
    
    
    
    