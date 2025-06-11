import { create } from "zustand";

interface IUserProfileImageState {
  profileImage: string | null;
  setProfileImage: (profileImage: string) => void;
}

const useUserProfileImageStore = create<IUserProfileImageState>((set) => ({
  profileImage: null,
  setProfileImage: (profileImage: string) => set({ profileImage }),
}));

export default useUserProfileImageStore;
