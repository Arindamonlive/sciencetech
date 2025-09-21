import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function MathExamPage() {
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
    
    
    
    
    