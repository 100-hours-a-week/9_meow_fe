import authInstance from "./instance/authInstance";
import defaultInstance from "./instance/defaultInstance";
import { IChatMessageDataPagination, IChatRoom } from "./types/chat";

export const getChatRoom = async () => {
  const response = await authInstance.get<IChatRoom>(`/chat/chatrooms`);
  return response.data;
};

export const getChatMessageList = async ({
  chatroomId,
  page,
  size,
}: {
  chatroomId: number;
  page: number;
  size: number;
}) => {
  const response = await defaultInstance.get<IChatMessageDataPagination>(
    `/chat/${chatroomId}`,
    {
      params: {
        page,
        size,
      },
    },
  );
  return response.data;
};
