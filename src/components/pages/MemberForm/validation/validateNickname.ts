import { ValidationReturnType } from "@/types/ValidationReturnType";

export const validateNickname = (nickname: string): ValidationReturnType => {
  const emojiRegex = /[\p{Emoji}]/u;
  if (!nickname.trim()) {
    return { isValid: false, message: "닉네임을 입력해주세요" };
  } else if (emojiRegex.test(nickname)) {
    return { isValid: false, message: "이모지 없이 적어달라옹" };
  } else if (nickname.length < 3) {
    return { isValid: false, message: "닉네임은 3자 이상이어야 한다옹" };
  } else if (nickname.length > 15) {
    return { isValid: false, message: "닉네임은 15자 이하여야 한다옹" };
  }
  return { isValid: true, message: "" };
};
