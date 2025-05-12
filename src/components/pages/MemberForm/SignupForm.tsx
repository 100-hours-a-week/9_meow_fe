import { useEffect, useState } from "react";
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

export default function SignupForm() {
  const navigate = useNavigate();
  const { kakaoId, setKakaoId } = useKakaoIdStore();
  const { token, setToken } = useTokenStore();
  const { mutate: login, isPending: isLoginPending } = useMutation({
    ...loginQueries.login({ setToken, navigate }),
  });
  const {
    mutate: signup,
    isPending: isSignupPending,
    isSuccess: isSignupSuccess,
  } = useMutation({
    ...signupQueries.signup({ setKakaoId, login }),
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [nicknameValue, setNicknameValue] = useState<string>("");
  const [selectedAnimal, setSelectedAnimal] = useState<ApiAnimalType>(
    ApiAnimalType.CAT,
  );
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true);

  const handleSignup = () => {
    if (!kakaoId) {
      alert("카카오 로그인을 확인해주세옹");
    } else {
      signup({
        nickname: nicknameValue,
        animalType: selectedAnimal,
        profileImage: selectedImage,
        kakaoId,
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

  useEffect(() => {
    if (isSignupSuccess && kakaoId) {
      login(kakaoId);
    }
  }, [isSignupSuccess, kakaoId, login]);

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
        onDuplicateCheck={setIsNicknameDuplicate}
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
          onClick={handleSignup}
        >
          {isSignupPending || isLoginPending
            ? "잠시만 기다려 달라옹..."
            : "다 적으면 누르라냥!"}
        </Button>
      </div>
      <Button variant="link">탈퇴할거냥</Button>
    </div>
  );
}
