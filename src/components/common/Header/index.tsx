import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div
      className="flex p-1 py-2.5 items-center gap-2.5 border-b border-border/30"
      onClick={() => navigate("/")}
    >
      <img src="/logo.svg" alt="logo" className="w-10" />
      <h1 className="text-2xl font-bold">미야옹</h1>
    </div>
  );
}
