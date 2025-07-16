import { ApiEmotion } from "@/types/Emotion";
import { useState } from "react";

export const usePostFormState = () => {
  const [content, setContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<ApiEmotion>(
    ApiEmotion.HAPPY,
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  return {
    content,
    selectedEmotion,
    isSubmitDisabled,
    setContent,
    setSelectedEmotion,
    setIsSubmitDisabled,
  };
};
