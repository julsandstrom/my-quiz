import { useEffect, useState } from "react";
import Question from "./components/Questions";
import AnswerChoices from "./components/AnswerChoices";
import DisplayResult from "./components/DisplayResult";

import "./App.css";
import TimerDisplay from "./components/TimerDisplay";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

function App() {
  const [apiData, setApiData] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const currentQuestion = apiData[currentQuestionIndex];

  const [gameState, setGameState] = useState({
    isAnswerRevealed: false,
    isButtonDisabled: false,
    timer: 10,
  });

  const handleGuess = (answers: string) => {
    if (answers === currentQuestion.correctAnswer) {
      setScore((score) => score + 1);
    }
    setGameState({
      ...gameState,
      isAnswerRevealed: true,
      isButtonDisabled: true,
      timer: 0,
    });
  };

  //--------------------------------------------GAME LOOP
  const resetGame = () => {
    setGameFinished(false);
    setGameStarted(true);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  //--------------------------------------------FETCH
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("questions.json");
        const data = await res.json();
        setApiData(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    getData();
  }, []);

  //--------------------------------------------Quiz logic
  useEffect(() => {
    if (gameState.isAnswerRevealed) {
      const timer = setTimeout(() => {
        if (currentQuestionIndex + 1 < apiData.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setGameFinished(true);
        }
        setGameState({
          ...gameState,
          isAnswerRevealed: false,
          isButtonDisabled: false,
          timer: 10,
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [
    currentQuestionIndex,
    gameState.isAnswerRevealed,
    apiData.length,
    gameState,
  ]);

  //--------------------------------------------Timer
  useEffect(() => {
    if (
      gameState.timer > 0 &&
      !gameState.isAnswerRevealed &&
      gameStarted &&
      !gameFinished
    ) {
      const countdown = setInterval(
        () =>
          setGameState((prevState) => ({
            ...prevState,
            timer: prevState.timer - 1,
          })),
        1000
      );
      return () => clearTimeout(countdown);
    } else if (gameState.timer === 0) {
      handleGuess("");
    }
  }, [gameState.isAnswerRevealed, gameStarted, gameFinished, gameState.timer]);

  if (apiData.length === 0) {
    return <p>Loading....</p>;
  }

  return (
    <main>
      {!gameStarted && !gameFinished && (
        <section>
          {/* //--------------------------------------------First Page Section */}
          <h1>A project made with React</h1>
          <button onClick={() => setGameStarted(true)} className="start-button">
            Start Quiz
          </button>
        </section>
      )}
      {gameStarted && !gameFinished && (
        <section>
          {/* //--------------------------------------------Game Started Section */}
          <TimerDisplay timer={gameState.timer} />
          <Question question={currentQuestion.question} />
          <AnswerChoices
            answers={currentQuestion.answers}
            onAnswerClick={handleGuess}
            isAnswerRevealed={gameState.isAnswerRevealed}
            correctAnswer={currentQuestion.correctAnswer}
            isButtonDisabled={gameState.isButtonDisabled}
          />
          <h2 className="score-text">Score: {score}</h2>
        </section>
      )}
      {/* //--------------------------------------------Game Ended */}
      {gameFinished && <DisplayResult score={score} onResetGame={resetGame} />}
    </main>
  );
}

export default App;
