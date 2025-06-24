import { calculateTimeLeft } from "@/utils/calculateTimeLeft";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { eventQueries } from "@/api/queries/eventQueries";

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
  const queryClient = useQueryClient();

  useEffect(() => {
    // 초기 계산
    const calculatedTimeLeft = calculateTimeLeft(endTimestamp);
    setTimeLeft(calculatedTimeLeft);

    // 1초마다 업데이트
    const timer = setInterval(() => {
      const calculatedTimeLeft = calculateTimeLeft(endTimestamp);
      setTimeLeft(calculatedTimeLeft);

      // 타이머가 0이 되면 콜백 호출
      if (calculatedTimeLeft === "00 : 00 : 00") {
        queryClient.invalidateQueries({
          queryKey: eventQueries.all(),
        });
      }
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, [endTimestamp, queryClient]);

  return (
    <div className="flex flex-col items-center justify-center bg-foreground text-background p-5 rounded-3xl gap-3">
      <div className="text-2xl font-bold">{title}</div>
      <div className="text-4xl font-bold">{timeLeft}</div>
      {button}
    </div>
  );
}
