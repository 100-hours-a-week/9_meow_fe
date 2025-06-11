import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface IProfileInfo {
  userId: number;
  postCount: number;
  followerCount: number;
  followingCount: number;
}

export default function ProfileInfo({
  userId,
  postCount,
  followerCount,
  followingCount,
}: IProfileInfo) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-row gap-10 justify-center items-center border-t border-b border-foreground/30 py-1">
      <Button
        variant="ghost"
        className="flex flex-col items-center gap-0 w-16 h-full"
      >
        <p className="text-base">{postCount}</p>
        <p className="text-xs text-foreground/50">Post</p>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col items-center gap-0 w-16 h-full"
        onClick={() => {
          navigate(`/member/${userId}/follower`);
        }}
      >
        <p className="text-base">{followerCount}</p>
        <p className="text-xs text-foreground/50">Follower</p>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col items-center gap-0 w-16 h-full"
        onClick={() => {
          navigate(`/member/${userId}/following`);
        }}
      >
        <p className="text-base">{followingCount}</p>
        <p className="text-xs text-foreground/50">Following</p>
      </Button>
    </div>
  );
}
