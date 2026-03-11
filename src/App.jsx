import { useState } from "react";

const App = () => {
  const [num, setNum] = useState("");
  const [message, setMessage] = useState("Start guessing!");
  const [userTurn, setUserTurn] = useState(3);
  const [randomNumber, setRandomNumber] = useState(
    () => Math.floor(Math.random() * 20) + 1,
  );
  const [currentLevel, setCurrentLevel] = useState("easy");
  const [prevGuess, setPrevGuess] = useState([]);
  let levelText = "1-20";

  if (currentLevel === "medium") {
    levelText = "1-50";
  }
  if (currentLevel === "hard") {
    levelText = "1-100";
  }

  function generateRandomLevel(level) {
    if (level === "easy") return Math.floor(Math.random() * 20) + 1;
    if (level === "medium") return Math.floor(Math.random() * 50) + 1;
    if (level === "hard") return Math.floor(Math.random() * 100) + 1;
  }

  function handleChange(e) {
    setNum(e.target.value);
  }

  function handleClick() {
    if (num === "") {
      setMessage("Please enter a number!!");
      return;
    }

    const guess = Number(num);
    setPrevGuess((prev) => [...prev, guess]);
    if (userTurn === 0) return;

    const diff = Math.abs(guess - randomNumber);
    let hint = "";

    if (diff === 0) {
      setMessage("Perfect! You guessed it! Click restart to play again");
      setNum("");
      return;
    }

    if (diff <= 5) {
      hint = "Very Close! ";
    } else if (diff <= 10) {
      hint = "Getting Closer!! ";
    } else {
      hint = "Way Off ";
    }

    // conditions
    if (guess > randomNumber) {
      hint += "(Too High)";
    } else if (guess < randomNumber) {
      hint += "(Too Low)";
    }

    if (userTurn === 1) {
      setMessage(`Game over! The number was ${randomNumber}`);
    } else {
      setMessage(hint);
    }
    setUserTurn((prev) => prev - 1);
    setNum("");
  }

  function restartGame() {
    setRandomNumber(generateRandomLevel(currentLevel));
    setUserTurn(3);
    setNum("");
    setMessage("Start Guessing!");
    setPrevGuess([]);
  }

  function changeLevel(level) {
    setCurrentLevel(level);
    setRandomNumber(generateRandomLevel(level));
    setUserTurn(3);
    setMessage("Start Guessing!");
    setPrevGuess([]);
  }

  console.log(randomNumber);
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div className="h-[85vh] bg-red-100-900 text-slate-900 flex flex-col items-center justify-center gap-8 border border-slate-400 rounded-xl p-4 mx-auto">
        <div className="text-center">
          <h1 className="text-red-600 font-semibold text-3xl lg:text-5xl mb-4">
            Guess-A-Number
          </h1>

          <div className="flex items-center justify-center gap-4 *:border *:border-black *:p-2 *:cursor-pointer *:rounded-2xl mb-2">
            <button
              onClick={() => changeLevel("easy")}
              className="bg-green-700 text-slate-100 font-semibold"
            >
              Easy
            </button>
            <button
              onClick={() => changeLevel("medium")}
              className="bg-[#FFF133] text-[#112A46] font-semibold"
            >
              Medium
            </button>
            <button
              onClick={() => changeLevel("hard")}
              className="bg-red-700 text-slate-100 font-semibold"
            >
              Hard
            </button>
          </div>
          <p className="text-slate-700">
            Guess a number between
            <span className="font-bold"> {levelText}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <input
            disabled={userTurn === 0}
            type="number"
            value={num}
            onChange={handleChange}
            placeholder="Guess a number"
            className="border border-slate-700 px-4 py-2 outline-none focus:outline-1 focus:border-blue-700 rounded-2xl transition-all duration-200"
          />

          <button
            disabled={userTurn === 0}
            className="border border-slate-100 px-3 py-1.5 bg-green-500 rounded-2xl cursor-pointer"
            onClick={handleClick}
          >
            Enter
          </button>
        </div>

        <div>
          <p>
            Previous Guess :{" "}
            {prevGuess.length === 0
              ? "Take a guess.."
              : [...prevGuess].reverse().join(", ")}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <p>{message}</p>
          {userTurn === 0 ? (
            <p className="text-center">
              You have used all your chances, <br /> Click{" "}
              <span className="text-red-700 font-bold text-xl">restart</span> to
              play again
            </p>
          ) : (
            <p>You have {userTurn} chances left</p>
          )}
          <button
            onClick={() => restartGame()}
            className="border border-slate-500 px-4 py-1 rounded-2xl bg-red-500 text-slate-900 font-semibold cursor-pointer"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
