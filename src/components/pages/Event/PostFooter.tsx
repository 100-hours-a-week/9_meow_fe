import { UserItem } from "@/components/common";
import { IUserItem } from "@/components/common/UserItem";
import { Button } from "@/components/ui/button";

interface IEventPostFooter {
  postId: number;
  userInfo: IUserItem;
  likeCount: number;
  rank?: "1st" | "2nd" | "3rd" | "none";
}
export default function EventPostFooter({
  postId,
  userInfo,
  likeCount,
  rank = "none",
}: IEventPostFooter) {
  return (
    <div className="flex flex-row justify-between">
      <UserItem {...userInfo} size="sm" />
      <div className="flex flex-row gap-1 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            console.log("postId: ", postId);
          }}
        >
          <img src="/icon/paw.svg" alt="paw" />
        </Button>
        <p className="text-foreground text-xs">{likeCount}</p>
      </div>
    </div>
  );
}
