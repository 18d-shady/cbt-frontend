import { useEffect, useState } from "react";

interface CountdownTimerProps {
  duration: number; // seconds
  onTimeUp?: () => void; // optional callback if parent wants it
}

export default function CountdownTimer({ duration, onTimeUp }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // ✅ Reset countdown whenever duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // ✅ Countdown ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeUp) onTimeUp(); // notify parent
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-red-600 font-bold">
      Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}
