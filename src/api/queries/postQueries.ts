import { IPostSummaryDataPagination } from "@/api/types";
import { getPostDetail, getPostList, postPost } from "../post";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { IPostDetailData } from "@/api/types";
import { ApiAnimalType } from "@/types/animal";
import { ICreatePost } from "../types";

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

  create: () => ({
    mutationKey: [...postQueries.all(), "create"],
    mutationFn: ({ images, content, emotion }: ICreatePost) =>
      postPost({
        images,
        content,
        emotion,
        // TODO : 로그인 정보에 있는 animal type 불러오도록
        post_type: ApiAnimalType.CAT,
      }),
    onError: () => {
      alert("게시글 작성에 실패했다옹. 잠시 후 다시 시도해보라냥");
    },
  }),
};
