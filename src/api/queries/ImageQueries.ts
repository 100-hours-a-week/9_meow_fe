import { AxiosError } from "axios";
import { uploadImageToS3 } from "../image";
import { IError } from "../types/common";
import { UseMutationOptions } from "@tanstack/react-query";
import {
  ALERT_MESSAGES,
  createDefaultErrorHandler,
} from "../utils/errorHandler";

export const imageQueries = {
  all: () => ["image"] as const,

  uploadImageToS3: (): UseMutationOptions<
    string,
    AxiosError<IError>,
    File
  > => ({
    mutationKey: [...imageQueries.all(), "uploadImageToS3"],
    mutationFn: async (file: File) => {
      const url = await uploadImageToS3({ file });
      return url;
    },
    onError: createDefaultErrorHandler(ALERT_MESSAGES.IMAGE_UPLOAD_FAILED),
  }),
};
