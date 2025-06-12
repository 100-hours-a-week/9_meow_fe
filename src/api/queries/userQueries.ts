import {
  infiniteQueryOptions,
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  deleteFollow,
  editProfile,
  getEditProfileInfo,
  getFollowerList,
  getFollowingList,
  getProfileInfo,
  getUserId,
  getUserProfileImage,
  postFollow,
} from "../user";
import {
  IEditProfileInfoResponse,
  IEditProfileRequest,
  IFollowerDataPagination,
  IProfileInfoResponse,
  IUserIdResponse,
  IUserProfileImageResponse,
} from "../types/user";
import { IError } from "../types/common";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

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

  editProfileInfo: (): UseQueryOptions<IEditProfileInfoResponse, Error> => ({
    queryKey: [...userQueries.all(), "editProfileInfo"],
    queryFn: getEditProfileInfo,
  }),

  editProfile: ({
    navigate,
  }: {
    navigate: NavigateFunction;
  }): UseMutationOptions<
    IEditProfileInfoResponse,
    AxiosError<IError>,
    IEditProfileRequest
  > => ({
    mutationKey: [...userQueries.all(), "editProfile"],
    mutationFn: (data) => editProfile(data),
    onSuccess: () => {
      alert("프로필 수정에 성공했다옹...");
      navigate("/mypage/redirect");
    },
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

  followerList: ({ userId }: { userId: number }) =>
    infiniteQueryOptions<IFollowerDataPagination, Error>({
      queryKey: [...userQueries.all(), "followerList", userId],
      queryFn: ({ pageParam }) =>
        getFollowerList({ userId, page: pageParam as number, size: 20 }),
      getNextPageParam: (lastPage: IFollowerDataPagination) => {
        return lastPage.last ? undefined : lastPage.currentPage + 1;
      },
      initialPageParam: 0,
    }),

  followingList: ({ userId }: { userId: number }) =>
    infiniteQueryOptions<IFollowerDataPagination, Error>({
      queryKey: [...userQueries.all(), "followingList", userId],
      queryFn: ({ pageParam }) =>
        getFollowingList({ userId, page: pageParam as number, size: 20 }),
      getNextPageParam: (lastPage: IFollowerDataPagination) => {
        return lastPage.last ? undefined : lastPage.currentPage + 1;
      },
      initialPageParam: 0,
    }),
};
