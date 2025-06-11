import authInstance from "./instance/authInstance";

export const getUserProfileImage = async () => {
  const response = await authInstance.get("/users/profileimage");
  return response.data;
};

export const getUserId = async () => {
  const response = await authInstance.get("/users/my-profile");
  return response.data;
};

export const getProfileInfo = async ({ userId }: { userId: number }) => {
  const response = await authInstance.get(`/users/profile/${userId}`);
  return response.data;
};
