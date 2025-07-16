import ImageInput from "./ImageInput";
import PostContentInput from "./PostContentInput";
import SelectEmotion from "./SelectEmotion";
import { Button } from "@/components/ui/button";
import { useHandleCancel } from "@/hooks/common/useHandleCancel";
import { usePostFormState } from "@/hooks/post/usePostFormState";
import { usePostSubmit } from "@/hooks/post/usePostSubmit";

export default function CreatePostForm() {
  const {
    content,
    selectedEmotion,
    isSubmitDisabled,
    setContent,
    setSelectedEmotion,
    setIsSubmitDisabled,
  } = usePostFormState();
  const { handleCancel } = useHandleCancel({ navigateTo: "/" });
  const {
    selectedImages,
    addImage,
    removeImage,
    isUploading,
    isCreatePending,
    handlePostSubmit,
  } = usePostSubmit({ postId: undefined });

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
          disabled={isCreatePending || isSubmitDisabled || isUploading}
          onClick={() => handlePostSubmit(content, selectedEmotion)}
        >
          {isCreatePending || isUploading
            ? "잠시만 기다려주세옹"
            : "다 적으면 누르라냥!"}
        </Button>
      </div>
    </div>
  );
}
