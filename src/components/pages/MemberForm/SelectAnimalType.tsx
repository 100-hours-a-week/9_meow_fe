import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ApiAnimalType } from "@/types/animal";
import { convertAnimalTypeToDisplay } from "@/utils/convertAnimal";
import { Label } from "@radix-ui/react-label";

interface ISelectAnimalType {
  titleText?: string;
  isRequired?: boolean;
  animals: ApiAnimalType[];
  selectedAnimal: ApiAnimalType;
  setAnimal: (animal: ApiAnimalType) => void;
}

function SelectAnimalType({
  titleText,
  isRequired = false,
  animals,
  selectedAnimal,
  setAnimal,
}: ISelectAnimalType) {
  const handleAnimalChange = (value: ApiAnimalType) => {
    setAnimal(value);
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-[400px]">
      {titleText && (
        <Label className="text-xl text-foreground font-bold flex items-center gap-1">
          {titleText + " "}
          {isRequired && <span className="text-destructive">*</span>}
        </Label>
      )}
      <RadioGroup
        value={selectedAnimal}
        className="flex flex-row gap-2 flex-wrap"
        onValueChange={handleAnimalChange}
      >
        {animals.map((animal, index) => (
          <div key={animal} className="flex items-center space-x-2">
            <RadioGroupItem value={animal} id={`${animal}-${index + 1}`} />
            <Label htmlFor={`r${index + 1}`} className="text-lg">
              {convertAnimalTypeToDisplay(animal)}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default React.memo(SelectAnimalType);
