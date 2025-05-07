import { ReactNode, useEffect } from "react";
import ImageInput from "./ImageInput";
import PostContentInput from "./PostContentInput";
import SelectEmotion from "./SelectEmotion";
import { Button } from "@/components/ui/button";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import useCreatePostStore from "@/store/useCreatePostStore";
import { useNavigate } from "react-router-dom";

export default function CreatePostForm({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { mutate: postPost, isPending, isSuccess, isError } = usePostMutation();
  const { selectedImages, content } = useCreatePostStore();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      alert("게시글 작성에 실패했어요. 다시 시도해주세요.");
    }
  }, [isSuccess, isError, navigate]);

  return (
    <div className="flex flex-col gap-4 items-center p-5">
      <h1 className="text-3xl font-bold">오늘은 무슨 일이 있었냥</h1>
      {children}
      <div className="flex gap-2 w-full justify-end">
        <Button variant="primarySolid">취소냥</Button>
        <Button
          variant="secondarySolid"
          disabled={isPending}
          onClick={() =>
            postPost({ images: selectedImages.map((img) => img.file), content })
          }
        >
          {isPending ? "잠시만 기다려주세요냥" : "다 적으면 누르라냥!"}
        </Button>
      </div>
    </div>
  );
}

CreatePostForm.ImageInput = ImageInput;
CreatePostForm.PostContentInput = PostContentInput;
CreatePostForm.SelectEmotion = SelectEmotion;
