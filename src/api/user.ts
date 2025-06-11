import authInstance from "./instance/authInstance";

export const getUserProfileImage = async () => {
  const response = await authInstance.get("/users/profileimage");
  return response.data;
};
