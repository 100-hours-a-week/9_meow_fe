import { queryOptions, UseMutationOptions } from "@tanstack/react-query";
import {
  getEventPeriod,
  getEventPostList,
  getEventSubmitted,
  getEventTopic,
  postEvent,
  postVote,
} from "../event";
import {
  IEventPeriodResponse,
  IEventPostData,
  IEventSubmitRequest,
  IEventSubmittedResponse,
  IEventTopicResponse,
} from "../types/event";
import { AxiosError } from "axios";
import { IError } from "../types/common";
import { NavigateFunction } from "react-router-dom";

export const eventQueries = {
  all: () => ["event"] as const,

  eventPeriod: () =>
    queryOptions<IEventPeriodResponse>({
      queryKey: [...eventQueries.all(), "eventPeriod"],
      queryFn: () => getEventPeriod(),
    }),

  topic: () =>
    queryOptions<IEventTopicResponse>({
      queryKey: [...eventQueries.all(), "topic"],
      queryFn: () => getEventTopic(),
    }),

  eventPostList: () =>
    queryOptions<IEventPostData[]>({
      queryKey: [...eventQueries.all(), "eventPostList"],
      queryFn: () => getEventPostList(),
    }),

  sumbitEvent: ({
    navigate,
  }: {
    navigate: NavigateFunction;
  }): UseMutationOptions<null, AxiosError<IError>, IEventSubmitRequest> => ({
    mutationKey: [...eventQueries.all(), "postEvent"],
    mutationFn: (data: IEventSubmitRequest) => postEvent(data),
    onSuccess: () => {
      alert("이벤트 신청에 성공했다옹");
      navigate("/event");
    },
    onError: (error: AxiosError<IError>) => {
      if (error.response?.status !== 401) {
        alert("이벤트 신청에 실패했다옹. 잠시 후 다시 시도해보냥");
      }
    },
  }),

  hasSubmitted: () =>
    queryOptions<IEventSubmittedResponse>({
      queryKey: [...eventQueries.all(), "hasSubmitted"],
      queryFn: () => getEventSubmitted(),
    }),

  vote: (): UseMutationOptions<void, AxiosError<IError>, number> => ({
    mutationKey: [...eventQueries.all(), "vote"],
    mutationFn: (eventPostId: number) => postVote(eventPostId),
  }),
};
