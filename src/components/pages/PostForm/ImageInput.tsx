import { ChangeEvent } from "react";
import { MAX_IMAGES } from "./validation/validateFileLength";
import { PreviewImage } from "@/hooks/useImageUpload";

export default function ImageInput({
  selectedImages,
  addImages,
  removeImage,
  error,
}: {
  selectedImages: PreviewImage[];
  addImages: (files: File[]) => void;
  removeImage: (index: number) => void;
  error: string | null;
}) {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    addImages(Array.from(files));
  };

  const handleDeleteImage = (index: number) => {
    removeImage(index);
  };

  return (
    <div className="flex flex-col gap-0 items-center px-2 py-2">
      <div className="flex gap-3">
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
        {error && <p className="text-xs text-destructive">{error}</p>}
        <p className="text-xs">{selectedImages.length}/3</p>
      </div>
    </div>
  );
}
