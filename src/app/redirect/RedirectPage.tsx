import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useKakaoIdStore from "@/store/useKakaoIdStore";
import { useMutation } from "@tanstack/react-query";
import useTokenStore from "@/store/useTokenStore";
import { loginQueries } from "@/api/queries/loginQueries";

export default function RedirectPage() {
  const navigate = useNavigate();
  const { setKakaoId } = useKakaoIdStore();
  const { token, setToken } = useTokenStore();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const { mutate: login } = useMutation({
    ...loginQueries.login({ setToken, navigate }),
  });

  const { mutate: getKakao } = useMutation({
    ...loginQueries.kakaoId({ setKakaoId, login, navigate }),
  });

  useEffect(() => {
    if (code) {
      getKakao({ code });
    }
  }, [code, getKakao]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return <div>♧ 리디렉션 중이다옹...</div>;
}
