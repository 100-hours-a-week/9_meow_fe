import { ApiAnimalType } from "@/types/animal";

export interface IChatRoom {
  id: number;
  title: string;
}

export interface IReceivedChatMessage {
  chatroomId: number;
  senderId: number;
  profileImageUrl?: string;
  nickname?: string;
  animalType: ApiAnimalType;
  message: string;
  timestamp: string;
}

export interface IChatMessageDataPagination {
  content: IChatMessageData[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  isLast: boolean;
}

export interface IChatMessageData {
  chatroomId: number;
  senderId: number;
  senderNickname: string;
  senderProfileImage: string;
  animalType: ApiAnimalType;
  message: string;
  timestamp: string;
}
