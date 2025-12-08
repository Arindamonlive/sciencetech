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
  },
  {
    id: 151,
    question: "The slope of the line passing through (3, –2) and (7, 6) is:",
    options: [
      "2",
      "1",
      "3/2",
      "2/3"
    ],
    correct: "2",
    marks: 4,
    negative: 1
  },
  {
    id: 152,
    question: "The equation of a line with slope 3 and y-intercept –2 is:",
    options: [
      "y=3x–2",
      "y=–3x–2",
      "y=3x+2",
      "y=–3x+2"
    ],
    correct: "y=3x–2",
    marks: 4,
    negative: 1
  },
  {
    id: 153,
    question: "Condition for lines $a_1x+b_1y+c_1=0$ and $a_2x+b_2y+c_2=0$ to be parallel:",
    options: [
      "a1/a2=b1/b2",
      "a1b2=a2b1",
      "a1/a2≠b1/b2",
      "none"
    ],
    correct: "a1b2=a2b1",
    marks: 4,
    negative: 1
  },
  {
    id: 154,
    question: "Angle between line $y=\\sqrt{3}x$ and x-axis is:",
    options: [
      "30°",
      "45°",
      "60°",
      "90°"
    ],
    correct: "60°",
    marks: 4,
    negative: 1
  },
  {
    id: 155,
    question: "Distance of (2,–1) from line $3x–4y+5=0$:",
    options: [
      "1",
      "2",
      "3",
      "5"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 156,
    question: "Equation of line through (1,2) perpendicular to $2x+3y=5$:",
    options: [
      "3x–2y+1=0",
      "2x+3y–8=0",
      "2x–3y+4=0",
      "3x+2y–7=0"
    ],
    correct: "3x–2y+1=0",
    marks: 4,
    negative: 1
  },
  {
    id: 157,
    question: "Intersection of $x+y=5$ and $x–y=1$:",
    options: [
      "(3,2)",
      "(2,3)",
      "(1,4)",
      "(4,1)"
    ],
    correct: "(3,2)",
    marks: 4,
    negative: 1
  },
  {
    id: 158,
    question: "Line through (–1,2) with equal intercepts:",
    options: [
      "x+y=1",
      "x–y=–3",
      "x+y=2",
      "x–y=1"
    ],
    correct: "x+y=2",
    marks: 4,
    negative: 1
  },
  {
    id: 159,
    question: "Centroid of triangle bounded by $x=0$, $y=0$, $x+y=4$:",
    options: [
      "(1,1)",
      "(2/3,2/3)",
      "(4/3,4/3)",
      "(2,2)"
    ],
    correct: "(4/3,4/3)",
    marks: 4,
    negative: 1
  },
  {
    id: 160,
    question: "Condition for perpendicular lines $lx+my+n=0$ and $ax+by+c=0$:",
    options: [
      "la+mb=0",
      "lb–ma=0",
      "ab+mn=0",
      "la–mb=0"
    ],
    correct: "la+mb=0",
    marks: 4,
    negative: 1
  },
  {
    id: 161,
    question: "Line bisecting acute angle between $3x–4y=0$ and $6x–8y+9=0$:",
    options: [
      "x/3=y/4",
      "x/6=y/8",
      "3x–4y=±9",
      "none"
    ],
    correct: "x/3=y/4",
    marks: 4,
    negative: 1
  },
  {
    id: 162,
    question: "Line with intercepts 2 and –3:",
    options: [
      "x/2+y/(–3)=1",
      "x/2+y/3=1",
      "3x+2y=6",
      "x/3+y/2=1"
    ],
    correct: "x/2+y/(–3)=1",
    marks: 4,
    negative: 1
  },
  {
    id: 163,
    question: "Line equidistant from (3,–4) and (–5,6):",
    options: [
      "x+y=0",
      "x–y=0",
      "4x+3y=0",
      "5x–y=0"
    ],
    correct: "x+y=0",
    marks: 4,
    negative: 1
  },
  {
    id: 164,
    question: "Altitude from (2,3) to base (0,0),(4,0):",
    options: [
      "x=2",
      "y=3",
      "x–2=0",
      "y–3=0"
    ],
    correct: "x=2",
    marks: 4,
    negative: 1
  },
  {
    id: 165,
    question: "Perpendicular distance from origin to $3x+4y=12$:",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correct: "2",
    marks: 4,
    negative: 1
  },
  {
    id: 166,
    question: "Centre & radius of $x²+y²–6x+8y–11=0$:",
    options: [
      "(3,–4),2",
      "(3,–4),5",
      "(–3,4),2",
      "(–3,4),5"
    ],
    correct: "(3,–4),5",
    marks: 4,
    negative: 1
  },
  {
    id: 167,
    question: "Circle with center (2,–1), radius 3:",
    options: [
      "(x–2)²+(y+1)²=9",
      "(x+2)²+(y–1)²=9",
      "(x–2)²+(y–1)²=9",
      "none"
    ],
    correct: "(x–2)²+(y+1)²=9",
    marks: 4,
    negative: 1
  },
  {
    id: 168,
    question: "Tangent length from (5,0) to $x²+y²=9$:",
    options: [
      "4",
      "√16",
      "√25",
      "2"
    ],
    correct: "4",
    marks: 4,
    negative: 1
  },
  {
    id: 169,
    question: "Tangent to $x²+y²=25$ at (3,4):",
    options: [
      "3x+4y=25",
      "3x–4y=25",
      "4x–3y=25",
      "3x+4y=12"
    ],
    correct: "3x+4y=25",
    marks: 4,
    negative: 1
  },
  {
    id: 170,
    question: "Circle with diameter (1,2),(3,4):",
    options: [
      "(x–2)²+(y–3)²=2",
      "(x–2)²+(y–3)²=4",
      "(x+2)²+(y+3)²=2",
      "(x+2)²+(y–3)²=4"
    ],
    correct: "(x–2)²+(y–3)²=2",
    marks: 4,
    negative: 1
  },
  {
    id: 171,
    question: "Radical axis of $x²+y²=25$ and $x²+y²–6x=0$:",
    options: [
      "x=3",
      "x=4",
      "x=5",
      "y=3"
    ],
    correct: "x=3",
    marks: 4,
    negative: 1
  },
  {
    id: 172,
    question: "Circle touching x-axis at (2,0), passing (3,4):",
    options: [
      "(x–2)²+(y–2)²=8",
      "(x–2)²+(y–2)²=16",
      "(x–2)²+(y–2)²=10",
      "none"
    ],
    correct: "(x–2)²+(y–2)²=16",
    marks: 4,
    negative: 1
  },
  {
    id: 173,
    question: "Circle through (0,0),(1,0), center (1,1):",
    options: [
      "(x–1)²+(y–1)²=1",
      "(x–1)²+(y–1)²=2",
      "(x–1)²+(y–1)²=3",
      "none"
    ],
    correct: "(x–1)²+(y–1)²=2",
    marks: 4,
    negative: 1
  },
  {
    id: 174,
    question: "Condition for tangency of $x²+y²=a²$ and $y=mx+c$:",
    options: [
      "|c|=√(a²(1+m²))",
      "|c|=a√(1+m²)",
      "c²=a²(1+m²)",
      "none"
    ],
    correct: "c²=a²(1+m²)",
    marks: 4,
    negative: 1
  },
  {
    id: 175,
    question: "Distance of centers if circles touch externally:",
    options: [
      "r1–r2",
      "r1+r2",
      "√(r1²+r2²)",
      "none"
    ],
    correct: "r1+r2",
    marks: 4,
    negative: 1
  },
  {
    id: 176,
    question: "Circle orthogonal to $x²+y²–4x–6y+9=0$, center origin:",
    options: [
      "x²+y²=9",
      "x²+y²=7",
      "x²+y²=5",
      "none"
    ],
    correct: "x²+y²=7",
    marks: 4,
    negative: 1
  },
  {
    id: 177,
    question: "Chord length of $x²+y²=25$ cut by $x=3$:",
    options: [
      "6",
      "8",
      "10",
      "4"
    ],
    correct: "8",
    marks: 4,
    negative: 1
  },
  {
    id: 178,
    question: "Radius if circle $x²+y²+2gx+2fy+c=0$:",
    options: [
      "√(g²+f²–c)",
      "√(g²+f²+c)",
      "g²+f²–c",
      "none"
    ],
    correct: "√(g²+f²–c)",
    marks: 4,
    negative: 1
  },
  {
    id: 179,
    question: "Circle through (0,0),(2,0), center on y-axis:",
    options: [
      "x²+y²–2x=0",
      "x²+y²–2y=0",
      "x²+y²–2x–2y=0",
      "none"
    ],
    correct: "x²+y²–2y=0",
    marks: 4,
    negative: 1
  },
  {
    id: 180,
    question: "Common chord of $x²+y²=25$ and $x²+y²–10x=0$:",
    options: [
      "x=5",
      "x=3",
      "x=4",
      "y=5"
    ],
    correct: "x=5",
    marks: 4,
    negative: 1
  },
  {
    id: 181,
    question: "The eccentricity of a circle is:",
    options: [
      "0",
      "1",
      "Between 0 and 1",
      "Greater than 1"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 182,
    question: "The equation of a circle with centre (h, k) and radius r is:",
    options: [
      "(x+h)²+(y+k)²=r²",
      "(x-h)²+(y-k)²=r²",
      "(x+h)²+(y+k)²=r",
      "(x-h)²+(y-k)²=r"
    ],
    correct: "(x-h)²+(y-k)²=r²",
    marks: 4,
    negative: 1
  },
  {
    id: 183,
    question: "The length of the diameter of the circle $x²+y²-6x-8y+9=0$ is:",
    options: [
      "10",
      "12",
      "14",
      "8"
    ],
    correct: "10",
    marks: 4,
    negative: 1
  },
  {
    id: 184,
    question: "The equation of circle passing through (0,0) and having center at (a, b) is:",
    options: [
      "x²+y²+2ax+2by=0",
      "(x-a)²+(y-b)²=a²+b²",
      "(x-a)²+(y-b)²=a²-b²",
      "None"
    ],
    correct: "(x-a)²+(y-b)²=a²+b²",
    marks: 4,
    negative: 1
  },
  {
    id: 185,
    question: "Equation of the circle concentric with $x²+y²-4x-6y+9=0$ and passing through (1,2) is:",
    options: [
      "x²+y²-4x-6y+9=0",
      "x²+y²-4x-6y+14=0",
      "x²+y²-4x-6y+13=0",
      "None"
    ],
    correct: "x²+y²-4x-6y+13=0",
    marks: 4,
    negative: 1
  },
  {
    id: 186,
    question: "The equation of the parabola whose vertex is at origin and focus at (0, a) is:",
    options: [
      "x²=4ay",
      "y²=4ax",
      "x²=-4ay",
      "y²=-4ax"
    ],
    correct: "x²=4ay",
    marks: 4,
    negative: 1
  },
  {
    id: 187,
    question: "The length of latus rectum of the parabola $y²=4ax$ is:",
    options: [
      "2a",
      "4a",
      "a",
      "None of these"
    ],
    correct: "4a",
    marks: 4,
    negative: 1
  },
  {
    id: 188,
    question: "The equation of directrix of parabola $y²=4ax$ is:",
    options: [
      "x=a",
      "x=-a",
      "y=a",
      "y=-a"
    ],
    correct: "x=-a",
    marks: 4,
    negative: 1
  },
  {
    id: 189,
    question: "The slope of tangent to parabola $y²=4ax$ at point $(x₁,y₁)$ is:",
    options: [
      "y₁/x₁",
      "x₁/y₁",
      "a/x₁",
      "None"
    ],
    correct: "y₁/x₁",
    marks: 4,
    negative: 1
  },
  {
    id: 190,
    question: "The focus of parabola $x²=8y$ is:",
    options: [
      "(0,2)",
      "(0,4)",
      "(0,1)",
      "(0,8)"
    ],
    correct: "(0,2)",
    marks: 4,
    negative: 1
  },
  {
    id: 191,
    question: "The length of latus rectum of parabola $x²=12y$ is:",
    options: [
      "3",
      "6",
      "12",
      "9"
    ],
    correct: "12",
    marks: 4,
    negative: 1
  },
  {
    id: 192,
    question: "The vertex of parabola $(y+3)²=8(x-1)$ is:",
    options: [
      "(1,-3)",
      "(-1,3)",
      "(3,1)",
      "(0,0)"
    ],
    correct: "(1,-3)",
    marks: 4,
    negative: 1
  },
  {
    id: 193,
    question: "The eccentricity of ellipse $x²/a²+y²/b²=1$ (a>b) is:",
    options: [
      "√(a²-b²)/a",
      "√(b²-a²)/a",
      "√(a²+b²)/a",
      "b/a"
    ],
    correct: "√(a²-b²)/a",
    marks: 4,
    negative: 1
  },
  {
    id: 194,
    question: "The coordinates of foci of ellipse $x²/9+y²/5=1$ are:",
    options: [
      "(±√14,0)",
      "(0,±√14)",
      "(±2,0)",
      "(0,±5)"
    ],
    correct: "(±2,0)",
    marks: 4,
    negative: 1
  },
  {
    id: 195,
    question: "The length of latus rectum of ellipse $x²/a²+y²/b²=1$ is:",
    options: [
      "2a²/b",
      "2b²/a",
      "a²/b",
      "b²/a"
    ],
    correct: "2b²/a",
    marks: 4,
    negative: 1
  },
  {
    id: 196,
    question: "Equation of ellipse with foci (±5,0) and major axis length 12 is:",
    options: [
      "x²/36+y²/25=1",
      "x²/25+y²/36=1",
      "x²/144+y²/25=1",
      "None"
    ],
    correct: "x²/36+y²/11=1",
    marks: 4,
    negative: 1
  },
  {
    id: 197,
    question: "The eccentricity of ellipse $9x²+16y²=144$ is:",
    options: [
      "5/3",
      "3/5",
      "√7/4",
      "5/4"
    ],
    correct: "√7/4",
    marks: 4,
    negative: 1
  },
  {
    id: 198,
    question: "The length of minor axis of ellipse $x²/25+y²/16=1$ is:",
    options: [
      "10",
      "8",
      "5",
      "4"
    ],
    correct: "8",
    marks: 4,
    negative: 1
  },
  {
    id: 199,
    question: "The transverse axis of hyperbola $x²/a²-y²/b²=1$ lies along:",
    options: [
      "y-axis",
      "x-axis",
      "line y=x",
      "line y=-x"
    ],
    correct: "x-axis",
    marks: 4,
    negative: 1
  },
  {
    id: 200,
    question: "Eccentricity of hyperbola $x²/9-y²/16=1$ is:",
    options: [
      "5/3",
      "3/5",
      "4/3",
      "3/4"
    ],
    correct: "5/3",
    marks: 4,
    negative: 1
  },
  {
    id: 201,
    question: "The coordinates of foci of hyperbola $x²/25-y²/9=1$ are:",
    options: [
      "(±√34,0)",
      "(0,±√34)",
      "(±5,0)",
      "(0,±3)"
    ],
    correct: "(±√34,0)",
    marks: 4,
    negative: 1
  },
  {
    id: 202,
    question: "The length of latus rectum of hyperbola $x²/a²-y²/b²=1$ is:",
    options: [
      "2b²/a",
      "2a²/b",
      "a²/b",
      "b²/a"
    ],
    correct: "2b²/a",
    marks: 4,
    negative: 1
  },
  {
    id: 203,
    question: "The asymptotes of hyperbola $x²/16-y²/9=1$ are:",
    options: [
      "y=±(3/4)x",
      "y=±(4/3)x",
      "y=±x",
      "y=±2x"
    ],
    correct: "y=±(3/4)x",
    marks: 4,
    negative: 1
  },
  {
    id: 204,
    question: "The equation of conjugate hyperbola of $x²/a²-y²/b²=1$ is:",
    options: [
      "y²/a²-x²/b²=1",
      "x²/a²+y²/b²=1",
      "y²/b²-x²/a²=1",
      "None"
    ],
    correct: "y²/b²-x²/a²=1",
    marks: 4,
    negative: 1
  },
  {
    id: 205,
    question: "The eccentricity of rectangular hyperbola is:",
    options: [
      "√2",
      "1",
      "2",
      "√3"
    ],
    correct: "√2",
    marks: 4,
    negative: 1
  },
  {
    id: 206,
    question: "The general equation of second degree in x and y represents:",
    options: [
      "Pair of lines",
      "Circle",
      "Conic",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 207,
    question: "The equation $x²+2y²-4x+6y+3=0$ represents:",
    options: [
      "Circle",
      "Ellipse",
      "Hyperbola",
      "Parabola"
    ],
    correct: "Ellipse",
    marks: 4,
    negative: 1
  },
  {
    id: 208,
    question: "The condition for general equation $ax²+2hxy+by²+2gx+2fy+c=0$ to represent a circle is:",
    options: [
      "a=b,h=0",
      "a=b,h≠0",
      "a≠b,h=0",
      "None"
    ],
    correct: "a=b,h=0",
    marks: 4,
    negative: 1
  },
  {
    id: 209,
    question: "The eccentricity of parabola is always:",
    options: [
      "0",
      "1",
      "<1",
      ">1"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 210,
    question: "The locus of a point which moves such that its distance from a fixed point is proportional to its distance from a fixed line is:",
    options: [
      "Circle",
      "Ellipse",
      "Parabola",
      "Conic"
    ],
    correct: "Conic",
    marks: 4,
    negative: 1
  },
  {
    id: 211,
    question: "The value of $\\lim_{x\\to 0} (\\sin 3x / x)$ is:",
    options: [
      "0",
      "1",
      "3",
      "Does not exist"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 212,
    question: "$\\lim_{x\\to 0} (1 - \\cos 2x)/x^2 =$",
    options: [
      "0",
      "2",
      "1",
      "4"
    ],
    correct: "2",
    marks: 4,
    negative: 1
  },
  {
    id: 213,
    question: "$\\lim_{x\\to \\pi/2} (\\tan x - \\sec x) =$",
    options: [
      "$\\infty$",
      "-1",
      "0",
      "Does not exist"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 214,
    question: "$\\lim_{x\\to 0} (e^x - 1)/x =$",
    options: [
      "0",
      "1",
      "e",
      "Does not exist"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 215,
    question: "$\\lim_{x\\to 0} (a^x - 1)/x =$",
    options: [
      "1",
      "a",
      "$\\log_e a$",
      "a - 1"
    ],
    correct: "$\\log_e a$",
    marks: 4,
    negative: 1
  },
  {
    id: 216,
    question: "$\\lim_{x\\to 0} (x - \\sin x)/x^3 =$",
    options: [
      "0",
      "1/3!",
      "1/6",
      "0"
    ],
    correct: "1/6",
    marks: 4,
    negative: 1
  },
  {
    id: 217,
    question: "$\\lim_{x\\to 0} ((1 + 2x)^{(1/x)}) =$",
    options: [
      "$e^2$",
      "e",
      "1",
      "2"
    ],
    correct: "$e^2$",
    marks: 4,
    negative: 1
  },
  {
    id: 218,
    question: "$\\lim_{x\\to 0} ((\\tan x)/x) =$",
    options: [
      "0",
      "1",
      "$\\infty$",
      "Does not exist"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 219,
    question: "$\\lim_{x\\to 0} (\\ln(1 + 3x)/x) =$",
    options: [
      "3",
      "1/3",
      "$e^3$",
      "Does not exist"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 220,
    question: "$\\lim_{x\\to 0} ((1 + x)^{(1/x)}) =$",
    options: [
      "e",
      "1",
      "0",
      "$\\infty$"
    ],
    correct: "e",
    marks: 4,
    negative: 1
  },
  {
    id: 221,
    question: "Function $f(x)=|x|$ is continuous at $x=0$ because:",
    options: [
      "Left limit $\\ne$ Right limit",
      "Left limit = Right limit = $f(0)$",
      "Not defined at 0",
      "None"
    ],
    correct: "Left limit = Right limit = $f(0)$",
    marks: 4,
    negative: 1
  },
  {
    id: 222,
    question: "$f(x)=1/x$ is continuous at:",
    options: [
      "$x=0$",
      "$x=1$",
      "$x=-1$",
      "Except $x=0$"
    ],
    correct: "Except $x=0$",
    marks: 4,
    negative: 1
  },
  {
    id: 223,
    question: "Function $f(x)=x^2$ is continuous:",
    options: [
      "At all real $x$",
      "Only at $x=0$",
      "Only at $x=1$",
      "None"
    ],
    correct: "At all real $x$",
    marks: 4,
    negative: 1
  },
  {
    id: 224,
    question: "If $f(x)=\\sin x/x$, then $f$ is continuous at $x=0$ if $f(0)=$",
    options: [
      "0",
      "1",
      "Undefined",
      "-1"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 225,
    question: "Greatest integer function $[x]$ is discontinuous at:",
    options: [
      "Integer values",
      "Non-integers",
      "Rational numbers",
      "Irrationals"
    ],
    correct: "Integer values",
    marks: 4,
    negative: 1
  },
  {
    id: 226,
    question: "Function $f(x)=|x|/x$ is discontinuous at:",
    options: [
      "$x=1$",
      "$x=-1$",
      "$x=0$",
      "None"
    ],
    correct: "$x=0$",
    marks: 4,
    negative: 1
  },
  {
    id: 227,
    question: "If $f(x)=x^3-6x^2+11x-6$, continuity at $x=1$ implies:",
    options: [
      "$f(1)=0$",
      "$f(1)=1$",
      "$f(1)=2$",
      "$f(1)=3$"
    ],
    correct: "$f(1)=0$",
    marks: 4,
    negative: 1
  },
  {
    id: 228,
    question: "$f(x)=1/(x-1)$ is discontinuous at:",
    options: [
      "$x=1$",
      "$x=0$",
      "$x=-1$",
      "None"
    ],
    correct: "$x=1$",
    marks: 4,
    negative: 1
  },
  {
    id: 229,
    question: "If $f(x)=x$ for rational $x$, $-x$ for irrational $x$, then $f$ is continuous at:",
    options: [
      "$x=0$",
      "$x=1$",
      "$x=-1$",
      "None"
    ],
    correct: "$x=0$",
    marks: 4,
    negative: 1
  },
  {
    id: 230,
    question: "Function $\\sin x/x$ is continuous for:",
    options: [
      "All $x\\ne 0$",
      "Only at $x=0$",
      "Nowhere",
      "Everywhere if $f(0)=1$"
    ],
    correct: "Everywhere if $f(0)=1$",
    marks: 4,
    negative: 1
  },
  {
    id: 231,
    question: "$f(x)=|x|$ is differentiable at $x=0$?",
    options: [
      "Yes",
      "No",
      "Only right diff",
      "Only left diff"
    ],
    correct: "No",
    marks: 4,
    negative: 1
  },
  {
    id: 232,
    question: "Derivative of $\\sin x$ is:",
    options: [
      "$\\cos x$",
      "$-\\cos x$",
      "$-\\sin x$",
      "$\\tan x$"
    ],
    correct: "$\\cos x$",
    marks: 4,
    negative: 1
  },
  {
    id: 233,
    question: "Derivative of $e^x$ is:",
    options: [
      "$e^x$",
      "1",
      "$\\ln(e)$",
      "e"
    ],
    correct: "$e^x$",
    marks: 4,
    negative: 1
  },
  {
    id: 234,
    question: "$d/dx (\\ln x) =$",
    options: [
      "1/x",
      "x",
      "$e^x$",
      "$\\log_{10}x$"
    ],
    correct: "1/x",
    marks: 4,
    negative: 1
  },
  {
    id: 235,
    question: "$f(x)=x^3$ is differentiable at:",
    options: [
      "Only at $x=0$",
      "All real $x$",
      "Only positive $x$",
      "None"
    ],
    correct: "All real $x$",
    marks: 4,
    negative: 1
  },
  {
    id: 236,
    question: "Derivative of $\\tan x =$",
    options: [
      "$\\sec^2 x$",
      "$\\cos^2 x$",
      "$\\sin^2 x$",
      "$\\csc^2 x$"
    ],
    correct: "$\\sec^2 x$",
    marks: 4,
    negative: 1
  },
  {
    id: 237,
    question: "$f(x)=|x|^3$ is differentiable at:",
    options: [
      "$x=0$",
      "All $x$",
      "None",
      "$x>0$ only"
    ],
    correct: "All $x$",
    marks: 4,
    negative: 1
  },
  {
    id: 238,
    question: "If $y=\\sin^{-1} x$, $dy/dx =$",
    options: [
      "$1/\\sqrt{1-x^2}$",
      "$\\sqrt{1-x^2}$",
      "$x/\\sqrt{1-x^2}$",
      "$-1/\\sqrt{1-x^2}$"
    ],
    correct: "$1/\\sqrt{1-x^2}$",
    marks: 4,
    negative: 1
  },
  {
    id: 239,
    question: "$d/dx (x^x) =$",
    options: [
      "$x^x(1+\\ln x)$",
      "$x^x(\\ln x)$",
      "$x^x$",
      "$\\ln(x^x)$"
    ],
    correct: "$x^x(1+\\ln x)$",
    marks: 4,
    negative: 1
  },
  {
    id: 240,
    question: "If $f(x)=\\max(x, -x)$, then differentiable at:",
    options: [
      "$x=0$",
      "$x>0$ only",
      "$x<0$ only",
      "None"
    ],
    correct: "None",
    marks: 4,
    negative: 1
  },
  {
    id: 241,
    question: "The slope of the tangent to the curve $y = x^2 + 3x + 2$ at $x = 1$ is:",
    options: [
      "2",
      "3",
      "5",
      "7"
    ],
    correct: "5",
    marks: 4,
    negative: 1
  },
  {
    id: 242,
    question: "The equation of the tangent to $y = x^3$ at the point $(2, 8)$ is:",
    options: [
      "$y = 12x - 16$",
      "$y = 6x - 4$",
      "$y = 3x + 2$",
      "$y = 12x - 8$"
    ],
    correct: "$y = 12x - 16$",
    marks: 4,
    negative: 1
  },
  {
    id: 243,
    question: "If $y = \\sin(x^2)$, then $dy/dx = \\text{?}$",
    options: [
      "$2x \\cos(x^2)$",
      "$2x \\sin(x^2)$",
      "$\\cos(x^2)$",
      "$x \\cos(x^2)$"
    ],
    correct: "$2x \\cos(x^2)$",
    marks: 4,
    negative: 1
  },
  {
    id: 244,
    question: "The maximum value of $f(x) = -x^2 + 4x + 5$ is:",
    options: [
      "9",
      "8",
      "10",
      "11"
    ],
    correct: "9",
    marks: 4,
    negative: 1
  },
  {
    id: 245,
    question: "The function $f(x) = x^3 - 6x^2 + 9x + 1$ has a point of inflection at:",
    options: [
      "$x = 0$",
      "$x = 1$",
      "$x = 2$",
      "$x = 3$"
    ],
    correct: "$x = 2$",
    marks: 4,
    negative: 1
  },
  {
    id: 246,
    question: "If $y = e^x(x^2 + 1)$, then $dy/dx = \\text{?}$",
    options: [
      "$e^x(2x + 1)$",
      "$e^x(x^2 + 2x + 1)$",
      "$e^x(x^2 + 2x + 2)$",
      "$e^x(2x - 1)$"
    ],
    correct: "$e^x(x^2 + 2x + 1)$",
    marks: 4,
    negative: 1
  },
  {
    id: 247,
    question: "The function $f(x) = x^4 - 4x^3 + 6x^2 - 4x + 1$ is:",
    options: [
      "always increasing",
      "always decreasing",
      "constant",
      "none of these"
    ],
    correct: "always increasing",
    marks: 4,
    negative: 1
  },
  {
    id: 248,
    question: "The minimum value of $y = x + 1/x$ for $x > 0$ is:",
    options: [
      "0",
      "1",
      "2",
      "-1"
    ],
    correct: "2",
    marks: 4,
    negative: 1
  },
  {
    id: 249,
    question: "If $f(x) = |x - 3|$, then $f'(x)$ is not defined at:",
    options: [
      "0",
      "3",
      "-3",
      "1"
    ],
    correct: "3",
    marks: 4,
    negative: 1
  },
  {
    id: 250,
    question: "The equation of the normal to $y = x^2$ at $(1, 1)$ is:",
    options: [
      "$y = -\\frac{1}{2}x + \\frac{3}{2}$",
      "$y = -2x + 3$",
      "$y = 2x + 1$",
      "$y = -x + 2$"
    ],
    correct: "$y = -\\frac{1}{2}x + \\frac{3}{2}$",
    marks: 4,
    negative: 1
  },
  {
    id: 251,
    question: "If $y = \\tan^{-1}(2x)$, then $dy/dx = \\text{?}$",
    options: [
      "$2/(1 + 4x^2)$",
      "$1/(1 + x^2)$",
      "$2x/(1 + x^2)$",
      "$1/(2 + 4x^2)$"
    ],
    correct: "$2/(1 + 4x^2)$",
    marks: 4,
    negative: 1
  },
  {
    id: 252,
    question: "The rate of change of area of a circle with respect to its radius $r$ is:",
    options: [
      "$\\pi r^2$",
      "$2\\pi r$",
      "$\\pi r$",
      "$4\\pi r$"
    ],
    correct: "$2\\pi r$",
    marks: 4,
    negative: 1
  },
  {
    id: 253,
    question: "The derivative of $|x|$ at $x = 0$ is:",
    options: [
      "0",
      "1",
      "-1",
      "does not exist"
    ],
    correct: "does not exist",
    marks: 4,
    negative: 1
  },
  {
    id: 254,
    question: "If $y = \\log(x^2 + 1)$, then $dy/dx = \\text{?}$",
    options: [
      "$2x/(x^2 + 1)$",
      "$1/(x^2 + 1)$",
      "$2x \\log(x)$",
      "$x/(x^2 + 1)$"
    ],
    correct: "$2x/(x^2 + 1)$",
    marks: 4,
    negative: 1
  },
  {
    id: 255,
    question: "The increasing interval of $f(x) = x^3 - 3x^2 + 2$ is:",
    options: [
      "$(0,1)$",
      "$(1,\\infty)$",
      "$(-\\infty,1)$",
      "$(2,\\infty)$"
    ],
    correct: "$(2,\\infty)$",
    marks: 4,
    negative: 1
  },
  {
    id: 256,
    question: "The maximum slope of $y = \\sin x$ occurs at:",
    options: [
      "$x = 0$",
      "$x = \\pi/2$",
      "$x = \\pi$",
      "$x = 3\\pi/2$"
    ],
    correct: "$x = 0$",
    marks: 4,
    negative: 1
  },
  {
    id: 257,
    question: "The function $f(x) = x^3 - 9x^2 + 24x + 5$ is increasing in:",
    options: [
      "$(0,2)$",
      "$(2,4)$",
      "$(4,6)$",
      "$(6,8)$"
    ],
    correct: "$(2,4)$",
    marks: 4,
    negative: 1
  },
  {
    id: 258,
    question: "The tangent to $y = \\sqrt{x}$ at $x = 4$ is:",
    options: [
      "$y = \\frac{1}{4}x + 1$",
      "$y = \\frac{1}{4}x + 2$",
      "$y = \\frac{1}{8}x + 1$",
      "$y = \\frac{1}{8}x + 2$"
    ],
    correct: "$y = \\frac{1}{4}x + 1$",
    marks: 4,
    negative: 1
  },
  {
    id: 259,
    question: "If $y = x^3 + 2x$, find $d^2y/dx^2$.",
    options: [
      "$6x$",
      "$3x^2$",
      "$3x$",
      "$2x$"
    ],
    correct: "$6x$",
    marks: 4,
    negative: 1
  },
  {
    id: 260,
    question: "The slope of the tangent to $y = \\ln(x)$ at $x = e$ is:",
    options: [
      "1",
      "$e$",
      "$1/e$",
      "0"
    ],
    correct: "$1/e$",
    marks: 4,
    negative: 1
  },
  {
    id: 261,
    question: "If $f(x) = \\sin x + \\cos x$, then $f'(x) = \\text{?}$",
    options: [
      "$\\cos x - \\sin x$",
      "$\\sin x + \\cos x$",
      "$-\\sin x + \\cos x$",
      "$-\\cos x - \\sin x$"
    ],
    correct: "$\\cos x - \\sin x$",
    marks: 4,
    negative: 1
  },
  {
    id: 262,
    question: "The curve $y = x^3 - 3x$ has stationary points at:",
    options: [
      "$x = \\pm 1$",
      "$x = 0, \\pm\\sqrt{3}$",
      "$x = \\pm\\sqrt{3}$",
      "$x = 0, \\pm 1$"
    ],
    correct: "$x = \\pm 1$",
    marks: 4,
    negative: 1
  },
  {
    id: 263,
    question: "The rate of change of volume of a sphere with respect to its radius $r$ is:",
    options: [
      "$4\\pi r^2$",
      "$2\\pi r$",
      "$\\pi r^2$",
      "$8\\pi r$"
    ],
    correct: "$4\\pi r^2$",
    marks: 4,
    negative: 1
  },
  {
    id: 264,
    question: "If $y = e^x \\sin x$, then $dy/dx = \\text{?}$",
    options: [
      "$e^x(\\sin x + \\cos x)$",
      "$e^x(\\sin x - \\cos x)$",
      "$e^x\\cos x$",
      "$e^x\\sin x$"
    ],
    correct: "$e^x(\\sin x + \\cos x)$",
    marks: 4,
    negative: 1
  },
  {
    id: 265,
    question: "The tangent to $y = x^2 + 2x + 1$ parallel to $y = 4x + 3$ is:",
    options: [
      "$y = 4x - 3$",
      "$y = 4x + 5$",
      "$y = 4x + 1$",
      "$y = 4x - 7$"
    ],
    correct: "$y = 4x + 5$",
    marks: 4,
    negative: 1
  },
  {
    id: 266,
    question: "The point at which $y = x^3 - 6x^2 + 9x$ has a maximum is:",
    options: [
      "$x = 3$",
      "$x = 0$",
      "$x = 1$",
      "$x = 2$"
    ],
    correct: "$x = 1$",
    marks: 4,
    negative: 1
  },
  {
    id: 267,
    question: "The maximum slope of $y = \\sin x + \\cos x$ is:",
    options: [
      "$\\sqrt{2}$",
      "1",
      "0",
      "$-\\sqrt{2}$"
    ],
    correct: "$\\sqrt{2}$",
    marks: 4,
    negative: 1
  },
  {
    id: 268,
    question: "The equation of the tangent to $y = \\sqrt{x}$ at $x = 1$ is:",
    options: [
      "$y = \\frac{1}{2}x + \\frac{1}{2}$",
      "$y = \\frac{1}{2}x + 1$",
      "$y = x + \\frac{1}{2}$",
      "$y = 2x + 1$"
    ],
    correct: "$y = \\frac{1}{2}x + \\frac{1}{2}$",
    marks: 4,
    negative: 1
  },
  {
    id: 269,
    question: "If $y = \\log_{10}(x)$, then $dy/dx = \\text{?}$",
    options: [
      "$1/x$",
      "$1/(x \\ln 10)$",
      "$(\\ln 10)/x$",
      "$10/x$"
    ],
    correct: "$1/(x \\ln 10)$",
    marks: 4,
    negative: 1
  },
  {
    id: 270,
    question: "The function $f(x) = x^2 + 1/x^2$ has its minimum at:",
    options: [
      "$x = 0$",
      "$x = 1$",
      "$x = -1$",
      "both (b) and (c)"
    ],
    correct: "both (b) and (c)",
    marks: 4,
    negative: 1
  },
   {
    id: 271,
    question: "The value of $\\int_{0}^{\\pi/2} \\sin^3 x \\cos^2 x \\, dx$ is:",
    options: [
      "1/6",
      "2/15",
      "1/3",
      "2/9"
    ],
    correct: "2/15",
    marks: 4,
    negative: 1
  },
  {
    id: 272,
    question: "If $\\int x e^{x^2} \\, dx = \\text{?}$",
    options: [
      "$(1/2)e^{x^2}+C$",
      "$e^{x^2}+C$",
      "$x e^{x^2}+C$",
      "$2e^{x^2}+C$"
    ],
    correct: "$(1/2)e^{x^2}+C$",
    marks: 4,
    negative: 1
  },
  {
    id: 273,
    question: "The solution of $dy/dx = 3y$ is:",
    options: [
      "$y = Ce^{3x}$",
      "$y = Ce^{x/3}$",
      "$y = 3Ce^x$",
      "$y = Cx^3$"
    ],
    correct: "$y = Ce^{3x}$",
    marks: 4,
    negative: 1
  },
  {
    id: 274,
    question: "$\\int (1/(x\\sqrt{x^2-1})) \\, dx$ equals:",
    options: [
      "$\\sec^{-1}x + C$",
      "$\\cos^{-1}x + C$",
      "$\\sin^{-1}x + C$",
      "$\\tan^{-1}x + C$"
    ],
    correct: "$\\sec^{-1}x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 275,
    question: "Solution of $d^2y/dx^2 = 0$:",
    options: [
      "$y = Ax + B$",
      "$y = Ae^x + Be^{-x}$",
      "$y = A \\sin x + B \\cos x$",
      "$y = Ax^2 + B$"
    ],
    correct: "$y = Ax + B$",
    marks: 4,
    negative: 1
  },
  {
    id: 276,
    question: "$\\int \\tan x \\, dx$ equals:",
    options: [
      "$\\ln|\\sec x| + C$",
      "$\\ln|\\cos x| + C$",
      "$\\sec x + C$",
      "$\\sin x + C$"
    ],
    correct: "$\\ln|\\sec x| + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 277,
    question: "The integrating factor for $dy/dx + Py = Q$ is:",
    options: [
      "$e^{\\int P \\, dx}$",
      "$e^{\\int Q \\, dx}$",
      "$\\int P \\, dx$",
      "$\\int Q \\, dx$"
    ],
    correct: "$e^{\\int P \\, dx}$",
    marks: 4,
    negative: 1
  },
  {
    id: 278,
    question: "$\\int x/(x^2+4) \\, dx$ equals:",
    options: [
      "$(1/2) \\ln(x^2+4)+C$",
      "$\\ln(x^2+4)+C$",
      "$\\tan^{-1}(x/2)+C$",
      "$x^2/(x^2+4)+C$"
    ],
    correct: "$(1/2) \\ln(x^2+4)+C$",
    marks: 4,
    negative: 1
  },
  {
    id: 279,
    question: "The DE whose solution is $y = A \\cos 2x + B \\sin 2x$ is:",
    options: [
      "$y'' + 4y = 0$",
      "$y'' - 4y = 0$",
      "$y'' + y = 0$",
      "$y'' - y = 0$"
    ],
    correct: "$y'' + 4y = 0$",
    marks: 4,
    negative: 1
  },
  {
    id: 280,
    question: "$\\int 1/(9+x^2) \\, dx$ equals:",
    options: [
      "$(1/3) \\tan^{-1}(x/3) + C$",
      "$\\tan^{-1}(3x) + C$",
      "$3 \\tan^{-1}(x) + C$",
      "$\\tan^{-1}(x/9) + C$"
    ],
    correct: "$(1/3) \\tan^{-1}(x/3) + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 281,
    question: "The solution of $dy/dx = x^2$ is:",
    options: [
      "$y = x^3/3 + C$",
      "$y = 3x^2 + C$",
      "$y = x^2 + C$",
      "$y = x^3 + C$"
    ],
    correct: "$y = x^3/3 + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 282,
    question: "$\\int e^{3x} \\, dx$ equals:",
    options: [
      "$(1/3)e^{3x} + C$",
      "$3e^{3x} + C$",
      "$e^{3x} + C$",
      "$e^x + C$"
    ],
    correct: "$(1/3)e^{3x} + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 283,
    question: "The DE $dy/dx + y = e^x$ has solution:",
    options: [
      "$y = Ce^{-x} + (e^x)/2$",
      "$y = Ce^{-x} + e^x/2$",
      "$y = Ce^{-x} + e^x$",
      "$y = Ce^x + 1$"
    ],
    correct: "$y = Ce^{-x} + e^x/2$",
    marks: 4,
    negative: 1
  },
  {
    id: 284,
    question: "$\\int 1/(\\sqrt{1-x^2}) \\, dx$ equals:",
    options: [
      "$\\sin^{-1}x + C$",
      "$\\cos^{-1}x + C$",
      "$\\tan^{-1}x + C$",
      "$\\sec^{-1}x + C$"
    ],
    correct: "$\\sin^{-1}x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 285,
    question: "Solution of $dy/dx = y^2$ is:",
    options: [
      "$y = -1/(x + C)$",
      "$y = 1/(x + C)$",
      "$y = Cx^2$",
      "$y = e^x$"
    ],
    correct: "$y = -1/(x + C)$",
    marks: 4,
    negative: 1
  },
  {
    id: 286,
    question: "$\\int (2x)/(x^2+1) \\, dx$ equals:",
    options: [
      "$\\ln(x^2+1)+C$",
      "$2 \\ln(x^2+1)+C$",
      "$\\ln(x+1)+C$",
      "$\\tan^{-1}x + C$"
    ],
    correct: "$\\ln(x^2+1)+C$",
    marks: 4,
    negative: 1
  },
  {
    id: 287,
    question: "The DE with general solution $y = Ae^{5x}$ is:",
    options: [
      "$dy/dx = 5y$",
      "$dy/dx = y/5$",
      "$dy/dx = -5y$",
      "$dy/dx = y^2$"
    ],
    correct: "$dy/dx = 5y$",
    marks: 4,
    negative: 1
  },
  {
    id: 288,
    question: "$\\int \\cot x \\, dx$ equals:",
    options: [
      "$\\ln|\\sin x| + C$",
      "$\\ln|\\cos x| + C$",
      "$\\ln|\\tan x| + C$",
      "$\\ln|\\sin x| - \\ln|\\cos x| + C$"
    ],
    correct: "$\\ln|\\sin x| + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 289,
    question: "The solution of $y' + 4y = 0$:",
    options: [
      "$y = Ce^{-4x}$",
      "$y = Ce^{4x}$",
      "$y = 4Ce^x$",
      "$y = Cx^4$"
    ],
    correct: "$y = Ce^{-4x}$",
    marks: 4,
    negative: 1
  },
  {
    id: 290,
    question: "$\\int 1/(x\\sqrt{1+x^2}) \\, dx$ equals:",
    options: [
      "$\\sec^{-1}x + C$",
      "$\\sin^{-1}x + C$",
      "$\\tan^{-1}x + C$",
      "$\\cos^{-1}x + C$"
    ],
    correct: "$\\tan^{-1}x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 291,
    question: "$\\int x^3 \\, dx$ equals:",
    options: [
      "$x^4/4 + C$",
      "$x^2/2 + C$",
      "$x^3 + C$",
      "$x^5/5 + C$"
    ],
    correct: "$x^4/4 + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 292,
    question: "The particular solution of $dy/dx = 3x^2$, $y(0)=5$:",
    options: [
      "$y = x^3 + 5$",
      "$y = x^3/3 + 5$",
      "$y = x^3 + 3$",
      "$y = x^3$"
    ],
    correct: "$y = x^3 + 5$",
    marks: 4,
    negative: 1
  },
  {
    id: 293,
    question: "$\\int \\sec^2 x \\, dx$ equals:",
    options: [
      "$\\tan x + C$",
      "$\\sec x + C$",
      "$\\sin x + C$",
      "$\\cos x + C$"
    ],
    correct: "$\\tan x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 294,
    question: "If $\\int f'(x)/f(x) \\, dx = \\text{?}$",
    options: [
      "$\\ln|f(x)| + C$",
      "$f(x)+C$",
      "$1/f(x)+C$",
      "$f'(x)+C$"
    ],
    correct: "$\\ln|f(x)| + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 295,
    question: "The DE whose solution is $y = A + Bx$ is:",
    options: [
      "$y'' = 0$",
      "$y' = 0$",
      "$y'' + y = 0$",
      "$y'' - y = 0$"
    ],
    correct: "$y'' = 0$",
    marks: 4,
    negative: 1
  },
  {
    id: 296,
    question: "$\\int \\cos 3x \\, dx$ equals:",
    options: [
      "$(1/3) \\sin 3x + C$",
      "$3 \\sin x + C$",
      "$\\sin x + C$",
      "$\\tan x + C$"
    ],
    correct: "$(1/3) \\sin 3x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 297,
    question: "The integrating factor for $dy/dx - 2y = e^{-x}$ is:",
    options: [
      "$e^{-2x}$",
      "$e^{2x}$",
      "$e^x$",
      "$e^{-x}$"
    ],
    correct: "$e^{-2x}$",
    marks: 4,
    negative: 1
  },
  {
    id: 298,
    question: "$\\int (1/(x^2+16)) \\, dx$ equals:",
    options: [
      "$(1/4) \\tan^{-1}(x/4) + C$",
      "$\\tan^{-1}(4x)+C$",
      "$4 \\tan^{-1}(x)+C$",
      "$\\tan^{-1}(x/16)+C$"
    ],
    correct: "$(1/4) \\tan^{-1}(x/4) + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 299,
    question: "Solution of $dy/dx = \\sin x$:",
    options: [
      "$y = -\\cos x + C$",
      "$y = \\cos x + C$",
      "$y = \\tan x + C$",
      "$y = \\sec x + C$"
    ],
    correct: "$y = -\\cos x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 300,
    question: "$\\int x e^x \\, dx$ equals:",
    options: [
      "$(x-1)e^x + C$",
      "$e^x + C$",
      "$(x+1)e^x + C$",
      "$x e^x + C$"
    ],
    correct: "$(x-1)e^x + C$",
    marks: 4,
    negative: 1
  },
  {
    id: 301,
    question: "If vectors a = (2, -1, 3) and b = (1, 4, -2), then a·b equals:",
    options: [
      "2",
      "5",
      "-8",
      "12"
    ],
    correct: "-8",
    marks: 4,
    negative: 1
  },
  {
    id: 302,
    question: "The magnitude of vector r = 3i - 4j + 12k is:",
    options: [
      "13",
      "11",
      "7",
      "√34"
    ],
    correct: "13",
    marks: 4,
    negative: 1
  },
  {
    id: 303,
    question: "Two vectors are perpendicular if their dot product is:",
    options: [
      "1",
      "0",
      "-1",
      "Undefined"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 304,
    question: "If |a|=5, |b|=12 and angle between them is 90°, then |a×b| is:",
    options: [
      "17",
      "60",
      "5",
      "12"
    ],
    correct: "60",
    marks: 4,
    negative: 1
  },
  {
    id: 305,
    question: "The projection of a on b is given by:",
    options: [
      "(a·b)/|b|",
      "a×b",
      "|a||b|",
      "None"
    ],
    correct: "(a·b)/|b|",
    marks: 4,
    negative: 1
  },
  {
    id: 306,
    question: "Unit vector parallel to (6, -3, 2) is:",
    options: [
      "(6/7, -3/7, 2/7)",
      "(6/49, ...)",
      "(3, -1, 1)",
      "None"
    ],
    correct: "(6/7, -3/7, 2/7)",
    marks: 4,
    negative: 1
  },
  {
    id: 307,
    question: "If a × b = 0, then vectors are:",
    options: [
      "Parallel",
      "Perpendicular",
      "Unit",
      "Equal"
    ],
    correct: "Parallel",
    marks: 4,
    negative: 1
  },
  {
    id: 308,
    question: "Equation of plane through origin with normal (1,2,3):",
    options: [
      "x+2y+3z=0",
      "x−2y+3z=7",
      "x+y=0",
      "3x+2y+z=0"
    ],
    correct: "x+2y+3z=0",
    marks: 4,
    negative: 1
  },
  {
    id: 309,
    question: "Distance of point (1,2,3) from x-axis:",
    options: [
      "√13",
      "√5",
      "2",
      "√14"
    ],
    correct: "√13",
    marks: 4,
    negative: 1
  },
  {
    id: 310,
    question: "Angle between vectors a and b satisfies:",
    options: [
      "cosθ = (a×b)/(|a||b|)",
      "sinθ = (a·b)/|ab|",
      "cosθ = (a·b)/(|a||b|)",
      "None"
    ],
    correct: "cosθ = (a·b)/(|a||b|)",
    marks: 4,
    negative: 1
  },
  {
    id: 311,
    question: "Direction cosines (l,m,n) satisfy:",
    options: [
      "l+m+n=1",
      "l²+m²+n²=1",
      "l²=l",
      "None"
    ],
    correct: "l²+m²+n²=1",
    marks: 4,
    negative: 1
  },
  {
    id: 312,
    question: "If a=(1,2,2) and b=(2,1,2), then |a×b| equals:",
    options: [
      "3",
      "5",
      "7",
      "2"
    ],
    correct: "7",
    marks: 4,
    negative: 1
  },
  {
    id: 313,
    question: "Shortest distance between skew lines is given by:",
    options: [
      "|a·b|",
      "|a×b|/|b|",
      "|(PQ·(d1×d2))|/|d1×d2|",
      "None"
    ],
    correct: "|(PQ·(d1×d2))|/|d1×d2|",
    marks: 4,
    negative: 1
  },
  {
    id: 314,
    question: "The plane passing through (1,1,1) and normal (2,−1,3):",
    options: [
      "2x−y+3z=0",
      "2x−y+3z=4",
      "2x+y+z=2",
      "x+y+z=1"
    ],
    correct: "2x−y+3z=4",
    marks: 4,
    negative: 1
  },
  {
    id: 315,
    question: "The value of determinant |i j k; 1 2 3; 4 5 6| equals:",
    options: [
      "0",
      "3",
      "-3",
      "1"
    ],
    correct: "-3",
    marks: 4,
    negative: 1
  },
  {
    id: 316,
    question: "Volume of parallelepiped formed by a,b,c is:",
    options: [
      "a·(b×c)",
      "|a×b|",
      "a·b",
      "None"
    ],
    correct: "a·(b×c)",
    marks: 4,
    negative: 1
  },
  {
    id: 317,
    question: "If lines are perpendicular, then:",
    options: [
      "Direction ratios multiply to 1",
      "Dot product=0",
      "Cross product=0",
      "None"
    ],
    correct: "Dot product=0",
    marks: 4,
    negative: 1
  },
  {
    id: 318,
    question: "Angle between planes depends on:",
    options: [
      "Normals",
      "Points on plane",
      "Direction ratios of lines",
      "None"
    ],
    correct: "Normals",
    marks: 4,
    negative: 1
  },
  {
    id: 319,
    question: "Equation of sphere with centre (1,−2,3) radius 5:",
    options: [
      "(x−1)²+(y+2)²+(z−3)²=25",
      "…=5",
      "…=10",
      "None"
    ],
    correct: "(x−1)²+(y+2)²+(z−3)²=25",
    marks: 4,
    negative: 1
  },
  {
    id: 320,
    question: "If a vector makes angles 60°, 45°, 60° with axes, find l:",
    options: [
      "1/2",
      "√2/2",
      "√3/2",
      "None"
    ],
    correct: "1/2",
    marks: 4,
    negative: 1
  },
  {
    id: 321,
    question: "A vector perpendicular to both i+j+k and i−j+k:",
    options: [
      "i",
      "j",
      "k",
      "i+k"
    ],
    correct: "j",
    marks: 4,
    negative: 1
  },
  {
    id: 322,
    question: "Distance between points A(1,2,3) and B(4,6,3):",
    options: [
      "5",
      "4",
      "3",
      "√20"
    ],
    correct: "5",
    marks: 4,
    negative: 1
  },
  {
    id: 323,
    question: "Foot of perpendicular from (1,2,3) to xy-plane:",
    options: [
      "(1,2,0)",
      "(0,0,3)",
      "(1,0,2)",
      "(0,2,1)"
    ],
    correct: "(1,2,0)",
    marks: 4,
    negative: 1
  },
  {
    id: 324,
    question: "Equation of line through (1,2,3) parallel to (2,−1,1):",
    options: [
      "(x−1)/2=(y−2)/(−1)=(z−3)/1",
      "same but =3",
      "same but 1",
      "None"
    ],
    correct: "(x−1)/2=(y−2)/(−1)=(z−3)/1",
    marks: 4,
    negative: 1
  },
  {
    id: 325,
    question: "Number of planes passing through a line:",
    options: [
      "1",
      "∞",
      "0",
      "2"
    ],
    correct: "∞",
    marks: 4,
    negative: 1
  },
  {
    id: 326,
    question: "If a+b+c=0, then scalar triple product is:",
    options: [
      "0",
      "1",
      "Depends",
      "None"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 327,
    question: "If two vectors have same direction cosines, they are:",
    options: [
      "Equal",
      "Collinear",
      "Perpendicular",
      "None"
    ],
    correct: "Collinear",
    marks: 4,
    negative: 1
  },
  {
    id: 328,
    question: "If |a|=3, |b|=4, a·b=0 then |a+b|:",
    options: [
      "5",
      "7",
      "1",
      "None"
    ],
    correct: "5",
    marks: 4,
    negative: 1
  },
  {
    id: 329,
    question: "Find angle between i+j and i−j:",
    options: [
      "45°",
      "90°",
      "120°",
      "180°"
    ],
    correct: "90°",
    marks: 4,
    negative: 1
  },
  {
    id: 330,
    question: "If plane is 2x−3y+z=7, normal vector is:",
    options: [
      "(2,−3,1)",
      "(1,1,1)",
      "(2,3,1)",
      "None"
    ],
    correct: "(2,−3,1)",
    marks: 4,
    negative: 1
  },
  {
    id: 331,
    question: "If A is a $2\\times 2$ matrix with $\\det(A) = 5$, then $\\det(2A) = \\text{?}$",
    options: [
      "10",
      "20",
      "25",
      "40"
    ],
    correct: "20",
    marks: 4,
    negative: 1
  },
  {
    id: 332,
    question: "If $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$, then $\\det(A) = \\text{?}$",
    options: [
      "$-2$",
      "$2$",
      "$1$",
      "$-5$"
    ],
    correct: "$-2$",
    marks: 4,
    negative: 1
  },
  {
    id: 333,
    question: "Which of the following is always true for a square matrix A?",
    options: [
      "$\\det(A^T) = \\det(A)$",
      "$\\det(A^T) = -\\det(A)$",
      "$\\det(A^T) = 0$",
      "$\\det(A^T) = \\det(A^{-1})$"
    ],
    correct: "$\\det(A^T) = \\det(A)$",
    marks: 4,
    negative: 1
  },
  {
    id: 334,
    question: "If $AB = I$, then $\\det(A) \\cdot \\det(B) = \\text{?}$",
    options: [
      "0",
      "1",
      "$-1$",
      "$\\det(A)$"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 335,
    question: "For a $3\\times 3$ matrix, if one row is multiplied by 5, the determinant is multiplied by?",
    options: [
      "5",
      "10",
      "15",
      "25"
    ],
    correct: "5",
    marks: 4,
    negative: 1
  },
  {
    id: 336,
    question: "If A is invertible, then $\\det(A^{-1}) = \\text{?}$",
    options: [
      "$\\det(A)$",
      "$1/\\det(A)$",
      "0",
      "$-\\det(A)$"
    ],
    correct: "$1/\\det(A)$",
    marks: 4,
    negative: 1
  },
  {
    id: 337,
    question: "If $A = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}$, then $\\det(A) = \\text{?}$",
    options: [
      "6",
      "5",
      "0",
      "2"
    ],
    correct: "6",
    marks: 4,
    negative: 1
  },
  {
    id: 338,
    question: "Which of the following is NOT true?",
    options: [
      "$\\det(AB)=\\det(A)\\det(B)$",
      "$\\det(A+B)=\\det(A)+\\det(B)$",
      "$\\det(A^T)=\\det(A)$",
      "$\\det(I)=1$"
    ],
    correct: "$\\det(A+B)=\\det(A)+\\det(B)$",
    marks: 4,
    negative: 1
  },
  {
    id: 339,
    question: "The adjoint of a matrix A is defined as:",
    options: [
      "Transpose of A",
      "Inverse of A",
      "Transpose of cofactor matrix",
      "Determinant of A"
    ],
    correct: "Transpose of cofactor matrix",
    marks: 4,
    negative: 1
  },
  {
    id: 340,
    question: "If $A = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$, then $A^2 = \\text{?}$",
    options: [
      "$I$",
      "$-I$",
      "$A$",
      "0"
    ],
    correct: "$-I$",
    marks: 4,
    negative: 1
  },
  {
    id: 341,
    question: "If $\\det(A) = 0$, then A is:",
    options: [
      "Invertible",
      "Non-singular",
      "Singular",
      "Orthogonal"
    ],
    correct: "Singular",
    marks: 4,
    negative: 1
  },
  {
    id: 342,
    question: "The rank of the zero matrix of order 3 is:",
    options: [
      "3",
      "0",
      "1",
      "2"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 343,
    question: "If A is an orthogonal matrix, then $A^{-1} = \\text{?}$",
    options: [
      "$A$",
      "$A^T$",
      "$-A$",
      "None"
    ],
    correct: "$A^T$",
    marks: 4,
    negative: 1
  },
  {
    id: 344,
    question: "If A is a skew-symmetric matrix of odd order, then $\\det(A) = \\text{?}$",
    options: [
      "Positive",
      "Negative",
      "0",
      "1"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 345,
    question: "If $A = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}$, $\\det(A) = \\text{?}$",
    options: [
      "1",
      "2",
      "6",
      "0"
    ],
    correct: "6",
    marks: 4,
    negative: 1
  },
  {
    id: 346,
    question: "Which of the following matrices is symmetric?",
    options: [
      "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$",
      "$\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$",
      "$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$",
      "$\\begin{pmatrix} 2 & 0 \\\\ 1 & 2 \\end{pmatrix}$"
    ],
    correct: "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$",
    marks: 4,
    negative: 1
  },
  {
    id: 347,
    question: "If A and B are square matrices of same order, $\\det(AB) = \\text{?}$",
    options: [
      "$\\det(A) + \\det(B)$",
      "$\\det(A)\\det(B)$",
      "$\\det(A-B)$",
      "$\\det(A)+\\det(B)-1$"
    ],
    correct: "$\\det(A)\\det(B)$",
    marks: 4,
    negative: 1
  },
  {
    id: 348,
    question: "If $A = I$, then $\\det(A) = \\text{?}$",
    options: [
      "0",
      "1",
      "$n$",
      "Depends on $n$"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 349,
    question: "If two rows of a determinant are identical, its value is:",
    options: [
      "1",
      "0",
      "Depends",
      "Infinite"
    ],
    correct: "0",
    marks: 4,
    negative: 1
  },
  {
    id: 350,
    question: "For a $2\\times 2$ matrix A, if $\\det(A)=k$, then $\\det(A^2)=\\text{?}$",
    options: [
      "$k^2$",
      "$2k$",
      "$k$",
      "0"
    ],
    correct: "$k^2$",
    marks: 4,
    negative: 1
  },
  {
    id: 351,
    question: "If $A = \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}$, then $\\det(A) = \\text{?}$",
    options: [
      "$-3$",
      "$3$",
      "0",
      "1"
    ],
    correct: "$-3$",
    marks: 4,
    negative: 1
  },
  {
    id: 352,
    question: "If $\\det(A)=7$ and $\\det(B)=3$, then $\\det(AB)=\\text{?}$",
    options: [
      "10",
      "21",
      "4",
      "1"
    ],
    correct: "21",
    marks: 4,
    negative: 1
  },
  {
    id: 353,
    question: "Which of the following is always true for determinant?",
    options: [
      "$\\det(kA)=k \\det(A)$",
      "$\\det(kA)=k^n \\det(A)$",
      "$\\det(kA)=\\det(A)^k$",
      "$\\det(kA)=0$"
    ],
    correct: "$\\det(kA)=k^n \\det(A)$",
    marks: 4,
    negative: 1
  },
  {
    id: 354,
    question: "If $A = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$, then $\\det(A) = \\text{?}$",
    options: [
      "0",
      "1",
      "$-1$",
      "$\\cos 2\\theta$"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 355,
    question: "If A is a diagonal matrix, then $\\det(A) = \\text{?}$",
    options: [
      "Sum of diagonal entries",
      "Product of diagonal entries",
      "Trace of A",
      "Always 1"
    ],
    correct: "Product of diagonal entries",
    marks: 4,
    negative: 1
  },
  {
    id: 356,
    question: "The determinant of identity matrix of order 3 is:",
    options: [
      "0",
      "1",
      "3",
      "Depends on order"
    ],
    correct: "1",
    marks: 4,
    negative: 1
  },
  {
    id: 357,
    question: "If A is skew-symmetric of order 2, then $\\det(A) = \\text{?}$",
    options: [
      "0",
      "1",
      "-1",
      "Positive"
    ],
    correct: "Positive",
    marks: 4,
    negative: 1
  },
  {
    id: 358,
    question: "Which of the following is true for an invertible matrix A?",
    options: [
      "$\\det(A)=0$",
      "$\\det(A)\\ne 0$",
      "$\\det(A) < 0$",
      "$\\det(A)=1$"
    ],
    correct: "$\\det(A)\\ne 0$",
    marks: 4,
    negative: 1
  },
  {
    id: 359,
    question: "If A and B are $2\\times 2$ matrices with $\\det(A)=2$ and $\\det(B)=5$, then $\\det(A^{-1}B) = \\text{?}$",
    options: [
      "10",
      "5/2",
      "2/5",
      "1/10"
    ],
    correct: "5/2",
    marks: 4,
    negative: 1
  },
  {
    id: 360,
    question: "If a row of a determinant is multiplied by $-1$, then determinant is multiplied by:",
    options: [
      "0",
      "$-1$",
      "1",
      "2"
    ],
    correct: "$-1$",
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
    
    
    
    
    