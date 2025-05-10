import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useKakaoIdStore from "@/store/useKakaoIdStore";
import { useMutation } from "@tanstack/react-query";
import { ILoginCode, ILoginId } from "@/types/Login";
import { getLoginId } from "@/service/login";

export default function RedirectPage() {
  const navigate = useNavigate();
  const setKakaoId = useKakaoIdStore((state) => state.setKakaoId);

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const { mutate: login, data } = useMutation<ILoginId, Error, ILoginCode>({
    mutationFn: ({ code }: ILoginCode) => getLoginId(code),
  });

  useEffect(() => {
    if (code) {
      login({ code });
      if (data?.kakaoId) {
        setKakaoId(data.kakaoId);
      }
      if (data?.isMember) {
        navigate("/");
      } else {
        navigate("/signup");
      }
    }
  }, [code, login, data, navigate, setKakaoId]);

  return <div>♧ 리디렉션 중이다옹...</div>;
}
