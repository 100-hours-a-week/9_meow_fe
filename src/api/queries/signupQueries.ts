import { UseMutationOptions } from "@tanstack/react-query";
import { getDuplicateNickname, postUsers } from "@/api/signup";
import { ISignupResponse, IUserRequest } from "@/api/types";

export const signupQueries = {
  all: () => ["signup"] as const,

  checkNickname: (): UseMutationOptions<boolean, Error, string> => ({
    mutationKey: [...signupQueries.all(), "checkNickname"],
    mutationFn: (nickname: string) => getDuplicateNickname(nickname),
  }),

  signup: ({
    setKakaoId,
  }: {
    setKakaoId: (kakaoId: number) => void;
  }): UseMutationOptions<ISignupResponse, Error, IUserRequest> => ({
    mutationKey: [...signupQueries.all(), "signup"],
    mutationFn: (data: IUserRequest) => postUsers(data),
    onSuccess: (data) => {
      setKakaoId(data.data.kakaoId);
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      alert("회원가입에 실패했다옹... 다시 시도해달라옹");
    },
  }),
};
