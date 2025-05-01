import { ApiAnimalType } from "@/types/animal";
import { ApiEmotion } from "@/types/Emotion";
import IPostDetailData from "@/types/PostDetailData";

export const dummyPostDetail: IPostDetailData = {
  id: 1,
  userId: 1,
  nickname: "TestUser",
  profileImageUrl: "",
  transformedContent: `흠, 오늘 날씨? 나쁘지 않군. 내가 산책 나가주기엔 딱 좋은 정도지. \n☀️ 밖에 나가면 또 사람들이 나 보느라 정신 못 차리겠지, 뭐. 이번 주 벚꽃이 예쁘다던데… 그래, 꽃도 나만큼은 아니겠지만 꽤 볼만할지도. 하지만 벚꽃보다 내가 더 예쁘다는 건 부정 못 하겠지? \n🌸✨ 나 없인 봄도 심심할 거다옹.`,
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
