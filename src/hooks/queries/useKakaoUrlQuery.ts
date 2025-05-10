import { getKakaoUrl } from "@/api/login";
import { useQuery } from "@tanstack/react-query";

export const useKakaoUrlQuery = () => {
  const fetchKakaoUrl = async () => {
    const response = await getKakaoUrl();
    return response;
  };

  return useQuery<string, Error>({
    queryKey: ["kakaoUrl"],
    queryFn: fetchKakaoUrl,
  });
};
