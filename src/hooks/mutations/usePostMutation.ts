import { postPost } from "@/service/post";
import { ApiAnimalType } from "@/types/animal";
import { ApiEmotion } from "@/types/Emotion";

import { useMutation } from "@tanstack/react-query";

interface IPost {
  images: File[];
  content: string;
  emotion: ApiEmotion;
}

export default function usePostMutation() {
  return useMutation({
    mutationFn: ({ images, content, emotion }: IPost) =>
      postPost({
        images,
        content,
        emotion,
        post_type: ApiAnimalType.CAT,
      }),
    onSuccess: () => {
      console.log("성공!");
    },
    onError: () => {
      console.log("실패!");
    },
  });
}
