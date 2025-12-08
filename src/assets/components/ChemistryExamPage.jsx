import React, { useState, useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// ... keep imports same
export default function ChemistryExamPage() {
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
  },
  {
    id: 151,
    question: "Which of the following alkali metals forms the most stable carbonate?",
    "options": [
      "Li",
      "Na",
      "K",
      "Cs"
    ],
    correct: "K",
    marks: 4,
    negative: 1
  },
  {
    id: 152,
    question: "Which alkali metal shows diagonal relationship with Mg?",
    "options": [
      "Li",
      "Na",
      "K",
      "Rb"
    ],
    correct: "Li",
    marks: 4,
    negative: 1
  },
  {
    id: 153,
    question: "Which alkaline earth metal carbonate decomposes at lowest temperature?",
    "options": [
      "BeCO3",
      "MgCO3",
      "CaCO3",
      "BaCO3"
    ],
    correct: "BeCO3",
    marks: 4,
    negative: 1
  },
  {
    id: 154,
    question: "The solubility of hydroxides of alkaline earth metals increases down the group because:",
    "options": [
      "Lattice energy decreases faster than hydration energy",
      "Hydration energy decreases faster than lattice energy",
      "Both energies decrease equally",
      "None"
    ],
    correct: "Lattice energy decreases faster than hydration energy",
    marks: 4,
    negative: 1
  },
  {
    id: 155,
    question: "Which metal hydroxide is amphoteric?",
    "options": [
      "Be(OH)2",
      "Mg(OH)2",
      "Ca(OH)2",
      "Sr(OH)2"
    ],
    correct: "Be(OH)2",
    marks: 4,
    negative: 1
  },
  {
    id: 156,
    question: "Which alkali metal has highest hydration enthalpy?",
    "options": [
      "Li+",
      "Na+",
      "K+",
      "Cs+"
    ],
    correct: "Li+",
    marks: 4,
    negative: 1
  },
  {
    id: 157,
    question: "Which of the following compounds is used in Solvay process?",
    "options": [
      "CaCO3",
      "Na2CO3",
      "NH4Cl",
      "NaCl"
    ],
    correct: "NaCl",
    marks: 4,
    negative: 1
  },
  {
    id: 158,
    question: "Which alkaline earth metal sulphate is most soluble in water?",
    "options": [
      "BeSO4",
      "MgSO4",
      "CaSO4",
      "BaSO4"
    ],
    correct: "BeSO4",
    marks: 4,
    negative: 1
  },
  {
    id: 159,
    question: "Which metal is extracted by Down’s process?",
    "options": [
      "Na",
      "Mg",
      "K",
      "Ca"
    ],
    correct: "Na",
    marks: 4,
    negative: 1
  },
  {
    id: 160,
    question: "Which alkali metal does not form solid bicarbonate?",
    "options": [
      "Li",
      "Na",
      "K",
      "Rb"
    ],
    correct: "Li",
    marks: 4,
    negative: 1
  },
  {
    id: 161,
    question: "The anomalous behaviour of lithium is due to:",
    "options": [
      "Small size",
      "High polarising power",
      "High hydration enthalpy",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 162,
    question: "Which alkaline earth metal forms basic oxide?",
    "options": [
      "BeO",
      "MgO",
      "CaO",
      "BaO"
    ],
    correct: "CaO",
    marks: 4,
    negative: 1
  },
  {
    id: 163,
    question: "Which alkali metal is liquid at room temperature?",
    "options": [
      "Li",
      "Na",
      "K",
      "Cs"
    ],
    correct: "Cs",
    marks: 4,
    negative: 1
  },
  {
    id: 164,
    question: "Which salt is called Mohr’s salt?",
    "options": [
      "FeSO4·(NH4)2SO4·6H2O",
      "Na2SO4·10H2O",
      "MgSO4·7H2O",
      "K2SO4·Al2(SO4)3·24H2O"
    ],
    correct: "FeSO4·(NH4)2SO4·6H2O",
    marks: 4,
    negative: 1
  },
  {
    id: 165,
    question: "Which alkali metal compound is used as laboratory drying agent?",
    "options": [
      "NaOH",
      "KOH",
      "CaO",
      "CaCl2"
    ],
    correct: "CaCl2",
    marks: 4,
    negative: 1
  },
  {
    id: 166,
    question: "Which of the following has maximum catenation tendency?",
    "options": [
      "C",
      "Si",
      "Ge",
      "Sn"
    ],
    correct: "C",
    marks: 4,
    negative: 1
  },
  {
    id: 167,
    question: "Which oxide of nitrogen is neutral?",
    "options": [
      "N2O",
      "NO",
      "NO2",
      "N2O5"
    ],
    correct: "NO",
    marks: 4,
    negative: 1
  },
  {
    id: 168,
    question: "Which of the following is most stable allotrope of phosphorus?",
    "options": [
      "White P",
      "Red P",
      "Black P",
      "Violet P"
    ],
    correct: "Red P",
    marks: 4,
    negative: 1
  },
  {
    id: 169,
    question: "Which group 15 hydride has highest boiling point?",
    "options": [
      "NH3",
      "PH3",
      "AsH3",
      "SbH3"
    ],
    correct: "NH3",
    marks: 4,
    negative: 1
  },
  {
    id: 170,
    question: "Which halogen is most reactive?",
    "options": [
      "F2",
      "Cl2",
      "Br2",
      "I2"
    ],
    correct: "F2",
    marks: 4,
    negative: 1
  },
  {
    id: 171,
    question: "Which noble gas forms maximum compounds?",
    "options": [
      "He",
      "Ne",
      "Ar",
      "Xe"
    ],
    correct: "Xe",
    marks: 4,
    negative: 1
  },
  {
    id: 172,
    question: "Which of the following oxoacids is strongest?",
    "options": [
      "HClO",
      "HClO2",
      "HClO3",
      "HClO4"
    ],
    correct: "HClO4",
    marks: 4,
    negative: 1
  },
  {
    id: 173,
    question: "Which oxide of sulphur is responsible for acid rain?",
    "options": [
      "SO",
      "SO2",
      "SO3",
      "S2O3"
    ],
    correct: "SO2",
    marks: 4,
    negative: 1
  },
  {
    id: 174,
    question: "Which halogen has least electron affinity?",
    "options": [
      "F",
      "Cl",
      "Br",
      "I"
    ],
    correct: "I",
    marks: 4,
    negative: 1
  },
  {
    id: 175,
    question: "Which noble gas is used in lighting?",
    "options": [
      "He",
      "Ne",
      "Ar",
      "Kr"
    ],
    correct: "Ne",
    marks: 4,
    negative: 1
  },
  {
    id: 176,
    question: "Which form of silica is most stable?",
    "options": [
      "Quartz",
      "Cristobalite",
      "Tridymite",
      "Silica gel"
    ],
    correct: "Quartz",
    marks: 4,
    negative: 1
  },
  {
    id: 177,
    question: "Which of the following is called dry ice?",
    "options": [
      "Solid CO2",
      "Solid SO2",
      "Solid NO2",
      "Solid H2O"
    ],
    correct: "Solid CO2",
    marks: 4,
    negative: 1
  },
  {
    id: 178,
    question: "Which nitrogen compound is explosive?",
    "options": [
      "NH4NO3",
      "NH3",
      "NO",
      "N2"
    ],
    correct: "NH4NO3",
    marks: 4,
    negative: 1
  },
  {
    id: 179,
    question: "Which element shows maximum inert pair effect?",
    "options": [
      "N",
      "P",
      "Sb",
      "Bi"
    ],
    correct: "Bi",
    marks: 4,
    negative: 1
  },
  {
    id: 180,
    question: "Which halogen is strongest oxidizing agent?",
    "options": [
      "F2",
      "Cl2",
      "Br2",
      "I2"
    ],
    correct: "F2",
    marks: 4,
    negative: 1
  },
  {
    id: 181,
    question: "Which transition element shows the maximum number of oxidation states?",
    options: [
      "Fe",
      "Cr",
      "Mn",
      "V"
    ],
    correct: "Mn",
    marks: 4,
    negative: 1
  },
  {
    id: 182,
    question: "The color of transition metal ions is due to:",
    options: [
      "Charge transfer spectra",
      "d–d electronic transitions",
      "Presence of unpaired p-electrons",
      "Nuclear transitions"
    ],
    correct: "d–d electronic transitions",
    marks: 4,
    negative: 1
  },
  {
    id: 183,
    question: "Which of the following has the highest magnetic moment?",
    options: [
      "Fe²⁺ (d⁶)",
      "Co²⁺ (d⁷)",
      "Mn²⁺ (d⁵)",
      "Ni²⁺ (d⁸)"
    ],
    correct: "Mn²⁺ (d⁵)",
    marks: 4,
    negative: 1
  },
  {
    id: 184,
    question: "The stability of +2 oxidation state is maximum for:",
    options: [
      "Fe",
      "Mn",
      "Zn",
      "Cu"
    ],
    correct: "Cu",
    marks: 4,
    negative: 1
  },
  {
    id: 185,
    question: "The correct order of ionization enthalpy of 3d transition metals is:",
    options: [
      "Sc < Ti < V",
      "V < Ti < Sc",
      "Cr < Mn < Fe",
      "Cu < Ni < Co"
    ],
    correct: "Sc < Ti < V",
    marks: 4,
    negative: 1
  },
  {
    id: 186,
    question: "Which of the following is a strong oxidising agent in acidic medium?",
    options: [
      "Mn²⁺",
      "MnO₂",
      "MnO₄⁻",
      "Mn³⁺"
    ],
    correct: "MnO₄⁻",
    marks: 4,
    negative: 1
  },
  {
    id: 187,
    question: "Which transition metal forms the most stable complexes?",
    options: [
      "Zn",
      "Cu",
      "Fe",
      "Co"
    ],
    correct: "Co",
    marks: 4,
    negative: 1
  },
  {
    id: 188,
    question: "Which element of the 3d series does not form coloured compounds?",
    options: [
      "Ti",
      "Sc",
      "Cr",
      "Cu"
    ],
    correct: "Sc",
    marks: 4,
    negative: 1
  },
  {
    id: 189,
    question: "Which among the following is used in photography?",
    options: [
      "AgBr",
      "AgCl",
      "AgNO₃",
      "Ag₂O"
    ],
    correct: "AgBr",
    marks: 4,
    negative: 1
  },
  {
    id: 190,
    question: "Which among the following is paramagnetic?",
    options: [
      "Zn²⁺",
      "Ti³⁺",
      "Cu⁺",
      "Ni²⁺"
    ],
    correct: "Ti³⁺",
    marks: 4,
    negative: 1
  },
  {
    id: 191,
    question: "The +3 oxidation state is most stable for:",
    options: [
      "Lanthanides",
      "Actinides",
      "Transition elements",
      "Alkali metals"
    ],
    correct: "Lanthanides",
    marks: 4,
    negative: 1
  },
  {
    id: 192,
    question: "Lanthanide contraction is due to:",
    options: [
      "Poor shielding of 5f electrons",
      "Poor shielding of 4f electrons",
      "High effective nuclear charge",
      "Relativistic effects"
    ],
    correct: "Poor shielding of 4f electrons",
    marks: 4,
    negative: 1
  },
  {
    id: 193,
    question: "Which ion is colorless?",
    options: [
      "Ce⁴⁺ (f⁰)",
      "Nd³⁺ (f³)",
      "U³⁺ (f³)",
      "Eu²⁺ (f⁷)"
    ],
    correct: "Ce⁴⁺ (f⁰)",
    marks: 4,
    negative: 1
  },
  {
    id: 194,
    question: "Which element shows both +3 and +4 oxidation states commonly?",
    options: [
      "Ce",
      "La",
      "Yb",
      "Lu"
    ],
    correct: "Ce",
    marks: 4,
    negative: 1
  },
  {
    id: 195,
    question: "Which is used in nuclear reactors as fuel?",
    options: [
      "ThO₂",
      "UO₂",
      "PuO₂",
      "All of these"
    ],
    correct: "All of these",
    marks: 4,
    negative: 1
  },
  {
    id: 196,
    question: "Which actinide exhibits the highest number of oxidation states?",
    options: [
      "U",
      "Th",
      "Np",
      "Pu"
    ],
    correct: "Pu",
    marks: 4,
    negative: 1
  },
  {
    id: 197,
    question: "The separation of lanthanides is difficult due to:",
    options: [
      "Similarity in atomic numbers",
      "Similarity in ionic sizes",
      "Same electronic configuration",
      "High density"
    ],
    correct: "Similarity in ionic sizes",
    marks: 4,
    negative: 1
  },
  {
    id: 198,
    question: "Which is the last element of the actinide series?",
    options: [
      "Lr",
      "No",
      "Fm",
      "Cf"
    ],
    correct: "Lr",
    marks: 4,
    negative: 1
  },
  {
    id: 199,
    question: "Which ion is the most paramagnetic?",
    options: [
      "Gd³⁺ (f⁷)",
      "La³⁺ (f⁰)",
      "Ce⁴⁺ (f⁰)",
      "Lu³⁺ (f¹⁴)"
    ],
    correct: "Gd³⁺ (f⁷)",
    marks: 4,
    negative: 1
  },
  {
    id: 200,
    question: "The radioisotope used in treatment of cancer is:",
    options: [
      "Co-60",
      "U-235",
      "Th-232",
      "Ra-226"
    ],
    correct: "Co-60",
    marks: 4,
    negative: 1
  },
  {
    id: 201,
    question: "The oxidation number of Cr in [Cr(NH₃)₆]Cl₃ is:",
    options: [
      "0",
      "+2",
      "+3",
      "+6"
    ],
    correct: "+3",
    marks: 4,
    negative: 1
  },
  {
    id: 202,
    question: "The coordination number of Ni in [Ni(CO)₄] is:",
    options: [
      "2",
      "3",
      "4",
      "6"
    ],
    correct: "4",
    marks: 4,
    negative: 1
  },
  {
    id: 203,
    question: "The geometry of [Ni(CN)₄]²⁻ is:",
    options: [
      "Tetrahedral",
      "Square planar",
      "Octahedral",
      "Trigonal planar"
    ],
    correct: "Square planar",
    marks: 4,
    negative: 1
  },
  {
    id: 204,
    question: "Which of the following complexes shows optical isomerism?",
    options: [
      "[Co(NH₃)₆]³⁺",
      "[Cr(C₂O₄)₃]³⁻",
      "[Ni(CO)₄]",
      "[Fe(CN)₆]³⁻"
    ],
    correct: "[Cr(C₂O₄)₃]³⁻",
    marks: 4,
    negative: 1
  },
  {
    id: 205,
    question: "Which among the following is a chelating ligand?",
    options: [
      "NH₃",
      "Cl⁻",
      "C₂O₄²⁻",
      "CN⁻"
    ],
    correct: "C₂O₄²⁻",
    marks: 4,
    negative: 1
  },
  {
    id: 206,
    question: "Which of the following complexes is diamagnetic?",
    options: [
      "[Fe(CN)₆]³⁻",
      "[Fe(CN)₆]⁴⁻",
      "[CoF₆]³⁻",
      "[Cu(NH₃)₄]²⁺"
    ],
    correct: "[Fe(CN)₆]⁴⁻",
    marks: 4,
    negative: 1
  },
  {
    id: 207,
    question: "According to Werner’s theory, secondary valency corresponds to:",
    options: [
      "Oxidation state",
      "Ionisable groups",
      "Coordination number",
      "Magnetic moment"
    ],
    correct: "Coordination number",
    marks: 4,
    negative: 1
  },
  {
    id: 208,
    question: "The IUPAC name of [Co(NH₃)₄Cl₂]Cl is:",
    options: [
      "Tetrammine dichlorocobalt(III) chloride",
      "Dichlorotetramminecobalt(III) chloride",
      "Tetrammine cobalt(II) chloride",
      "Dichlorocobalt tetrammine(III) chloride"
    ],
    correct: "Tetrammine dichlorocobalt(III) chloride",
    marks: 4,
    negative: 1
  },
  {
    id: 209,
    question: "The crystal field splitting is maximum in:",
    options: [
      "Weak field ligands",
      "Strong field ligands",
      "π-donor ligands",
      "Halide ligands"
    ],
    correct: "Strong field ligands",
    marks: 4,
    negative: 1
  },
  {
    id: 210,
    question: "Which of the following is used in qualitative analysis to detect Ni²⁺ ions?",
    options: [
      "Dimethylglyoxime",
      "Ethylenediamine",
      "NH₃",
      "CO"
    ],
    correct: "Dimethylglyoxime",
    marks: 4,
    negative: 1
  },
   {
    id: 211,
    question: "The compound CH3CH2OH belongs to which homologous series?",
    options: [
      "Alkane",
      "Alkene",
      "Alcohol",
      "Ether"
    ],
    correct: "Alcohol",
    marks: 4,
    negative: 1
  },
  {
    id: 212,
    question: "The IUPAC name of CH3CH2CH=CH2 is:",
    options: [
      "Butane",
      "1-Butene",
      "2-Butene",
      "Propene"
    ],
    correct: "1-Butene",
    marks: 4,
    negative: 1
  },
  {
    id: 213,
    question: "Which of the following has sp³ hybridised carbon?",
    options: [
      "CH4",
      "C2H2",
      "C2H4",
      "CO2"
    ],
    correct: "CH4",
    marks: 4,
    negative: 1
  },
  {
    id: 214,
    question: "The correct order of stability of carbocations is:",
    options: [
      "3° > 2° > 1° > CH3⁺",
      "1° > 2° > 3°",
      "CH3⁺ > 1° > 2°",
      "2° > 3° > 1°"
    ],
    correct: "3° > 2° > 1° > CH3⁺",
    marks: 4,
    negative: 1
  },
  {
    id: 215,
    question: "Which effect is responsible for the stability of benzyl carbocation?",
    options: [
      "Inductive effect",
      "Resonance",
      "Hydrogen bonding",
      "Electromeric effect"
    ],
    correct: "Resonance",
    marks: 4,
    negative: 1
  },
  {
    id: 216,
    question: "Which of the following is not a nucleophile?",
    options: [
      "OH⁻",
      "CN⁻",
      "NH3",
      "BF3"
    ],
    correct: "BF3",
    marks: 4,
    negative: 1
  },
  {
    id: 217,
    question: "Which of the following reactions involves substitution?",
    options: [
      "CH3Cl + KOH → CH3OH",
      "CH2=CH2 + H2 → C2H6",
      "C2H5OH → C2H4 + H2O",
      "CH3CH=CH2 + HBr → CH3CHBrCH3"
    ],
    correct: "CH3Cl + KOH → CH3OH",
    marks: 4,
    negative: 1
  },
  {
    id: 218,
    question: "The hybridisation of carbon in ethene (C2H4) is:",
    options: [
      "sp",
      "sp²",
      "sp³",
      "dsp²"
    ],
    correct: "sp²",
    marks: 4,
    negative: 1
  },
  {
    id: 219,
    question: "Which of the following represents structural isomerism?",
    options: [
      "CH3CH2OH and CH3OCH3",
      "CH2=CH2 and C2H6",
      "CH3CH2CH3 and CH3CH2CH3",
      "CH3OH and C2H5OH"
    ],
    correct: "CH3CH2OH and CH3OCH3",
    marks: 4,
    negative: 1
  },
  {
    id: 220,
    question: "Optical isomerism is shown by:",
    options: [
      "CH4",
      "C2H6",
      "CH3CHBrCH3",
      "CH3CHBrCH2CH3"
    ],
    correct: "CH3CHBrCH2CH3",
    marks: 4,
    negative: 1
  },
  {
    id: 221,
    question: "The IUPAC name of isopropyl alcohol is:",
    options: [
      "1-Propanol",
      "2-Propanol",
      "Propanal",
      "Propanone"
    ],
    correct: "2-Propanol",
    marks: 4,
    negative: 1
  },
  {
    id: 222,
    question: "Which type of isomerism is shown by CH3CH=CHCH3 and CH2=CHCH2CH3?",
    options: [
      "Chain",
      "Functional",
      "Position",
      "Geometrical"
    ],
    correct: "Position",
    marks: 4,
    negative: 1
  },
  {
    id: 223,
    question: "What is the hybridisation of carbon in CO2?",
    options: [
      "sp",
      "sp²",
      "sp³",
      "dsp²"
    ],
    correct: "sp",
    marks: 4,
    negative: 1
  },
  {
    id: 224,
    question: "Which compound exhibits resonance?",
    options: [
      "CH4",
      "CH3CH3",
      "Benzene",
      "C2H6"
    ],
    correct: "Benzene",
    marks: 4,
    negative: 1
  },
  {
    id: 225,
    question: "Which is an electrophile?",
    options: [
      "Cl⁻",
      "NH3",
      "H⁺",
      "OH⁻"
    ],
    correct: "H⁺",
    marks: 4,
    negative: 1
  },
  {
    id: 226,
    question: "Which has the highest boiling point?",
    options: [
      "CH4",
      "CH3CH3",
      "CH3OH",
      "CH3OCH3"
    ],
    correct: "CH3OH",
    marks: 4,
    negative: 1
  },
  {
    id: 227,
    question: "The order of +I effect is:",
    options: [
      "CH3 < C2H5 < (CH3)2CH < (CH3)3C",
      "Reverse order",
      "Random",
      "None"
    ],
    correct: "CH3 < C2H5 < (CH3)2CH < (CH3)3C",
    marks: 4,
    negative: 1
  },
  {
    id: 228,
    question: "Which is not a reaction intermediate?",
    options: [
      "Carbocation",
      "Free radical",
      "Carbanion",
      "Alkane"
    ],
    correct: "Alkane",
    marks: 4,
    negative: 1
  },
  {
    id: 229,
    question: "Which type of reaction is dehydration of alcohol?",
    options: [
      "Addition",
      "Elimination",
      "Substitution",
      "Redox"
    ],
    correct: "Elimination",
    marks: 4,
    negative: 1
  },
  {
    id: 230,
    question: "Which pair are functional isomers?",
    options: [
      "C2H6O and C3H8O",
      "CH3CH2OH and CH3OCH3",
      "CH3CH2CH3 and CH3CH2CH3",
      "C2H4 and C2H6"
    ],
    correct: "CH3CH2OH and CH3OCH3",
    marks: 4,
    negative: 1
  },
  {
    id: 231,
    question: "The number of σ and π bonds in benzene is:",
    options: [
      "6 σ, 6 π",
      "12 σ, 3 π",
      "9 σ, 3 π",
      "6 σ, 3 π"
    ],
    correct: "12 σ, 3 π",
    marks: 4,
    negative: 1
  },
  {
    id: 232,
    question: "The compound CH3COOH is:",
    options: [
      "Alcohol",
      "Ketone",
      "Aldehyde",
      "Carboxylic acid"
    ],
    correct: "Carboxylic acid",
    marks: 4,
    negative: 1
  },
  {
    id: 233,
    question: "Which of the following has geometrical isomerism?",
    options: [
      "CH2=CH2",
      "C2H5OH",
      "CH3CH=CHCH3",
      "CH3CH2CH3"
    ],
    correct: "CH3CH=CHCH3",
    marks: 4,
    negative: 1
  },
  {
    id: 234,
    question: "Which bond has highest polarity?",
    options: [
      "C–H",
      "C–Cl",
      "C–O",
      "C–C"
    ],
    correct: "C–O",
    marks: 4,
    negative: 1
  },
  {
    id: 235,
    question: "Which of the following undergoes nucleophilic substitution easily?",
    options: [
      "CH3Cl",
      "CH3Br",
      "CH3I",
      "CH4"
    ],
    correct: "CH3I",
    marks: 4,
    negative: 1
  },
  {
    id: 236,
    question: "Which statement is true about resonance?",
    options: [
      "Involves movement of atoms",
      "Involves movement of π electrons",
      "Affects molecular weight",
      "Occurs in ionic compounds only"
    ],
    correct: "Involves movement of π electrons",
    marks: 4,
    negative: 1
  },
  {
    id: 237,
    question: "The order of acidity is:",
    options: [
      "CH4 > CH3CH2OH > CH3COOH",
      "CH3COOH > CH3CH2OH > CH4",
      "Reverse",
      "None"
    ],
    correct: "CH3COOH > CH3CH2OH > CH4",
    marks: 4,
    negative: 1
  },
  {
    id: 238,
    question: "The compound with highest % of carbon is:",
    options: [
      "CH4",
      "C2H2",
      "C6H6",
      "C2H6"
    ],
    correct: "C6H6",
    marks: 4,
    negative: 1
  },
  {
    id: 239,
    question: "Which reagent converts alcohol to aldehyde?",
    options: [
      "KMnO4",
      "PCC",
      "H2",
      "NaOH"
    ],
    correct: "PCC",
    marks: 4,
    negative: 1
  },
  {
    id: 240,
    question: "The correct order of bond strength is:",
    options: [
      "C≡C > C=C > C–C",
      "C–C > C=C > C≡C",
      "All equal",
      "None"
    ],
    correct: "C≡C > C=C > C–C",
    marks: 4,
    negative: 1
  },
  {
    id: 241,
    question: "Which of the following compounds undergoes addition reaction most readily?",
    options: [
      "Ethane",
      "Ethene",
      "Benzene",
      "Ethyne"
    ],
    correct: "Ethene",
    marks: 4,
    negative: 1
  },
  {
    id: 242,
    question: "Which of the following reactions is used for the preparation of alkanes from alkyl halides?",
    options: [
      "Wurtz reaction",
      "Friedel–Crafts reaction",
      "Kolbe’s reaction",
      "Cannizzaro reaction"
    ],
    correct: "Wurtz reaction",
    marks: 4,
    negative: 1
  },
  {
    id: 243,
    question: "The major product obtained when 2-bromo-2-methylpropane reacts with alcoholic KOH is:",
    options: [
      "2-methylpropene",
      "2-butanol",
      "1-butene",
      "2-bromobutane"
    ],
    correct: "2-methylpropene",
    marks: 4,
    negative: 1
  },
  {
    id: 244,
    question: "Which of the following shows geometrical isomerism?",
    options: [
      "Butane",
      "2-butene",
      "1-butene",
      "2-methylpropene"
    ],
    correct: "2-butene",
    marks: 4,
    negative: 1
  },
  {
    id: 245,
    question: "Which reagent converts ethyne to ethane?",
    options: [
      "H₂/Ni",
      "HBr",
      "HCl",
      "NaNH₂"
    ],
    correct: "H₂/Ni",
    marks: 4,
    negative: 1
  },
  {
    id: 246,
    question: "Which of the following follows Markovnikov’s rule?",
    options: [
      "CH₂=CH₂ + HBr",
      "CH₃CH=CH₂ + HBr",
      "CH≡CH + HBr",
      "C₆H₆ + Br₂"
    ],
    correct: "CH₃CH=CH₂ + HBr",
    marks: 4,
    negative: 1
  },
  {
    id: 247,
    question: "Which of the following compounds will give a white precipitate with AgNO₃ in ethanol?",
    options: [
      "CH₃Cl",
      "CH₃Br",
      "CH₃I",
      "CCl₄"
    ],
    correct: "CH₃I",
    marks: 4,
    negative: 1
  },
  {
    id: 248,
    question: "Which compound is most reactive towards nucleophilic substitution?",
    options: [
      "CH₃Cl",
      "CH₃Br",
      "CH₃I",
      "CH₃F"
    ],
    correct: "CH₃I",
    marks: 4,
    negative: 1
  },
  {
    id: 249,
    question: "Which one gives the highest yield of ethane in Wurtz reaction?",
    options: [
      "Methyl chloride",
      "Ethyl chloride",
      "Propyl chloride",
      "Butyl chloride"
    ],
    correct: "Methyl chloride",
    marks: 4,
    negative: 1
  },
  {
    id: 250,
    question: "What is the IUPAC name of neopentane?",
    options: [
      "2-methylbutane",
      "2,2-dimethylpropane",
      "3-methylbutane",
      "Pentane"
    ],
    correct: "2,2-dimethylpropane",
    marks: 4,
    negative: 1
  },
  {
    id: 251,
    question: "Which hydrocarbon gives soot on burning?",
    options: [
      "Ethane",
      "Ethene",
      "Benzene",
      "Methane"
    ],
    correct: "Benzene",
    marks: 4,
    negative: 1
  },
  {
    id: 252,
    question: "Which reaction is used for conversion of alkyl halide to alcohol?",
    options: [
      "Reaction with KOH (aq)",
      "Reaction with NaOH (alc)",
      "Reaction with Zn",
      "Reaction with NH₃"
    ],
    correct: "Reaction with KOH (aq)",
    marks: 4,
    negative: 1
  },
  {
    id: 253,
    question: "In Kolbe’s electrolysis, the main product from sodium acetate is:",
    options: [
      "Ethane",
      "Ethene",
      "Ethyne",
      "Methane"
    ],
    correct: "Ethane",
    marks: 4,
    negative: 1
  },
  {
    id: 254,
    question: "The hybridization of carbon in ethyne is:",
    options: [
      "sp³",
      "sp²",
      "sp",
      "dsp²"
    ],
    correct: "sp",
    marks: 4,
    negative: 1
  },
  {
    id: 255,
    question: "Which alkyl halide undergoes SN1 reaction most readily?",
    options: [
      "CH₃Br",
      "C₂H₅Br",
      "(CH₃)₃CBr",
      "CH₂=CH–CH₂Br"
    ],
    correct: "(CH₃)₃CBr",
    marks: 4,
    negative: 1
  },
  {
    id: 256,
    question: "What is the major product in chlorination of methane in presence of sunlight?",
    options: [
      "CH₃Cl",
      "CH₂Cl₂",
      "CHCl₃",
      "CCl₄"
    ],
    correct: "CH₃Cl",
    marks: 4,
    negative: 1
  },
  {
    id: 257,
    question: "Which reaction is known as dehydrohalogenation?",
    options: [
      "Elimination of HX from alkyl halide",
      "Addition of HX to alkene",
      "Substitution of halogen",
      "Oxidation of alcohol"
    ],
    correct: "Elimination of HX from alkyl halide",
    marks: 4,
    negative: 1
  },
  {
    id: 258,
    question: "Which alkene gives two products on ozonolysis?",
    options: [
      "Ethene",
      "Propene",
      "2-butene",
      "Cyclohexene"
    ],
    correct: "Propene",
    marks: 4,
    negative: 1
  },
  {
    id: 259,
    question: "Which of the following is not an electrophilic addition reaction?",
    options: [
      "Halogenation",
      "Hydrogenation",
      "Hydrohalogenation",
      "Hydration"
    ],
    correct: "Hydrogenation",
    marks: 4,
    negative: 1
  },
  {
    id: 260,
    question: "Which compound gives isomeric products with HBr addition in presence of peroxide?",
    options: [
      "Propene",
      "Ethene",
      "2-butene",
      "1-butene"
    ],
    correct: "1-butene",
    marks: 4,
    negative: 1
  },
  {
    id: 261,
    question: "What is the major product formed in Friedel–Crafts alkylation of benzene with CH₃Cl and AlCl₃?",
    options: [
      "Toluene",
      "Chlorobenzene",
      "Benzyl chloride",
      "Xylene"
    ],
    correct: "Toluene",
    marks: 4,
    negative: 1
  },
  {
    id: 262,
    question: "Which of the following follows anti-Markovnikov rule?",
    options: [
      "Addition of HBr in presence of peroxide",
      "Addition of HCl",
      "Addition of HI",
      "Addition of Br₂"
    ],
    correct: "Addition of HBr in presence of peroxide",
    marks: 4,
    negative: 1
  },
  {
    id: 263,
    question: "Which is the correct order of reactivity of alkyl halides towards SN2 reaction?",
    options: [
      "3° > 2° > 1°",
      "1° > 2° > 3°",
      "2° > 1° > 3°",
      "3° > 1° > 2°"
    ],
    correct: "1° > 2° > 3°",
    marks: 4,
    negative: 1
  },
  {
    id: 264,
    question: "Which compound gives chloroform on halogenation?",
    options: [
      "Methane",
      "Ethane",
      "Propane",
      "Ethene"
    ],
    correct: "Methane",
    marks: 4,
    negative: 1
  },
  {
    id: 265,
    question: "The IUPAC name of isobutylene is:",
    options: [
      "2-methylprop-1-ene",
      "1-butene",
      "2-butene",
      "2-methylpropane"
    ],
    correct: "2-methylprop-1-ene",
    marks: 4,
    negative: 1
  },
  {
    id: 266,
    question: "Which reagent converts alkyl halide to alkene?",
    options: [
      "Alcoholic KOH",
      "Aqueous KOH",
      "NH₃",
      "NaOH (aq)"
    ],
    correct: "Alcoholic KOH",
    marks: 4,
    negative: 1
  },
  {
    id: 267,
    question: "The product of bromination of ethene is:",
    options: [
      "Ethyl bromide",
      "1,2-dibromoethane",
      "Bromoethene",
      "Vinyl bromide"
    ],
    correct: "1,2-dibromoethane",
    marks: 4,
    negative: 1
  },
  {
    id: 268,
    question: "Which of the following is used as anesthetic gas?",
    options: [
      "CHCl₃",
      "CH₂Cl₂",
      "CCl₄",
      "CH₃Cl"
    ],
    correct: "CHCl₃",
    marks: 4,
    negative: 1
  },
  {
    id: 269,
    question: "The product of reaction of propene with HBr in presence of peroxide is:",
    options: [
      "1-bromopropane",
      "2-bromopropane",
      "Propyl bromide",
      "Allyl bromide"
    ],
    correct: "1-bromopropane",
    marks: 4,
    negative: 1
  },
  {
    id: 270,
    question: "Which of the following has the highest boiling point?",
    options: [
      "CH₄",
      "C₂H₆",
      "C₃H₈",
      "C₄H₁₀"
    ],
    correct: "C₄H₁₀",
    marks: 4,
    negative: 1
  },
  {
    id: 271,
    question: "Which of the following alcohols will show a positive Lucas test most rapidly?",
    options: [
      "Methanol",
      "Ethanol",
      "2-Propanol",
      "2-Methyl-2-propanol"
    ],
    correct: "2-Methyl-2-propanol",
    marks: 4,
    negative: 1
  },
  {
    id: 272,
    question: "Dehydration of alcohols using conc. H₂SO₄ at 443 K mainly gives:",
    options: [
      "Alkanes",
      "Alkenes",
      "Aldehydes",
      "Ethers"
    ],
    correct: "Alkenes",
    marks: 4,
    negative: 1
  },
  {
    id: 273,
    question: "Williamson ether synthesis is best suited for preparing:",
    options: [
      "Tertiary alkyl ethers",
      "Aryl ethers",
      "Primary alkyl ethers",
      "Vinyl ethers"
    ],
    correct: "Primary alkyl ethers",
    marks: 4,
    negative: 1
  },
  {
    id: 274,
    question: "Which reagent converts aldehydes selectively into alcohols?",
    options: [
      "PCC",
      "LiAlH₄",
      "KMnO₄",
      "Br₂/H₂O"
    ],
    correct: "LiAlH₄",
    marks: 4,
    negative: 1
  },
  {
    id: 275,
    question: "Which of the following shows the highest boiling point?",
    options: [
      "Diethyl ether",
      "Ethanol",
      "Propanal",
      "Methanal"
    ],
    correct: "Ethanol",
    marks: 4,
    negative: 1
  },
  {
    id: 276,
    question: "Oxidation of secondary alcohol yields:",
    options: [
      "Aldehyde",
      "Ketone",
      "Carboxylic acid",
      "Ether"
    ],
    correct: "Ketone",
    marks: 4,
    negative: 1
  },
  {
    id: 277,
    question: "Which compound gives a positive Tollen’s test?",
    options: [
      "Acetone",
      "Formaldehyde",
      "Diethyl ether",
      "2-butanone"
    ],
    correct: "Formaldehyde",
    marks: 4,
    negative: 1
  },
  {
    id: 278,
    question: "Clemmensen reduction converts aldehydes/ketones into:",
    options: [
      "Alcohols",
      "Alkanes",
      "Ethers",
      "Acids"
    ],
    correct: "Alkanes",
    marks: 4,
    negative: 1
  },
  {
    id: 279,
    question: "Which alcohol shows maximum acidic nature?",
    options: [
      "t-Butyl alcohol",
      "Ethanol",
      "Phenol",
      "Methanol"
    ],
    correct: "Phenol",
    marks: 4,
    negative: 1
  },
  {
    id: 280,
    question: "Reaction of an aldehyde with HCN forms:",
    options: [
      "Cyanohydrin",
      "Carboxylic acid",
      "Ketone",
      "Ether"
    ],
    correct: "Cyanohydrin",
    marks: 4,
    negative: 1
  },
  {
    id: 281,
    question: "Ether cleavage with HI proceeds through:",
    options: [
      "Radical pathway",
      "SN2 mechanism",
      "E1 elimination",
      "Pericyclic reaction"
    ],
    correct: "SN2 mechanism",
    marks: 4,
    negative: 1
  },
  {
    id: 282,
    question: "Which carbonyl compound is most reactive towards nucleophilic addition?",
    options: [
      "Acetone",
      "Formaldehyde",
      "Acetaldehyde",
      "Benzaldehyde"
    ],
    correct: "Formaldehyde",
    marks: 4,
    negative: 1
  },
  {
    id: 283,
    question: "Aldol condensation occurs in:",
    options: [
      "Carbonyls without α-H",
      "Only aldehydes",
      "Carbonyls with α-H",
      "Carboxylic acids"
    ],
    correct: "Carbonyls with α-H",
    marks: 4,
    negative: 1
  },
  {
    id: 284,
    question: "The product of oxidation of ethanol using PCC is:",
    options: [
      "Acetic acid",
      "Acetaldehyde",
      "Ethene",
      "Ethyl acetate"
    ],
    correct: "Acetaldehyde",
    marks: 4,
    negative: 1
  },
  {
    id: 285,
    question: "Ethers show low boiling points due to:",
    options: [
      "Strong H-bonding",
      "Ionic bonding",
      "Weak dipole interactions",
      "Metallic bonding"
    ],
    correct: "Weak dipole interactions",
    marks: 4,
    negative: 1
  },
  {
    id: 286,
    question: "Cannizzaro reaction occurs with:",
    options: [
      "Aldehydes with α-H",
      "Ketones only",
      "Aldehydes without α-H",
      "Carboxylic acids"
    ],
    correct: "Aldehydes without α-H",
    marks: 4,
    negative: 1
  },
  {
    id: 287,
    question: "Which reagent distinguishes aldehydes from ketones?",
    options: [
      "PCC",
      "Brady’s reagent",
      "Schiff’s reagent",
      "H₂/Pd"
    ],
    correct: "Schiff’s reagent",
    marks: 4,
    negative: 1
  },
  {
    id: 288,
    question: "Treatment of ethanol with PCl₅ gives:",
    options: [
      "Ethene",
      "Chloroethane",
      "Ethyl acetate",
      "Ether"
    ],
    correct: "Chloroethane",
    marks: 4,
    negative: 1
  },
  {
    id: 289,
    question: "Acetone on reaction with NH₂OH forms:",
    options: [
      "Oxime",
      "Hydrazone",
      "Cyanohydrin",
      "Aldol"
    ],
    correct: "Oxime",
    marks: 4,
    negative: 1
  },
  {
    id: 290,
    question: "Phenol reacts with PBr₃ to give:",
    options: [
      "Bromophenol",
      "Anisole",
      "Bromoalkane",
      "No reaction"
    ],
    correct: "No reaction",
    marks: 4,
    negative: 1
  },
  {
    id: 291,
    question: "Which is the strongest reducing agent?",
    options: [
      "NaBH₄",
      "LiAlH₄",
      "H₂SO₄",
      "KMnO₄"
    ],
    correct: "LiAlH₄",
    marks: 4,
    negative: 1
  },
  {
    id: 292,
    question: "Carboxylic acids can be reduced to alcohols using:",
    options: [
      "PCC",
      "LiAlH₄",
      "H₂O₂",
      "AgNO₃"
    ],
    correct: "LiAlH₄",
    marks: 4,
    negative: 1
  },
  {
    id: 293,
    question: "Reaction of ethanol with hot CuO gives:",
    options: [
      "Methane",
      "Acetaldehyde",
      "Ethanoic acid",
      "Ethene"
    ],
    correct: "Acetaldehyde",
    marks: 4,
    negative: 1
  },
  {
    id: 294,
    question: "Ethanal reacts with NaHSO₃ to form:",
    options: [
      "Sulfonic acid",
      "Alcohol",
      "Bisulfite adduct",
      "Ether"
    ],
    correct: "Bisulfite adduct",
    marks: 4,
    negative: 1
  },
  {
    id: 295,
    question: "Which carbonyl test gives an orange precipitate?",
    options: [
      "Tollen’s test",
      "Fehling’s test",
      "DNPH test",
      "Lucas test"
    ],
    correct: "DNPH test",
    marks: 4,
    negative: 1
  },
  {
    id: 296,
    question: "Ethoxyethane is commonly prepared by:",
    options: [
      "Dehydrogenation",
      "Williamson synthesis",
      "Ozonolysis",
      "Photolysis"
    ],
    correct: "Williamson synthesis",
    marks: 4,
    negative: 1
  },
  {
    id: 297,
    question: "Which reagent oxidizes aldehydes to acids but not ketones?",
    options: [
      "CrO₃",
      "KMnO₄",
      "Tollen’s reagent",
      "PCC"
    ],
    correct: "Tollen’s reagent",
    marks: 4,
    negative: 1
  },
  {
    id: 298,
    question: "Benzaldehyde does not undergo aldol condensation because:",
    options: [
      "No carbonyl group",
      "No hydrogen bonding",
      "No α-H",
      "Weak electrophile"
    ],
    correct: "No α-H",
    marks: 4,
    negative: 1
  },
  {
    id: 299,
    question: "Dehydration of primary alcohol at 413 K gives:",
    options: [
      "Ethers",
      "Ketones",
      "Carboxylic acids",
      "Aldehydes"
    ],
    correct: "Ethers",
    marks: 4,
    negative: 1
  },
  {
    id: 300,
    question: "Identify the major product when acetone reacts with CH₃MgBr followed by hydrolysis:",
    options: [
      "3° alcohol",
      "2° alcohol",
      "1° alcohol",
      "Ethanone"
    ],
    correct: "3° alcohol",
    marks: 4,
    negative: 1
  },
  {
    id: 301,
    question: "Which of the following will have the highest boiling point?",
    options: [
      "Acetaldehyde",
      "Ethanol",
      "Acetic acid",
      "Acetone"
    ],
    correct: "Acetic acid",
    marks: 4,
    negative: 1
  },
  {
    id: 302,
    question: "Which reagent converts a carboxylic acid into its corresponding alcohol?",
    options: [
      "LiAlH4",
      "NaBH4",
      "H2/Pd",
      "KMnO4"
    ],
    correct: "LiAlH4",
    marks: 4,
    negative: 1
  },
  {
    id: 303,
    question: "The reaction of an amine with nitrous acid gives nitrogen gas in case of:",
    options: [
      "1° aliphatic amine",
      "2° amine",
      "3° amine",
      "Aromatic amine"
    ],
    correct: "1° aliphatic amine",
    marks: 4,
    negative: 1
  },
  {
    id: 304,
    question: "The functional group –COOH can be detected by:",
    options: [
      "Lucas test",
      "2,4-DNP test",
      "NaHCO₃ test",
      "FeCl3 test"
    ],
    correct: "NaHCO₃ test",
    marks: 4,
    negative: 1
  },
  {
    id: 305,
    question: "Which is the strongest acid?",
    options: [
      "Trichloroacetic acid",
      "Acetic acid",
      "Propanoic acid",
      "Benzoic acid"
    ],
    correct: "Trichloroacetic acid",
    marks: 4,
    negative: 1
  },
  {
    id: 306,
    question: "Aniline reacts with bromine water to form:",
    options: [
      "p-Bromoaniline",
      "2,4,6-tribromoaniline",
      "m-Bromoaniline",
      "Anilinium bromide"
    ],
    correct: "2,4,6-tribromoaniline",
    marks: 4,
    negative: 1
  },
  {
    id: 307,
    question: "Amides are less basic than amines because:",
    options: [
      "High boiling point",
      "Steric hindrance",
      "Low molar mass",
      "Resonance reduces electron density on N"
    ],
    correct: "Resonance reduces electron density on N",
    marks: 4,
    negative: 1
  },
  {
    id: 308,
    question: "Which reagent converts alcohol to carboxylic acid?",
    options: [
      "KMnO4",
      "LiAlH4",
      "PCl5",
      "HBr"
    ],
    correct: "KMnO4",
    marks: 4,
    negative: 1
  },
  {
    id: 309,
    question: "The product formed when acetic acid reacts with PCl₅ is:",
    options: [
      "Chloroacetic acid",
      "Acetyl chloride",
      "Ester",
      "Acetone"
    ],
    correct: "Acetyl chloride",
    marks: 4,
    negative: 1
  },
  {
    id: 310,
    question: "Which of the following is a primary amine?",
    options: [
      "Aniline",
      "Dimethylamine",
      "Trimethylamine",
      "Diethylamine"
    ],
    correct: "Aniline",
    marks: 4,
    negative: 1
  },
  {
    id: 311,
    question: "The Hoffmann bromamide reaction converts amides to:",
    options: [
      "1° amines",
      "2° amines",
      "3° amines",
      "Alcohols"
    ],
    correct: "1° amines",
    marks: 4,
    negative: 1
  },
  {
    id: 312,
    question: "The pKa of carboxylic acids is around:",
    options: [
      "4–5",
      "1–2",
      "7–8",
      "9–10"
    ],
    correct: "4–5",
    marks: 4,
    negative: 1
  },
  {
    id: 313,
    question: "Acetic anhydride reacts with water to give:",
    options: [
      "Acetic acid",
      "Ethanol",
      "Ethanoic ester",
      "Methanoic acid"
    ],
    correct: "Acetic acid",
    marks: 4,
    negative: 1
  },
  {
    id: 314,
    question: "Ammonolysis of alkyl halides gives:",
    options: [
      "Amines",
      "Alcohols",
      "Ethers",
      "Carboxylic acids"
    ],
    correct: "Amines",
    marks: 4,
    negative: 1
  },
  {
    id: 315,
    question: "Which acid is strongest?",
    options: [
      "Acetic acid",
      "Benzoic acid",
      "Formic acid",
      "Propanoic acid"
    ],
    correct: "Formic acid",
    marks: 4,
    negative: 1
  },
  {
    id: 316,
    question: "Which reagent forms diazonium salt from aniline?",
    options: [
      "H₂SO₄",
      "KMnO₄",
      "NaNO₂/HCl (0–5°C)",
      "Cl₂"
    ],
    correct: "NaNO₂/HCl (0–5°C)",
    marks: 4,
    negative: 1
  },
  {
    id: 317,
    question: "Ethylamine is more basic than aniline because:",
    options: [
      "+I effect of alkyl group",
      "Resonance stabilization",
      "More acidic",
      "Larger size"
    ],
    correct: "+I effect of alkyl group",
    marks: 4,
    negative: 1
  },
  {
    id: 318,
    question: "Acid strength increases with:",
    options: [
      "Electron‑donating groups",
      "Electron‑withdrawing groups",
      "Higher molecular weight",
      "More alkyl groups"
    ],
    correct: "Electron‑withdrawing groups",
    marks: 4,
    negative: 1
  },
  {
    id: 319,
    question: "Amides on hydrolysis give:",
    options: [
      "Carboxylic acids + amines",
      "Alcohols",
      "Ketones",
      "Alkanes"
    ],
    correct: "Carboxylic acids + amines",
    marks: 4,
    negative: 1
  },
  {
    id: 320,
    question: "Reduction of nitriles gives:",
    options: [
      "Esters",
      "Carboxylic acids",
      "Amides",
      "Amines"
    ],
    correct: "Amines",
    marks: 4,
    negative: 1
  },
  {
    id: 321,
    question: "Carboxylic acids show dimer formation due to:",
    options: [
      "Hydrogen bonding",
      "Ionic bonding",
      "Van der Waals forces",
      "Covalent bonding"
    ],
    correct: "Hydrogen bonding",
    marks: 4,
    negative: 1
  },
  {
    id: 322,
    question: "The reaction of acyl chloride with alcohol gives:",
    options: [
      "Amide",
      "Ester",
      "Ether",
      "Aldehyde"
    ],
    correct: "Ester",
    marks: 4,
    negative: 1
  },
  {
    id: 323,
    question: "A compound giving a foul smell on reaction with NaOH and heating is:",
    options: [
      "Amide",
      "Aniline",
      "Ester",
      "Carboxylic acid"
    ],
    correct: "Ester",
    marks: 4,
    negative: 1
  },
  {
    id: 324,
    question: "Which is the weakest base?",
    options: [
      "Aniline",
      "Ethylamine",
      "p-Toluidine",
      "Dimethylamine"
    ],
    correct: "Aniline",
    marks: 4,
    negative: 1
  },
  {
    id: 325,
    question: "The functional group –CONH₂ belongs to:",
    options: [
      "Acid",
      "Amine",
      "Ester",
      "Amide"
    ],
    correct: "Amide",
    marks: 4,
    negative: 1
  },
  {
    id: 326,
    question: "Primary amines react with Hinsberg reagent to form:",
    options: [
      "Sulphonamides",
      "Nitro compounds",
      "Esters",
      "Aldehydes"
    ],
    correct: "Sulphonamides",
    marks: 4,
    negative: 1
  },
  {
    id: 327,
    question: "Which of the following does not form hydrogen bonding?",
    options: [
      "Ethylamine",
      "Trimethylamine",
      "Acetic acid",
      "Formic acid"
    ],
    correct: "Trimethylamine",
    marks: 4,
    negative: 1
  },
  {
    id: 328,
    question: "Amines behave as:",
    options: [
      "Lewis bases",
      "Lewis acids",
      "Oxidizing agents",
      "Reducing agents"
    ],
    correct: "Lewis bases",
    marks: 4,
    negative: 1
  },
  {
    id: 329,
    question: "Ethanoic acid + ethanol in presence of H₂SO₄ gives:",
    options: [
      "Aldehyde",
      "Acid chloride",
      "Ester",
      "Ether"
    ],
    correct: "Ester",
    marks: 4,
    negative: 1
  },
  {
    id: 330,
    question: "Gabriel phthalimide synthesis prepares:",
    options: [
      "Tertiary amines",
      "Secondary amines",
      "Primary amines",
      "Aromatic amines"
    ],
    correct: "Primary amines",
    marks: 4,
    negative: 1
  },
  {
    id: 331,
    question: "Which of the following is a **reducing sugar**?",
    "options": [
      "Sucrose",
      "Glucose",
      "Cellulose",
      "Starch"
    ],
    correct: "Glucose",
    marks: 4,
    negative: 1
  },
  {
    id: 332,
    question: "The monomer unit of **natural rubber** is:",
    "options": [
      "Isoprene",
      "Butadiene",
      "Styrene",
      "Acrylonitrile"
    ],
    correct: "Isoprene",
    marks: 4,
    negative: 1
  },
  {
    id: 333,
    question: "Which vitamin is also known as **calciferol**?",
    "options": [
      "Vitamin A",
      "Vitamin D",
      "Vitamin E",
      "Vitamin K"
    ],
    correct: "Vitamin D",
    marks: 4,
    negative: 1
  },
  {
    id: 334,
    question: "Which among the following is a **fibrous protein**?",
    "options": [
      "Hemoglobin",
      "Insulin",
      "Keratin",
      "Myoglobin"
    ],
    correct: "Keratin",
    marks: 4,
    negative: 1
  },
  {
    id: 335,
    question: "Which of the following is **not a polysaccharide**?",
    "options": [
      "Cellulose",
      "Glycogen",
      "Maltose",
      "Starch"
    ],
    correct: "Maltose",
    marks: 4,
    negative: 1
  },
  {
    id: 336,
    question: "The **monomer of Bakelite** is:",
    "options": [
      "Phenol and Formaldehyde",
      "Urea and Formaldehyde",
      "Styrene",
      "Ethylene"
    ],
    correct: "Phenol and Formaldehyde",
    marks: 4,
    negative: 1
  },
  {
    id: 337,
    question: "Which of the following is an example of a **condensation polymer**?",
    "options": [
      "Polythene",
      "PVC",
      "Nylon-6,6",
      "Polystyrene"
    ],
    correct: "Nylon-6,6",
    marks: 4,
    negative: 1
  },
  {
    id: 338,
    question: "Which among the following vitamins is **water-soluble**?",
    "options": [
      "Vitamin A",
      "Vitamin C",
      "Vitamin D",
      "Vitamin E"
    ],
    correct: "Vitamin C",
    marks: 4,
    negative: 1
  },
  {
    id: 339,
    question: "Which polymer is known as **‘Orlon’**?",
    "options": [
      "Polyacrylonitrile",
      "Polystyrene",
      "Polyvinyl chloride",
      "Teflon"
    ],
    correct: "Polyacrylonitrile",
    marks: 4,
    negative: 1
  },
  {
    id: 340,
    question: "The **linkage present in proteins** is:",
    "options": [
      "Glycosidic linkage",
      "Ester linkage",
      "Peptide linkage",
      "Disulfide bond"
    ],
    correct: "Peptide linkage",
    marks: 4,
    negative: 1
  },
  {
    id: 341,
    question: "Which sugar is called **fruit sugar**?",
    "options": [
      "Glucose",
      "Galactose",
      "Fructose",
      "Maltose"
    ],
    correct: "Fructose",
    marks: 4,
    negative: 1
  },
  {
    id: 342,
    question: "The **monomer of Teflon** is:",
    "options": [
      "Ethylene",
      "Tetrafluoroethylene",
      "Styrene",
      "Chloroprene"
    ],
    correct: "Tetrafluoroethylene",
    marks: 4,
    negative: 1
  },
  {
    id: 343,
    question: "Which of the following is a **homopolymer**?",
    "options": [
      "Nylon-6,6",
      "Bakelite",
      "PVC",
      "Nylon-6"
    ],
    correct: "PVC",
    marks: 4,
    negative: 1
  },
  {
    id: 344,
    question: "Which vitamin prevents **scurvy**?",
    "options": [
      "Vitamin A",
      "Vitamin B1",
      "Vitamin C",
      "Vitamin D"
    ],
    correct: "Vitamin C",
    marks: 4,
    negative: 1
  },
  {
    id: 345,
    question: "Which of the following is a **polysaccharide**?",
    "options": [
      "Sucrose",
      "Maltose",
      "Lactose",
      "Starch"
    ],
    correct: "Starch",
    marks: 4,
    negative: 1
  },
  {
    id: 346,
    question: "Which synthetic polymer is used in making **non-stick cookware**?",
    "options": [
      "PVC",
      "Teflon",
      "Bakelite",
      "Nylon"
    ],
    correct: "Teflon",
    marks: 4,
    negative: 1
  },
  {
    id: 347,
    question: "Which protein **carries oxygen in human blood**?",
    "options": [
      "Myoglobin",
      "Hemoglobin",
      "Collagen",
      "Keratin"
    ],
    correct: "Hemoglobin",
    marks: 4,
    negative: 1
  },
  {
    id: 348,
    question: "Which among the following is **not an amino acid**?",
    "options": [
      "Glycine",
      "Alanine",
      "Adenine",
      "Valine"
    ],
    correct: "Adenine",
    marks: 4,
    negative: 1
  },
  {
    id: 349,
    question: "Which polymer is called **artificial silk**?",
    "options": [
      "Nylon",
      "Rayon",
      "Polyester",
      "Acrylic"
    ],
    correct: "Rayon",
    marks: 4,
    negative: 1
  },
  {
    id: 350,
    question: "Which vitamin is also known as **tocopherol**?",
    "options": [
      "Vitamin A",
      "Vitamin C",
      "Vitamin E",
      "Vitamin K"
    ],
    correct: "Vitamin E",
    marks: 4,
    negative: 1
  },
  {
    id: 351,
    question: "Which of the following is **not a carbohydrate**?",
    "options": [
      "Glucose",
      "Fructose",
      "Insulin",
      "Cellulose"
    ],
    correct: "Insulin",
    marks: 4,
    negative: 1
  },
  {
    id: 352,
    question: "The **monomer of Nylon-6** is:",
    "options": [
      "Caprolactam",
      "Adipic acid",
      "Ethylene",
      "Glycol"
    ],
    correct: "Caprolactam",
    marks: 4,
    negative: 1
  },
  {
    id: 353,
    question: "Which of the following is a **globular protein**?",
    "options": [
      "Collagen",
      "Hemoglobin",
      "Keratin",
      "Fibroin"
    ],
    correct: "Hemoglobin",
    marks: 4,
    negative: 1
  },
  {
    id: 354,
    question: "Which vitamin is required for **blood clotting**?",
    "options": [
      "Vitamin A",
      "Vitamin D",
      "Vitamin E",
      "Vitamin K"
    ],
    correct: "Vitamin K",
    marks: 4,
    negative: 1
  },
  {
    id: 355,
    question: "The process of conversion of **starch into maltose is catalyzed** by:",
    "options": [
      "Maltase",
      "Amylase",
      "Invertase",
      "Lactase"
    ],
    correct: "Amylase",
    marks: 4,
    negative: 1
  },
  {
    id: 356,
    question: "Which of the following is a **biodegradable polymer**?",
    "options": [
      "PHBV",
      "PVC",
      "Polystyrene",
      "Teflon"
    ],
    correct: "PHBV",
    marks: 4,
    negative: 1
  },
  {
    id: 357,
    question: "Which of the following contains a **peptide linkage**?",
    "options": [
      "Starch",
      "Nylon",
      "Proteins",
      "Cellulose"
    ],
    correct: "Proteins",
    marks: 4,
    negative: 1
  },
  {
    id: 358,
    question: "Which vitamin is also called **retinol**?",
    "options": [
      "Vitamin A",
      "Vitamin B12",
      "Vitamin C",
      "Vitamin D"
    ],
    correct: "Vitamin A",
    marks: 4,
    negative: 1
  },
  {
    id: 359,
    question: "Which polymer is used for making **bulletproof glass**?",
    "options": [
      "Polyvinyl chloride",
      "Polystyrene",
      "Polycarbonate",
      "Bakelite"
    ],
    correct: "Polycarbonate",
    marks: 4,
    negative: 1
  },
  {
    id: 360,
    question: "Which disaccharide is composed of **glucose and galactose**?",
    "options": [
      "Maltose",
      "Sucrose",
      "Lactose",
      "Cellobiose"
    ],
    correct: "Lactose",
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
  doc.text("Exam Results - Chemistry", 14, 20);

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
                <h1 className="text-2xl font-bold text-center mb-6">Chemistry</h1>
    
                
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
    
    
    
    
    