import { Button } from "@/components/ui/button";
import { cn } from "@/utils/lib/utils";
import React, { useState } from "react";
import SendIcon from "@/assets/icon/send.svg?react";
import ChatSelectAnimalType from "./ChatSelectAnimalType";
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

  const handleSend = () => {
    onSend(value);
    setValue("");
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
    <div className="w-[90%] flex flex-col gap-1 bg-orange-100 rounded-lg py-2 px-2 fixed bottom-16 max-w-[400px] sm:mx-auto shadow-lg border border-foreground/20">
      <div className="w-full flex flex-row gap-2 items-end">
        <textarea
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="여기서는 전부 친구다냥! 반모하자 우리~"
          className={cn("w-full resize-none flex-1 text-sm rounded-sm px-1")}
          name="chat-input"
        />
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
          disabled={value.length > MAX_LENGTH || value.trim().length === 0}
        >
          <SendIcon className="size-6 fill-foreground" />
        </Button>
      </div>
      <ChatSelectAnimalType
        animals={[
          ApiAnimalType.CAT,
          ApiAnimalType.DOG,
          ApiAnimalType.HAMSTER,
          ApiAnimalType.RACCOON,
          ApiAnimalType.MONKEY,
        ]}
        selectedAnimal={selectedAnimal}
        setAnimal={setSelectedAnimal}
      />
    </div>
  );
}
