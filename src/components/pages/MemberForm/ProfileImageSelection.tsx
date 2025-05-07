import { ChangeEvent } from "react";
import { useImagePreview } from "@/hooks/common/useImagePreview";

interface IProfileImageSelection {
  selectedImage: File | null;
  setSelectedImage: (image: File) => void;
}

export default function ProfileImageSelection({
  selectedImage,
  setSelectedImage,
}: IProfileImageSelection) {
  const { previewUrl, createPreview } = useImagePreview({
    initialImage: selectedImage,
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      createPreview(file);
    }
  };

  return (
    <div className="flex flex-col gap-0 items-center px-2 py-2">
      <div className="flex gap-3">
        <label className="flex items-center justify-center w-[100px] h-[100px] bg-orange-950 border border-foreground/30 rounded-full cursor-pointer overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl text-background">+</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
}
