import { queryOptions } from "@tanstack/react-query";
import { getEventPeriod } from "../event";
import { IEventPeriodResponse } from "../types/event";

export const eventQueries = {
  all: () => ["event"] as const,

  eventPeriod: () =>
    queryOptions<IEventPeriodResponse>({
      queryKey: [...eventQueries.all(), "eventPeriod"],
      queryFn: () => getEventPeriod(),
    }),
};
