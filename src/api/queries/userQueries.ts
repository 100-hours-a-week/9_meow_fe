import { UseQueryOptions } from "@tanstack/react-query";
import { getProfileInfo, getUserId, getUserProfileImage } from "../user";
import {
  IProfileInfoResponse,
  IUserIdResponse,
  IUserProfileImageResponse,
} from "../types/user";

export const userQueries = {
  all: () => ["user"] as const,

  getUserProfileImage: (): UseQueryOptions<
    IUserProfileImageResponse,
    Error
  > => ({
    queryKey: [...userQueries.all(), "getUserProfileImage"],
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
