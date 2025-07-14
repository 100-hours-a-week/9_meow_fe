import React from "react";
import { ApiEmotion } from "@/types/Emotion";
import { cn } from "@/lib/utils";
import { convertEmotionTypeToDisplay } from "@/utils/convertEmotion";

interface ISelectEmotion {
  selectedEmotion: ApiEmotion;
  setEmotion: (emotion: ApiEmotion) => void;
}

function SelectEmotion({ selectedEmotion, setEmotion }: ISelectEmotion) {
  const handleEmotionChange = (value: ApiEmotion) => {
    setEmotion(value);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-3 gap-2 flex-wrap w-full">
        {Object.entries(ApiEmotion).map(([key, value]) => {
          const isSelected = selectedEmotion === value;
          return (
            <button
              key={`${value}-${key}`}
              type="button"
              onClick={() => handleEmotionChange(value)}
              className={cn(
                "flex flex-col items-center justify-center py-2 rounded-lg border gap-2",
                isSelected
                  ? "border-foreground bg-background shadow-sm"
                  : "border-foreground/30 bg-orange-100",
                "transition-colors duration-150",
              )}
            >
              <img
                src={`/icon/emotion/${value}.png`}
                alt="emotion"
                className="w-5"
              />
              <p>{convertEmotionTypeToDisplay(value)}</p>
              {/* 아래에 라벨 등 추가 가능 */}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(SelectEmotion);
