import { ApiEmotion } from "@/types/Emotion";
import authInstance from "./instance/authInstance";

export const getPostList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const response = await authInstance.get(`/posts`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

interface IPost {
  imageUrls: string[];
  emotion: ApiEmotion;
  content: string;
}

export const postPost = async (post: IPost) => {
  const response = await authInstance.post("/posts", {
    imageUrls: post.imageUrls,
    content: post.content,
    emotion: post.emotion,
  });
  return response.data;
};

export const getPostDetail = async (postId: number) => {
  const response = await authInstance.get(`/posts/${postId}`);
  return response.data;
};

export const postLikePost = async ({
  postId,
  isLiked,
}: {
  postId: number;
  isLiked: boolean;
}) => {
  const response = await authInstance.post(`/posts/${postId}/likes`, {
    is_liked: isLiked,
  });
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await authInstance.delete(`/posts/${postId}`);
  return response.data;
};

export const getPostEditInfo = async (postId: number) => {
  const response = await authInstance.get(`/posts/${postId}/edit`);
  return response.data;
};

export const putPost = async ({
  postId,
  imageUrls,
  content,
  emotion,
}: {
  postId: number;
  imageUrls: string[];
  content: string;
  emotion: ApiEmotion;
}) => {
  const response = await authInstance.put(`/posts/${postId}`, {
    imageUrls,
    content,
    emotion,
  });
  return response.data;
};
