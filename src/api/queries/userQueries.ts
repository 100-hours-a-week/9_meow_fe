import { UseQueryOptions } from "@tanstack/react-query";
import { getProfileInfo, getUserId, getUserProfileImage } from "../user";
import {
  IProfileInfoResponse,
  IUserIdResponse,
  IUserProfileImageResponse,
} from "../types/user";

export const userQueries = {
  all: () => ["user"] as const,

  userProfileImage: (): UseQueryOptions<IUserProfileImageResponse, Error> => ({
    queryKey: [...userQueries.all(), "userProfileImage"],
    queryFn: getUserProfileImage,
  }),

  userId: (): UseQueryOptions<IUserIdResponse, Error> => ({
    queryKey: [...userQueries.all(), "userId"],
    queryFn: getUserId,
  }),

  profileInfo: ({
    userId,
  }: {
    userId: number;
  }): UseQueryOptions<IProfileInfoResponse, Error> => ({
    queryKey: [...userQueries.all(), "profileInfo", userId],
    queryFn: () => getProfileInfo({ userId }),
  }),
};
