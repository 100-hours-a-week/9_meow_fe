import { DisplayEmotion } from "@/types/Emotion";
import { ApiEmotion } from "@/types/Emotion";

// API 응답을 UI 표시용으로 변환하는 함수
export function convertEmotionTypeToDisplay(
  emotion: ApiEmotion,
): DisplayEmotion {
  switch (emotion) {
    case ApiEmotion.NORMAL:
      return DisplayEmotion.NORMAL;
    case ApiEmotion.HAPPY:
      return DisplayEmotion.HAPPY;
    case ApiEmotion.CURIOUS:
      return DisplayEmotion.CURIOUS;
    case ApiEmotion.SAD:
      return DisplayEmotion.SAD;
    case ApiEmotion.GRUMPY:
      return DisplayEmotion.GRUMPY;
    case ApiEmotion.ANGRY:
      return DisplayEmotion.ANGRY;
    default:
      throw new Error(`Unknown emotion: ${emotion}`);
  }
}

// UI 표시용을 API 응답용으로 변환하는 함수
export function convertDisplayToEmotionType(
  display: DisplayEmotion,
): ApiEmotion {
  switch (display) {
    case DisplayEmotion.NORMAL:
      return ApiEmotion.NORMAL;
    case DisplayEmotion.HAPPY:
      return ApiEmotion.HAPPY;
    case DisplayEmotion.CURIOUS:
      return ApiEmotion.CURIOUS;
    case DisplayEmotion.SAD:
      return ApiEmotion.SAD;
    case DisplayEmotion.GRUMPY:
      return ApiEmotion.GRUMPY;
    case DisplayEmotion.ANGRY:
      return ApiEmotion.ANGRY;
    default:
      throw new Error(`Unknown emotion: ${display}`);
  }
}
