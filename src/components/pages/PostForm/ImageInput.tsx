import { ChangeEvent, useState } from "react";
import {
  MAX_IMAGES,
  validateFileLength,
} from "./validation/validateFileLength";
import { validateFileSize } from "./validation/validateFileSize";
import { IPreviewImage } from "@/hooks/common/useImageUpload";

export default function ImageInput({
  selectedImages,
  addImage,
  removeImage,
}: {
  selectedImages: IPreviewImage[];
  addImage: (file: File) => void;
  removeImage: (index: number) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const { isValid: isFileLengthValid, message: fileLengthMessage } =
      validateFileLength(selectedImages.length);
    if (!isFileLengthValid) {
      setError(fileLengthMessage);
      return;
    }
    const { isValid: isFileSizeValid, message: fileSizeMessage } =
      validateFileSize(files[0]);
    if (!isFileSizeValid) {
      setError(fileSizeMessage);
      return;
    }
    setError(null);
    addImage(files[0]);
  };

  const handleDeleteImage = (index: number) => {
    removeImage(index);
  };

  return (
    <div className="flex flex-col gap-0 items-center px-2 py-2">
      <div className="flex gap-3">
        {selectedImages.length < MAX_IMAGES && (
          <label className="flex items-center justify-center w-[100px] h-[100px] bg-orange-100 outline outline-foreground/30 rounded-2xl cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">+</span>
              <span className="text-sm">사진을 추가해라냥</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
        {selectedImages.map((image, index) => {
          return (
            <div
              key={index}
              className="relative w-[100px] h-[100px] outline outline-foreground/30 rounded-2xl"
            >
              <img
                src={image.preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-2xl"
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-foreground rounded-full flex items-center justify-center"
              >
                <span className="text-background text-sm">×</span>
              </button>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-end items-center gap-2">
        {error && <p className="text-xs text-destructive">{error}</p>}
        <p className="text-xs">{selectedImages.length}/3</p>
      </div>
    </div>
  );
}
