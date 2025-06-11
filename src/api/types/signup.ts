export interface ISignupUserRequest {
  kakaoId: number;
  nickname: string;
  animalType: string;
  profileImage: File | null;
}
