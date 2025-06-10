import {
  convertAnimalTypeToDisplay,
  convertDisplayToAnimalType,
} from "./convertAnimal";
import { DisplayAnimalType, ApiAnimalType } from "@/types/animal";

describe("convertAnimalTypeToDisplay", () => {
  it("should return CAT display animal type", () => {
    expect(convertAnimalTypeToDisplay(ApiAnimalType.CAT)).toBe(
      DisplayAnimalType.CAT,
    );
    expect(convertAnimalTypeToDisplay("cat" as ApiAnimalType)).toBe(
      DisplayAnimalType.CAT,
    );
    expect(convertAnimalTypeToDisplay(ApiAnimalType.CAT)).toBe("🐱 고양이");
  });
  it("should return DOG display animal type", () => {
    expect(convertAnimalTypeToDisplay(ApiAnimalType.DOG)).toBe(
      DisplayAnimalType.DOG,
    );
    expect(convertAnimalTypeToDisplay("dog" as ApiAnimalType)).toBe(
      DisplayAnimalType.DOG,
    );
    expect(convertAnimalTypeToDisplay(ApiAnimalType.DOG)).toBe("🐶 강아지");
  });
});

describe("convertDisplayToAnimalType", () => {
  it("should return CAT animal type", () => {
    expect(convertDisplayToAnimalType(DisplayAnimalType.CAT)).toBe(
      ApiAnimalType.CAT,
    );
    expect(convertDisplayToAnimalType("🐱 고양이" as DisplayAnimalType)).toBe(
      ApiAnimalType.CAT,
    );
    expect(convertDisplayToAnimalType(DisplayAnimalType.CAT)).toBe("cat");
  });
  it("should return DOG animal type", () => {
    expect(convertDisplayToAnimalType(DisplayAnimalType.DOG)).toBe(
      ApiAnimalType.DOG,
    );
    expect(convertDisplayToAnimalType("🐶 강아지" as DisplayAnimalType)).toBe(
      ApiAnimalType.DOG,
    );
    expect(convertDisplayToAnimalType(DisplayAnimalType.DOG)).toBe("dog");
  });
});
