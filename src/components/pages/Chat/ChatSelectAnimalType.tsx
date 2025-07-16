import React from "react";
import { ApiAnimalType } from "@/types/animal";
import { convertAnimalTypeToDisplay } from "@/utils/convertAnimal";
import { cn } from "@/lib/utils";

interface IChatSelectAnimalType {
  animals: ApiAnimalType[];
  selectedAnimal: ApiAnimalType;
  setAnimal: (animal: ApiAnimalType) => void;
}

function ChatSelectAnimalType({
  animals,
  selectedAnimal,
  setAnimal,
}: IChatSelectAnimalType) {
  const handleAnimalChange = (value: ApiAnimalType) => {
    setAnimal(value);
  };

  return (
    <div className={cn("flex flex-col gap-1 w-full max-w-[400px]")}>
      <div className="w-full flex flex-row justify-between gap-2 flex-wrap">
        {animals.map((value) => {
          const isSelected = selectedAnimal === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleAnimalChange(value)}
              className={cn(
                "flex flex-col items-center justify-center py-2 rounded-lg border gap-2 flex-1 hover:cursor-pointer",
                isSelected
                  ? "border-foreground bg-background shadow-sm"
                  : "border-foreground/30 bg-orange-100",
                "transition-colors duration-150",
              )}
            >
              <p className="text-xs">{convertAnimalTypeToDisplay(value)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(ChatSelectAnimalType);
