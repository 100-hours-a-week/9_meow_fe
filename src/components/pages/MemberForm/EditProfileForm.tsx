import { useEffect, useState } from "react";
import NicknameInput from "./NicknameInput";
import ProfileImageSelection from "./ProfileImageSelection";
import SignupSelectAnimalType from "./SignupSelectAnimalType";
import { Button } from "@/components/ui/button";
import { useHandleCancel } from "@/hooks/common/useHandleCancel";
import { useProfileFormState } from "@/hooks/user/useProfileFormState";
import { useEditProfile } from "@/hooks/user/useEditProfile";
import { FormActionButtons } from "@/components/common";

export default function EditProfileForm() {
  const {
    selectedImage,
    setSelectedImage,
    nicknameValue,
    setNicknameValue,
    selectedAnimal,
    setSelectedAnimal,
    isNicknameDuplicate,
    setIsNicknameDuplicate,
    handleAnimalChange,
  } = useProfileFormState();
  const [initialImage, setInitialImage] = useState<string>("");

  const { handleCancel } = useHandleCancel({
    navigateTo: "/mypage/redirect",
  });
  const {
    editProfileInfo,
    handleSubmit,
    handleDeleteProfile,
    isEditProfilePending,
    isUploading,
  } = useEditProfile();

  useEffect(() => {
    if (editProfileInfo) {
      setNicknameValue(editProfileInfo.nickname);
      setSelectedAnimal(editProfileInfo.postType);
      setInitialImage(editProfileInfo.profileImageUrl);
    }
  }, [editProfileInfo]);

  const isNicknameChanged = nicknameValue !== editProfileInfo?.nickname;
  const isAnimalChanged = selectedAnimal !== editProfileInfo?.postType;
  const isImageChanged = selectedImage !== null;
  const isSubmitDisabled =
    (isNicknameChanged && isNicknameDuplicate) ||
    (!isNicknameChanged && !isAnimalChanged && !isImageChanged);

  return (
    <div className="flex flex-col gap-4 items-center pt-8 m-3 pb-16">
      <h2 className="text-4xl">프로필 수정할거냥</h2>
      <ProfileImageSelection
        titleText="친구는 어떻게 생겼냐옹"
        initialImage={initialImage ?? undefined}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        userAnimal={selectedAnimal}
      />
      <NicknameInput
        isRequired={true}
        nicknameValue={nicknameValue}
        setNicknameValue={setNicknameValue}
        setIsNicknameDuplicate={setIsNicknameDuplicate}
      />
      <SignupSelectAnimalType
        titleText="어떤 동물이냐옹"
        isRequired={true}
        selectedAnimal={selectedAnimal}
        setAnimal={handleAnimalChange}
      />
      <FormActionButtons
        disabled={isSubmitDisabled || isUploading}
        isPending={isEditProfilePending || isUploading}
        handleSubmit={() =>
          handleSubmit({
            nickname: nicknameValue,
            animalType: selectedAnimal,
            selectedImage,
            initialImage,
          })
        }
        handleCancel={handleCancel}
      />
      <Button variant="link" onClick={handleDeleteProfile}>
        탈퇴할거냥
      </Button>
    </div>
  );
}
