import { validateFileLength } from "@/components/pages/PostForm/validation/validateFileLength";
import { validateFileSize } from "@/components/pages/PostForm/validation/validateFileSize";
import { ValidationReturnType } from "@/types/ValidationReturnType";
import { useState } from "react";

export interface IPreviewImage {
  file: File | null;
  preview: string;
}

export const useImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState<IPreviewImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addImages = async (files: File[]) => {
    const totalImages = selectedImages.length + files.length;

    const lengthError: ValidationReturnType = validateFileLength(totalImages);
    if (!lengthError.isValid) {
      setError(lengthError.message);
      return;
    }

    for (const file of files) {
      const sizeError: ValidationReturnType = validateFileSize(file);
      if (!sizeError.isValid) {
        setError(sizeError.message);
        return;
      }
    }

    setError(null);

    const newImages = await Promise.all(
      files.map(
        (file) =>
          new Promise<IPreviewImage>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
              const result = e.target?.result;
              if (result && typeof result === "string") {
                resolve({ file, preview: result });
              }
            };
            reader.readAsDataURL(file);
          }),
      ),
    );

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
    setError(null);
  };

  return {
    selectedImages,
    setSelectedImages,
    error,
    addImages,
    removeImage,
    setError,
  };
};
