import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">페이지를 찾을 수 없습니다.</p>
      <Link to="/">
        <Button variant="primarySolid">홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
