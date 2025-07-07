import { queryOptions } from "@tanstack/react-query";
import { getChatRoom } from "../chat";
import { IChatRoom } from "../types/chat";
import { AxiosError } from "axios";
import { IError } from "../types/common";

export const chatQueries = {
  all: () => ["chat"] as const,

  chatRoom: () =>
    queryOptions<IChatRoom, AxiosError<IError>>({
      queryKey: [...chatQueries.all(), "chatRoom"],
      queryFn: getChatRoom,
    }),
};
