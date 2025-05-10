export interface ILoginCode {
  code: string;
}

export interface IKakaoAuthResponse {
  kakaoId: number;
  isMember: boolean;
}

export interface ISignupResponse {
  message: string;
  data: {
    kakaoId: number;
  };
}

export interface ILoginResponse {
  accessToken: string;
}

export interface IUserRequest {
  kakaoId: number;
  nickname: string;
  animalType: string;
  profileImage: File | null;
}
