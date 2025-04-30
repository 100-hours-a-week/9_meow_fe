import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex p-1 py-2.5 items-center justify-between gap-2.5 border-b border-border/30 sticky top-0 w-full bg-background z-10">
      <div
        className="flex gap-2.5 items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo.svg" alt="logo" className="w-10" />
        <h1 className="text-2xl font-bold">미야옹</h1>
      </div>
      <div className="relative">
        <img src="/icon/notification.svg" alt="notification" className="w-6" />
        <div className="flex items-center justify-center absolute bg-destructive w-3 h-3 rounded-full -top-1 -right-1 text-xs">
          3
        </div>
      </div>
    </div>
  );
}
