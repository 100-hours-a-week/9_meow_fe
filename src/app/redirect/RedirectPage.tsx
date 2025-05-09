import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useLoginMutation from "@/hooks/mutations/useLoginMutation";
import useKakaoIdStore from "@/store/useKakaoIdStore";

export default function RedirectPage() {
  const navigate = useNavigate();
  const setKakaoId = useKakaoIdStore((state) => state.setKakaoId);

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const { mutate: login, data } = useLoginMutation();

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
