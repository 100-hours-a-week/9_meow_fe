import { dummyPosts } from "@/assets/dummy-posts";
import { PostCard } from "@/components/common";
import { IPostSummaryData } from "@/types/PostSummaryData";

function App() {
  return (
    <div className="min-h-screen pb-16">
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
      {dummyPosts.map((post: IPostSummaryData) => {
        return (
          <PostCard
            key={`post-${post.id}`}
            userInfo={{
              userId: post.userId,
              nickname: post.nickname,
              animalType: post.postType,
              profileImageUrl: post.profileImageUrl,
            }}
            postInfo={{
              postId: post.id,
              didLike: post.didLike,
              likeCount: post.likeCount,
              commentCount: post.commentCount,
            }}
          />
        );
      })}
    </div>
  );
}

export default App;
