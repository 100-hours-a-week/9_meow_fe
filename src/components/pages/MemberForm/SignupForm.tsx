import { useState } from "react";
import NicknameInput from "./NicknameInput";
import ProfileImageSelection from "./ProfileImageSelection";
import SelectAnimalType from "./SelectAnimalType";

export default function SignupForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <div className="flex flex-col gap-4 items-center pt-8">
      <h2 className="text-4xl">환영한다냥</h2>
      <ProfileImageSelection
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <NicknameInput />
      <SelectAnimalType />
    </div>
  );
}
