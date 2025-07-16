import ImageInput from "./ImageInput";
import PostContentInput from "./PostContentInput";
import SelectEmotion from "./SelectEmotion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useImageUpload } from "@/hooks/common/useImageUpload";
import { postQueries } from "@/api/queries/postQueries";
import { useMutation } from "@tanstack/react-query";
import { useHandleCancel } from "@/hooks/common/useHandleCancel";
import { usePostFormState } from "@/hooks/post/usePostFormState";

export default function CreatePostForm() {
  const navigate = useNavigate();
  const { handleCancel } = useHandleCancel({ navigateTo: "/" });
  const { mutate: createPost, isPending } = useMutation({
    ...postQueries.create({ navigate }),
  });
  const {
    content,
    selectedEmotion,
    isSubmitDisabled,
    setContent,
    setSelectedEmotion,
    setIsSubmitDisabled,
  } = usePostFormState();

  const {
    selectedImages,
    addImage,
    removeImage,
    isUploading,
    uploadImagesToS3,
  } = useImageUpload();

  const handlePostSubmit = async () => {
    try {
      const imageUrls = await uploadImagesToS3();
      createPost({ imageUrls, content, emotion: selectedEmotion });
    } catch (error) {
      console.error("포스트 생성 중 오류 발생:", error);
      alert("포스트 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center p-5 pb-16">
      <h1 className="text-3xl font-bold">오늘은 무슨 일이 있었냥</h1>
      <ImageInput
        selectedImages={selectedImages}
        addImage={addImage}
        removeImage={removeImage}
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
          disabled={isPending || isSubmitDisabled || isUploading}
          onClick={handlePostSubmit}
        >
          {isPending || isUploading
            ? "잠시만 기다려주세옹"
            : "다 적으면 누르라냥!"}
        </Button>
      </div>
    </div>
  );
}
