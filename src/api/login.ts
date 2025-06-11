import defaultInstance from "./instance/defaultInstance";
import { IKakaoAuthResponse } from "./types/login";

export const getKakaoUrl = async () => {
  const response = await defaultInstance.get("/auth/url");
  return response.data;
};

export const getKakaoId = async (code: string) => {
  const response = await defaultInstance.get<IKakaoAuthResponse>(
    "/auth/kakao/callback",
    {
      params: {
        code,
      },
    },
  );
  return response.data;
};

export const postLogin = async (kakaoId: number) => {
  const response = await defaultInstance.post(
    "/auth/login",
    {
      kakaoId,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const postRefresh = async () => {
  const response = await defaultInstance.post("/auth/refresh", null, {
    withCredentials: true,
  });
  return response.data;
};
