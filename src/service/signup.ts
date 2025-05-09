import formInstance from "./instance/formInstance";

export interface IUser {
  kakaoId: number;
  nickname: string;
  animalType: string;
  profileImage: File | null;
}

export const postUsers = async (user: IUser) => {
  const formData = new FormData();

  if (user.profileImage) {
    formData.append(`profileImage`, user.profileImage);
  }

  formData.append("kakaoId", user.kakaoId.toString());
  formData.append("nickname", user.nickname);
  formData.append("animalType", user.animalType);

  const response = await formInstance.post("/users", formData);
  return response.data;
};

export const getDuplicateNickname = async (nickname: string) => {
  const response = await formInstance.get(
    `/users/check-nickname?nickname=${nickname}`
  );
  return response.data;
};
