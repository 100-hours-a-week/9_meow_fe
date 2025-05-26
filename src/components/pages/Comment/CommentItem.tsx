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
    <div className="flex flex-col gap-2 w-full p-2 rounded-lg border-b border-orange-950/10">
      <div className="flex flex-row gap-2 w-full justify-between text-orange-950/30 text-sm">
        <UserItem {...userInfo} />
        <div>{convertTimestamp(timestamp)}</div>
      </div>
      <div className="pl-7">{content}</div>
    </div>
  );
}
