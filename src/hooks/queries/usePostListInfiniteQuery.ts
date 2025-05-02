import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { IPostSummaryDataPagination } from "@/types/PostSummaryData";
import { getPostList } from "@/service/post";

const fetchPostList = async () => {
  const response = await getPostList({ page: 0, size: 10 });
  return response;
};

export const usePostListInfiniteQuery = () => {
  return useInfiniteQuery<
    IPostSummaryDataPagination,
    Error,
    InfiniteData<IPostSummaryDataPagination>
  >({
    queryKey: ["posts"],
    queryFn: fetchPostList,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.currentPage + 1;
    },
    initialPageParam: 0,
  });
};
