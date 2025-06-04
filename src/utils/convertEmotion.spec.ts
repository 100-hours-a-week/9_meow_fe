import { DisplayEmotion, ApiEmotion } from "@/types/Emotion";
import { convertEmotionTypeToDisplay } from "./convertEmotion";

describe("convertEmotionTypeToDisplay", () => {
  it("should return NORMAL display emotion", () => {
    expect(convertEmotionTypeToDisplay(ApiEmotion.NORMAL)).toBe(
      DisplayEmotion.NORMAL,
    );
    expect(convertEmotionTypeToDisplay("normal" as ApiEmotion)).toBe(
      DisplayEmotion.NORMAL,
    );
    expect(convertEmotionTypeToDisplay(ApiEmotion.NORMAL)).toBe("선택 없음");
  });
  it("should return HAPPY display emotion", () => {
    expect(convertEmotionTypeToDisplay(ApiEmotion.HAPPY)).toBe(
      DisplayEmotion.HAPPY,
    );
    expect(convertEmotionTypeToDisplay("happy" as ApiEmotion)).toBe(
      DisplayEmotion.HAPPY,
    );
    expect(convertEmotionTypeToDisplay(ApiEmotion.HAPPY)).toBe("☺️행복");
  });
  it("should return CURIOUS display emotion", () => {
    expect(convertEmotionTypeToDisplay(ApiEmotion.CURIOUS)).toBe(
      DisplayEmotion.CURIOUS,
    );
    expect(convertEmotionTypeToDisplay("curious" as ApiEmotion)).toBe(
      DisplayEmotion.CURIOUS,
    );
    expect(convertEmotionTypeToDisplay(ApiEmotion.CURIOUS)).toBe("🤔호기심");
  });
  it("should return SAD display emotion", () => {
    expect(convertEmotionTypeToDisplay(ApiEmotion.SAD)).toBe(
      DisplayEmotion.SAD,
    );
    expect(convertEmotionTypeToDisplay("sad" as ApiEmotion)).toBe(
      DisplayEmotion.SAD,
    );
    expect(convertEmotionTypeToDisplay(ApiEmotion.SAD)).toBe("😢슬픔");
  });
  it("should return GRUMPY display emotion", () => {
    expect(convertEmotionTypeToDisplay(ApiEmotion.GRUMPY)).toBe(
      DisplayEmotion.GRUMPY,
    );
    expect(convertEmotionTypeToDisplay("grumpy" as ApiEmotion)).toBe(
      DisplayEmotion.GRUMPY,
    );
    expect(convertEmotionTypeToDisplay(ApiEmotion.GRUMPY)).toBe("😠까칠");
  });
  it("should return ANGRY display emotion", () => {
    expect(convertEmotionTypeToDisplay(ApiEmotion.ANGRY)).toBe(
      DisplayEmotion.ANGRY,
    );
    expect(convertEmotionTypeToDisplay("angry" as ApiEmotion)).toBe(
      DisplayEmotion.ANGRY,
    );
    expect(convertEmotionTypeToDisplay(ApiEmotion.ANGRY)).toBe("😡화남");
  });
  it("should throw an error for unknown emotion", () => {
    expect(() => convertEmotionTypeToDisplay("unknown" as ApiEmotion)).toThrow(
      "Unknown emotion: unknown",
    );
  });
});
