import authInstance from "./instance/authInstance";
import defaultInstance from "./instance/defaultInstance";
import {
  IEventPeriodResponse,
  IEventPostData,
  IEventSubmitRequest,
  IEventSubmittedResponse,
} from "./types/event";

export const getEventPeriod = async () => {
  const response =
    await defaultInstance.get<IEventPeriodResponse>(`/event-weeks/status`);
  return response.data;
};

export const getEventPostList = async () => {
  const response =
    await defaultInstance.get<IEventPostData[]>(`/event-posts/all`);
  return response.data;
};

export const postEvent = async (data: IEventSubmitRequest) => {
  const response = await authInstance.post(`/event-posts`, data);
  return response.data;
};

export const getEventSubmitted = async () => {
  const response =
    await authInstance.get<IEventSubmittedResponse>(`/event-posts/applied`);
  return response.data;
};

export const postVote = async (eventPostId: number) => {
  const response = await defaultInstance.post(
    `/event-posts/${eventPostId}/likes`,
  );
  return response.data;
};
