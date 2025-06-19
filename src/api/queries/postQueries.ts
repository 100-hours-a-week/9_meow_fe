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
  queryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

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
    onError: (error: AxiosError<IError>) => {
      if (error.response?.status !== 401) {
        alert("게시글 작성에 실패했다옹. 잠시 후 다시 시도해보냥");
        console.log("error", error);
      }
    },
  }),

  like: ({
    onLikeSuccess,
    navigate,
  }: {
    onLikeSuccess?: () => void;
    navigate: NavigateFunction;
  }) => ({
    mutationKey: [...postQueries.all(), "like"],
    mutationFn: ({ postId, isLiked }: { postId: number; isLiked: boolean }) =>
      postLikePost({ postId, isLiked }),
    onSuccess: () => {
      // 좋아요 성공 시 posts 쿼리 데이터를 무효화하여 재요청
      onLikeSuccess?.();
    },
    onError: (error: AxiosError<IError>) => {
      if (error.message === "No token available") {
        if (
          window.confirm("로그인 해야 좋아요 누를 수 있다옹. 로그인 하겠냥?")
        ) {
          navigate("/login");
        }
      } else if (error.response?.status !== 401) {
        alert("좋아요에 실패했다옹...");
      }
    },
  }),

  delete: ({
    postId,
    navigate,
  }: {
    postId: number;
    navigate: NavigateFunction;
  }) => ({
    mutationKey: [...postQueries.all(), "delete", postId],
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      navigate(0);
    },
    onError: (error: AxiosError<IError>) => {
      if (error.response?.status !== 401) {
        alert("게시글 삭제에 실패했다옹. 잠시 후 다시 시도해냥");
      }
    },
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
  }): UseMutationOptions<IPostEditResponse, Error, ICreatePost> => ({
    mutationKey: [...postQueries.all(), "edit", postId],
    mutationFn: ({ imageUrls, content, emotion }: ICreatePost) =>
      putPost({ postId, imageUrls, content, emotion }),
    onSuccess: () => {
      alert("게시글 수정에 성공했다옹");
      navigate(`/detail/${postId}`);
    },
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
