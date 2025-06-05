import { AxiosError } from "axios";
import { getPreSignedUrl, uploadToS3 } from "../image";
import {
  IError,
  IImagePreSignedUrlRequest,
  IImagesPreSignedUrlResponse,
  IUploadImageToS3,
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

  upload: ({
    key,
  }: {
    key: string;
  }): UseMutationOptions<string, AxiosError<IError>, IUploadImageToS3> => ({
    mutationKey: [...imageQueries.all(), "upload"],
    mutationFn: ({ url, file }) => uploadToS3({ url, file }),
    onSuccess: () => {
      const bucketName = process.env.VITE_S3_BUCKET_NAME;
      const region = process.env.VITE_AWS_REGION;
      return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    },
  }),
};
