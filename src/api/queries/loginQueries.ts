import { queryOptions } from "@tanstack/react-query";
import {
  IKakaoAuthResponse,
  ILoginCode,
  ILoginResponse,
} from "@/api/types/login";
import { getKakaoId, getKakaoUrl, postLogin } from "@/api/login";
import { NavigateFunction } from "react-router-dom";
import {
  ALERT_MESSAGES,
  createDefaultErrorHandler,
} from "../utils/errorHandler";

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
    navigate,
    redirectPath,
  }: {
    setToken: (token: string) => void;
    navigate: NavigateFunction;
    redirectPath?: string | null;
  }) => ({
    mutationKey: [...loginQueries.all(), "login"],
    mutationFn: (kakaoId: number) => postLogin(kakaoId),
    onSuccess: (data: ILoginResponse) => {
      setToken(data.accessToken);
      const targetPath = redirectPath || "/";
      navigate(targetPath);
    },
    onError: createDefaultErrorHandler(ALERT_MESSAGES.LOGIN_FAILED),
  }),
};
