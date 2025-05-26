import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const MAX_LENGTH = 50;

export default function CommentInput() {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSend = () => {
    // TODO : 댓글 전송 로직 추가
    console.log("댓글 작성", value);
  };

  return (
    <div className="w-full flex gap-2 bg-orange-100 rounded-lg p-3">
      <div className="w-full flex flex-col gap-2">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="댓글을 입력하세요..."
          className="w-full h-15 resize-none flex-1"
        />
      </div>
      <div className="flex flex-col items-end gap-2">
        <Button
          onClick={handleSend}
          variant="ghost"
          className="p-0"
          disabled={value.length > MAX_LENGTH || value.trim().length === 0}
        >
          <img src="/icon/send.svg" alt="댓글 전송" className="size-8" />
        </Button>
        <span
          className={cn(
            "text-xs text-foreground/50",
            value.length > MAX_LENGTH && "text-destructive",
          )}
        >
          {value.length}/{MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
