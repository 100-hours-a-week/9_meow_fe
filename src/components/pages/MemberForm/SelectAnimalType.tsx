import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ApiAnimalType } from "@/types/animal";
import { convertAnimalTypeToDisplay } from "@/utils/convertAnimal";
import { Label } from "@radix-ui/react-label";

interface ISelectAnimalType {
  titleText?: string;
  animals: ApiAnimalType[];
  selectedAnimal: ApiAnimalType;
  setAnimal: (animal: ApiAnimalType) => void;
}

export default function SelectAnimalType({
  titleText,
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
        <p className="text-xl text-foreground font-bold">
          {titleText + " "}
          <span className="text-destructive">*</span>
        </p>
      )}
      <RadioGroup
        defaultValue={selectedAnimal}
        className="flex flex-row gap-2 flex-wrap"
      >
        {animals.map((animal, index) => (
          <div key={animal} className="flex items-center space-x-2">
            <RadioGroupItem
              value={animal}
              id={`${animal}-${index + 1}`}
              onClick={() => handleAnimalChange(animal)}
            />
            <Label htmlFor={`${animal}-${index + 1}`} className="text-lg">
              {convertAnimalTypeToDisplay(animal)}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
