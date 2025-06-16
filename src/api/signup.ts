import defaultInstance from "./instance/defaultInstance";
import { ISignupUserRequest } from "./types/signup";

export const postUsers = async (user: ISignupUserRequest) => {
  const response = await defaultInstance.post("/users", user);
  return response.data;
};

export const getDuplicateNickname = async (nickname: string) => {
  const response = await defaultInstance.get<boolean>(
    `/users/check-nickname?nickname=${nickname}`,
  );
  return response.data;
};
