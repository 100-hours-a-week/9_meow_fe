import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getChatMessageList, getChatRoom } from "../chat";
import { IChatMessageDataPagination, IChatRoom } from "../types/chat";
import { AxiosError } from "axios";
import { IError } from "../types/common";

export const chatQueries = {
  all: () => ["chat"] as const,

  chatRoom: () =>
    queryOptions<IChatRoom, AxiosError<IError>>({
      queryKey: [...chatQueries.all(), "chatRoom"],
      queryFn: getChatRoom,
    }),

  list: (chatroomId: number) =>
    infiniteQueryOptions<IChatMessageDataPagination, AxiosError<IError>>({
      queryKey: [...chatQueries.all(), "list"],
      queryFn: ({ pageParam }) =>
        getChatMessageList({ chatroomId, page: pageParam as number, size: 10 }),
      getNextPageParam: (lastPage: IChatMessageDataPagination) => {
        return lastPage.isLast ? undefined : lastPage.currentPage + 1;
      },
      initialPageParam: 0,
    }),
};
