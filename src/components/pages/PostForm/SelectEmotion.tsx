import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ApiEmotion, DisplayEmotion } from "@/types/Emotion";

interface ISelectEmotion {
  selectedEmotion: ApiEmotion;
  setEmotion: (emotion: ApiEmotion) => void;
}

export default function SelectEmotion({
  selectedEmotion,
  setEmotion,
}: ISelectEmotion) {
  const handleEmotionChange = (value: ApiEmotion) => {
    setEmotion(value);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-sm">오늘 기분은 어떠냥</p>
      <RadioGroup
        defaultValue={selectedEmotion}
        className="flex flex-row gap-2 flex-wrap"
      >
        {Object.entries(ApiEmotion).map(([key, value], index) => (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={value}
              id={`r${index + 1}`}
              onClick={() => handleEmotionChange(value)}
            />
            <Label htmlFor={`r${index + 1}`} className="text-xs">
              {key === "NONE"
                ? // TODO: 사용자에 따라서 다르게 보이도록
                  DisplayEmotion.CAT
                : DisplayEmotion[key as keyof typeof DisplayEmotion]}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
