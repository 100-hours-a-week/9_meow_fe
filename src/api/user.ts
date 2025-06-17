import authInstance from "./instance/authInstance";
import defaultInstance from "./instance/defaultInstance";
import {
  IEditProfileInfoResponse,
  IEditProfileRequest,
  IFollowerDataPagination,
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
  const response = await defaultInstance.get<IProfileInfoResponse>(
    `/users/profile/${userId}`,
  );
  return response.data;
};

export const getEditProfileInfo = async () => {
  const response = await authInstance.get<IEditProfileInfoResponse>(
    "/users/edit-profile",
  );
  return response.data;
};

export const editProfile = async ({
  nickname,
  profileImageUrl,
  postType,
}: IEditProfileRequest) => {
  const response = await authInstance.patch("/users", {
    nickname,
    profileImageUrl,
    postType,
  });
  return response.data;
};

export const deleteProfile = async () => {
  const response = await authInstance.delete("/users");
  return response.data;
};

export const postFollow = async ({ userId }: { userId: number }) => {
  const response = await authInstance.post(`/users/follow/${userId}`);
  return response.data;
};

export const deleteFollow = async ({ userId }: { userId: number }) => {
  const response = await authInstance.delete(`/users/follow/${userId}`);
  return response.data;
};

export const getFollowerList = async ({
  userId,
  page,
  size,
}: {
  userId: number;
  page: number;
  size: number;
}) => {
  const response = await defaultInstance.get<IFollowerDataPagination>(
    `/users/${userId}/followers`,
    { params: { page, size } },
  );
  return response.data;
};

export const getFollowingList = async ({
  userId,
  page,
  size,
}: {
  userId: number;
  page: number;
  size: number;
}) => {
  const response = await defaultInstance.get<IFollowerDataPagination>(
    `/users/${userId}/followings`,
    { params: { page, size } },
  );
  return response.data;
};
