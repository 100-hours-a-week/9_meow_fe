import { ApiAnimalType } from "@/types/animal";
import { ApiEmotion } from "@/types/Emotion";

export interface IError {
  statusCode: number;
  data: unknown | null;
}

export interface ILoginCode {
  code: string;
}

export interface IKakaoAuthResponse {
  kakaoId: number;
  isMember: boolean;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface IUserRequest {
  kakaoId: number;
  nickname: string;
  animalType: string;
  profileImage: File | null;
}

export interface ICreatePost {
  images: File[];
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
  liked: boolean;
  createdAt: string;
  updatedAt: string;
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
  liked: boolean;
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
