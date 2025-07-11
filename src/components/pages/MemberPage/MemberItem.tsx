import { UserItem } from "@/components/common";
import { IUserItem } from "@/components/common/UserItem";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface IMemberItem {
  userInfo: IUserItem;
}

export default function MemberItem({ userInfo }: IMemberItem) {
  const navigate = useNavigate();
  return (
    <Button
      variant="primaryOutline"
      className="w-full border border-foreground/30 rounded-xl py-8 flex flex-row items-center justify-between"
      onClick={() => {
        navigate(`/member/${userInfo.userId}`);
      }}
      aria-label="회원 페이지로 이동"
    >
      <UserItem {...userInfo} />
    </Button>
  );
}
