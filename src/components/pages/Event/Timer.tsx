import { calculateTimeLeft } from "@/utils/calculateTimeLeft";
import { useState, useEffect } from "react";

interface IEventTimer {
  title: string;
  endTimestamp: Date;
  button?: React.ReactNode;
}

export default function EventTimer({
  title,
  endTimestamp,
  button,
}: IEventTimer) {
  const [timeLeft, setTimeLeft] = useState("00 : 00 : 00");

  useEffect(() => {
    // 초기 계산
    const calculatedTimeLeft = calculateTimeLeft(endTimestamp);
    setTimeLeft(calculatedTimeLeft);

    // 1초마다 업데이트
    const timer = setInterval(() => {
      const calculatedTimeLeft = calculateTimeLeft(endTimestamp);
      setTimeLeft(calculatedTimeLeft);
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, [endTimestamp]);

  return (
    <div className="flex flex-col items-center justify-center bg-foreground text-background p-5 rounded-3xl gap-3">
      <div className="text-2xl font-bold">{title}</div>
      <div className="text-4xl font-bold">{timeLeft}</div>
      {button}
    </div>
  );
}
