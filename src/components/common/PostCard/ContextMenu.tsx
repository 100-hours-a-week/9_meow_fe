import { useState } from "react";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postQueries } from "@/api/queries/postQueries";
import DotsVerticalIcon from "@/assets/icon/dots-vertical.svg?react";

export default function ContextMenu({ postId }: { postId: number }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate: deletePost } = useMutation({
    ...postQueries.delete({ postId, navigate }),
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <DotsVerticalIcon className="fill-foreground" />
      </Button>
      {isOpen && (
        <div className="w-24 absolute top-9 right-0 bg-orange-100 rounded-lg shadow-lg p-2 gap-2 flex flex-col z-10">
          <Button
            variant="primaryOutline"
            size="sm"
            className="text-xs w-full"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${postId}`);
              setIsOpen(false);
            }}
          >
            ¢ 수정하기
          </Button>
          <Button
            variant="secondaryOutline"
            size="sm"
            className="text-xs w-full"
            onClick={(e) => {
              e.stopPropagation();
              if (
                window.confirm(
                  "정말 삭제하겠냥? 한번 삭제한 게시글은 다시 되돌릴 수 없다옹...",
                )
              ) {
                deletePost();
              } else {
                setIsOpen(false);
              }
            }}
          >
            ♧ 삭제하기
          </Button>
        </div>
      )}
    </div>
  );
}
