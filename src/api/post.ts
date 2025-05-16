import { ApiEmotion } from "@/types/Emotion";
import defaultInstance from "./instance/defaultInstance";
import formInstance from "./instance/formInstance";
import { TOKEN_KEY } from "@/store/useTokenStore";

export const getPostList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const response = await defaultInstance.get(`/posts`, {
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
  const accessToken = localStorage.getItem(TOKEN_KEY);

  const response = await formInstance.post("/posts", formData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const getPostDetail = async (postId: number) => {
  const response = await defaultInstance.get(`/posts/${postId}`);
  return response.data;
};

export const postLikePost = async ({
  postId,
  isLiked,
}: {
  postId: number;
  isLiked: boolean;
}) => {
  const accessToken = localStorage.getItem(TOKEN_KEY);

  const response = await defaultInstance.post(
    `/posts/${postId}/likes`,
    {
      is_liked: isLiked,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
