import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NicknameInput from "./NicknameInput";
import ProfileImageSelection from "./ProfileImageSelection";
import SignupSelectAnimalType from "./SignupSelectAnimalType";
import { Button } from "@/components/ui/button";
import useTokenStore from "@/store/useTokenStore";
import { useHandleCancel } from "@/hooks/common/useHandleCancel";
import { useProfileFormState } from "@/hooks/user/useProfileFormState";
import { useSignup } from "@/hooks/user/useSignup";

export default function SignupForm() {
  const navigate = useNavigate();
  const { token } = useTokenStore();
  const {
    selectedImage,
    setSelectedImage,
    nicknameValue,
    setNicknameValue,
    selectedAnimal,
    isNicknameDuplicate,
    setIsNicknameDuplicate,
    handleAnimalChange,
  } = useProfileFormState();

  const { handleCancel } = useHandleCancel({
    navigateTo: "/login",
  });
  const { handleSignup, isSignupPending, isLoginPending } = useSignup();

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
      <SignupSelectAnimalType
        titleText="어떤 동물이냐옹"
        isRequired={true}
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
          onClick={() =>
            handleSignup({
              nickname: nicknameValue,
              animalType: selectedAnimal,
              selectedImage,
            })
          }
        >
          {isSignupPending || isLoginPending
            ? "잠시만 기다려 달라옹..."
            : "다 적으면 누르라냥!"}
        </Button>
      </div>
    </div>
  );
}
