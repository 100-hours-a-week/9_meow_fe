import { ApiAnimalType } from "@/types/animal";
import { TEventStatus } from "@/types/EventStatus";

export interface IEventPeriodResponse {
  status: TEventStatus;
  time: string;
  week: number;
}

export interface IEventTopicResponse {
  topic: string;
}

export interface IEventPostData {
  imageUrl: string;
  nickname: string;
  animalType: ApiAnimalType;
  likeCount: number;
  postId: number;
  profileImageUrl?: string;
  userId: number;
}

export interface IEventSubmitRequest {
  imageUrl: string;
}

export interface IEventSubmittedResponse {
  hasApplied: boolean;
}

export interface IEventHistorySummaryResponse {
  week: number;
  topic: string;
  endAt: string;
  imageUrl: string[];
}

export interface IEventHistoryDetailResponse {
  postId: number;
  imageUrl: string;
  nickname: string;
  animalType: ApiAnimalType;
  profileImageUrl?: string;
  userId: number;
  likeCount: number;
}
