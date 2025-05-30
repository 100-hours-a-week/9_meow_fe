import ContextMenu from "../ContextMenu";
import UserItem, { IUserItem } from "../UserItem";

interface IPostHeader {
  userInfo: IUserItem;
}

export default function PostHeader({ userInfo }: IPostHeader) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <UserItem {...userInfo} />
      <ContextMenu />
    </div>
  );
}
