import { getPostDetail } from "@/api/post";
import IPostDetailData from "@/types/PostDetailData";
import { useQuery } from "@tanstack/react-query";

export const usePostDetailQuery = (postId: number) => {
  const fetchPostDetail = async () => {
    const response = await getPostDetail(postId);
    return response;
  };

  return useQuery<IPostDetailData, Error>({
    queryKey: ["post", postId],
    queryFn: fetchPostDetail,
  });
};
