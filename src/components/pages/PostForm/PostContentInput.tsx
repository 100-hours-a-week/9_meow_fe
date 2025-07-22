import React from "react";
import { cn } from "@/lib/utils";

const MAX_LENGTH = 200;
const MIN_LENGTH = 5;

interface IPostContentInput {
  content: string;
  setContent: (content: string) => void;
  setIsSubmitDisabled: (isSubmitDisabled: boolean) => void;
}

function PostContentInput({
  content,
  setContent,
  setIsSubmitDisabled,
}: IPostContentInput) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
    setIsSubmitDisabled(
      newValue.length < MIN_LENGTH || newValue.length > MAX_LENGTH,
    );
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <textarea
        className="w-full h-[150px] resize-none outline-foreground border border-foreground/30 rounded-2xl p-2 bg-background shadow-sm"
        placeholder="글을 입력하세야옹"
        value={content}
        onChange={handleChange}
      />
      <div
        className={cn(
          "text-sm text-right",
          content.length > MAX_LENGTH || content.length < MIN_LENGTH
            ? "text-destructive"
            : "text-foreground/50",
        )}
      >
        {content.length}/{MAX_LENGTH}
      </div>
    </div>
  );
}

export default React.memo(PostContentInput);
