function ResetButton({ onResetGame }: { onResetGame: () => void }) {
  return (
    <button className="restart-button" onClick={onResetGame}>
      Restart Quiz
    </button>
  );
}

export default ResetButton;
