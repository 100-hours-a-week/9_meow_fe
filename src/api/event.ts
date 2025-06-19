import defaultInstance from "./instance/defaultInstance";
import { IEventPeriodResponse, IEventPostData } from "./types/event";

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
