import { ApiAnimalType } from "./animal";
import { ApiEmotion } from "./Emotion";

interface IPostDetailData {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  transformedContent: string;
  emotion: ApiEmotion;
  postType: ApiAnimalType;
  imageUrls: string[];
  commentCount: number;
  likeCount: number;
  liked: boolean;
  createdAt: string;
  updatedAt: string;
}

export default IPostDetailData;
