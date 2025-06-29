import { useState, useEffect } from "react";
import { validateImageFile } from "@/utils/imageValidation";

interface IUseImagePreview {
  initialImage: File | string | null;
}

export const useImagePreview = ({ initialImage }: IUseImagePreview) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createPreview = (file: File | string | null) => {
    if (!file) {
      setPreviewUrl(null);
      setError(null);
      return;
    }

    if (typeof file === "string") {
      setPreviewUrl(file);
      setError(null);
      return;
    }

    const { isValid, message } = validateImageFile(file);
    if (!isValid) {
      setError(message);
      return;
    }

    setError(null);
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
    error,
    createPreview,
  };
};
