import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useKakaoIdStore from "@/store/useKakaoIdStore";
import { useMutation } from "@tanstack/react-query";
import useTokenStore from "@/store/useTokenStore";
import { loginQueries } from "@/api/queries/loginQueries";

export default function RedirectPage() {
  const navigate = useNavigate();
  const setKakaoId = useKakaoIdStore((state) => state.setKakaoId);
  const { token, setToken } = useTokenStore();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const {
    mutate: getKakao,
    data: kakaoData,
    isSuccess: isKakaoSuccess,
  } = useMutation({
    ...loginQueries.kakaoId({ setKakaoId }),
  });

  const { mutate: login } = useMutation({
    ...loginQueries.login({ setToken }),
  });

  useEffect(() => {
    if (code) {
      getKakao({ code });

      if (isKakaoSuccess && kakaoData?.isMember) {
        login(kakaoData.kakaoId);
        navigate("/");
      } else {
        navigate("/signup");
      }
    }
  }, [code, getKakao, kakaoData, navigate, setKakaoId, login, isKakaoSuccess]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return <div>♧ 리디렉션 중이다옹...</div>;
}
