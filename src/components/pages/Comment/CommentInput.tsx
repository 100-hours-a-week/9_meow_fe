import { commentQueries } from "@/api/queries/commentQueries";
import { postQueries } from "@/api/queries/postQueries";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SendIcon from "@/assets/icon/send.svg?react";

const MAX_LENGTH = 50;

interface ICommentInput {
  postId: number;
}

export default function CommentInput({ postId }: ICommentInput) {
  const [value, setValue] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: createComment, isPending } = useMutation({
    ...commentQueries.create({
      postId,
      navigate,
      currentPath: location.pathname + location.search,
    }),
    onSuccess: () => {
      setValue("");
      queryClient.invalidateQueries({
        queryKey: commentQueries.list(postId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: postQueries.detail(postId).queryKey,
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
    <div className="w-[90%] flex gap-2 bg-orange-100 rounded-lg py-2 px-3 fixed bottom-16 max-w-[400px] sm:mx-auto shadow-lg border border-foreground/20">
      <div className="w-full flex flex-col gap-2">
        <div className="relative w-full h-full">
          <textarea
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="댓글을 입력하세야옹..."
            className={cn(
              "w-full h-full resize-none flex-1 text-sm rounded-sm px-1",
              isPending && "animate-pulse bg-muted-foreground",
            )}
            disabled={isPending}
          />
        </div>
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
          <SendIcon className="size-6 fill-foreground" />
        </Button>
      </div>
    </div>
  );
}
