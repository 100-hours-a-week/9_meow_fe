import { TEventStatus } from "@/types/EventStatus";

export interface IEventPeriodResponse {
  status: TEventStatus;
  time: string;
}

export interface IEventTopicResponse {
  week: number;
  topic: string;
}

export interface IEventPostData {
  imageUrl: string;
  nickname: string;
  likeCount: number;
  postId: number;
  profileImageUrl?: string;
}

export interface IEventSubmitRequest {
  imageUrl: string;
}

export interface IEventSubmittedResponse {
  hasApplied: boolean;
}
