import KakaoLoginIcon from "/loginButton/kakao_login_large_narrow.png";

export default function LoginButton() {
  return (
    <button
      onClick={() => console.log("카카오 로그인 clicked")}
      className="relative"
    >
      <img src={KakaoLoginIcon} alt="카카오 로그인" />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-amber-400/20 cursor-pointer rounded-[12px] z-5"></div>
    </button>
  );
}
