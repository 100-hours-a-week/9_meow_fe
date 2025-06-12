import { AxiosError } from "axios";
import { uploadImageToS3 } from "../image";
import { IError } from "../types/common";
import { UseMutationOptions } from "@tanstack/react-query";

export const imageQueries = {
  all: () => ["image"] as const,

  uploadImageToS3: (): UseMutationOptions<
    string,
    AxiosError<IError>,
    File
  > => ({
    mutationKey: [...imageQueries.all(), "getPreSignedUrl"],
    mutationFn: async (file: File) => {
      const url = await uploadImageToS3({ file });
      return url;
    },
    onError: (error: AxiosError<IError>) => {
      if (error.response?.status !== 401) {
        alert("이미지 업로드에 실패했다옹. 잠시 후 다시 시도해보냥");
      }
    },
  }),
};
