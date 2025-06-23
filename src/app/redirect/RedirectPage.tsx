import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useKakaoIdStore from "@/store/useKakaoIdStore";
import { useMutation } from "@tanstack/react-query";
import useTokenStore from "@/store/useTokenStore";
import { loginQueries } from "@/api/queries/loginQueries";

export default function RedirectPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const { setKakaoId } = useKakaoIdStore();
  const { token, setToken } = useTokenStore();

  const { mutate: login } = useMutation({
    ...loginQueries.login({ setToken, navigate, redirectPath: state }),
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
      const redirectPath = state || "/";
      navigate(redirectPath);
    }
  }, [token, navigate, state]);

  return <div>♧ 리디렉션 중이다옹...</div>;
}
