import authInstance from "./instance/authInstance";
import {
  IProfileInfoResponse,
  IUserIdResponse,
  IUserProfileImageResponse,
} from "./types/user";

export const getUserProfileImage = async () => {
  const response = await authInstance.get<IUserProfileImageResponse>(
    "/users/profileimage",
  );
  return response.data;
};

export const getUserId = async () => {
  const response = await authInstance.get<IUserIdResponse>("/users/my-profile");
  return response.data;
};

export const getProfileInfo = async ({ userId }: { userId: number }) => {
  const response = await authInstance.get<IProfileInfoResponse>(
    `/users/profile/${userId}`,
  );
  return response.data;
};
