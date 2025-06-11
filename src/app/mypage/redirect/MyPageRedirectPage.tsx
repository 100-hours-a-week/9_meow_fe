import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/api/queries/userQueries";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPageRedirectPage() {
  const navigate = useNavigate();
  const { data: userIdData } = useQuery({
    ...userQueries.userId(),
  });

  useEffect(() => {
    if (userIdData) {
      navigate(`/member/${userIdData.userId}`);
    }
  }, [userIdData, navigate]);

  return <div>마이페이지로 이동 중입니다냥...</div>;
}
