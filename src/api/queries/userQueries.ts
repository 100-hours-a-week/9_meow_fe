import { UseQueryOptions } from "@tanstack/react-query";
import { getUserProfileImage } from "../user";
import { IUserProfileImageResponse } from "../types";

export const userQueries = {
  all: () => ["user"] as const,

  getUserProfileImage: (): UseQueryOptions<
    IUserProfileImageResponse,
    Error
  > => ({
    queryKey: [...userQueries.all(), "getUserProfileImage"],
    queryFn: getUserProfileImage,
  }),
};
