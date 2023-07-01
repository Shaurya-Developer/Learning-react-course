import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  // const [test,setTest] = useState({ name: "Shaurya" });

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    // test.name = "Ayush"; // It will work and it will cause re-render, in case of object we can directly change state like this. But it's a BAD PRACTICE to do it this way. We should only update state using setter function provided by setState
    // setTest({name: "Ayush"}); GOOD WAY
    // if (step < 3) setStep(step + 1);
    if (step < 3) setStep((s) => s + 1); // if we are updating our state based on previous state then we should do it this way, using callback
  }

  return (
    <>
      <button onClick={() => setIsOpen((is) => !is)} className="close">
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
