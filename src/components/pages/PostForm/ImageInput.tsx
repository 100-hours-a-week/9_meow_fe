import { ChangeEvent, useState } from "react";

interface PreviewImage {
  file: File;
  preview: string;
}

const MAX_IMAGES = 3;

export default function ImageInput() {
  const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const remainingSlots = MAX_IMAGES - selectedImages.length;
      const filesToAdd = newFiles.slice(0, remainingSlots);

      const newImages = filesToAdd.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview); // Clean up URL object
      newImages.splice(index, 1);
      return newImages;
    });
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
      <p className="self-end text-xs">{selectedImages.length}/3</p>
    </div>
  );
}
