import authInstance from "./instance/authInstance";
import { ICreateComment } from "./types";

export const getCommentList = async ({
  page,
  size,
  postId,
}: {
  page: number;
  size: number;
  postId: number;
}) => {
  const response = await authInstance.get(`/posts/${postId}/comments`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

export const postComment = async ({
  comment,
  postId,
}: {
  comment: ICreateComment;
  postId: number;
}) => {
  const response = await authInstance.post(`/posts/${postId}/comments`, {
    content: comment.content,
  });
  return response.data;
};
