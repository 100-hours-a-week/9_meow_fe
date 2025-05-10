import { useEffect, useState } from "react";
import ImageInput from "./ImageInput";
import PostContentInput from "./PostContentInput";
import SelectEmotion from "./SelectEmotion";
import { Button } from "@/components/ui/button";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import { useNavigate } from "react-router-dom";
import { useImageUpload } from "@/hooks/common/useImageUpload";
import { ApiEmotion } from "@/types/Emotion";

export default function CreatePostForm() {
  const navigate = useNavigate();
  const { mutate: postPost, isPending, isSuccess, isError } = usePostMutation();

  const { selectedImages, addImages, removeImage, error } = useImageUpload();
  const [content, setContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<ApiEmotion>(
    ApiEmotion.NONE,
  );

  const handlePostSubmit = () => {
    postPost({
      images: selectedImages.map((img) => img.file),
      content,
      emotion: selectedEmotion,
    });
  };

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
      <ImageInput
        selectedImages={selectedImages}
        addImages={addImages}
        removeImage={removeImage}
        error={error}
      />
      <PostContentInput content={content} setContent={setContent} />
      <SelectEmotion
        selectedEmotion={selectedEmotion}
        setEmotion={setSelectedEmotion}
      />
      <div className="flex gap-2 w-full justify-end">
        <Button variant="primarySolid">취소냥</Button>
        <Button
          variant="secondarySolid"
          disabled={isPending}
          onClick={handlePostSubmit}
        >
          {isPending ? "잠시만 기다려주세옹" : "다 적으면 누르라냥!"}
        </Button>
      </div>
    </div>
  );
}
