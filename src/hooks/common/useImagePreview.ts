import { useState } from "react";

interface IUseImagePreview {
  initialImage: File | null;
}

export const useImagePreview = ({ initialImage }: IUseImagePreview) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const createPreview = (file: File | null) => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (initialImage) {
    createPreview(initialImage);
  }

  return {
    previewUrl,
    createPreview,
  };
};
