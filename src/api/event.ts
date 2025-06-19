import defaultInstance from "./instance/defaultInstance";
import { IEventPeriodResponse } from "./types/event";

export const getEventPeriod = async () => {
  const response =
    await defaultInstance.get<IEventPeriodResponse>(`/event-weeks/status`);
  return response.data;
};
