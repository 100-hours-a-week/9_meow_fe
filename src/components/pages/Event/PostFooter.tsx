import { UserItem } from "@/components/common";
import { IUserItem } from "@/components/common/UserItem";
import { Button } from "@/components/ui/button";

interface IEventPostFooter {
  postId: number;
  userInfo: IUserItem;
  likeCount: number;
}

export default function EventPostFooter({
  postId,
  userInfo,
  likeCount,
}: IEventPostFooter) {
  return (
    <div className="flex flex-row justify-between">
      <UserItem {...userInfo} size="sm" />
      <Button
        variant="ghost"
        size="icon"
        className="flex flex-row gap-1 items-center"
        onClick={() => {
          console.log("postId: ", postId);
        }}
      >
        <img src="/icon/paw.svg" alt="paw" />
        <p className="text-foreground text-xs">{likeCount}</p>
      </Button>
    </div>
  );
}
