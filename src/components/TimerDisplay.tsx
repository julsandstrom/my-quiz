const TimerDisplay = ({ timer }: { timer: number }) => (
  <div className="timer-countdown" aria-live="polite">
    Time remaining: {timer}
  </div>
);

export default TimerDisplay;
