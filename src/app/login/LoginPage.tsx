import { LoginButton, LogoutButton } from "@/components/pages";
import useTokenStore from "@/store/useTokenStore";
import { useSearchParams } from "react-router-dom";

export default function LoginPage() {
  const { token } = useTokenStore();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
      <h2 className="text-3xl">£ 어서오라옹 ¢</h2>
      {!token && <LoginButton redirectPath={redirect} />}
      {token && <LogoutButton />}
    </div>
  );
}
