import { LoginButton } from "@/components/pages";
import { TOKEN_KEY } from "@/store/useTokenStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    if (token) {
      alert("이미 로그인 되어 있다옹");
      navigate(-1);
    }
  }, [navigate, token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-10">
      <h2 className="text-4xl">£ 어서오라옹 ¢</h2>
      <LoginButton />
    </div>
  );
}
