import { PostCard } from "@/components/common";
import { ProfileSummary } from "@/components/pages";
import { useParams } from "react-router-dom";
import { postQueries } from "@/api/queries/postQueries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useObserver } from "@/hooks/common/useObserver";
import { useRef } from "react";
import { IPostFooter } from "@/components/common/PostCard/PostFooter";
import { IUserItem } from "@/components/common/UserItem";
import { IPostContent } from "@/components/common/PostCard/PostContent";

export default function MemberPage() {
  const { userId } = useParams();

  const {
    data: postList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    ...postQueries.userPostList({ userId: Number(userId) }),
  });

  const lastElementRef = useRef<HTMLDivElement | null>(null);
  useObserver({
    target: lastElementRef as React.RefObject<HTMLElement>,
    onIntersect: ([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 items-center">
      <ProfileSummary userId={Number(userId)} />
      <div className="flex flex-col gap-2.5 px-2 w-full">
        {postList?.pages.map((page) =>
          page.content.map((post) => {
            const userInfo: IUserItem = {
              userId: post.userId,
              nickname: post.nickname,
              animalType: post.postType,
              profileImageUrl: post.profileImageUrl ?? undefined,
            };
            const postContent: IPostContent = {
              thumbnailUrl: post.thumbnailUrl,
              content: post.transformedContent,
            };
            const postInfo: IPostFooter = {
              postId: post.id,
              didLike: post.liked,
              likeCount: post.likeCount,
              commentCount: post.commentCount,
              timestamp: new Date(post.createdAt),
              emotion: post.emotion,
            };
            return (
              <PostCard key={`post-${post.id}`} postId={post.id}>
                <PostCard.Header
                  userInfo={userInfo}
                  isMyPost={post.myPost}
                  postId={post.id}
                />
                <PostCard.Content {...postContent} />
                <PostCard.Footer {...postInfo} />
              </PostCard>
            );
          }),
        )}
        <div ref={lastElementRef} />
      </div>
    </div>
  );
}
