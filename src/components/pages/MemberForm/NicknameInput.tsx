import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export interface INicknameInput {
  isRequired?: boolean;
  nicknameValue: string;
  setNicknameValue: (value: string) => void;
}

export default function NicknameInput({
  isRequired = false,
  nicknameValue,
  setNicknameValue,
}: INicknameInput) {
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNicknameValue(value);

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
              "border-destructive ring-destructive focus:border-destructive focus:ring-destructive"
          )}
          placeholder="닉네임을 입력하세야옹..."
          value={nicknameValue}
          onChange={handleChange}
        />
        <Button
          type="button"
          variant="primaryOutline"
          className="h-full px-5 rounded-xl text-foreground text-lg font-bold"
        >
          중복 확인
        </Button>
      </div>
      <div className="w-full h-6">
        {error && (
          <span className="text-sm text-destructive font-bold">{error}</span>
        )}
      </div>
    </div>
  );
}
