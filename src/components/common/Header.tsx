import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex py-2.5 px-2 items-center justify-between gap-2.5 border-b border-border/30 sticky top-0 w-full bg-background z-10">
      <div
        className="flex gap-2.5 items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo.png" alt="logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">미야옹</h1>
      </div>
      {/* TODO : 알림기능 추가되면 주석 해제!
       <div className="relative">
        <img src="/icon/notification.svg" alt="notification" className="w-6" />
        <div className="flex items-center justify-center absolute bg-destructive w-3 h-3 rounded-full -top-1 -right-1 text-xs text-background/80">
          3
        </div>
      </div> */}
    </div>
  );
}
