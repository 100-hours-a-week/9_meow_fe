import { IPostSummaryDataPagination } from "@/types/PostSummaryData";
import { getPostList } from "../post";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const postQueries = {
  all: () => ["post"] as const,

  list: ({ pageParam }: { pageParam: number }) =>
    infiniteQueryOptions({
      queryKey: [...postQueries.all(), "list"],
      queryFn: () => getPostList({ page: pageParam, size: 10 }),
      getNextPageParam: (lastPage: IPostSummaryDataPagination) => {
        return lastPage.last ? undefined : lastPage.currentPage + 1;
      },
      initialPageParam: 0,
    }),

  detail: () => {},

  create: () => {},
};
