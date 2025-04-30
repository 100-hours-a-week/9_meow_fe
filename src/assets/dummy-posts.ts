import { ApiAnimalType } from "@/types/animal";
import { ApiEmotion } from "@/types/Emotion";
import { IPostSummaryData } from "@/types/PostSummaryData";

export const dummyPosts: IPostSummaryData[] = [
  {
    id: 3,
    userId: 1,
    nickname: "TestUser",
    profileImageUrl: "",
    title: "첫 번째 게시글",
    transformedContent: "이것은 첫 번째 게시글의 변환된 내용입니다.",
    thumbnailUrl: "",
    emotion: ApiEmotion.HAPPY,
    postType: ApiAnimalType.CAT,
    imageUrls: [],
    didLike: false,
    likeCount: 12,
    commentCount: 3,
    viewCount: 0,
    createdAt: new Date("2025-04-28 20:37:42"),
    updatedAt: new Date("2025-04-28 20:37:42"),
  },
  {
    id: 4,
    userId: 1,
    nickname: "TestUser",
    profileImageUrl: "",
    title: "두 번째 게시글",
    transformedContent: "이것은 두 번째 게시글의 변환된 내용입니다.",
    thumbnailUrl: "",
    emotion: ApiEmotion.SAD,
    postType: ApiAnimalType.DOG,
    imageUrls: [],
    didLike: true,
    likeCount: 0,
    commentCount: 0,
    viewCount: 0,
    createdAt: new Date("2025-04-28 20:37:42"),
    updatedAt: new Date("2025-04-28 20:37:42"),
  },
];
