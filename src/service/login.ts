import defaultInstance from "./instance/defaultInstance";

export const getKakaoUrl = async () => {
  const response = await defaultInstance.get("/auth/url");
  return response.data;
};

export const getLoginId = async (code: string) => {
  const response = await defaultInstance.get("/auth/kakao/callback", {
    params: {
      code,
    },
  });
  return response.data;
};
