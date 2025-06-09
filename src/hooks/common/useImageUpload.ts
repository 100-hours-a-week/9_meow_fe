import { useState } from "react";

export interface PreviewImage {
  file: File;
  preview: string;
}

export const useImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);

  const addImage = async (file: File) => {
    const newImage = await new Promise<PreviewImage>((resolve) => {
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

  return {
    selectedImages,
    addImage,
    removeImage,
  };
};
