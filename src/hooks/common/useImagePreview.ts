import { useState, useEffect } from "react";

interface IUseImagePreview {
  initialImage: File | string | null;
}

export const useImagePreview = ({ initialImage }: IUseImagePreview) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const createPreview = (file: File | string | null) => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    if (typeof file === "string") {
      setPreviewUrl(file);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (initialImage) {
      createPreview(initialImage);
    }
  }, [initialImage]);

  return {
    previewUrl,
    createPreview,
  };
};
