import { useQuery } from "@tanstack/react-query";
import KakaoLoginIcon from "/loginButton/kakao_login_medium_narrow.png";
import { loginQueries } from "@/api/queries/loginQueries";

export default function LoginButton() {
  const { data: kakaoUrl } = useQuery(loginQueries.kakaoUrl());

  return (
    <button
      onClick={() => {
        if (kakaoUrl) {
          window.location.href = kakaoUrl;
        }
      }}
      className="relative"
    >
      <img src={KakaoLoginIcon} alt="카카오 로그인" />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-amber-400/20 cursor-pointer rounded-[12px] z-5"></div>
    </button>
  );
}
