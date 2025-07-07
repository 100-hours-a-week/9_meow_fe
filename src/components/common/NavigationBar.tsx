import { userQueries } from "@/api/queries/userQueries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useTokenStore from "@/store/useTokenStore";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import {
  PartyPopper,
  HomeIcon,
  MessageCircleIcon,
  PlusIcon,
} from "lucide-react";

function renderIconButton(
  route: string,
  icon: React.ReactNode,
  onClick?: () => void,
) {
  return (
    <Link to={route} onClick={onClick}>
      <Button variant="ghost">{icon}</Button>
    </Link>
  );
}

export default function NavigationBar({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const location = useLocation();
  const { token } = useTokenStore();
  const { data: profileImage } = useQuery({
    ...userQueries.userProfileImage(),
  });

  const handleScrollToTop = ({ pathname }: { pathname: string }) => {
    // 현재 홈 페이지에 있는 경우에만 스크롤을 맨 위로 올림
    if (location.pathname === pathname) {
      // 직접 스크롤 컨테이너에 접근하여 스크롤을 맨 위로 올림
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="flex justify-between items-center border-t border-border/30 px-5 py-1 fixed bottom-0 w-full bg-background max-w-[430px] mx-auto">
      {renderIconButton(
        "/",
        <HomeIcon className="stroke-foreground size-6" />,
        () => handleScrollToTop({ pathname: "/" }),
      )}
      {renderIconButton(
        "/event",
        <PartyPopper className="stroke-foreground size-6" />,
      )}
      {renderIconButton(
        "/create",
        <PlusIcon className="stroke-foreground size-6" />,
      )}
      {renderIconButton(
        "/chat",
        <MessageCircleIcon className="stroke-foreground size-6" />,
      )}
      {renderIconButton(
        token
          ? "/mypage/redirect"
          : `/login?redirect=${encodeURIComponent(location.pathname)}`,
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
