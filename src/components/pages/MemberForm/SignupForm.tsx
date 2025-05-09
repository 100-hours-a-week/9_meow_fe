import { useState } from "react";
import NicknameInput from "./NicknameInput";
import ProfileImageSelection from "./ProfileImageSelection";
import SelectAnimalType from "./SelectAnimalType";
import { ApiAnimalType } from "@/types/animal";

export default function SignupForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [nicknameValue, setNicknameValue] = useState<string>("");
  const [selectedAnimal, setSelectedAnimal] = useState<ApiAnimalType>(
    ApiAnimalType.CAT
  );

  return (
    <div className="flex flex-col gap-4 items-center pt-8">
      <h2 className="text-4xl">환영한다냥</h2>
      <ProfileImageSelection
        titleText="친구는 어떻게 생겼냐옹"
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <NicknameInput
        isRequired={true}
        nicknameValue={nicknameValue}
        setNicknameValue={setNicknameValue}
      />
      <SelectAnimalType
        titleText="어떤 동물이냐옹"
        isRequired={true}
        animals={[ApiAnimalType.CAT, ApiAnimalType.DOG]}
        selectedAnimal={selectedAnimal}
        setAnimal={setSelectedAnimal}
      />
    </div>
  );
}
