import { useCallback, useEffect, useState } from "react";
import NicknameInput from "./NicknameInput";
import ProfileImageSelection from "./ProfileImageSelection";
import SignupSelectAnimalType from "./SignupSelectAnimalType";
import { ApiAnimalType } from "@/types/animal";
import { Button } from "@/components/ui/button";
import { userQueries } from "@/api/queries/userQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { imageQueries } from "@/api/queries/ImageQueries";

export default function EditProfileForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [initialImage, setInitialImage] = useState<string>("");
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
  const { mutateAsync: uploadImageToS3 } = useMutation({
    ...imageQueries.uploadImageToS3(),
  });
  const { mutate: editProfile } = useMutation({
    ...userQueries.editProfile({ navigate, queryClient }),
  });
  const { mutate: deleteProfile } = useMutation({
    ...userQueries.deleteProfile({ navigate }),
  });

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

  const handleAnimalChange = useCallback((animal: ApiAnimalType) => {
    setSelectedAnimal(animal);
  }, []);

  const handleCancel = () => {
    const answer = window.confirm(
      "취소하면 작성한 내용이 사라지는데, 그래도 취소하겠냥?",
    );
    if (answer) {
      navigate(`/mypage/redirect`);
    }
  };

  const handleSubmit = async () => {
    try {
      const imageUrl =
        selectedImage instanceof File
          ? await uploadImageToS3(selectedImage)
          : ((selectedImage || initialImage) ?? undefined);

      editProfile({
        nickname: nicknameValue,
        profileImageUrl: imageUrl,
        postType: selectedAnimal,
      });
    } catch (error) {
      alert("프로필 수정에 실패했다옹");
      console.error(error);
    }
  };

  const handleDeleteProfile = () => {
    if (window.confirm("정말 탈퇴할거냥?")) {
      deleteProfile();
    }
  };

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
      <div className="flex gap-10 w-full justify-center">
        <Button
          variant="primarySolid"
          onClick={handleCancel}
          aria-label="취소하기"
        >
          취소냥
        </Button>
        <Button
          variant="secondarySolid"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          aria-label="제출하기"
        >
          다 적으면 누르라냥
        </Button>
      </div>
      <Button
        variant="link"
        onClick={handleDeleteProfile}
        aria-label="탈퇴하기"
      >
        탈퇴할거냥
      </Button>
    </div>
  );
}
