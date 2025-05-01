import { ApiAnimalType } from "@/types/animal";
import { ApiEmotion } from "@/types/Emotion";
import IPostDetailData from "@/types/PostDetailData";

export const dummyPostDetail: IPostDetailData = {
  id: 1,
  userId: 1,
  nickname: "TestUser",
  profileImageUrl: "",
  transformedContent: "This is a dummy post",
  emotion: ApiEmotion.HAPPY,
  postType: ApiAnimalType.CAT,
  imageUrls: [
    "https://img.freepik.com/free-photo/isolated-shot-ginger-kitten-sitting-front-white-looking-right_181624-45937.jpg?semt=ais_hybrid&w=740",
    "https://i.namu.wiki/i/d1A_wD4kuLHmOOFqJdVlOXVt1TWA9NfNt_HA0CS0Y_N0zayUAX8olMuv7odG2FiDLDQZIRBqbPQwBSArXfEJlQ.webp",
    "https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg",
  ],
  commentCount: 10,
  likeCount: 10,
  didLike: false,
  createdAt: "2021-01-01",
  updatedAt: "2021-01-01",
};
