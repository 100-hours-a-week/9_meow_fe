import { userQueries } from "@/api/queries/userQueries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useTokenStore from "@/store/useTokenStore";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import HomeIcon from "@/assets/icon/home.svg?react";
import PlusIcon from "@/assets/icon/plus.svg?react";

function renderIconButton(route: string, icon: React.ReactNode) {
  return (
    <Link to={route}>
      <Button variant="ghost">{icon}</Button>
    </Link>
  );
}

export default function NavigationBar() {
  const { token } = useTokenStore();
  const { data: profileImage } = useQuery({
    ...userQueries.userProfileImage(),
  });

  return (
    <div className="flex justify-between items-center border-t border-border/30 px-5 py-1 fixed bottom-0 w-full bg-background max-w-[430px] mx-auto">
      {renderIconButton("/", <HomeIcon className="fill-foreground size-6" />)}
      {/* {renderIconButton("/calendar", <img src="/icon/calendar.svg" alt="calendar" />)} */}
      {renderIconButton(
        "/create",
        <PlusIcon className="stroke-foreground size-6" />,
      )}
      {/* {renderIconButton("/chat", <img src="/icon/chat.svg" alt="chat" />)} */}
      {renderIconButton(
        token ? "/mypage/redirect" : "/login",
        <Avatar
          className={cn(
            "border border-muted-foreground",
            !token && "bg-foreground",
          )}
        >
          <AvatarImage
            src={token ? profileImage?.profileImageUrl : "/logo.svg"}
          />
          <AvatarFallback>미야옹</AvatarFallback>
        </Avatar>,
      )}
    </div>
  );
}
