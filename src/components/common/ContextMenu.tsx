import { useState } from "react";
import { Button } from "../ui/button";

export default function ContextMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="relative"
      tabIndex={-1}
      onBlur={() => setIsOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <img src="/icon/dots-vertical.svg" alt="context menu" />
      </Button>
      {isOpen && (
        <div className="w-24 absolute top-9 right-0 bg-orange-100 rounded-lg shadow-lg p-2 gap-2 flex flex-col">
          <Button variant="primaryOutline" size="sm" className="text-xs w-full">
            ¢ 수정하기
          </Button>
          <Button
            variant="secondaryOutline"
            size="sm"
            className="text-xs w-full"
          >
            ♧ 삭제하기
          </Button>
        </div>
      )}
    </div>
  );
}
