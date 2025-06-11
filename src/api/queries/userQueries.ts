import { UseQueryOptions } from "@tanstack/react-query";
import { getUserId, getUserProfileImage } from "../user";
import { IUserIdResponse, IUserProfileImageResponse } from "../types/user";

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
};
