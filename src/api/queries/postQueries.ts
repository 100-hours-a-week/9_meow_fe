import { IError } from "@/api/types/common";
import {
  IPostDetailData,
  ICreatePost,
  IPostEditInfoResponse,
  IPostEditResponse,
  IPostSummaryDataPagination,
} from "@/api/types/post";
import {
  deletePost,
  getPostDetail,
  getPostEditInfo,
  getPostList,
  getUserPostList,
  postLikePost,
  postPost,
  putPost,
} from "../post";
import {
  infiniteQueryOptions,
  QueryClient,
  queryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import {
  createAuthErrorHandler,
  ALERT_MESSAGES,
  createDefaultErrorHandler,
} from "../utils/errorHandler";

export const postQueries = {
  all: () => ["post"] as const,

  list: () =>
    infiniteQueryOptions<IPostSummaryDataPagination, Error>({
      queryKey: [...postQueries.all(), "list"],
      queryFn: ({ pageParam }) =>
        getPostList({ page: pageParam as number, size: 10 }),
      getNextPageParam: (lastPage: IPostSummaryDataPagination) => {
        return lastPage.last ? undefined : lastPage.currentPage + 1;
      },
      initialPageParam: 0,
    }),

  detail: (postId: number) =>
    queryOptions<IPostDetailData, Error>({
      queryKey: [...postQueries.all(), "detail", postId],
      queryFn: () => getPostDetail(postId),
    }),

  create: ({ navigate }: { navigate: NavigateFunction }) => ({
    mutationKey: [...postQueries.all(), "create"],
    mutationFn: ({ imageUrls, content, emotion }: ICreatePost) =>
      postPost({
        imageUrls,
        content,
        emotion,
      }),
    onSuccess: () => {
      navigate("/");
    },
    onError: createDefaultErrorHandler(ALERT_MESSAGES.POST_CREATE_FAILED),
  }),

  like: ({
    onLikeSuccess,
    navigate,
    currentPath,
  }: {
    onLikeSuccess?: () => void;
    navigate: NavigateFunction;
    currentPath?: string;
  }) => ({
    mutationKey: [...postQueries.all(), "like"],
    mutationFn: ({ postId, isLiked }: { postId: number; isLiked: boolean }) =>
      postLikePost({ postId, isLiked }),
    onSuccess: () => {
      // 좋아요 성공 시 posts 쿼리 데이터를 무효화하여 재요청
      onLikeSuccess?.();
    },
    onError: createAuthErrorHandler(
      { navigate, currentPath },
      ALERT_MESSAGES.LIKE_FAILED,
    ),
  }),

  delete: ({
    postId,
    queryClient,
    navigateTo,
  }: {
    postId: number;
    queryClient: QueryClient;
    navigateTo?: () => void;
  }) => ({
    mutationKey: [...postQueries.all(), "delete", postId],
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...postQueries.all(), "list"],
      });
      queryClient.invalidateQueries({
        queryKey: [...postQueries.all(), "userPostList"],
      });
      navigateTo?.();
    },
    onError: createDefaultErrorHandler(ALERT_MESSAGES.POST_DELETE_FAILED),
  }),

  editInfo: ({ postId }: { postId: number }) =>
    queryOptions<IPostEditInfoResponse, Error>({
      queryKey: [...postQueries.all(), "editInfo", postId],
      queryFn: () => getPostEditInfo(postId),
    }),

  edit: ({
    postId,
    navigate,
  }: {
    postId: number;
    navigate: NavigateFunction;
  }): UseMutationOptions<
    IPostEditResponse,
    AxiosError<IError>,
    ICreatePost
  > => ({
    mutationKey: [...postQueries.all(), "edit", postId],
    mutationFn: ({ imageUrls, content, emotion }: ICreatePost) =>
      putPost({ postId, imageUrls, content, emotion }),
    onSuccess: () => {
      alert("게시글 수정에 성공했다옹");
      navigate(`/detail/${postId}`);
    },
    onError: createDefaultErrorHandler(ALERT_MESSAGES.POST_EDIT_FAILED),
  }),

  userPostList: ({ userId }: { userId: number }) =>
    infiniteQueryOptions<IPostSummaryDataPagination, Error>({
      queryKey: [...postQueries.all(), "userPostList", userId],
      queryFn: ({ pageParam }) =>
        getUserPostList({ page: pageParam as number, size: 10, userId }),
      getNextPageParam: (lastPage: IPostSummaryDataPagination) => {
        return lastPage.last ? undefined : lastPage.currentPage + 1;
      },
      initialPageParam: 0,
    }),
};
