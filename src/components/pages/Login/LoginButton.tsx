import { useQuery } from "@tanstack/react-query";
import KakaoLoginIcon from "/loginButton/kakao_login_medium_narrow.png";
import { loginQueries } from "@/api/queries/loginQueries";
import { useLocation } from "react-router-dom";

interface LoginButtonProps {
  redirectPath?: string | null;
}

export default function LoginButton({ redirectPath }: LoginButtonProps) {
  const { data: kakaoUrl } = useQuery(loginQueries.kakaoUrl());
  const location = useLocation();

  return (
    <button
      onClick={() => {
        if (kakaoUrl) {
          const state = redirectPath || location.pathname + location.search;
          const loginUrl = new URL(kakaoUrl);
          loginUrl.searchParams.set("state", state);
          window.location.href = loginUrl.toString();
        }
      }}
      className="relative"
    >
      <img src={KakaoLoginIcon} alt="카카오 로그인" />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-amber-400/20 cursor-pointer rounded-[12px] z-5"></div>
    </button>
  );
}
