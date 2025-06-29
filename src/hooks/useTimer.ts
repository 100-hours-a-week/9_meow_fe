import { useState, useEffect } from "react";
import { calculateTimeLeft } from "@/utils/calculateTimeLeft";

interface UseTimerOptions {
  endTimestamp: Date;
  onTimeUp?: () => void;
}

export const useTimer = ({ endTimestamp, onTimeUp }: UseTimerOptions) => {
  const [timeLeft, setTimeLeft] = useState("00 : 00 : 00");

  useEffect(() => {
    // 초기 계산
    const calculatedTimeLeft = calculateTimeLeft(endTimestamp);
    setTimeLeft(calculatedTimeLeft);

    // 1초마다 업데이트
    const timer = setInterval(() => {
      const calculatedTimeLeft = calculateTimeLeft(endTimestamp);
      setTimeLeft(calculatedTimeLeft);

      // 타이머가 0이 되면 콜백 호출하고 타이머 정리
      if (calculatedTimeLeft === "00 : 00 : 00" && onTimeUp) {
        onTimeUp();
        clearInterval(timer);
      }
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, [endTimestamp, onTimeUp]);

  return timeLeft;
};
