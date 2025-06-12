import { useEffect, useState } from "react";
import NicknameInput from "./NicknameInput";
import ProfileImageSelection from "./ProfileImageSelection";
import SelectAnimalType from "./SelectAnimalType";
import { ApiAnimalType } from "@/types/animal";
import { Button } from "@/components/ui/button";
import { userQueries } from "@/api/queries/userQueries";
import { useQuery } from "@tanstack/react-query";

export default function EditProfileForm() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null,
  );
  const [nicknameValue, setNicknameValue] = useState<string>("");
  const [selectedAnimal, setSelectedAnimal] = useState<ApiAnimalType>(
    ApiAnimalType.CAT,
  );
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true);
  const { data: editProfileInfo } = useQuery({
    ...userQueries.editProfileInfo(),
  });

  useEffect(() => {
    if (editProfileInfo) {
      setNicknameValue(editProfileInfo.nickname);
      setSelectedAnimal(editProfileInfo.postType);
      setSelectedImage(editProfileInfo.profileImageUrl);
    }
  }, [editProfileInfo]);

  const isSubmitDisabled =
    isNicknameDuplicate ||
    !nicknameValue.trim() ||
    (nicknameValue === editProfileInfo?.nickname &&
      selectedAnimal === editProfileInfo?.postType &&
      selectedImage === editProfileInfo?.profileImageUrl);

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="flex flex-col gap-4 items-center pt-8 m-3 pb-16">
      <h2 className="text-4xl">프로필 수정할거냥</h2>
      <ProfileImageSelection
        titleText="친구는 어떻게 생겼냐옹"
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <NicknameInput
        isRequired={true}
        nicknameValue={nicknameValue}
        setNicknameValue={setNicknameValue}
        setIsNicknameDuplicate={setIsNicknameDuplicate}
      />
      <SelectAnimalType
        titleText="어떤 동물이냐옹"
        isRequired={true}
        animals={[ApiAnimalType.CAT, ApiAnimalType.DOG]}
        selectedAnimal={selectedAnimal}
        setAnimal={setSelectedAnimal}
      />
      <div className="flex gap-10 w-full justify-center">
        <Button variant="primarySolid">취소냥</Button>
        <Button
          variant="secondarySolid"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          다 적으면 누르라냥
        </Button>
      </div>
      <Button variant="link">탈퇴할거냥</Button>
    </div>
  );
}
