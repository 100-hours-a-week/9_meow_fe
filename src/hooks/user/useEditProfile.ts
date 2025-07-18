import { imageQueries } from "@/api/queries/ImageQueries";
import { userQueries } from "@/api/queries/userQueries";
import { ApiAnimalType } from "@/types/animal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useEditProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: editProfileInfo } = useQuery({
    ...userQueries.editProfileInfo(),
  });

  const { mutateAsync: uploadImageToS3, isPending: isUploading } = useMutation({
    ...imageQueries.uploadImageToS3(),
  });

  const { mutate: editProfile, isPending: isEditProfilePending } = useMutation({
    ...userQueries.editProfile({ navigate, queryClient }),
  });

  const { mutate: deleteProfile } = useMutation({
    ...userQueries.deleteProfile({ navigate }),
  });

  const handleSubmit = async ({
    nickname,
    animalType,
    selectedImage,
    initialImage,
  }: {
    nickname: string;
    animalType: ApiAnimalType;
    selectedImage: File | string | null;
    initialImage: string;
  }) => {
    try {
      const imageUrl =
        selectedImage instanceof File
          ? await uploadImageToS3(selectedImage)
          : ((selectedImage || initialImage) ?? undefined);

      editProfile({
        nickname,
        profileImageUrl: imageUrl,
        postType: animalType,
      });
    } catch (error) {
      alert("프로필 수정에 실패했다옹");
      console.error(error);
    }
  };

  const handleDeleteProfile = () => {
    if (window.confirm("정말 탈퇴할거냥?")) {
      deleteProfile();
    }
  };

  return {
    editProfileInfo,
    handleSubmit,
    isEditProfilePending,
    isUploading,
    handleDeleteProfile,
  };
};
