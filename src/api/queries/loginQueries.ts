import { queryOptions } from "@tanstack/react-query";
import { IKakaoAuthResponse, ILoginCode, ILoginResponse } from "@/api/types";
import { getKakaoId, getKakaoUrl, postLogin } from "@/api/login";

export const loginQueries = {
  all: () => ["login"] as const,

  kakaoUrl: () =>
    queryOptions<string>({
      queryKey: [...loginQueries.all(), "kakaoUrl"],
      queryFn: () => getKakaoUrl(),
    }),

  kakaoId: ({ setKakaoId }: { setKakaoId: (kakaoId: number) => void }) => ({
    mutationKey: [...loginQueries.all(), "kakaoId"],
    mutationFn: ({ code }: ILoginCode) => getKakaoId(code),
    onSuccess: (data: IKakaoAuthResponse) => {
      setKakaoId(data.kakaoId);
    },
    onError: (error: { response: { data: { kakaoId: number } } }) => {
      // TEMP : 임시 코드임. 401 뜨는 에러 해결되면 제거해야함!
      if (error.response.data.kakaoId) {
        setKakaoId(error.response.data.kakaoId);
      }
    },
  }),

  login: ({ setToken }: { setToken: (token: string) => void }) => ({
    mutationKey: [...loginQueries.all(), "login"],
    mutationFn: (kakaoId: number) => postLogin(kakaoId),
    onSuccess: (data: ILoginResponse) => {
      setToken(data.accessToken);
    },
    onError: (error: Error) => {
      console.error("Login failed:", error);
      alert("로그인에 실패했다옹... 다시 시도해달라옹");
    },
  }),
};
