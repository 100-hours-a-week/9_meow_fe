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
export interface ICommentData {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  transformedContent: string;
  postType: ApiAnimalType;
  createdAt: string;
}

export interface ICommentDataPagination {
  content: ICommentData[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  last: boolean;
}
export interface ICreateComment {
  content: string;
}

export interface IImagesPreSignedUrlResponse {
  url: string;
  key: string;
}
