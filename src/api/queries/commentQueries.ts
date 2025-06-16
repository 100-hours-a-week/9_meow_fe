import { ICommentDataPagination } from "../types/comment";
import { IError } from "../types/common";
import { AxiosError } from "axios";
import { getCommentList, postComment } from "../comment";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";

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
  }: {
    postId: number;
    navigate: NavigateFunction;
  }) => ({
    mutationKey: [...commentQueries.all(), "create", postId],
    mutationFn: ({ content }: { content: string }) =>
      postComment({
        content,
        postId,
      }),
    onError: (error: AxiosError<IError>) => {
      if (error.message === "No token available") {
        if (window.confirm("로그인 해야 댓글 달 수 있다옹. 로그인 하겠냥?")) {
          navigate("/login");
        }
      }
      if (error.response?.status !== 401) {
        alert("댓글 작성에 실패했다옹. 잠시 후 다시 시도해보냥");
        console.log("error", error);
      }
    },
  }),
};
