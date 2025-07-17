import { DisplayAnimalType, ShortDisplayAnimalType } from "@/types/animal";
import { ApiAnimalType } from "@/types/animal";

// AnimalType을 한글로 표시하는 함수
export function convertAnimalTypeToDisplay(
  animalType: ApiAnimalType,
): DisplayAnimalType {
  switch (animalType) {
    case ApiAnimalType.CAT:
      return DisplayAnimalType.CAT;
    case ApiAnimalType.DOG:
      return DisplayAnimalType.DOG;
    case ApiAnimalType.HAMSTER:
      return DisplayAnimalType.HAMSTER;
    case ApiAnimalType.RACCOON:
      return DisplayAnimalType.RACCOON;
    case ApiAnimalType.MONKEY:
      return DisplayAnimalType.MONKEY;
    default:
      throw new Error(`Unknown animal type: ${animalType}`);
  }
}

// 한글 문자열을 AnimalType으로 변환하는 함수
export function convertDisplayToAnimalType(
  display: DisplayAnimalType,
): ApiAnimalType {
  switch (display) {
    case DisplayAnimalType.CAT:
      return ApiAnimalType.CAT;
    case DisplayAnimalType.DOG:
      return ApiAnimalType.DOG;
    case DisplayAnimalType.HAMSTER:
      return ApiAnimalType.HAMSTER;
    case DisplayAnimalType.RACCOON:
      return ApiAnimalType.RACCOON;
    case DisplayAnimalType.MONKEY:
      return ApiAnimalType.MONKEY;
    default:
      throw new Error(`Unknown animal type: ${display}`);
  }
}

// AnimalType을 이모지로 변환하는 함수
export function convertChatAnimalTypeToShortDisplay(
  animalType: ApiAnimalType,
): ShortDisplayAnimalType {
  switch (animalType) {
    case ApiAnimalType.CAT:
      return ShortDisplayAnimalType.CAT;
    case ApiAnimalType.DOG:
      return ShortDisplayAnimalType.DOG;
    case ApiAnimalType.HAMSTER:
      return ShortDisplayAnimalType.HAMSTER;
    case ApiAnimalType.RACCOON:
      return ShortDisplayAnimalType.RACCOON;
    case ApiAnimalType.MONKEY:
      return ShortDisplayAnimalType.MONKEY;
    default:
      throw new Error(`Unknown animal type: ${animalType}`);
  }
}
