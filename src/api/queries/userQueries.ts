import {
  infiniteQueryOptions,
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  deleteFollow,
  deleteProfile,
  editProfile,
  getEditProfileInfo,
  getFollowerList,
  getFollowingList,
  getProfileInfo,
  getUserId,
  getUserProfileImage,
  postAiProfileImage,
  postFollow,
} from "../user";
import {
  IEditProfileInfoResponse,
  IEditProfileRequest,
  IFollowerDataPagination,
  IPostAiProfileImageResponse,
  IProfileInfoResponse,
  IUserIdResponse,
  IUserProfileImageResponse,
} from "../types/user";
import { IError } from "../types/common";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import {
  createAuthErrorHandler,
  ALERT_MESSAGES,
  createDefaultErrorHandler,
} from "../utils/errorHandler";
import { ApiAnimalType } from "@/types/animal";

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
    queryClient,
  }: {
    navigate: NavigateFunction;
    queryClient: QueryClient;
  }): UseMutationOptions<
    IEditProfileInfoResponse,
    AxiosError<IError>,
    IEditProfileRequest
  > => ({
    mutationKey: [...userQueries.all(), "editProfile"],
    mutationFn: (data) => editProfile(data),
    onSuccess: () => {
      alert("프로필 수정에 성공했다옹...");
      queryClient.invalidateQueries({
        queryKey: [...userQueries.all(), "userProfileImage"],
      });
      navigate("/mypage/redirect");
    },
  }),

  deleteProfile: ({
    navigate,
  }: {
    navigate: NavigateFunction;
  }): UseMutationOptions<void, AxiosError<IError>, void> => ({
    mutationKey: [...userQueries.all(), "deleteProfile"],
    mutationFn: () => deleteProfile(),
    onSuccess: () => {
      alert("프로필 삭제에 성공했다옹...");
      navigate("/login");
    },
  }),

  follow: ({
    userId,
    queryClient,
    navigate,
    currentPath,
  }: {
    userId: number;
    queryClient: QueryClient;
    navigate: NavigateFunction;
    currentPath?: string;
  }): UseMutationOptions<void, AxiosError<IError>, void> => ({
    mutationKey: [...userQueries.all(), "follow", userId],
    mutationFn: () => postFollow({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...userQueries.all(), "profileInfo", userId],
      });
    },
    onError: createAuthErrorHandler(
      { navigate, currentPath },
      ALERT_MESSAGES.FOLLOW_FAILED,
    ),
  }),

  unfollow: ({
    userId,
    queryClient,
    navigate,
    currentPath,
  }: {
    userId: number;
    queryClient: QueryClient;
    navigate: NavigateFunction;
    currentPath?: string;
  }): UseMutationOptions<void, AxiosError<IError>, void> => ({
    mutationKey: [...userQueries.all(), "unfollow", userId],
    mutationFn: () => deleteFollow({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...userQueries.all(), "profileInfo", userId],
      });
    },
    onError: createAuthErrorHandler(
      { navigate, currentPath },
      ALERT_MESSAGES.UNFOLLOW_FAILED,
    ),
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

  aiProfileImage: (): UseMutationOptions<
    IPostAiProfileImageResponse,
    AxiosError<IError>,
    { image_url: string; animal_type: ApiAnimalType }
  > => ({
    mutationKey: [...userQueries.all(), "aiProfileImage"],
    mutationFn: ({ image_url, animal_type }) =>
      postAiProfileImage({ image_url, animal_type }),
    onError: createDefaultErrorHandler(ALERT_MESSAGES.AI_PROFILE_IMAGE_FAILED),
  }),
};
