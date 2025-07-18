import { ApiAnimalType } from "@/types/animal";

export interface IChatRoom {
  id: number;
  title: string;
}

export interface IReceivedChatMessage {
  chatroomId: number;
  senderId: number;
  senderNickname: string;
  senderProfileImage: string;
  animalType: ApiAnimalType;
  message: string;
  timestamp: string;
  type?: "message" | "enter" | "exit";
}

export interface IChatMessageDataPagination {
  content: IChatMessageData[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  last: boolean;
}

export interface IChatMessageData {
  chatroomId: number;
  senderId: number;
  senderNickname: string;
  senderProfileImage: string;
  animalType: ApiAnimalType;
  message: string;
  type?: "message" | "enter" | "exit";
  timestamp: string;
}

export interface IChatParticipantCount {
  chatroomId: number;
  participantCount: number;
}
