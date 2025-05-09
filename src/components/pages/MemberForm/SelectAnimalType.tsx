import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ApiAnimalType, DisplayAnimalType } from "@/types/animal";
import { Label } from "@radix-ui/react-label";

interface ISelectAnimalType {
  titleText?: string;
  selectedAnimal: ApiAnimalType;
  setAnimal: (animal: ApiAnimalType) => void;
}

export default function SelectAnimalType({
  titleText,
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
        {Object.entries(ApiAnimalType).map(([key, value], index) => (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={value}
              id={`r${index + 1}`}
              onClick={() => handleAnimalChange(value)}
            />
            <Label htmlFor={`r${index + 1}`} className="text-lg">
              {DisplayAnimalType[key as keyof typeof DisplayAnimalType]}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
