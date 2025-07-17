import UserItem, { IUserItem } from "@/components/common/UserItem";
import { convertTimestamp } from "@/utils/convertTimestamp";

interface ICommentItem {
  userInfo: IUserItem;
  timestamp: Date;
  content: string;
}

export default function CommentItem({
  userInfo,
  timestamp,
  content,
}: ICommentItem) {
  return (
    <div className="flex flex-row gap-5 w-full justify-start items-start border-b border-muted-foreground/20 px-2 py-1 break-all">
      <UserItem {...userInfo} size="sm" />
      <div className="text-sm flex-1 text-foreground">{content}</div>
      <div className="text-xs text-muted-foreground self-start">
        {convertTimestamp(timestamp)}
      </div>
    </div>
  );
}
