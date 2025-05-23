import { IError, IPostSummaryDataPagination } from "@/api/types";
import { getPostDetail, getPostList, postLikePost, postPost } from "../post";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { IPostDetailData } from "@/api/types";
import { ICreatePost } from "../types";
import { AxiosError } from "axios";

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

  create: () => ({
    mutationKey: [...postQueries.all(), "create"],
    mutationFn: ({ images, content, emotion }: ICreatePost) =>
      postPost({
        images,
        content,
        emotion,
      }),
    onError: (error: AxiosError<IError>) => {
      if (error.response?.status !== 401) {
        alert("게시글 작성에 실패했다옹. 잠시 후 다시 시도해보냥");
        console.log("error", error);
      }
    },
  }),

  like: ({ onLikeSuccess }: { onLikeSuccess?: () => void }) => ({
    mutationKey: [...postQueries.all(), "like"],
    mutationFn: ({ postId, isLiked }: { postId: number; isLiked: boolean }) =>
      postLikePost({ postId, isLiked }),
    onSuccess: () => {
      // 좋아요 성공 시 posts 쿼리 데이터를 무효화하여 재요청
      onLikeSuccess?.();
    },
    onError: (error: AxiosError<IError>) => {
      if (error.response?.status !== 401) {
        alert("좋아요에 실패했다옹...");
      }
    },
  }),
};
