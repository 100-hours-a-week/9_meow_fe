import { queryOptions } from "@tanstack/react-query";
import { IKakaoAuthResponse, ILoginCode, ILoginResponse } from "@/api/types";
import { getKakaoId, getKakaoUrl, postLogin } from "@/api/login";
import { NavigateFunction } from "react-router-dom";

export const loginQueries = {
  all: () => ["login"] as const,

  kakaoUrl: () =>
    queryOptions<string>({
      queryKey: [...loginQueries.all(), "kakaoUrl"],
      queryFn: () => getKakaoUrl(),
    }),

  kakaoId: ({
    setKakaoId,
    login,
    navigate,
  }: {
    setKakaoId: (kakaoId: number) => void;
    login: (id: number) => void;
    navigate: NavigateFunction;
  }) => ({
    mutationKey: [...loginQueries.all(), "kakaoId"],
    mutationFn: ({ code }: ILoginCode) => getKakaoId(code),
    onSuccess: (data: IKakaoAuthResponse) => {
      setKakaoId(data.kakaoId);
      if (data.isMember) {
        login(data.kakaoId);
      } else {
        navigate("/signup");
      }
    },
  }),

  login: ({
    setToken,
    getProfileImage,
    navigate,
  }: {
    setToken: (token: string) => void;
    getProfileImage: () => void;
    navigate: NavigateFunction;
  }) => ({
    mutationKey: [...loginQueries.all(), "login"],
    mutationFn: (kakaoId: number) => postLogin(kakaoId),
    onSuccess: (data: ILoginResponse) => {
      setToken(data.accessToken);
      getProfileImage();
      navigate("/");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error);
      alert("로그인에 실패했다옹... 다시 시도해달라옹");
    },
  }),
};
