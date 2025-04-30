import { ApiEmotion, convertEmotionToDisplay } from "@/types/Emotion";
import { useNavigate } from "react-router-dom";
import { convertTimestamp } from "@/utils/convertTimestamp";
import { ApiAnimalType } from "@/types/animal";

export interface IPostContent {
  postId: number;
  thumbnailUrl?: string;
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
      className="flex flex-col gap-1"
    >
      <div className="flex flex-row items-start gap-2">
        <p className="text-base">{content}</p>
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="썸네일"
            className="w-[150px] h-[150px] rounded-lg object-cover"
          />
        )}
      </div>
      <div className="flex flex-row items-center gap-2 text-muted-foreground text-xs">
        <p>{convertTimestamp(timestamp)}</p>
        {emotion !== ApiEmotion.NONE && (
          <p> / {convertEmotionToDisplay(emotion, animalType)}</p>
        )}
      </div>
    </div>
  );
}
