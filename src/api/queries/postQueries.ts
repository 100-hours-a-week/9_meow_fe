import { IPostSummaryDataPagination } from "@/types/PostSummaryData";
import { getPostDetail, getPostList } from "../post";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import IPostDetailData from "@/types/PostDetailData";

export const postQueries = {
  all: () => ["post"] as const,

  list: ({ pageParam }: { pageParam: number }) =>
    infiniteQueryOptions<IPostSummaryDataPagination, Error>({
      queryKey: [...postQueries.all(), "list"],
      queryFn: () => getPostList({ page: pageParam, size: 10 }),
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

  create: () => {},
};
