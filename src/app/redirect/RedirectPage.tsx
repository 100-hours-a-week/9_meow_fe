import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useLoginMutation from "@/hooks/mutations/useLoginMutation";

export default function RedirectPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const { mutate: login, data } = useLoginMutation();

  useEffect(() => {
    if (code) {
      login({ code });
      if (data?.isMember) {
        navigate("/");
      } else {
        navigate("/signup");
      }
    }
  }, [code, login, data, navigate]);

  return <div>♧ 리디렉션 중이다옹...</div>;
}
