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
  },
  {
    id: 361,
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
    id: 362,
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
    id: 363,
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
    id: 364,
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
    id: 365,
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
    id: 366,
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
    id: 367,
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
    id: 368,
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
    id: 369,
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
    id: 370,
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
    id: 371,
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
    id: 372,
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
    id: 373,
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
    id: 374,
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
    id: 375,
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
    id: 376,
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
    id: 377,
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
    id: 378,
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
    id: 379,
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
    id: 380,
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
    id: 381,
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
    id: 382,
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
    id: 383,
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
    id: 384,
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
    id: 385,
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
    id: 386,
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
    id: 387,
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
    id: 388,
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
    id: 389,
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
    id: 390,
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
    id: 391,
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
    id: 392,
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
    id: 393,
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
    id: 394,
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
    id: 395,
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
    id: 396,
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
    id: 397,
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
    id: 398,
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
    id: 399,
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
    id: 400,
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
    id: 401,
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
    id: 402,
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
    id: 403,
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
    id: 404,
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
    id: 405,
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
    id: 406,
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
    id: 407,
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
    id: 408,
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
    id: 409,
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
    id: 410,
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
    id: 411,
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
    id: 412,
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
    id: 413,
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
    id: 414,
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
    id: 415,
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
    id: 416,
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
    id: 417,
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
    id: 418,
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
    id: 419,
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
    id: 420,
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
    id: 421,
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
    id: 422,
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
    id: 423,
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
    id: 424,
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
    id: 425,
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
    id: 426,
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
    id: 427,
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
    id: 428,
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
    id: 429,
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
    id: 430,
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
    id: 431,
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
    id: 432,
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
    id: 433,
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
    id: 434,
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
    id: 435,
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
    id: 436,
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
    id: 437,
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
    id: 438,
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
    id: 439,
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
    id: 440,
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
    id: 441,
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
    id: 442,
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
    id: 443,
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
    id: 444,
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
    id: 445,
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
    id: 446,
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
    id: 447,
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
    id: 448,
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
    id: 449,
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
    id: 450,
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
    id: 451,
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
    id: 452,
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
    id: 453,
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
    id: 454,
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
    id: 455,
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
    id: 456,
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
    id: 457,
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
    id: 458,
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
    id: 459,
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
    id: 460,
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
    id: 461,
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
    id: 462,
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
    id: 463,
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
    id: 464,
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
    id: 465,
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
    id: 466,
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
    id: 467,
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
    id: 468,
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
    id: 469,
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
    id: 470,
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
    id: 471,
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
    id: 472,
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
    id: 473,
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
    id: 474,
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
    id: 475,
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
    id: 476,
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
    id: 477,
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
    id: 478,
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
    id: 479,
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
    id: 480,
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
    id: 481,
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
    id: 482,
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
    id: 483,
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
    id: 484,
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
    id: 485,
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
    id: 486,
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
    id: 487,
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
    id: 488,
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
    id: 489,
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
    id: 490,
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
    id: 491,
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
    id: 492,
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
    id: 493,
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
    id: 494,
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
    id: 495,
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
    id: 496,
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
    id: 497,
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
    id: 498,
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
    id: 499,
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
    id: 500,
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
    id: 501,
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
    id: 502,
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
    id: 503,
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
    id: 504,
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
    id: 505,
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
    id: 506,
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
    id: 507,
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
    id: 508,
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
    id: 509,
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
    id: 510,
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
    id: 511,
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
    id: 512,
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
    id: 513,
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
    id: 514,
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
    id: 515,
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
    id: 516,
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
    id: 517,
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
    id: 518,
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
    id: 519,
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
    id: 520,
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
    id: 521,
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
    id: 522,
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
    id: 523,
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
    id: 524,
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
    id: 525,
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
    id: 526,
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
    id: 527,
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
    id: 528,
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
    id: 529,
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
    id: 530,
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
    id: 531,
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
    id: 532,
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
    id: 533,
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
    id: 534,
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
    id: 535,
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
    id: 536,
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
    id: 537,
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
    id: 538,
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
    id: 539,
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
    id: 540,
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
    id: 541,
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
    id: 542,
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
    id: 543,
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
    id: 544,
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
    id: 545,
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
    id: 546,
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
    id: 547,
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
    id: 548,
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
    id: 549,
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
    id: 550,
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
    id: 551,
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
    id: 552,
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
    id: 553,
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
    id: 554,
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
    id: 555,
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
    id: 556,
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
    id: 557,
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
    id: 558,
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
    id: 559,
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
    id: 560,
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
    id: 561,
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
    id: 562,
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
    id: 563,
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
    id: 564,
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
    id: 565,
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
    id: 566,
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
    id: 567,
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
    id: 568,
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
    id: 569,
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
    id: 570,
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
    id: 571,
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
    id: 572,
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
    id: 573,
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
    id: 574,
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
    id: 575,
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
    id: 576,
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
    id: 577,
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
    id: 578,
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
    id: 579,
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
    id: 580,
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
    id: 581,
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
    id: 582,
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
    id: 583,
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
    id: 584,
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
    id: 585,
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
    id: 586,
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
    id: 587,
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
    id: 588,
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
    id: 589,
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
    id: 590,
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
    id: 591,
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
    id: 592,
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
    id: 593,
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
    id: 594,
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
    id: 595,
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
    id: 596,
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
    id: 597,
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
    id: 598,
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
    id: 599,
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
    id: 600,
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
    id: 601,
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
    id: 602,
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
    id: 603,
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
    id: 604,
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
    id: 605,
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
    id: 606,
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
    id: 607,
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
    id: 608,
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
    id: 609,
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
    id: 610,
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
    id: 611,
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
    id: 612,
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
    id: 613,
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
    id: 614,
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
    id: 615,
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
    id: 616,
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
    id: 617,
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
    id: 618,
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
    id: 619,
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
    id: 620,
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
    id: 621,
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
    id: 622,
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
    id: 623,
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
    id: 624,
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
    id: 625,
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
    id: 626,
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
    id: 627,
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
    id: 628,
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
    id: 629,
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
    id: 630,
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
    id: 631,
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
    id: 632,
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
    id: 633,
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
    id: 634,
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
    id: 635,
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
    id: 636,
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
    id: 637,
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
    id: 638,
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
    id: 639,
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
    id: 640,
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
    id: 641,
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
    id: 642,
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
    id: 643,
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
    id: 644,
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
    id: 645,
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
    id: 646,
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
    id: 647,
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
    id: 648,
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
    id: 649,
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
    id: 650,
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
    id: 651,
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
    id: 652,
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
    id: 653,
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
    id: 654,
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
    id: 655,
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
    id: 656,
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
    id: 657,
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
    id: 658,
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
    id: 659,
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
    id: 660,
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
    id: 661,
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
    id: 662,
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
    id: 663,
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
    id: 664,
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
    id: 665,
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
    id: 666,
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
    id: 667,
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
    id: 668,
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
    id: 669,
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
    id: 670,
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
    id: 671,
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
    id: 672,
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
    id: 673,
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
    id: 674,
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
    id: 675,
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
    id: 676,
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
    id: 677,
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
    id: 678,
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
    id: 679,
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
    id: 680,
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
    id: 681,
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
    id: 682,
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
    id: 683,
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
    id: 684,
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
    id: 685,
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
    id: 686,
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
    id: 687,
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
    id: 688,
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
    id: 689,
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
    id: 690,
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
    id: 691,
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
    id: 692,
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
    id: 693,
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
    id: 694,
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
    id: 695,
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
    id: 696,
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
    id: 697,
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
    id: 698,
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
    id: 699,
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
    id: 700,
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
    id: 701,
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
    id: 702,
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
    id: 703,
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
    id: 704,
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
    id: 705,
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
    id: 706,
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
    id: 707,
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
    id: 708,
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
    id: 709,
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
    id: 710,
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
    id: 711,
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
    id: 712,
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
    id: 713,
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
    id: 714,
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
    id: 715,
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
    id: 716,
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
    id: 717,
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
    id: 718,
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
    id: 719,
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
    id: 720,
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
  },
  {
    id: 721,
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
    id: 722,
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
    id: 723,
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
    id: 724,
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
    id: 725,
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
    id: 726,
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
    id: 727,
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
    id: 728,
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
    id: 729,
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
    id: 730,
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
    id: 731,
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
    id: 732,
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
    id: 733,
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
    id: 734,
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
    id: 735,
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
    id: 736,
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
    id: 737,
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
    id: 738,
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
    id: 739,
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
    id: 740,
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
    id: 741,
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
    id: 742,
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
    id: 743,
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
    id: 744,
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
    id: 745,
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
    id: 746,
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
    id: 747,
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
    id: 748,
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
    id: 749,
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
    id: 750,
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
    id: 751,
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
    id: 752,
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
    id: 753,
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
    id: 754,
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
    id: 755,
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
    id: 756,
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
    id: 757,
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
    id: 758,
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
    id: 759,
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
    id: 760,
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
    id: 761,
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
    id: 762,
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
    id: 763,
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
    id: 764,
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
    id: 765,
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
    id: 766,
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
    id: 767,
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
    id: 768,
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
    id: 769,
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
    id: 770,
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
    id: 771,
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
    id: 772,
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
    id: 773,
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
    id: 774,
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
    id: 775,
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
    id: 776,
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
    id: 777,
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
    id: 778,
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
    id: 779,
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
    id: 780,
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
    id: 781,
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
    id: 782,
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
    id: 783,
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
    id: 784,
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
    id: 785,
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
    id: 786,
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
    id: 787,
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
    id: 788,
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
    id: 789,
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
    id: 790,
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
    id: 791,
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
    id: 792,
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
    id: 793,
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
    id: 794,
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
    id: 795,
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
    id: 796,
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
    id: 797,
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
    id: 798,
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
    id: 799,
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
    id: 800,
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
    id: 801,
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
    id: 802,
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
    id: 803,
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
    id: 804,
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
    id: 805,
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
    id: 806,
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
    id: 807,
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
    id: 808,
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
    id: 809,
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
    id: 810,
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
    id: 811,
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
    id: 812,
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
    id: 813,
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
    id: 814,
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
    id: 815,
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
    id: 816,
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
    id: 817,
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
    id: 818,
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
    id: 819,
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
    id: 820,
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
    id: 821,
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
    id: 822,
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
    id: 823,
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
    id: 824,
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
    id: 825,
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
    id: 826,
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
    id: 827,
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
    id: 828,
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
    id: 829,
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
    id: 830,
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
    id: 831,
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
    id: 832,
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
    id: 833,
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
    id: 834,
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
    id: 835,
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
    id: 836,
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
    id: 837,
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
    id: 838,
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
    id: 839,
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
    id: 840,
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
    id: 841,
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
    id: 842,
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
    id: 843,
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
    id: 844,
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
    id: 845,
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
    id: 846,
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
    id: 847,
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
    id: 848,
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
    id: 849,
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
    id: 850,
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
    id: 851,
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
    id: 852,
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
    id: 853,
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
    id: 854,
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
    id: 855,
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
    id: 856,
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
    id: 857,
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
    id: 858,
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
    id: 859,
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
    id: 860,
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
    id: 861,
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
    id: 862,
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
    id: 863,
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
    id: 864,
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
    id: 865,
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
    id: 866,
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
    id: 867,
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
    id: 868,
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
    id: 869,
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
    id: 870,
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
    id: 871,
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
    id: 872,
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
    id: 873,
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
    id: 874,
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
    id: 875,
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
    id: 876,
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
    id: 877,
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
    id: 878,
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
    id: 879,
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
    id: 880,
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
    id: 881,
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
    id: 882,
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
    id: 883,
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
    id: 884,
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
    id: 885,
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
    id: 886,
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
    id: 887,
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
    id: 888,
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
    id: 889,
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
    id: 890,
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
    id: 891,
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
    id: 892,
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
    id: 893,
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
    id: 894,
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
    id: 895,
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
    id: 896,
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
    id: 897,
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
    id: 898,
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
    id: 899,
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
    id: 900,
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
    id: 901,
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
    id: 902,
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
    id: 903,
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
    id: 904,
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
    id: 905,
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
    id: 906,
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
    id: 907,
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
    id: 908,
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
    id: 909,
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
    id: 910,
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
    id: 911,
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
    id: 912,
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
    id: 913,
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
    id: 914,
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
    id: 915,
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
    id: 916,
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
    id: 917,
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
    id: 918,
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
    id: 919,
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
    id: 920,
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
    id: 921,
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
    id: 922,
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
    id: 923,
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
    id: 924,
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
    id: 925,
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
    id: 926,
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
    id: 927,
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
    id: 928,
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
    id: 929,
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
    id: 930,
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
    id: 931,
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
    id: 932,
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
    id: 933,
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
    id: 934,
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
    id: 935,
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
    id: 936,
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
    id: 937,
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
    id: 938,
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
    id: 939,
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
    id: 940,
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
    id: 941,
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
    id: 942,
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
    id: 943,
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
    id: 944,
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
    id: 945,
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
    id: 946,
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
    id: 947,
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
    id: 948,
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
    id: 949,
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
    id: 950,
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
    id: 951,
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
    id: 952,
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
    id: 953,
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
    id: 954,
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
    id: 955,
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
    id: 956,
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
    id: 957,
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
    id: 958,
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
    id: 959,
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
    id: 960,
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
    id: 961,
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
    id: 962,
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
    id: 963,
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
    id: 964,
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
    id: 965,
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
    id: 966,
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
    id: 967,
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
    id: 968,
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
    id: 969,
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
    id: 970,
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
    id: 971,
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
    id: 972,
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
    id: 973,
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
    id: 974,
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
    id: 975,
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
    id: 976,
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
    id: 977,
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
    id: 978,
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
    id: 979,
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
    id: 980,
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
    id: 981,
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
    id: 982,
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
    id: 983,
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
    id: 984,
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
    id: 985,
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
    id: 986,
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
    id: 987,
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
    id: 988,
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
    id: 989,
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
    id: 990,
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
    id: 991,
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
    id: 992,
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
    id: 993,
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
    id: 994,
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
    id: 995,
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
    id: 996,
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
    id: 997,
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
    id: 998,
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
    id: 999,
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
    id: 1000,
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
    id: 1001,
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
    id: 1002,
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
    id: 1003,
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
    id: 1004,
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
    id: 1005,
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
    id: 1006,
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
    id: 1007,
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
    id: 1008,
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
    id: 1009,
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
    id: 1010,
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
    id: 1011,
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
    id: 1012,
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
    id: 1013,
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
    id: 1014,
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
    id: 1015,
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
    id: 1016,
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
    id: 1017,
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
    id: 1018,
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
    id: 1019,
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
    id: 1020,
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
    id: 1021,
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
    id: 1022,
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
    id: 1023,
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
    id: 1024,
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
    id: 1025,
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
    id: 1026,
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
    id: 1027,
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
    id: 1028,
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
    id: 1029,
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
    id: 1030,
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
    id: 1031,
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
    id: 1032,
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
    id: 1033,
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
    id: 1034,
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
    id: 1035,
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
    id: 1036,
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
    id: 1037,
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
    id: 1038,
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
    id: 1039,
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
    id: 1040,
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
    id: 1041,
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
    id: 1042,
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
    id: 1043,
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
    id: 1044,
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
    id: 1045,
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
    id: 1046,
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
    id: 1047,
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
    id: 1048,
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
    id: 1049,
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
    id: 1050,
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
    id: 1051,
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
    id: 1052,
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
    id: 1053,
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
    id: 1054,
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
    id: 1055,
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
    id: 1056,
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
    id: 1057,
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
    id: 1058,
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
    id: 1059,
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
    id: 1060,
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
    id: 1061,
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
    id: 1062,
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
    id: 1063,
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
    id: 1064,
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
    id: 1065,
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
    id: 1066,
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
    id: 1067,
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
    id: 1068,
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
    id: 1069,
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
    id: 1070,
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
    id: 1071,
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
    id: 1072,
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
    id: 1073,
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
    id: 1074,
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
    id: 1075,
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
    id: 1076,
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
    id: 1077,
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
    id: 1078,
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
    id: 1079,
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
    id: 1080,
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
   
   
   
   
   