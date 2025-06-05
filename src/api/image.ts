import defaultInstance from "./instance/defaultInstance";
import { IImagePreSignedUrlRequest } from "./types";

export const getPreSignedUrl = async ({
  fileName,
  fileType,
}: IImagePreSignedUrlRequest) => {
  const response = await defaultInstance.post("/presigned-url", {
    fileName,
    fileType,
  });

  const data = response.data;
  if (!data.url || !data.key) {
    throw new Error("Pre-signed URL 발급 실패");
  }

  return data;
};
