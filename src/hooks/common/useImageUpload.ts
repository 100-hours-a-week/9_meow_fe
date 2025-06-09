import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { imageQueries } from "@/api/queries/ImageQueries";

export interface IPreviewImage {
  file: File;
  preview: string;
}

export const useImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState<IPreviewImage[]>([]);

  const { mutateAsync: uploadImageToS3, isPending: isUploading } = useMutation({
    ...imageQueries.uploadImageToS3(),
  });

  const addImage = async (file: File) => {
    const newImage = await new Promise<IPreviewImage>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result && typeof result === "string") {
          resolve({ file, preview: result });
        }
      };
      reader.readAsDataURL(file);
    });

    setSelectedImages((prev) => [...prev, newImage]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const uploadImagesToS3 = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return [];

    try {
      const imageUrls = await Promise.all(
        selectedImages.map(async (image) => {
          const key = await uploadImageToS3(image.file);

          const cloudFrontUrl = import.meta.env.VITE_CLOUDFRONT_URL;
          return `${cloudFrontUrl}${key}`;
        }),
      );

      return imageUrls;
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      throw new Error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return {
    selectedImages,
    setSelectedImages,
    addImage,
    removeImage,
    isUploading,
    uploadImagesToS3,
  };
};
