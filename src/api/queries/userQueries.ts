import { UseMutationOptions } from "@tanstack/react-query";
import { getUserProfileImage } from "../user";
import { IUserProfileImageResponse } from "../types";

export const userQueries = {
  all: () => ["user"] as const,

  getUserProfileImage: ({
    setProfileImage,
  }: {
    setProfileImage: (profileImage: string) => void;
  }): UseMutationOptions<IUserProfileImageResponse, Error, void> => ({
    mutationKey: [...userQueries.all(), "getUserProfileImage"],
    mutationFn: getUserProfileImage,
    onSuccess: (data: IUserProfileImageResponse) => {
      setProfileImage(data.profileImageUrl);
    },
  }),
};
