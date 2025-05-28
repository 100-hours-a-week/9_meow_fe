import { commentQueries } from "@/api/queries/commentQueries";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const MAX_LENGTH = 50;

interface ICommentInput {
  postId: number;
}

export default function CommentInput({ postId }: ICommentInput) {
  const [value, setValue] = useState("");

  const queryClient = useQueryClient();
  const { mutate: createComment, isPending } = useMutation({
    ...commentQueries.create(postId),
    onSuccess: () => {
      setValue("");
      queryClient.invalidateQueries({
        queryKey: commentQueries.list(postId).queryKey,
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSend = () => {
    createComment({ content: value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.length <= MAX_LENGTH && value.trim().length > 0 && !isPending) {
        handleSend();
      }
    }
  };

  return (
    <div className="w-full flex gap-2 bg-orange-100 rounded-lg py-2 px-3 sticky bottom-16 shadow-lg border border-foreground/20">
      <div className="w-full flex flex-col gap-2">
        <textarea
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="댓글을 입력하세요..."
          className="w-full resize-none flex-1 text-sm"
        />
      </div>
      <div className="flex flex-row items-center gap-1">
        <span
          className={cn(
            "text-xs text-foreground/50",
            value.length > MAX_LENGTH && "text-destructive",
          )}
        >
          {value.length}/{MAX_LENGTH}
        </span>
        <Button
          onClick={handleSend}
          variant="ghost"
          className="p-0"
          disabled={
            value.length > MAX_LENGTH || value.trim().length === 0 || isPending
          }
        >
          <img src="/icon/send.svg" alt="댓글 전송" className="size-6" />
        </Button>
      </div>
    </div>
  );
}
