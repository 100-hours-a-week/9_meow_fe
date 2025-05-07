import { getLogin } from "@/service/login";
import { useMutation } from "@tanstack/react-query";

interface ILogin {
  code: string;
}

export default function useLoginMutation() {
  return useMutation({
    mutationFn: ({ code }: ILogin) => getLogin(code),
    onSuccess: () => {
      console.log("성공!");
    },
    onError: () => {
      console.log("실패!");
    },
  });
}
