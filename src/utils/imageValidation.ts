import { ValidationReturnType } from "@/types/ValidationReturnType";

const RESTRICTED_EXTENSIONS = [".heic", ".gif", ".webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const validateImageFile = (file: File): ValidationReturnType => {
  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.substring(fileName.lastIndexOf("."));

  if (RESTRICTED_EXTENSIONS.includes(fileExtension)) {
    return {
      isValid: false,
      message: `HEIC, GIF, WEBP 형식은 지원하지 않는다냥`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      message: `이미지 크기는 10MB를 넘을 수 없다냥`,
    };
  }

  return { isValid: true, message: "" };
};
