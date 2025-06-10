import { ProfileSummary } from "@/components/pages";
import { useParams } from "react-router-dom";

export default function MemberPage() {
  const { memberId } = useParams();

  return (
    <div className="flex flex-col gap-4 items-center">
      <ProfileSummary memberId={Number(memberId)} />
    </div>
  );
}
