import defaultInstance from "./instance/defaultInstance";
import { s3Instance } from "./instance/s3Instance";

export const uploadImageToS3 = async ({
  file,
}: {
  file: File;
}): Promise<string> => {
  const presignedUrlResponse = await defaultInstance.post("/presigned-url", {
    fileName: file.name,
    fileType: file.type,
  });

  const data = presignedUrlResponse.data;
  if (!data.url || !data.key) {
    throw new Error("Pre-signed URL 발급 실패");
  }

  const response = await s3Instance.put(data.url, file, {
    headers: { "Content-Type": file.type },
  });

  if (response.status !== 200) {
    throw new Error("이미지 업로드 실패");
  }

  return data.key;
};