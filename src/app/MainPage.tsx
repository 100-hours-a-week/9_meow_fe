import { PostCard } from "@/components/common";
import { IPostContent } from "@/components/common/PostCard/PostContent";
import { IUserItem } from "@/components/common/UserItem";
import { IPostSummaryData } from "@/types/PostSummaryData";
import { IPostFooter } from "@/components/common/PostCard/PostFooter";
import usePostListInfiniteQuery from "@/hooks/queries/usePostListInfiniteQuery";
import { useEffect } from "react";

export default function MainPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostListInfiniteQuery();

  useEffect(() => {
    console.log(data);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="pt-2 pb-16 flex flex-col gap-2.5">
      {data?.pages.map((page) =>
        page.content.map((post: IPostSummaryData) => {
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
        })
      )}
    </div>
  );
}
