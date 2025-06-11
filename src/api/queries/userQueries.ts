import {
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  deleteFollow,
  getProfileInfo,
  getUserId,
  getUserProfileImage,
  postFollow,
} from "../user";
import {
  IProfileInfoResponse,
  IUserIdResponse,
  IUserProfileImageResponse,
} from "../types/user";
import { IError } from "../types/common";
import { AxiosError } from "axios";

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

  follow: ({
    userId,
    queryClient,
  }: {
    userId: number;
    queryClient: QueryClient;
  }): UseMutationOptions<void, AxiosError<IError>, void> => ({
    mutationKey: [...userQueries.all(), "follow", userId],
    mutationFn: () => postFollow({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...userQueries.all(), "profileInfo", userId],
      });
    },
    onError: (error: AxiosError<IError>) => {
      if (error.response?.status !== 401) {
        alert("팔로우에 실패했다옹...");
      }
    },
  }),

  unfollow: ({
    userId,
    queryClient,
  }: {
    userId: number;
    queryClient: QueryClient;
  }): UseMutationOptions<void, AxiosError<IError>, void> => ({
    mutationKey: [...userQueries.all(), "unfollow", userId],
    mutationFn: () => deleteFollow({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...userQueries.all(), "profileInfo", userId],
      });
    },
    onError: (error: AxiosError<IError>) => {
      if (error.response?.status !== 401) {
        alert("언팔로우에 실패했다옹...");
      }
    },
  }),
};
