import { ApiEmotion } from "@/types/Emotion";
import defaultInstance from "./instance/defaultInstance";
import { ApiAnimalType } from "@/types/animal";
import formInstance from "./instance/formInstance";

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
  post_type: ApiAnimalType;
  content: string;
}

export const postPost = async (post: IPost) => {
  const response = await formInstance.post(`/posts`, post);
  return response.data;
};
