import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import SendIcon from "@/assets/icon/send.svg?react";
import SelectAnimalType from "../MemberForm/SelectAnimalType";
import { ApiAnimalType } from "@/types/animal";

const MAX_LENGTH = 30;

interface IChatInput {
  onSend: (message: string) => void;
  selectedAnimal: ApiAnimalType;
  setSelectedAnimal: (animal: ApiAnimalType) => void;
}

export default function ChatInput({
  onSend,
  selectedAnimal,
  setSelectedAnimal,
}: IChatInput) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // TODO: 메시지 전송 로직 추가
  const handleSend = () => {
    onSend(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.length <= MAX_LENGTH && value.trim().length > 0) {
        handleSend();
      }
    }
  };

  return (
    <div className="w-[90%] flex flex-col gap-2 bg-orange-100 rounded-lg py-2 px-2 fixed bottom-16 max-w-[400px] sm:mx-auto shadow-lg border border-foreground/20">
      <div className="w-full flex gap-2">
        <div className="w-full flex flex-col gap-2">
          <div className="relative w-full h-full">
            <textarea
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="여기서는 전부 친구다냥! 반모하자 우리~"
              className={cn(
                "w-full h-full resize-none flex-1 text-sm rounded-sm px-1",
              )}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-0">
          <Button
            onClick={handleSend}
            variant="ghost"
            className="p-0"
            disabled={value.length > MAX_LENGTH || value.trim().length === 0}
          >
            <SendIcon className="size-6 fill-foreground" />
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
      <SelectAnimalType
        animals={[
          ApiAnimalType.CAT,
          ApiAnimalType.DOG,
          ApiAnimalType.HAMSTER,
          ApiAnimalType.RACCOON,
          ApiAnimalType.MONKEY,
        ]}
        selectedAnimal={selectedAnimal}
        setAnimal={setSelectedAnimal}
        size="sm"
      />
    </div>
  );
}
