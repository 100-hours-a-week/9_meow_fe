import React, { ChangeEvent } from "react";
import { useImagePreview } from "@/hooks/common/useImagePreview";
import { Label } from "@radix-ui/react-label";

interface IProfileImageSelection {
  titleText?: string;
  isRequired?: boolean;
  initialImage?: string;
  selectedImage: File | null;
  setSelectedImage: (image: File) => void;
}

function ProfileImageSelection({
  titleText,
  isRequired = false,
  initialImage,
  selectedImage,
  setSelectedImage,
}: IProfileImageSelection) {
  const { previewUrl, error, createPreview } = useImagePreview({
    initialImage: initialImage ?? selectedImage,
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      createPreview(file);
    }
  };

  return (
    <div className="flex flex-col gap-0 items-center w-full max-w-[400px]">
      {titleText && (
        <Label className="text-xl text-foreground font-bold flex items-center gap-1 self-start">
          {titleText + " "}
          {isRequired && <span className="text-destructive">*</span>}
        </Label>
      )}
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
      {error && <p className="text-xs text-destructive mt-2">{error}</p>}
    </div>
  );
}

export default React.memo(ProfileImageSelection);
