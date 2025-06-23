import { ICommentData, ICommentDataPagination } from "../types/comment";
import { getCommentList, postComment } from "../comment";
import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";
import { createAuthErrorHandler, ALERT_MESSAGES } from "../utils/errorHandler";
import { IError } from "../types/common";
import { AxiosError } from "axios";

export const commentQueries = {
  all: () => ["comment"] as const,

  list: (
    postId: number,
  ): UseInfiniteQueryOptions<ICommentDataPagination, Error> => ({
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
  }): UseMutationOptions<
    ICommentData,
    AxiosError<IError>,
    { content: string }
  > => ({
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
