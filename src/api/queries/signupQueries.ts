import { UseMutationOptions } from "@tanstack/react-query";
import { getDuplicateNickname, postUsers } from "@/api/signup";
import { ISignupUserRequest } from "@/api/types/signup";
import { IError } from "@/api/types/common";
import {
  ALERT_MESSAGES,
  createDefaultErrorHandler,
} from "../utils/errorHandler";
import { AxiosError } from "axios";

export const signupQueries = {
  all: () => ["signup"] as const,

  checkNickname: ({
    setIsNicknameDuplicate,
    setErrorMessage,
    setSuccessMessage,
  }: {
    setIsNicknameDuplicate?: (isDuplicate: boolean) => void;
    setErrorMessage: (error: string | null) => void;
    setSuccessMessage: (success: string | null) => void;
  }): UseMutationOptions<boolean, Error, string> => ({
    mutationKey: [...signupQueries.all(), "checkNickname"],
    mutationFn: (nickname: string) => getDuplicateNickname(nickname),
    onSuccess: (data: boolean) => {
      setIsNicknameDuplicate?.(data);
      setErrorMessage(data ? "중복된 닉네임이 있다옹" : null);
      setSuccessMessage(data ? null : "사용 가능한 닉네임이다옹!");
    },
    onError: () => {
      setIsNicknameDuplicate?.(true);
      setErrorMessage("문제 생겼다옹... 잠시 후 다시 시도해라옹");
      setSuccessMessage(null);
    },
  }),

  signup: ({
    setKakaoId,
    login,
  }: {
    setKakaoId: (kakaoId: number) => void;
    login: (id: number) => void;
  }): UseMutationOptions<number, AxiosError<IError>, ISignupUserRequest> => ({
    mutationKey: [...signupQueries.all(), "signup"],
    mutationFn: (data: ISignupUserRequest) => postUsers(data),
    onSuccess: (data: number) => {
      setKakaoId(data);
      login(data);
    },
    onError: createDefaultErrorHandler(ALERT_MESSAGES.SIGNUP_FAILED),
  }),
};
