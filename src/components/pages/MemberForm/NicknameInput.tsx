import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getDuplicateNickname } from "@/api/signup";

export interface INicknameInput {
  isRequired?: boolean;
  nicknameValue: string;
  setNicknameValue: (value: string) => void;
  onDuplicateCheck?: (isDuplicate: boolean) => void;
}

export default function NicknameInput({
  isRequired = false,
  nicknameValue,
  setNicknameValue,
  onDuplicateCheck,
}: INicknameInput) {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    mutate: checkNickname,
    data: isDuplicate,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (nickname: string) => getDuplicateNickname(nickname),
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
    onDuplicateCheck?.(true); // Reset duplicate check status when nickname changes

    const emojiRegex = /[\p{Emoji}]/u;
    if (emojiRegex.test(value)) {
      setError("이모지 없이 적어달라옹");
    } else if (value.length < 3) {
      setError("닉네임은 3자 이상이어야 한다옹");
    } else if (value.length > 15) {
      setError("닉네임은 15자 이하여야 한다옹");
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    if (isError) {
      setError("문제 생겼다옹... 잠시 후 다시 시도해라옹");
      setSuccessMessage(null);
      onDuplicateCheck?.(true);
    } else {
      setError(null);
    }

    if (isSuccess) {
      if (isDuplicate) {
        setError("중복된 닉네임이 있다옹");
        setSuccessMessage(null);
        onDuplicateCheck?.(true);
      } else {
        setError(null);
        setSuccessMessage("사용 가능한 닉네임이다옹!");
        onDuplicateCheck?.(false);
      }
    }
  }, [isError, isDuplicate, onDuplicateCheck, isSuccess]);

  return (
    <div className="flex flex-col gap-1 w-full max-w-[400px]">
      <Label className="text-xl text-foreground font-bold flex items-center gap-1">
        이름이 뭐냥 {isRequired && <span className="text-destructive">*</span>}
      </Label>
      <div className="flex items-center w-full gap-3 h-10">
        <input
          className={cn(
            "flex-1 h-full rounded-xl border-2 border-foreground/30 px-4 text-foreground text-lg placeholder:text-foreground/50 placeholder:opacity-70 focus:outline-none focus:ring-primary focus:border-primary",
            error &&
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
          disabled={isPending}
        >
          {isPending ? "확인 중..." : "중복 확인"}
        </Button>
      </div>
      <div className="w-full h-6">
        {error && (
          <span className="text-sm text-destructive font-bold">{error}</span>
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
