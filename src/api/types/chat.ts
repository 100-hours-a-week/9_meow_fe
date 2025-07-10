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
