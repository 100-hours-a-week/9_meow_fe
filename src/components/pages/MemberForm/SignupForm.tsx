import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NicknameInput from "./NicknameInput";
import ProfileImageSelection from "./ProfileImageSelection";
import SelectAnimalType from "./SelectAnimalType";
import { ApiAnimalType } from "@/types/animal";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import useKakaoIdStore from "@/store/useKakaoIdStore";
import useTokenStore from "@/store/useTokenStore";
import { signupQueries } from "@/api/queries/signupQueries";
import { loginQueries } from "@/api/queries/loginQueries";
import { imageQueries } from "@/api/queries/ImageQueries";

const animals = [ApiAnimalType.CAT, ApiAnimalType.DOG];

export default function SignupForm() {
  const navigate = useNavigate();
  const { kakaoId, setKakaoId } = useKakaoIdStore();
  const { token, setToken } = useTokenStore();

  const { mutate: login, isPending: isLoginPending } = useMutation({
    ...loginQueries.login({ setToken, navigate, redirectPath: null }),
  });
  const { mutate: signup, isPending: isSignupPending } = useMutation({
    ...signupQueries.signup({ setKakaoId, login }),
  });
  const { mutateAsync: uploadImageToS3 } = useMutation({
    ...imageQueries.uploadImageToS3(),
  });

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

  const handleCancel = () => {
    const answer = window.confirm(
      "취소하면 작성한 내용이 사라지는데, 그래도 취소하겠냥?",
    );
    if (answer) {
      navigate(`/login`);
    }
  };

  const handleSignup = async () => {
    if (!kakaoId) {
      alert("카카오 로그인을 확인해주세옹");
    } else {
      const imageUrl = selectedImage
        ? await uploadImageToS3(selectedImage as File)
        : undefined;

      signup({
        nickname: nicknameValue,
        animalType: selectedAnimal,
        profileImage: imageUrl,
        kakaoId: kakaoId ?? 0,
      });
    }
  };

  const isSubmitDisabled =
    isSignupPending ||
    isLoginPending ||
    isNicknameDuplicate ||
    !nicknameValue.trim();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col gap-4 items-center pt-8 m-3 pb-16">
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
        setIsNicknameDuplicate={setIsNicknameDuplicate}
      />
      <SelectAnimalType
        titleText="어떤 동물이냐옹"
        isRequired={true}
        animals={animals}
        selectedAnimal={selectedAnimal}
        setAnimal={handleAnimalChange}
      />
      <div className="flex gap-10 w-full justify-center">
        <Button variant="primarySolid" onClick={handleCancel}>
          취소냥
        </Button>
        <Button
          variant="secondarySolid"
          disabled={isSubmitDisabled}
          onClick={handleSignup}
        >
          {isSignupPending || isLoginPending
            ? "잠시만 기다려 달라옹..."
            : "다 적으면 누르라냥!"}
        </Button>
      </div>
    </div>
  );
}
