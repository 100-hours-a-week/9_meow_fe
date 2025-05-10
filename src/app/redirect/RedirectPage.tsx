import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useKakaoIdStore from "@/store/useKakaoIdStore";
import { useMutation } from "@tanstack/react-query";
import { ILoginCode, IKakaoAuthResponse } from "@/types/Login";
import { getKakaoId } from "@/service/login";

export default function RedirectPage() {
  const navigate = useNavigate();
  const setKakaoId = useKakaoIdStore((state) => state.setKakaoId);

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

  useEffect(() => {
    if (code) {
      getKakao({ code });

      if (data?.isMember) {
        navigate("/");
      } else {
        navigate("/signup");
      }
    }
  }, [code, getKakao, data, navigate, setKakaoId]);

  return <div>♧ 리디렉션 중이다옹...</div>;
}
