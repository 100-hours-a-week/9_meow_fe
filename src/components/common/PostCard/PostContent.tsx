import { ApiEmotion } from "@/types/Emotion";
import { useNavigate } from "react-router-dom";
import { convertTimestamp } from "@/utils/convertTimestamp";
import { ApiAnimalType } from "@/types/animal";
import { convertEmotionTypeToDisplay } from "@/utils/convertEmotion";

export interface IPostContent {
  postId: number;
  thumbnailUrl: string | null;
  content: string;
  animalType: ApiAnimalType;
  timestamp: Date;
  emotion: ApiEmotion;
}

export default function PostContent({
  postId,
  thumbnailUrl,
  content,
  animalType,
  timestamp,
  emotion,
}: IPostContent) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/detail/${postId}`)}
      className="flex flex-col gap-1 w-full"
    >
      <div className="flex flex-row items-start gap-2">
        <p className="text-sm whitespace-pre-wrap flex-1">{content}</p>
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="썸네일"
            className="w-[100px] h-[100px] rounded-lg object-cover flex-shrink-0"
          />
        )}
      </div>
      <div className="flex flex-row items-center gap-2 text-muted-foreground text-xs">
        <p>{convertTimestamp(timestamp)}</p>
        {emotion !== ApiEmotion.NONE && (
          <p> / {convertEmotionTypeToDisplay(emotion, animalType)}</p>
        )}
      </div>
    </div>
  );
}
