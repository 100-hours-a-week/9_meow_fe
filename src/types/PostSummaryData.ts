import { ApiAnimalType } from "./animal";
import { ApiEmotion } from "./Emotion";

export interface IPostSummaryData {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  title: string;
  transformedContent: string;
  emotion: ApiEmotion;
  postType: ApiAnimalType;
  imageUrls: string[];
  didLike: boolean;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}
