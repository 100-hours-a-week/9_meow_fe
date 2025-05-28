import { ICommentDataPagination, ICreateComment } from "../types";
import { IError } from "../types";
import { AxiosError } from "axios";
import { getCommentList, postComment } from "../comment";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const commentQueries = {
  all: () => ["comment"] as const,

  list: (postId: number) =>
    infiniteQueryOptions<ICommentDataPagination, Error>({
      queryKey: [...commentQueries.all(), "list", postId],
      queryFn: ({ pageParam }) =>
        getCommentList({ page: pageParam as number, size: 10, postId }),
      getNextPageParam: (lastPage: ICommentDataPagination) => {
        return lastPage.last ? undefined : lastPage.currentPage + 1;
      },
      initialPageParam: 0,
    }),

  create: (postId: number) => ({
    mutationKey: [...commentQueries.all(), "create", postId],
    mutationFn: ({ content }: ICreateComment) =>
      postComment({
        comment: { content },
        postId,
      }),
    onError: (error: AxiosError<IError>) => {
      if (error.response?.status !== 401) {
        alert("댓글 작성에 실패했다옹. 잠시 후 다시 시도해보냥");
        console.log("error", error);
      }
    },
  }),
};
