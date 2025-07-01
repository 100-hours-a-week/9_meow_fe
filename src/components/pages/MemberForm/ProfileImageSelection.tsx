import React, { ChangeEvent, useState } from "react";
import { useImagePreview } from "@/hooks/common/useImagePreview";
import { Label } from "@radix-ui/react-label";
import AISelectModal from "./AISelectModal";
import { Button } from "@/components/ui/button";

interface IProfileImageSelection {
  titleText?: string;
  isRequired?: boolean;
  initialImage?: string;
  selectedImage: File | string | null;
  setSelectedImage: (image: File | string) => void;
}

function ProfileImageSelection({
  titleText,
  isRequired = false,
  initialImage,
  selectedImage,
  setSelectedImage,
}: IProfileImageSelection) {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
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

  const handleAIImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    createPreview(imageUrl);
  };

  return (
    <>
      <div className="relative flex flex-col gap-1 items-center w-full max-w-[400px]">
        {titleText && (
          <Label className="text-xl text-foreground font-bold flex items-center gap-1 self-start">
            {titleText + " "}
            {isRequired && <span className="text-destructive">*</span>}
          </Label>
        )}
        <div className="flex gap-3 items-center">
          <div className="flex flex-col items-center gap-2">
            <label className="flex items-center justify-center w-[100px] h-[100px] bg-muted-foreground border border-foreground/30 rounded-full cursor-pointer overflow-hidden">
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
            <Button
              variant="secondaryOutline"
              size="sm"
              className="absolute right-0 bottom-0"
              onClick={() => setIsAIModalOpen(true)}
            >
              닮은 냥이 / 멍이 찾기
            </Button>
          </div>
        </div>
        {error && <p className="text-xs text-destructive mt-2">{error}</p>}
      </div>
      {isAIModalOpen && (
        <AISelectModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          onSelectImage={handleAIImageSelect}
        />
      )}
    </>
  );
}

export default React.memo(ProfileImageSelection);
