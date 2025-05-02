import { ValidationReturnType } from "@/types/ValidationReturnType";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export const validateFileSize = (file: File): ValidationReturnType => {
  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, message: `이미지 크기는 10MB를 넘을 수 없다냥` };
  }
  return { isValid: true, message: "" };
};
