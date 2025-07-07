import authInstance from "./instance/authInstance";
import { IChatRoom } from "./types/chat";

export const getChatRoom = async () => {
  const response = await authInstance.get<IChatRoom>(`/chat/chatrooms`);
  return response.data;
};
