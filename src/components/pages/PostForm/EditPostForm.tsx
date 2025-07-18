import { useEffect } from "react";
import ImageInput from "./ImageInput";
import PostContentInput from "./PostContentInput";
import SelectEmotion from "./SelectEmotion";
import { useQuery } from "@tanstack/react-query";
import { postQueries } from "@/api/queries/postQueries";
import { useHandleCancel } from "@/hooks/common/useHandleCancel";
import { usePostFormState } from "@/hooks/post/usePostFormState";
import { usePostSubmit } from "@/hooks/post/usePostSubmit";
import { FormActionButtons } from "@/components/common";

export default function EditPostForm({ postId }: { postId: number }) {
  const {
    content,
    selectedEmotion,
    isSubmitDisabled,
    setContent,
    setSelectedEmotion,
    setIsSubmitDisabled,
  } = usePostFormState();
  const { handleCancel } = useHandleCancel({
    navigateTo: `/detail/${postId}`,
  });
  const {
    selectedImages,
    setSelectedImages,
    addImage,
    removeImage,
    isUploading,
    isEditPending,
    handleEditPostSubmit,
  } = usePostSubmit({ postId });

  const { data: postData } = useQuery({
    ...postQueries.editInfo({ postId }),
  });

  useEffect(() => {
    if (postData) {
      setSelectedImages(
        postData.imageUrls.map((url) => ({
          file: new File([], ""),
          preview: url,
        })),
      );
      setSelectedEmotion(postData.emotion);
      setContent(postData.content);
    }
    setIsSubmitDisabled(false);
  }, [
    postData,
    setSelectedImages,
    setSelectedEmotion,
    setContent,
    setIsSubmitDisabled,
  ]);

  return (
    <div className="flex flex-col gap-4 items-center p-5 pb-16">
      <h1 className="text-3xl font-bold">수정해라 냥!</h1>
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
        disabled={isSubmitDisabled || isEditPending || isUploading}
        isPending={isEditPending || isUploading}
        handleSubmit={() => handleEditPostSubmit(content, selectedEmotion)}
        handleCancel={handleCancel}
      />
    </div>
  );
}
