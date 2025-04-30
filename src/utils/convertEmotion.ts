import { DisplayEmotion } from "@/types/Emotion";

import { ApiAnimalType } from "@/types/animal";
import { ApiEmotion } from "@/types/Emotion";

// API 응답을 UI 표시용으로 변환하는 함수
export function convertEmotionTypeToDisplay(
  emotion: ApiEmotion,
  animalType: ApiAnimalType
): DisplayEmotion {
  if (emotion === ApiEmotion.NONE) {
    return animalType === ApiAnimalType.CAT
      ? DisplayEmotion.CAT
      : DisplayEmotion.DOG;
  }
  if (emotion === ApiEmotion.HAPPY) {
    return DisplayEmotion.HAPPY;
  }
  if (emotion === ApiEmotion.CURIOUS) {
    return DisplayEmotion.CURIOUS;
  }
  if (emotion === ApiEmotion.SAD) {
    return DisplayEmotion.SAD;
  }
  if (emotion === ApiEmotion.GRUMPY) {
    return DisplayEmotion.GRUMPY;
  }
  if (emotion === ApiEmotion.ANGRY) {
    return DisplayEmotion.ANGRY;
  }
  throw new Error(`Unknown emotion: ${emotion}`);
}

// UI 표시용을 API 응답용으로 변환하는 함수
export function convertDisplayToEmotionType(
  display: DisplayEmotion
): ApiEmotion {
  if (display === DisplayEmotion.CAT || display === DisplayEmotion.DOG) {
    return ApiEmotion.NONE;
  }
  if (display === DisplayEmotion.HAPPY) {
    return ApiEmotion.HAPPY;
  }
  if (display === DisplayEmotion.CURIOUS) {
    return ApiEmotion.CURIOUS;
  }
  if (display === DisplayEmotion.SAD) {
    return ApiEmotion.SAD;
  }
  if (display === DisplayEmotion.GRUMPY) {
    return ApiEmotion.GRUMPY;
  }
  if (display === DisplayEmotion.ANGRY) {
    return ApiEmotion.ANGRY;
  }
  throw new Error(`Unknown display emotion: ${display}`);
}
