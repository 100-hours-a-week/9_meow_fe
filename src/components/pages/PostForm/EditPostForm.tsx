import { useEffect } from "react";
import ImageInput from "./ImageInput";
import PostContentInput from "./PostContentInput";
import SelectEmotion from "./SelectEmotion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useImageUpload } from "@/hooks/common/useImageUpload";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postQueries } from "@/api/queries/postQueries";
import { useHandleCancel } from "@/hooks/common/useHandleCancel";
import { usePostFormState } from "@/hooks/post/usePostFormState";

export default function EditPostForm({ postId }: { postId: number }) {
  const navigate = useNavigate();
  const { handleCancel } = useHandleCancel({
    navigateTo: `/detail/${postId}`,
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
    setSelectedImages,
    addImage,
    removeImage,
    uploadImagesToS3,
    isUploading,
  } = useImageUpload();

  const { data: postData } = useQuery({
    ...postQueries.editInfo({ postId }),
  });
  const { mutate: editPost, isPending } = useMutation({
    ...postQueries.edit({ postId, navigate }),
  });

  const handlePostSubmit = async () => {
    try {
      const imageUrls = await uploadImagesToS3();
      editPost({ imageUrls, content, emotion: selectedEmotion });
    } catch (error) {
      console.error("포스트 수정 중 오류 발생:", error);
      alert("포스트 수정에 실패했다옹. 잠시 후 다시 시도해보냥");
    }
  };

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
  }, [postData, setSelectedImages, setSelectedEmotion, setContent]);

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
      <div className="flex gap-2 w-full justify-end">
        <Button variant="primarySolid" onClick={handleCancel}>
          취소냥
        </Button>
        <Button
          variant="secondarySolid"
          disabled={isSubmitDisabled || isPending || isUploading}
          onClick={handlePostSubmit}
        >
          다 적으면 누르라냥!
        </Button>
      </div>
    </div>
  );
}
