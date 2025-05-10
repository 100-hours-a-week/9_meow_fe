import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useKakaoIdStore from "@/store/useKakaoIdStore";
import { useMutation } from "@tanstack/react-query";
import { ILoginCode, IKakaoAuthResponse } from "@/types/Login";
import { getKakaoId, postLogin } from "@/api/login";
import useTokenStore from "@/store/useTokenStore";

export default function RedirectPage() {
  const navigate = useNavigate();
  const setKakaoId = useKakaoIdStore((state) => state.setKakaoId);
  const setToken = useTokenStore((state) => state.setToken);

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const { mutate: getKakao, data } = useMutation<
    IKakaoAuthResponse,
    Error,
    ILoginCode
  >({
    mutationFn: ({ code }: ILoginCode) => getKakaoId(code),
    onSuccess: (data) => {
      setKakaoId(data.kakaoId);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: login } = useMutation({
    mutationFn: (kakaoId: number) => postLogin(kakaoId),
    onSuccess: (data) => {
      setToken(data.token);
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      alert("로그인에 실패했다옹... 다시 시도해달라옹");
    },
  });

  useEffect(() => {
    if (code) {
      getKakao({ code });

      if (data?.isMember) {
        navigate("/");
        login(data.kakaoId);
      } else {
        navigate("/signup");
      }
    }
  }, [code, getKakao, data, navigate, setKakaoId, login]);

  return <div>♧ 리디렉션 중이다옹...</div>;
}
