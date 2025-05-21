import { LoginButton, LogoutButton } from "@/components/pages";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
      <h2 className="text-3xl">£ 어서오라옹 ¢</h2>
      <LoginButton />
      <LogoutButton />
    </div>
  );
}
