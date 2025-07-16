import { useMutation } from "@tanstack/react-query";
import { useImageUpload } from "../common/useImageUpload";
import { ApiEmotion } from "@/types/Emotion";
import { useNavigate } from "react-router-dom";
import { postQueries } from "@/api/queries/postQueries";

export const usePostSubmit = ({ postId }: { postId?: number }) => {
  const navigate = useNavigate();
  const { mutate: createPost, isPending: isCreatePending } = useMutation({
    ...postQueries.create({ navigate }),
  });
  const { mutate: editPost, isPending: isEditPending } = useMutation({
    ...postQueries.edit({ postId: postId ?? 0, navigate }),
  });

  const {
    selectedImages,
    setSelectedImages,
    addImage,
    removeImage,
    isUploading,
    uploadImagesToS3,
  } = useImageUpload();

  const handlePostSubmit = async (content: string, emotion: ApiEmotion) => {
    try {
      const imageUrls = await uploadImagesToS3();
      createPost({ imageUrls, content, emotion });
    } catch (error) {
      console.error("포스트 생성 중 오류 발생:", error);
      alert("포스트 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleEditPostSubmit = async (content: string, emotion: ApiEmotion) => {
    try {
      const imageUrls = await uploadImagesToS3();
      editPost({ imageUrls, content, emotion });
    } catch (error) {
      console.error("포스트 수정 중 오류 발생:", error);
      alert("포스트 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return {
    selectedImages,
    setSelectedImages,
    addImage,
    removeImage,
    isUploading,
    isCreatePending,
    isEditPending,
    handlePostSubmit,
    handleEditPostSubmit,
  };
};
