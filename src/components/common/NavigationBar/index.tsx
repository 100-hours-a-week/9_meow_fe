import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function renderIconButton(route: string, icon: React.ReactNode) {
  return (
    <Link to={route}>
      <Button variant="ghost">{icon}</Button>
    </Link>
  );
}

function renderProfileImage(src?: string) {
  if (!src) {
    return (
      <Avatar>
        <AvatarImage src="/logo.svg" />
      </Avatar>
    );
  }
  return <img src={src} alt="profile" />;
}

export default function NavigationBar() {
  return (
    <div className="flex justify-between items-center border-t border-border/30 px-5 py-1 fixed bottom-0 w-full bg-background">
      {renderIconButton("/", <img src="/icon/home.svg" alt="home" />)}
      {/* {renderIconButton("/icon/calendar.svg", "calendar", "/event")} */}
      {renderIconButton("/create", <img src="/icon/plus.svg" alt="plus" />)}
      {/* {renderIconButton("/icon/chat.svg", "chat", "/chat")} */}
      {renderIconButton("/member", renderProfileImage())}
    </div>
  );
}
