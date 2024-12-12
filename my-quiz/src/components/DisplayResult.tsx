function DisplayResult({
  score,
  onResetGame,
}: {
  score: number;
  onResetGame: () => void;
}) {
  return (
    <div>
      <h2 className="final-score">
        Final result: {score} {score === 1 ? "point" : "points"}
      </h2>
      <button className="restart-button" onClick={onResetGame}>
        Restart Quiz
      </button>
    </div>
  );
}

export default DisplayResult;
