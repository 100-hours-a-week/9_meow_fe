import { queryOptions } from "@tanstack/react-query";
import { getEventPeriod, getEventPostList } from "../event";
import { IEventPeriodResponse, IEventPostData } from "../types/event";

export const eventQueries = {
  all: () => ["event"] as const,

  eventPeriod: () =>
    queryOptions<IEventPeriodResponse>({
      queryKey: [...eventQueries.all(), "eventPeriod"],
      queryFn: () => getEventPeriod(),
    }),

  eventPostList: () =>
    queryOptions<IEventPostData[]>({
      queryKey: [...eventQueries.all(), "eventPostList"],
      queryFn: () => getEventPostList(),
    }),
};
