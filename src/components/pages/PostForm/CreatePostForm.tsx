import { useEffect, useState } from "react";
import ImageInput from "./ImageInput";
import PostContentInput from "./PostContentInput";
import SelectEmotion from "./SelectEmotion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useImageUpload } from "@/hooks/common/useImageUpload";
import { ApiEmotion } from "@/types/Emotion";
import { postQueries } from "@/api/queries/postQueries";
import { useMutation } from "@tanstack/react-query";

export default function CreatePostForm() {
  const navigate = useNavigate();
  const {
    mutate: createPost,
    isPending,
    isSuccess,
    isError,
  } = useMutation({ ...postQueries.create() });

  const { selectedImages, addImages, removeImage, error } = useImageUpload();
  const [content, setContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<ApiEmotion>(
    ApiEmotion.NONE,
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleCancel = () => {
    const answer = window.confirm(
      "취소하면 작성한 내용이 사라져요. 그래도 취소하겠냥?",
    );
    if (answer) {
      navigate("/");
    }
  };
  const handlePostSubmit = () => {
    createPost({
      images: selectedImages.map((img) => img.file),
      content,
      emotion: selectedEmotion,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
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
      <PostContentInput
        content={content}
        setContent={setContent}
        setIsSubmitDisabled={setIsSubmitDisabled}
      />
      <SelectEmotion
        selectedEmotion={selectedEmotion}
        setEmotion={setSelectedEmotion}
      />
      <div className="flex gap-2 w-full justify-end">
        <Button variant="primarySolid" onClick={handleCancel}>
          취소냥
        </Button>
        <Button
          variant="secondarySolid"
          disabled={isPending || isSubmitDisabled}
          onClick={handlePostSubmit}
        >
          {isPending ? "잠시만 기다려주세옹" : "다 적으면 누르라냥!"}
        </Button>
      </div>
    </div>
  );
}
