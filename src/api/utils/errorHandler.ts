import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { IError } from "../types/common";

export const ERROR_MESSAGES = {
  NO_TOKEN: "No token available",
} as const;

export const ALERT_MESSAGES = {
  LOGIN_REQUIRED: "로그인 해야 가능하다옹. 로그인 하겠냥?",
  FOLLOW_FAILED: "팔로우에 실패했다옹... 잠시 후 다시 시도해보라냥",
  UNFOLLOW_FAILED: "언팔로우에 실패했다옹... 잠시 후 다시 시도해보라냥",
  LIKE_FAILED: "좋아요에 실패했다옹... 잠시 후 다시 시도해보라냥",
  COMMENT_FAILED: "댓글 작성에 실패했다옹... 잠시 후 다시 시도해보라냥",
  IMAGE_UPLOAD_FAILED:
    "이미지 업로드에 실패했다옹... 잠시 후 다시 시도해보라냥",
  LOGIN_FAILED: "로그인에 실패했다옹... 잠시 후 다시 시도해보라냥",
  POST_CREATE_FAILED: "게시글 작성에 실패했다옹... 잠시 후 다시 시도해보라냥",
  POST_DELETE_FAILED: "게시글 삭제에 실패했다옹... 잠시 후 다시 시도해보라냥",
  POST_EDIT_FAILED: "게시글 수정에 실패했다옹... 잠시 후 다시 시도해보라냥",
  SIGNUP_FAILED: "회원가입에 실패했다옹... 잠시 후 다시 시도해보라냥",
} as const;

export interface ErrorHandlerOptions {
  navigate: NavigateFunction;
  currentPath?: string;
  customErrorMessage?: string;
}

export const handleAuthError = (
  error: AxiosError<IError>,
  options: ErrorHandlerOptions,
): boolean => {
  const { navigate, currentPath, customErrorMessage } = options;

  if (error.message === ERROR_MESSAGES.NO_TOKEN) {
    if (window.confirm(ALERT_MESSAGES.LOGIN_REQUIRED)) {
      const redirectPath = currentPath
        ? `?redirect=${encodeURIComponent(currentPath)}`
        : "";
      navigate(`/login${redirectPath}`);
    }
    return true; // 에러가 처리되었음
  }

  if (error.response?.status !== 401 && customErrorMessage) {
    alert(customErrorMessage);
  }

  return false; // 에러가 처리되지 않았음
};

export const createDefaultErrorHandler = (customErrorMessage: string) => {
  return (error: AxiosError<IError>) => {
    if (error.response?.status !== 401) {
      alert(customErrorMessage);
    }
  };
};

export const createAuthErrorHandler = (
  options: ErrorHandlerOptions,
  customErrorMessage: string,
) => {
  return (error: AxiosError<IError>) => {
    handleAuthError(error, { ...options, customErrorMessage });
  };
};
