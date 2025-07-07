import { DisplayAnimalType, ShortDisplayAnimalType } from "@/types/animal";
import { ApiAnimalType } from "@/types/animal";

// AnimalType을 한글로 표시하는 함수
export function convertAnimalTypeToDisplay(
  animalType: ApiAnimalType,
): DisplayAnimalType {
  if (animalType === ApiAnimalType.CAT) return DisplayAnimalType.CAT;
  if (animalType === ApiAnimalType.DOG) return DisplayAnimalType.DOG;
  throw new Error(`Unknown animal type: ${animalType}`);
}

// 한글 문자열을 AnimalType으로 변환하는 함수
export function convertDisplayToAnimalType(
  display: DisplayAnimalType,
): ApiAnimalType {
  if (display === DisplayAnimalType.CAT) return ApiAnimalType.CAT;
  if (display === DisplayAnimalType.DOG) return ApiAnimalType.DOG;
  throw new Error(`Unknown animal type: ${display}`);
}

export function convertChatAnimalTypeToShortDisplay(
  animalType: ApiAnimalType,
): ShortDisplayAnimalType {
  if (animalType === ApiAnimalType.CAT) return ShortDisplayAnimalType.CAT;
  if (animalType === ApiAnimalType.DOG) return ShortDisplayAnimalType.DOG;
  throw new Error(`Unknown animal type: ${animalType}`);
}
