import { Button } from "@/components/ui/button";
import { useImagePreview } from "@/hooks/common/useImagePreview";
import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventApplyForm() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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

  const handleCancel = () => {
    if (
      window.confirm("취소하면 작성한 내용이 사라진다옹. 그래도 취소하겠냥?")
    ) {
      setSelectedImage(null);
      createPreview(null);
      navigate("/event");
    }
  };

  const handleSubmit = () => {
    if (
      selectedImage &&
      window.confirm("정말 참가하겠냥? 참가하면 수정할 수 없다옹...")
    ) {
      console.log(selectedImage);
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
