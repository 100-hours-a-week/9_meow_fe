import authInstance from "./instance/authInstance";

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
  content,
  postId,
}: {
  content: string;
  postId: number;
}) => {
  const response = await authInstance.post(`/posts/${postId}/comments`, {
    content,
  });
  return response.data;
};
