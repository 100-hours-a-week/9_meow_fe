import { TEventStatus } from "@/types/EventStatus";

export interface IEventPeriodResponse {
  status: TEventStatus;
  time: string;
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
