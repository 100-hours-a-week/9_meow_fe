import { ApiAnimalType } from "./animal";
import { ApiEmotion } from "./Emotion";

export interface IPostSummaryData {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  transformedContent: string;
  emotion: ApiEmotion;
  postType: ApiAnimalType;
  thumbnailUrl: string;
  commentCount: number;
  likeCount: number;
  didLike: boolean;
  createdAt: Date;
  updatedAt: Date;
}
