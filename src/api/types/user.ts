import { ApiAnimalType } from "@/types/animal";

export interface IUserProfileImageResponse {
  profileImageUrl: string;
}

export interface IUserIdResponse {
  userId: number;
}

export interface IProfileInfoResponse {
  nickname: string;
  animalType: ApiAnimalType;
  profileImageUrl: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  following: boolean;
  currentUser: boolean;
}

export interface IEditProfileInfoResponse {
  nickname: string;
  postType: ApiAnimalType;
  profileImageUrl: string;
}

export interface IFollowerData {
  userId: number;
  nickname: string;
  postType: ApiAnimalType;
  profileImageUrl: string;
}

export interface IFollowerDataPagination {
  content: IFollowerData[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  last: boolean;
}
