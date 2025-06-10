import { useParams } from "react-router-dom";

export default function MemberPage() {
  const { memberId } = useParams();

  return <div>MemberPage memberId: {memberId}</div>;
}
