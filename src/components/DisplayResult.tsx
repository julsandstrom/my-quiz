function DisplayResult({ score }: { score: number }) {
  return (
    <div>
      <h2 className="final-score">
        Final result: {score} {score === 1 ? "point" : "points"}
      </h2>
    </div>
  );
}

export default DisplayResult;
