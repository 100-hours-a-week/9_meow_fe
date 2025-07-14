import React from "react";
import { ApiAnimalType } from "@/types/animal";
import { convertAnimalTypeToDisplay } from "@/utils/convertAnimal";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

interface ISignupSelectAnimalType {
  titleText?: string;
  isRequired?: boolean;
  selectedAnimal: ApiAnimalType;
  setAnimal: (animal: ApiAnimalType) => void;
  size?: "default" | "sm";
}

function SignupSelectAnimalType({
  titleText,
  isRequired = false,
  selectedAnimal,
  setAnimal,
  size = "default",
}: ISignupSelectAnimalType) {
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
      <div className="w-full flex flex-row gap-2">
        {[ApiAnimalType.CAT, ApiAnimalType.DOG].map((value) => {
          const isSelected = selectedAnimal === value;
          return (
            <button
              key={`${value}`}
              type="button"
              onClick={() => handleAnimalChange(value)}
              className={cn(
                "w-full flex flex-col items-center justify-center py-2 rounded-lg border gap-2",
                isSelected
                  ? "border-foreground bg-background shadow-sm"
                  : "border-foreground/30 bg-orange-100",
                "transition-colors duration-150",
              )}
            >
              <img
                src={`/icon/animal/${value}.png`}
                alt="animal"
                className="w-12"
              />
              <p>{convertAnimalTypeToDisplay(value)}</p>
              {/* 아래에 라벨 등 추가 가능 */}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(SignupSelectAnimalType);
