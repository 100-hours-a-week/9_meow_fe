import { convertTimestamp } from "@/utils/convertTimestamp";
import ImageBox from "./ImageBox";
import { useNavigate } from "react-router-dom";

interface IRecentPodium {
  title: string;
  subject: string;
  eventWeek: number;
  timestamp: Date;
  imageUrls: string[];
}

export default function RecentPodium({
  title,
  subject,
  eventWeek,
  timestamp,
  imageUrls,
}: IRecentPodium) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-between rounded-xl border border-muted-foreground p-5 gap-4"
      onClick={() => {
        navigate(`/event/${eventWeek}`);
      }}
    >
      <div className="flex flex-col gap-1 items-center">
        <div className="text-3xl">{title}</div>
        <div className="text-lg text-foreground/50">
          주제 : <span>{subject}</span>
        </div>
        <div className="text-lg text-foreground/50">
          발표 : <span>{convertTimestamp(timestamp)}</span>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        {imageUrls[0] && (
          <ImageBox
            src={imageUrls[0]}
            rank="1st"
            className="h-[100px] w-[100px]"
          />
        )}
        {imageUrls[1] && (
          <ImageBox
            src={imageUrls[1]}
            rank="2nd"
            className="h-[100px] w-[100px]"
          />
        )}
        {imageUrls[2] && (
          <ImageBox
            src={imageUrls[2]}
            rank="3rd"
            className="h-[100px] w-[100px]"
          />
        )}
      </div>
    </div>
  );
}
