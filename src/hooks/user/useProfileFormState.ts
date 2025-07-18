import { ApiAnimalType } from "@/types/animal";
import { useState } from "react";

import { useCallback } from "react";

export const useProfileFormState = () => {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null,
  );
  const [nicknameValue, setNicknameValue] = useState<string>("");
  const [selectedAnimal, setSelectedAnimal] = useState<ApiAnimalType>(
    ApiAnimalType.CAT,
  );
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true);

  const handleAnimalChange = useCallback((animal: ApiAnimalType) => {
    setSelectedAnimal(animal);
  }, []);

  return {
    selectedImage,
    setSelectedImage,
    nicknameValue,
    setNicknameValue,
    selectedAnimal,
    setSelectedAnimal,
    isNicknameDuplicate,
    setIsNicknameDuplicate,
    handleAnimalChange,
  };
};
