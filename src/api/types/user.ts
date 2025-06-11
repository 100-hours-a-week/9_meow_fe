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
