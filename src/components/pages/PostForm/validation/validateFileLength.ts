export const MAX_IMAGES = 3;

export const validateFileLength = (
  totalImages: number
): { isValid: boolean; message: string } => {
  if (totalImages > MAX_IMAGES) {
    return {
      isValid: false,
      message: `이미지는 최대 ${MAX_IMAGES}장까지 선택할 수 있다냥`,
    };
  }
  return { isValid: true, message: "" };
};
