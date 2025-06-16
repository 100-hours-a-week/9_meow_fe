import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signupQueries } from "@/api/queries/signupQueries";
import { validateNickname } from "./validation/validateNickname";

export interface INicknameInput {
  isRequired?: boolean;
  nicknameValue: string;
  setNicknameValue: (value: string) => void;
  setIsNicknameDuplicate?: (isDuplicate: boolean) => void;
}

export default function NicknameInput({
  isRequired = false,
  nicknameValue,
  setNicknameValue,
  setIsNicknameDuplicate,
}: INicknameInput) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutate: checkNickname, isPending } = useMutation({
    ...signupQueries.checkNickname({
      setIsNicknameDuplicate,
      setErrorMessage,
      setSuccessMessage,
    }),
  });

  const handleCheckNickname = () => {
    if (nicknameValue.trim()) {
      checkNickname(nicknameValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNicknameValue(value);
    setSuccessMessage(null);
    setIsNicknameDuplicate?.(true);

    const { isValid, message } = validateNickname(value);
    if (!isValid) {
      setErrorMessage(message);
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-[400px]">
      <Label className="text-xl text-foreground font-bold flex items-center gap-1">
        이름이 뭐냥 {isRequired && <span className="text-destructive">*</span>}
      </Label>
      <div className="flex items-center w-full gap-3 h-10">
        <input
          className={cn(
            "flex-1 h-full rounded-xl border-2 border-foreground/30 px-4 text-foreground text-lg placeholder:text-foreground/50 placeholder:opacity-70 focus:outline-none focus:ring-primary focus:border-primary",
            errorMessage &&
              "border-destructive ring-destructive focus:border-destructive focus:ring-destructive",
          )}
          placeholder="닉네임을 입력하세야옹..."
          value={nicknameValue}
          onChange={handleChange}
        />
        <Button
          type="button"
          variant="primaryOutline"
          className="h-full px-5 rounded-xl text-foreground text-lg font-bold"
          onClick={handleCheckNickname}
          disabled={isPending || !validateNickname(nicknameValue).isValid}
        >
          {isPending ? "확인 중..." : "중복 확인"}
        </Button>
      </div>
      <div className="w-full h-6">
        {errorMessage && (
          <span className="text-sm text-destructive font-bold">
            {errorMessage}
          </span>
        )}
        {successMessage && (
          <span className="text-sm text-green-500 font-bold">
            {successMessage}
          </span>
        )}
      </div>
    </div>
  );
}
