import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postQueries } from "@/api/queries/postQueries";
import DotsVerticalIcon from "@/assets/icon/dots-vertical.svg?react";

export default function ContextMenu({ postId }: { postId: number }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { mutate: deletePost } = useMutation({
    ...postQueries.delete({ postId, queryClient }),
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.right - 96,
      });
    }
    setIsOpen(!isOpen);
  };

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        onClick={handleButtonClick}
      >
        <DotsVerticalIcon className="fill-foreground" />
      </Button>
      {isOpen &&
        createPortal(
          <div
            className="w-24 fixed bg-orange-100 rounded-lg shadow-lg p-2 gap-2 flex flex-col z-[9999]"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
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
          </div>,
          document.body,
        )}
    </div>
  );
}
