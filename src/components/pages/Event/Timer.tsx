import { eventQueries } from "@/api/queries/eventQueries";
import { useQueryClient } from "@tanstack/react-query";
import { useTimer } from "@/hooks/useTimer";

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
  const queryClient = useQueryClient();
  const timeLeft = useTimer({
    endTimestamp,
    onTimeUp: () =>
      queryClient.invalidateQueries({
        queryKey: eventQueries.all(),
      }),
  });

  return (
    <div className="flex flex-col items-center justify-center bg-foreground text-background p-5 rounded-3xl gap-3">
      <div className="text-2xl font-bold">{title}</div>
      <div className="text-4xl font-bold">{timeLeft}</div>
      {button}
    </div>
  );
}
