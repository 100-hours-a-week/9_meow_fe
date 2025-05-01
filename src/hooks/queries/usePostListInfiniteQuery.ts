import { useQuery } from "@tanstack/react-query";
import { IPostSummaryData } from "@/types/PostSummaryData";
import { getPostList } from "@/service/post";

const fetchPostList = async () => {
  console.log("Fetching post list...");
  try {
    const response = await getPostList({ page: 0, size: 10 });
    console.log("API Response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching post list:", error);
    throw error;
  }
};

export const usePostListInfiniteQuery = () => {
  return useQuery<IPostSummaryData[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPostList,
  });
};
