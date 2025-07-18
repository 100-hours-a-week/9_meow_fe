import ImageInput from "./ImageInput";
import PostContentInput from "./PostContentInput";
import SelectEmotion from "./SelectEmotion";
import { useHandleCancel } from "@/hooks/common/useHandleCancel";
import { usePostFormState } from "@/hooks/post/usePostFormState";
import { usePostSubmit } from "@/hooks/post/usePostSubmit";
import { FormActionButtons } from "@/components/common";

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
      <FormActionButtons
        disabled={isCreatePending || isSubmitDisabled || isUploading}
        isPending={isCreatePending || isUploading}
        handleSubmit={() => handlePostSubmit(content, selectedEmotion)}
        handleCancel={handleCancel}
      />
    </div>
  );
}
