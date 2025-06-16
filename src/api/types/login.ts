export interface ILoginCode {
  code: string;
}

export interface IKakaoAuthResponse {
  kakaoId: number;
  isMember: boolean;
}

export interface ILoginResponse {
  accessToken: string;
}
