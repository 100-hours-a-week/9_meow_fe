import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ApiAnimalType } from "@/types/animal";
import { convertAnimalTypeToDisplay } from "@/utils/convertAnimal";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

interface ISelectAnimalType {
  titleText?: string;
  isRequired?: boolean;
  animals: ApiAnimalType[];
  selectedAnimal: ApiAnimalType;
  setAnimal: (animal: ApiAnimalType) => void;
  size?: "default" | "sm";
}

function SelectAnimalType({
  titleText,
  isRequired = false,
  animals,
  selectedAnimal,
  setAnimal,
  size = "default",
}: ISelectAnimalType) {
  const handleAnimalChange = (value: ApiAnimalType) => {
    setAnimal(value);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-1 w-full max-w-[400px]",
        size === "sm" && "gap-0",
      )}
    >
      {titleText && (
        <Label className="text-xl text-foreground font-bold flex items-center gap-1">
          {titleText + " "}
          {isRequired && <span className="text-destructive">*</span>}
        </Label>
      )}
      <RadioGroup
        value={selectedAnimal}
        className={cn(
          "flex flex-row gap-2 flex-wrap",
          size === "sm" && "gap-1",
        )}
        onValueChange={handleAnimalChange}
      >
        {animals.map((animal, index) => (
          <div key={animal} className="flex items-center space-x-2">
            <RadioGroupItem value={animal} id={`${animal}-${index + 1}`} />
            <Label
              htmlFor={`r${index + 1}`}
              className={cn("text-lg", size === "sm" && "text-sm")}
            >
              {convertAnimalTypeToDisplay(animal)}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default React.memo(SelectAnimalType);
