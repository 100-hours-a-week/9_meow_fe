import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { IPostSummaryDataPagination } from "@/types/PostSummaryData";
import { getPostList } from "@/api/post";

const fetchPostList = async ({ pageParam }: { pageParam: number }) => {
  const response = await getPostList({ page: pageParam, size: 10 });
  return response;
};

export const usePostListInfiniteQuery = () => {
  return useInfiniteQuery<
    IPostSummaryDataPagination,
    Error,
    InfiniteData<IPostSummaryDataPagination>,
    ["posts"],
    number
  >({
    queryKey: ["posts"],
    queryFn: fetchPostList,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.currentPage + 1;
    },
    initialPageParam: 0,
  });
};
