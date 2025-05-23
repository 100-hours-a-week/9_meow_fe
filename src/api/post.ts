import { ApiEmotion } from "@/types/Emotion";
import formInstance from "./instance/formInstance";
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
  images: File[];
  emotion: ApiEmotion;
  content: string;
}

export const postPost = async (post: IPost) => {
  const formData = new FormData();

  // 이미지 파일들 추가
  post.images.forEach((image) => {
    formData.append(`images`, image);
  });

  // 다른 데이터들 추가
  formData.append("content", post.content);
  formData.append("emotion", post.emotion);

  // localStorage에서 accessToken 가져오기
  const response = await formInstance.post("/posts", formData);
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
