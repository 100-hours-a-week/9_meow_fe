import { ICommentDataPagination } from "../types/comment";
import { getCommentList, postComment } from "../comment";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";
import { createAuthErrorHandler, ALERT_MESSAGES } from "../utils/errorHandler";

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

  create: ({
    postId,
    navigate,
    currentPath,
  }: {
    postId: number;
    navigate: NavigateFunction;
    currentPath?: string;
  }) => ({
    mutationKey: [...commentQueries.all(), "create", postId],
    mutationFn: ({ content }: { content: string }) =>
      postComment({
        content,
        postId,
      }),
    onError: createAuthErrorHandler(
      { navigate, currentPath },
      ALERT_MESSAGES.COMMENT_FAILED,
    ),
  }),
};
