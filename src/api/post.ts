import { ApiEmotion } from "@/types/Emotion";
import {
  ICreatePost,
  IPostDetailData,
  IPostEditInfoResponse,
  IPostSummaryDataPagination,
} from "./types/post";
import authInstance from "./instance/authInstance";
import defaultInstance from "./instance/defaultInstance";

export const getPostList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const response = await defaultInstance.get<IPostSummaryDataPagination>(
    `/posts`,
    {
      params: {
        page,
        size,
      },
    },
  );
  return response.data;
};

export const postPost = async (post: ICreatePost) => {
  const response = await authInstance.post("/posts", {
    imageUrls: post.imageUrls,
    content: post.content,
    emotion: post.emotion,
  });
  return response.data;
};

export const getPostDetail = async (postId: number) => {
  const response = await authInstance.get<IPostDetailData>(`/posts/${postId}`);
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
  const response = await authInstance.get<IPostEditInfoResponse>(
    `/posts/${postId}/edit`,
  );
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

export const getUserPostList = async ({
  userId,
  page,
  size,
}: {
  userId: number;
  page: number;
  size: number;
}) => {
  const response = await defaultInstance.get<IPostSummaryDataPagination>(
    `/posts/user/${userId}`,
    {
      params: { page, size },
    },
  );
  return response.data;
};
