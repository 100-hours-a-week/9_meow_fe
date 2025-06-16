import { ApiAnimalType } from "@/types/animal";
import { ApiEmotion } from "@/types/Emotion";

export interface ICreatePost {
  imageUrls: string[];
  content: string;
  emotion: ApiEmotion;
}

export interface IPostDetailData {
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
  createdAt: string;
  updatedAt: string;
  liked: boolean;
  myPost: boolean;
  following: boolean;
}

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
  createdAt: string;
  updatedAt: string;
  liked: boolean;
  myPost: boolean;
  following: boolean;
}

export interface IPostSummaryDataPagination {
  currentPage: number;
  last: boolean;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  content: IPostSummaryData[];
}

export interface IPostEditInfoResponse {
  id: number;
  username: string;
  profileImageUrl: string;
  content: string;
  emotion: ApiEmotion;
  imageUrls: string[];
}

export interface IPostEditResponse {
  postId: number;
}
