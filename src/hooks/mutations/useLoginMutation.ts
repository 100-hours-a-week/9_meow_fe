import { getLoginId } from "@/service/login";
import { useMutation } from "@tanstack/react-query";
import { ILoginId } from "@/types/Login";
interface ILogin {
  code: string;
}

export default function useLoginMutation() {
  return useMutation<ILoginId, Error, ILogin>({
    mutationFn: ({ code }: ILogin) => getLoginId(code),
    onSuccess: (data: ILoginId) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
