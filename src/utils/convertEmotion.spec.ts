import { DisplayEmotion, ApiEmotion } from "@/types/Emotion";
import {
  convertDisplayToEmotionType,
  convertEmotionTypeToDisplay,
} from "./convertEmotion";

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

describe("convertDisplayToEmotionType", () => {
  it("should return NORMAL emotion type", () => {
    expect(convertDisplayToEmotionType(DisplayEmotion.NORMAL)).toBe(
      ApiEmotion.NORMAL,
    );
    expect(convertDisplayToEmotionType("선택 없음" as DisplayEmotion)).toBe(
      ApiEmotion.NORMAL,
    );
    expect(convertDisplayToEmotionType(DisplayEmotion.NORMAL)).toBe("normal");
  });
  it("should return HAPPY emotion type", () => {
    expect(convertDisplayToEmotionType(DisplayEmotion.HAPPY)).toBe(
      ApiEmotion.HAPPY,
    );
    expect(convertDisplayToEmotionType("☺️행복" as DisplayEmotion)).toBe(
      ApiEmotion.HAPPY,
    );
    expect(convertDisplayToEmotionType(DisplayEmotion.HAPPY)).toBe("happy");
  });
  it("should return CURIOUS emotion type", () => {
    expect(convertDisplayToEmotionType(DisplayEmotion.CURIOUS)).toBe(
      ApiEmotion.CURIOUS,
    );
    expect(convertDisplayToEmotionType("🤔호기심" as DisplayEmotion)).toBe(
      ApiEmotion.CURIOUS,
    );
    expect(convertDisplayToEmotionType(DisplayEmotion.CURIOUS)).toBe("curious");
  });
  it("should return SAD emotion type", () => {
    expect(convertDisplayToEmotionType(DisplayEmotion.SAD)).toBe(
      ApiEmotion.SAD,
    );
    expect(convertDisplayToEmotionType("😢슬픔" as DisplayEmotion)).toBe(
      ApiEmotion.SAD,
    );
    expect(convertDisplayToEmotionType(DisplayEmotion.SAD)).toBe("sad");
  });
  it("should return GRUMPY emotion type", () => {
    expect(convertDisplayToEmotionType(DisplayEmotion.GRUMPY)).toBe(
      ApiEmotion.GRUMPY,
    );
    expect(convertDisplayToEmotionType("😠까칠" as DisplayEmotion)).toBe(
      ApiEmotion.GRUMPY,
    );
    expect(convertDisplayToEmotionType(DisplayEmotion.GRUMPY)).toBe("grumpy");
  });
  it("should return ANGRY emotion type", () => {
    expect(convertDisplayToEmotionType(DisplayEmotion.ANGRY)).toBe(
      ApiEmotion.ANGRY,
    );
    expect(convertDisplayToEmotionType("😡화남" as DisplayEmotion)).toBe(
      ApiEmotion.ANGRY,
    );
    expect(convertDisplayToEmotionType(DisplayEmotion.ANGRY)).toBe("angry");
  });
  it("should throw an error for unknown emotion", () => {
    expect(() =>
      convertDisplayToEmotionType("unknown" as DisplayEmotion),
    ).toThrow("Unknown emotion: unknown");
  });
});
