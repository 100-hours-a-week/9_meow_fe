import { AxiosError } from "axios";
import { getPreSignedUrl } from "../image";
import {
  IError,
  IImagePreSignedUrlRequest,
  IImagesPreSignedUrlResponse,
} from "../types";
import { UseMutationOptions } from "@tanstack/react-query";

export const imageQueries = {
  all: () => ["image"] as const,

  getPreSignedUrl: (): UseMutationOptions<
    IImagesPreSignedUrlResponse,
    AxiosError<IError>,
    IImagePreSignedUrlRequest
  > => ({
    mutationKey: [...imageQueries.all(), "getPreSignedUrl"],
    mutationFn: ({ fileName, fileType }: IImagePreSignedUrlRequest) =>
      getPreSignedUrl({ fileName, fileType }),
    onSuccess: (data: IImagesPreSignedUrlResponse) => {
      console.log(data);
    },
    onError: (error: AxiosError<IError>) => {
      if (error.response?.status !== 401) {
        alert("이미지 업로드에 실패했다옹. 잠시 후 다시 시도해보냥");
      }
    },
  }),
};
