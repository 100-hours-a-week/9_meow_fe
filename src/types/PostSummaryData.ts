import { ApiAnimalType } from "./animal";
import { ApiEmotion } from "./Emotion";

export interface IPostSummaryData {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  transformedContent: string;
  emotion: ApiEmotion;
  postType: ApiAnimalType;
  thumbnailUrl: string | null;
  commentCount: number;
  likeCount: number;
  // didLike: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPostSummaryDataPagination {
  currentPage: number;
  last: boolean;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  content: IPostSummaryData[];
}
