import { IError } from "@/api/types/common";
import {
  IPostDetailData,
  ICreatePost,
  IPostEditInfoResponse,
  IPostEditResponse,
  IPostSummaryDataPagination,
  IPostSummaryData,
} from "@/api/types/post";
import {
  deletePost,
  getPostDetail,
  getPostEditInfo,
  getPostList,
  getUserPostList,
  postLikePost,
  postPost,
  putPost,
} from "../post";
import {
  infiniteQueryOptions,
  QueryClient,
  queryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import {
  createAuthErrorHandler,
  ALERT_MESSAGES,
  createDefaultErrorHandler,
} from "../utils/errorHandler";

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

  create: ({ navigate }: { navigate: NavigateFunction }) => ({
    mutationKey: [...postQueries.all(), "create"],
    mutationFn: ({ imageUrls, content, emotion }: ICreatePost) =>
      postPost({
        imageUrls,
        content,
        emotion,
      }),
    onSuccess: () => {
      navigate("/");
    },
    onError: createDefaultErrorHandler(ALERT_MESSAGES.POST_CREATE_FAILED),
  }),

  like: ({
    onLikeSuccess,
    navigate,
    currentPath,
    queryClient,
  }: {
    onLikeSuccess?: () => void;
    navigate: NavigateFunction;
    currentPath?: string;
    queryClient: QueryClient;
  }) => ({
    mutationKey: [...postQueries.all(), "like"],
    mutationFn: ({ postId, isLiked }: { postId: number; isLiked: boolean }) =>
      postLikePost({ postId, isLiked }),
    onMutate: async ({
      postId,
      isLiked,
    }: {
      postId: number;
      isLiked: boolean;
    }) => {
      // 이전 쿼리 데이터를 저장하기 위해 쿼리 취소
      await queryClient.cancelQueries({
        queryKey: [...postQueries.all()],
      });

      // 이전 데이터를 저장
      const previousData = {
        list: queryClient.getQueriesData({
          queryKey: [...postQueries.all(), "list"],
        }),
        detail: queryClient.getQueriesData({
          queryKey: [...postQueries.all(), "detail", postId],
        }),
        userPostList: queryClient.getQueriesData({
          queryKey: [...postQueries.all(), "userPostList"],
        }),
      };

      // 낙관적 업데이트: 리스트 쿼리들 업데이트
      queryClient.setQueriesData(
        {
          queryKey: [...postQueries.all(), "list"],
        },
        (oldData: { pages: IPostSummaryDataPagination[] } | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: IPostSummaryDataPagination) => ({
              ...page,
              content: page.content.map((post: IPostSummaryData) =>
                post.id === postId
                  ? {
                      ...post,
                      liked: !isLiked,
                      likeCount: isLiked
                        ? post.likeCount - 1
                        : post.likeCount + 1,
                    }
                  : post,
              ),
            })),
          };
        },
      );

      // 상세 페이지 쿼리 업데이트
      queryClient.setQueriesData(
        {
          queryKey: [...postQueries.all(), "detail", postId],
        },
        (oldData: IPostDetailData | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            liked: !isLiked,
            likeCount: isLiked ? oldData.likeCount - 1 : oldData.likeCount + 1,
          };
        },
      );

      // 사용자 포스트 리스트 쿼리들 업데이트
      queryClient.setQueriesData(
        {
          queryKey: [...postQueries.all(), "userPostList"],
        },
        (oldData: { pages: IPostSummaryDataPagination[] } | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: IPostSummaryDataPagination) => ({
              ...page,
              content: page.content.map((post: IPostSummaryData) =>
                post.id === postId
                  ? {
                      ...post,
                      liked: !isLiked,
                      likeCount: isLiked
                        ? post.likeCount - 1
                        : post.likeCount + 1,
                    }
                  : post,
              ),
            })),
          };
        },
      );

      return { previousData };
    },
    onSuccess: () => {
      // 좋아요 성공 시 posts 쿼리 데이터를 무효화하여 재요청
      onLikeSuccess?.();
    },
    onError: (
      err: AxiosError<IError>,
      _variables: { postId: number; isLiked: boolean },
      context: { previousData: unknown } | undefined,
    ) => {
      // 에러 발생 시 이전 데이터로 되돌리기
      if (context?.previousData) {
        const { previousData } = context;

        // 리스트 쿼리 복원
        (
          previousData as { list: Array<{ queryKey: unknown; data: unknown }> }
        ).list.forEach((query: { queryKey: unknown; data: unknown }) => {
          if (query.queryKey) {
            queryClient.setQueriesData(query.queryKey, query.data);
          }
        });

        // 상세 페이지 쿼리 복원
        (
          previousData as {
            detail: Array<{ queryKey: unknown; data: unknown }>;
          }
        ).detail.forEach((query: { queryKey: unknown; data: unknown }) => {
          if (query.queryKey) {
            queryClient.setQueriesData(query.queryKey, query.data);
          }
        });

        // 사용자 포스트 리스트 쿼리 복원
        (
          previousData as {
            userPostList: Array<{ queryKey: unknown; data: unknown }>;
          }
        ).userPostList.forEach(
          (query: { queryKey: unknown; data: unknown }) => {
            if (query.queryKey) {
              queryClient.setQueriesData(query.queryKey, query.data);
            }
          },
        );
      }

      createAuthErrorHandler(
        { navigate, currentPath },
        ALERT_MESSAGES.LIKE_FAILED,
      )(err);
    },
  }),

  delete: ({
    postId,
    queryClient,
  }: {
    postId: number;
    queryClient: QueryClient;
  }) => ({
    mutationKey: [...postQueries.all(), "delete", postId],
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...postQueries.all(), "list"],
      });
      queryClient.invalidateQueries({
        queryKey: [...postQueries.all(), "userPostList"],
      });
    },
    onError: createDefaultErrorHandler(ALERT_MESSAGES.POST_DELETE_FAILED),
  }),

  editInfo: ({ postId }: { postId: number }) =>
    queryOptions<IPostEditInfoResponse, Error>({
      queryKey: [...postQueries.all(), "editInfo", postId],
      queryFn: () => getPostEditInfo(postId),
    }),

  edit: ({
    postId,
    navigate,
  }: {
    postId: number;
    navigate: NavigateFunction;
  }): UseMutationOptions<
    IPostEditResponse,
    AxiosError<IError>,
    ICreatePost
  > => ({
    mutationKey: [...postQueries.all(), "edit", postId],
    mutationFn: ({ imageUrls, content, emotion }: ICreatePost) =>
      putPost({ postId, imageUrls, content, emotion }),
    onSuccess: () => {
      alert("게시글 수정에 성공했다옹");
      navigate(`/detail/${postId}`);
    },
    onError: createDefaultErrorHandler(ALERT_MESSAGES.POST_EDIT_FAILED),
  }),

  userPostList: ({ userId }: { userId: number }) =>
    infiniteQueryOptions<IPostSummaryDataPagination, Error>({
      queryKey: [...postQueries.all(), "userPostList", userId],
      queryFn: ({ pageParam }) =>
        getUserPostList({ page: pageParam as number, size: 10, userId }),
      getNextPageParam: (lastPage: IPostSummaryDataPagination) => {
        return lastPage.last ? undefined : lastPage.currentPage + 1;
      },
      initialPageParam: 0,
    }),
};
