interface AnswerChoiceProps {
  answers: string[];
  onAnswerClick: (answers: string) => void;
  isAnswerRevealed: boolean;
  correctAnswer: string;
  isButtonDisabled: boolean;
}

function AnswerChoices({
  answers,
  onAnswerClick,
  isAnswerRevealed,
  correctAnswer,
  isButtonDisabled,
}: AnswerChoiceProps) {
  return (
    <div className="answer-container">
      {answers.map((answer, index) => (
        <button
          key={index}
          disabled={isButtonDisabled}
          onClick={() => onAnswerClick(answer)}
          className={
            isAnswerRevealed
              ? answer === correctAnswer
                ? "correct"
                : "incorrect"
              : "answer-buttons"
          }
        >
          {answer}
        </button>
      ))}
    </div>
  );
}

export default AnswerChoices;
