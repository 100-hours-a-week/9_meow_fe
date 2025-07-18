import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useImagePreview } from "@/hooks/common/useImagePreview";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userQueries } from "@/api/queries/userQueries";
import { imageQueries } from "@/api/queries/ImageQueries";
import { Loader2 } from "lucide-react";
import { ApiAnimalType } from "@/types/animal";
import { FormActionButtons } from "@/components/common";

interface AISelectModalProps {
  isOpen: boolean;
  userAnimal?: ApiAnimalType;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

export default function AISelectModal({
  isOpen,
  userAnimal,
  onClose,
  onSelectImage,
}: AISelectModalProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedAIImageUrl, setSelectedAIImageUrl] = useState<string>("");
  const { previewUrl, error, createPreview } = useImagePreview({
    initialImage: selectedImage ?? "",
  });

  const { mutateAsync: uploadImageToS3 } = useMutation({
    ...imageQueries.uploadImageToS3(),
  });
  const {
    mutate: postAiProfileImage,
    data: aiProfileImageData,
    isPending,
  } = useMutation({ ...userQueries.aiProfileImage() });

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      createPreview(file);
      const imageUrl = file ? await uploadImageToS3(file as File) : undefined;
      postAiProfileImage({
        image_url: imageUrl ?? "",
        animal_type: userAnimal ?? ApiAnimalType.CAT,
      });
    }
  };

  const handleAIImageSelect = (imageUrl: string) => {
    setSelectedAIImageUrl(imageUrl);
  };

  const handleConfirm = () => {
    if (selectedAIImageUrl) {
      onSelectImage(selectedAIImageUrl);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setSelectedAIImageUrl("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="p-6">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-4xl font-bold">미야옹이 골라준다옹</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground text-2xl"
          >
            ✕
          </Button>
        </div>

        <p className="text-foreground text-xl">
          너의 사진을 올려봐라 냥! 내가 프로필 사진 추천해준다옹
        </p>

        <div className="flex flex-col gap-1 items-center w-full max-w-[400px]">
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
          {error && <p className="text-xs text-destructive mt-2">{error}</p>}
        </div>

        <p className="text-foreground">
          £ 얼굴이 잘 나온 사진으로 올려야 한다옹
          <br />¢ 배경이 깨끗하면 좋다냥!
        </p>

        {isPending ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : (
          aiProfileImageData && (
            <div className="bg-orange-100 w-full rounded-lg p-4 flex flex-col items-center gap-5">
              <h3 className="text-2xl font-bold">이 중에 골라봐냥</h3>
              <div className="flex flex-row w-full gap-2 justify-center">
                {aiProfileImageData?.data?.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`relative group cursor-pointer rounded-full border-2 overflow-hidden transition-colors ${
                      selectedAIImageUrl === imageUrl
                        ? "border-foreground"
                        : "border-foreground/30 hover:border-foreground/60"
                    }`}
                    onClick={() => handleAIImageSelect(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt="AI Generated Image"
                      className="w-[80px] h-[80px] object-cover"
                    />
                    {selectedAIImageUrl === imageUrl && (
                      <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        <FormActionButtons
          disabled={!selectedAIImageUrl}
          isPending={false}
          handleSubmit={handleConfirm}
          handleCancel={handleClose}
        />
      </div>
    </Modal>
  );
}
