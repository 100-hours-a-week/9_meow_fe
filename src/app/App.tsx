import { dummyPosts } from "@/assets/dummy-posts";
import { PostCard } from "@/components/common";
import { IPostContent } from "@/components/common/PostCard/PostContent";
import { IUserItem } from "@/components/common/UserItem";
import { IPostSummaryData } from "@/types/PostSummaryData";
import { IPostFooter } from "@/components/common/PostCard/PostFooter";
function App() {
  return (
    <div className="pb-16 flex flex-col gap-2.5">
      {dummyPosts.map((post: IPostSummaryData) => {
        const userInfo: IUserItem = {
          userId: post.userId,
          nickname: post.nickname,
          animalType: post.postType,
          profileImageUrl:
            post.profileImageUrl === "" ? undefined : post.profileImageUrl,
        };
        const postContent: IPostContent = {
          postId: post.id,
          thumbnailUrl:
            post.thumbnailUrl === "" ? undefined : post.thumbnailUrl,
          content: post.transformedContent,
          animalType: post.postType,
          timestamp: post.createdAt,
          emotion: post.emotion,
        };
        const postInfo: IPostFooter = {
          postId: post.id,
          didLike: post.didLike,
          likeCount: post.likeCount,
          commentCount: post.commentCount,
        };
        return (
          <PostCard key={`post-${post.id}`}>
            <PostCard.Header userInfo={userInfo} />
            <PostCard.Content {...postContent} />
            <PostCard.Footer {...postInfo} />
          </PostCard>
        );
      })}
    </div>
  );
}

export default App;
