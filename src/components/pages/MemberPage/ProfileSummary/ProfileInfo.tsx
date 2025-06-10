interface IProfileInfo {
  postCount: number;
  followerCount: number;
  followingCount: number;
}

export default function ProfileInfo({
  postCount,
  followerCount,
  followingCount,
}: IProfileInfo) {
  return (
    <div className="w-full flex flex-row gap-12 justify-center border-t border-b border-foreground/30 py-3">
      <div className="flex flex-col items-center">
        <p className="text-base">{postCount}</p>
        <p className="text-xs text-foreground/50">Post</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-base">{followerCount}</p>
        <p className="text-xs text-foreground/50">Follower</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-base">{followingCount}</p>
        <p className="text-xs text-foreground/50">Following</p>
      </div>
    </div>
  );
}
