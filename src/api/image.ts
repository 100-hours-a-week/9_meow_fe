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

export const uploadToS3 = async ({
  url,
  file,
}: {
  url: string;
  file: File;
}) => {
  const response = await defaultInstance.put(url, {
    data: file,
    headers: { "Content-Type": file.type },
  });

  return response.data;
};

export const uploadImageToS3 = async (file: File): Promise<string> => {
  // 1) Pre-signed URL 요청
  const { url, key } = await getPreSignedUrl({
    fileName: file.name,
    fileType: file.type,
  });

  // 2) Pre-signed URL로 PUT 요청(실제 업로드)
  await uploadToS3({ url, file });

  // 3) 업로드된 S3 경로 구성
  const bucketName = process.env.VITE_S3_BUCKET_NAME;
  const region = process.env.VITE_AWS_REGION;
  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
};
