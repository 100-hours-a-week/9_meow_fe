import React from "react";
import { convertTimestampToDate } from "@/utils/convertTimestamp";
import ImageBox from "./ImageBox";
import { useNavigate } from "react-router-dom";

interface IRecentPodium {
  title: string;
  subject: string;
  eventWeek: number;
  timestamp: Date;
  imageUrls: string[];
}

function RecentPodium({
  title,
  subject,
  eventWeek,
  timestamp,
  imageUrls,
}: IRecentPodium) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-between rounded-xl border border-muted-foreground gap-4 py-3 shadow-lg bg-background"
      onClick={() => {
        navigate(`/event/${eventWeek}`);
      }}
    >
      <div className="flex flex-col gap-0 items-center">
        <div className="text-2xl md:text-3xl">{title}</div>
        <div className="text-lg text-foreground/50">
          주제 : <span>{subject}</span>
        </div>
        <div className="text-lg text-foreground/50">
          발표 : <span>{convertTimestampToDate(timestamp)}</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-between px-2">
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

export default React.memo(RecentPodium);
