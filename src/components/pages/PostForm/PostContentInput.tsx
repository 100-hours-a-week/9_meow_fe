import { useState } from "react";
import { cn } from "@/lib/utils";

const MAX_LENGTH = 200;

export default function PostContentInput() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full flex flex-col gap-2">
      <textarea
        className="w-full h-[150px] resize-none outline-foreground border border-foreground/30 rounded-2xl p-2"
        placeholder="글을 입력하세야옹"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        className={cn(
          "text-sm text-right",
          value.length > MAX_LENGTH ? "text-destructive" : "text-foreground/50"
        )}
      >
        {value.length}/{MAX_LENGTH}
      </div>
    </div>
  );
}
