import { eventQueries } from "@/api/queries/eventQueries";
import { EventSubmitForm } from "@/components/pages";
import useTokenStore from "@/store/useTokenStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EventSubmitPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const { token } = useTokenStore();

  const { data: topicData } = useQuery({
    ...eventQueries.topic({ week: Number(eventId) }),
  });
  const { data: hasSubmittedData } = useQuery({
    ...eventQueries.hasSubmitted(),
  });

  useEffect(() => {
    if (!token) {
      if (
        window.confirm("로그인 해야 이벤트 신청이 가능하다옹. 로그인 하겠냐옹?")
      ) {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      } else {
        navigate("/event");
      }
    }
  }, [token, navigate, location.pathname]);

  useEffect(() => {
    if (hasSubmittedData?.hasApplied) {
      alert("이미 신청했다옹");
      navigate("/event");
    }
  }, [hasSubmittedData, navigate]);

  return (
    <div className="w-full px-6 pb-2 flex flex-col gap-3 items-center">
      <div className="flex flex-col gap-2 items-center mt-5">
        <p className="text-2xl md:text-4xl">
          ¢ 제 {eventId}회 미스코리냥 신청 ♧
        </p>
        <p className="text-xl md:text-2xl">주제 : {topicData?.topic}</p>
      </div>
      <div className="flex flex-col gap-0 items-start text-sm md:text-base">
        <p>• 한번 사진 제출하면 바꿀 수 없다냥</p>
        <p>• 사진은 위 아래나 양옆이 잘릴 수도 있다냥</p>
      </div>
      <EventSubmitForm />
    </div>
  );
}
