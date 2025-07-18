import { imageQueries } from "@/api/queries/ImageQueries";
import { loginQueries } from "@/api/queries/loginQueries";
import { signupQueries } from "@/api/queries/signupQueries";
import useKakaoIdStore from "@/store/useKakaoIdStore";
import useTokenStore from "@/store/useTokenStore";
import { ApiAnimalType } from "@/types/animal";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();
  const { kakaoId, setKakaoId } = useKakaoIdStore();
  const { setToken } = useTokenStore();

  const { mutate: login, isPending: isLoginPending } = useMutation({
    ...loginQueries.login({ setToken, navigate, redirectPath: null }),
  });
  const { mutate: signup, isPending: isSignupPending } = useMutation({
    ...signupQueries.signup({ setKakaoId, login }),
  });

  const { mutateAsync: uploadImageToS3 } = useMutation({
    ...imageQueries.uploadImageToS3(),
  });

  const handleSignup = async ({
    nickname,
    animalType,
    selectedImage,
  }: {
    nickname: string;
    animalType: ApiAnimalType;
    selectedImage: File | string | null;
  }) => {
    if (!kakaoId) {
      alert("카카오 로그인을 확인해주세옹");
      return;
    }

    const imageUrl = selectedImage
      ? await uploadImageToS3(selectedImage as File)
      : undefined;

    signup({
      nickname,
      animalType,
      profileImage: imageUrl,
      kakaoId: kakaoId ?? 0,
    });
  };

  return {
    handleSignup,
    isSignupPending,
    isLoginPending,
    uploadImageToS3,
  };
};
