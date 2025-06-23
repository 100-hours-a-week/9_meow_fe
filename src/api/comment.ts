import authInstance from "./instance/authInstance";
import defaultInstance from "./instance/defaultInstance";
import { ICommentData, ICommentDataPagination } from "./types/comment";

export const getCommentList = async ({
  page,
  size,
  postId,
}: {
  page: number;
  size: number;
  postId: number;
}) => {
  const response = await defaultInstance.get<ICommentDataPagination>(
    `/posts/${postId}/comments`,
    {
      params: {
        page,
        size,
      },
    },
  );
  return response.data;
};

export const postComment = async ({
  content,
  postId,
}: {
  content: string;
  postId: number;
}) => {
  const response = await authInstance.post<ICommentData>(
    `/posts/${postId}/comments`,
    {
      content,
    },
  );
  return response.data;
};
