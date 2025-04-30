import { PostCard } from "@/components/common";
import { IUserItem } from "@/components/common/UserItem";

function App() {
  const userInfo: IUserItem = {
    userId: 1,
    nickname: "홍길동",
    animalType: "고양이",
  };

  return (
    <div className="min-h-screen pb-16">
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
      <PostCard userInfo={userInfo} />
    </div>
  );
}

export default App;
