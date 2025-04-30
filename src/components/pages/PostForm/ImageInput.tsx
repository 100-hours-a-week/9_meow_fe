import { ChangeEvent, useState } from "react";
import { validateFileSize } from "./validation/validateFileSize";
import {
  MAX_IMAGES,
  validateFileLength,
} from "./validation/validateFileLength";

interface PreviewImage {
  file: File;
  preview: string;
}

export default function ImageInput() {
  const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);
  const [error, setError] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalImages = selectedImages.length + newFiles.length;

    const { isValid, message } = validateFileLength(totalImages);
    if (!isValid) {
      setError({ isValid, message });
      return;
    }

    for (const file of newFiles) {
      const { isValid, message } = validateFileSize(file);
      if (!isValid) {
        setError({ isValid, message });
        return;
      }
    }

    setError(null);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result && typeof result === "string") {
          setSelectedImages((prev) => [...prev, { file, preview: result }]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
    setError(null);
  };

  return (
    <div className="flex flex-col gap-0 items-center px-2 py-2">
      <div className="flex gap-3 flex-wrap">
        {selectedImages.length < MAX_IMAGES && (
          <label className="flex items-center justify-center w-[100px] h-[100px] bg-orange-100 border border-foreground/30 rounded-2xl cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">+</span>
              <span className="text-sm">사진을 추가해라냥</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              multiple
            />
          </label>
        )}

        {selectedImages.map((image, index) => (
          <div
            key={index}
            className="relative w-[100px] h-[100px] border border-foreground/30 rounded-2xl"
          >
            <img
              src={image.preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-2xl"
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-foreground rounded-full flex items-center justify-center"
            >
              <span className="text-background text-sm">×</span>
            </button>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end items-center gap-2">
        {error?.isValid === false && (
          <p className="text-xs text-destructive">{error.message}</p>
        )}
        <p className="text-xs">{selectedImages.length}/3</p>
      </div>
    </div>
  );
}
