import { userQueries } from "@/api/queries/userQueries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useTokenStore from "@/store/useTokenStore";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function renderIconButton(route: string, icon: React.ReactNode) {
  return (
    <Link to={route}>
      <Button variant="ghost">{icon}</Button>
    </Link>
  );
}

export default function NavigationBar() {
  const { data: profileImage } = useQuery({
    ...userQueries.getUserProfileImage(),
  });
  const { token } = useTokenStore();

  return (
    <div className="flex justify-between items-center border-t border-border/30 px-5 py-1 fixed bottom-0 w-full bg-background max-w-[430px] mx-auto">
      {renderIconButton("/", <img src="/icon/home.svg" alt="home" />)}
      {/* {renderIconButton("/calendar", <img src="/icon/calendar.svg" alt="calendar" />)} */}
      {renderIconButton("/create", <img src="/icon/plus.svg" alt="plus" />)}
      {/* {renderIconButton("/chat", <img src="/icon/chat.svg" alt="chat" />)} */}
      {renderIconButton(
        token ? "/mypage" : "/login",
        <Avatar>
          <AvatarImage src={profileImage?.profileImageUrl ?? "/logo.svg"} />
          <AvatarFallback>미야옹</AvatarFallback>
        </Avatar>,
      )}
    </div>
  );
}
