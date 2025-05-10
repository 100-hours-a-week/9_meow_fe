import {
  queryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { IKakaoAuthResponse, ILoginCode, ILoginResponse } from "@/api/types";
import { getKakaoId, getKakaoUrl, postLogin } from "@/api/login";

export const loginQueries = {
  all: () => ["login"] as const,

  kakaoUrl: (): UseQueryOptions<string, Error, string, string[]> =>
    queryOptions({
      queryKey: [...loginQueries.all(), "kakaoUrl"],
      queryFn: () => getKakaoUrl(),
    }),

  kakaoId: ({
    setKakaoId,
  }: {
    setKakaoId: (kakaoId: number) => void;
  }): UseMutationOptions<IKakaoAuthResponse, Error, ILoginCode> => ({
    mutationKey: [...loginQueries.all(), "kakaoId"],
    mutationFn: ({ code }: ILoginCode) => getKakaoId(code),
    onSuccess: (data) => {
      setKakaoId(data.kakaoId);
    },
  }),

  login: ({
    setToken,
  }: {
    setToken: (token: string) => void;
  }): UseMutationOptions<ILoginResponse, Error, number> => ({
    mutationKey: [...loginQueries.all(), "login"],
    mutationFn: (kakaoId: number) => postLogin(kakaoId),
    onSuccess: (data) => {
      setToken(data.accessToken);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      alert("로그인에 실패했다옹... 다시 시도해달라옹");
    },
  }),
};
