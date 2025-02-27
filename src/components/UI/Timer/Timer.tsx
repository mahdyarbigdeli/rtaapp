import { useState, useEffect } from "react";

interface TimerProps {
  seconds: number;
  onFinish: () => void;
}

export default function Timer(props: TimerProps) {
  const { onFinish, seconds } = props;

  const [timeLeft, setTimeLeft] = useState<number>(seconds);

  useEffect(() => {
    if (seconds < 0) return;
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const secs = time % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (seconds <= 0) return <></>;
  return <div className='text-2xl my-2'>{formatTime(timeLeft)}</div>;
}
