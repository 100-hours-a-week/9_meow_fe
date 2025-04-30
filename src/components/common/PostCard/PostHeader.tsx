import UserItem, { IUserItem } from "../UserItem";

interface IPostHeader {
  userInfo: IUserItem;
}

export default function PostHeader({ userInfo }: IPostHeader) {
  return (
    <div className="flex flex-row items-center justify-between">
      <UserItem {...userInfo} />
      {/* TODO : 사용자의 게시글인지에 따라 옵션 아이콘, context menu 추가 */}
      {/* <img src="/icon/dots-vertical.svg" alt="options" /> */}
    </div>
  );
}
