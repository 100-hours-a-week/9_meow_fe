import { eventQueries } from "@/api/queries/eventQueries";
import { imageQueries } from "@/api/queries/ImageQueries";
import { Button } from "@/components/ui/button";
import { useHandleCancel } from "@/hooks/common/useHandleCancel";
import { useImagePreview } from "@/hooks/common/useImagePreview";
import { cn } from "@/utils/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventSubmitForm() {
  const navigate = useNavigate();
  const { handleCancel } = useHandleCancel({
    navigateTo: "/event",
    onCancel: () => {
      setSelectedImage(null);
      createPreview(null);
    },
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { previewUrl, error, createPreview } = useImagePreview({
    initialImage: selectedImage,
  });

  const { mutate: submitEvent } = useMutation({
    ...eventQueries.submitEvent({ navigate }),
  });
  const { mutateAsync: uploadImageToS3 } = useMutation({
    ...imageQueries.uploadImageToS3(),
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      createPreview(file);
    }
  };

  const handleSubmit = async () => {
    if (
      selectedImage &&
      window.confirm("정말 참가하겠냥? 참가하면 수정할 수 없다옹...")
    ) {
      const imageUrl = await uploadImageToS3(selectedImage);
      submitEvent({ imageUrl });
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <label
        className={cn(
          "w-full aspect-square flex items-center justify-center rounded-3xl cursor-pointer overflow-hidden",
          previewUrl
            ? "bg-none border border-muted-foreground"
            : "bg-foreground border-none",
        )}
      >
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
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex flex-row gap-2">
        <Button variant="primarySolid" size="sm" onClick={handleCancel}>
          취소냥
        </Button>
        <Button
          variant="secondarySolid"
          size="sm"
          onClick={handleSubmit}
          disabled={!selectedImage}
        >
          £ 준비되면 누르라냥!
        </Button>
      </div>
    </div>
  );
}
