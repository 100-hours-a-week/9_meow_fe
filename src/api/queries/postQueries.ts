import { IPostSummaryDataPagination } from "@/api/types";
import { getPostDetail, getPostList, postPost } from "../post";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { IPostDetailData } from "@/api/types";
import { ICreatePost } from "../types";

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

  create: ({ refresh }: { refresh: () => void }) => ({
    mutationKey: [...postQueries.all(), "create"],
    mutationFn: ({ images, content, emotion }: ICreatePost) =>
      postPost({
        images,
        content,
        emotion,
      }),
    onError: (error) => {
      if (error.code === "401") {
        refresh();
        return;
      } else {
        alert("게시글 작성에 실패했다옹. 잠시 후 다시 시도해보라냥");
      }
    },
  }),
};
