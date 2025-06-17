import { convertTimestamp } from "@/utils/convertTimestamp";
import ImageBox from "./ImageBox";

interface IEventHistoryCard {
  title: string;
  subject: string;
  timestamp: Date;
  imageUrls: string[];
}

export default function EventHistoryCard({
  title,
  subject,
  timestamp,
  imageUrls,
}: IEventHistoryCard) {
  return (
    <div className="flex flex-row justify-between rounded-xl border border-muted-foreground p-2">
      <div className="flex flex-col gap-1">
        <div className="text-base">{title}</div>
        <div className="text-xs text-foreground/50">
          주제 : <span>{subject}</span>
        </div>
        <div className="text-xs text-foreground/50">
          발표 : <span>{convertTimestamp(timestamp)}</span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <ImageBox src={imageUrls[0]} rank="1st" className="h-[60px] w-[60px]" />
        <ImageBox src={imageUrls[1]} rank="2nd" className="h-[60px] w-[60px]" />
        <ImageBox src={imageUrls[2]} rank="3rd" className="h-[60px] w-[60px]" />
      </div>
    </div>
  );
}
