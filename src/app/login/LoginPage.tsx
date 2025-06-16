import { LoginButton, LogoutButton } from "@/components/pages";
import useTokenStore from "@/store/useTokenStore";

export default function LoginPage() {
  const { token } = useTokenStore();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
      <h2 className="text-3xl">£ 어서오라옹 ¢</h2>
      {!token && <LoginButton />}
      {token && <LogoutButton />}
    </div>
  );
}
