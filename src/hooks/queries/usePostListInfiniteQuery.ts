import { getPostList } from "@/service/post";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { IPostSummaryData } from "@/types/PostSummaryData";

interface IPageParam {
  pageParam: number | unknown;
}

interface IPostListPageData {
  hasNext: boolean;
  pageNumber: number;
  content: IPostSummaryData[];
}

const usePostListInfiniteQuery = () => {
  const fetchPostList = async ({ pageParam }: IPageParam) => {
    const page = typeof pageParam === "number" ? pageParam : 0;
    const data = await getPostList({ page, size: 10 });

    return data;
  };

  return useInfiniteQuery<
    IPostListPageData,
    Error,
    InfiniteData<IPostListPageData>
  >({
    queryKey: ["posts"],
    queryFn: fetchPostList,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
  });
};

export default usePostListInfiniteQuery;
