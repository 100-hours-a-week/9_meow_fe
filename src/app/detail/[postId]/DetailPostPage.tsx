import { dummyPostDetail } from "@/assets/dummy-post-detail";
import { ImageCarousel } from "@/components/pages";
import { useParams } from "react-router-dom";

function DetailPostPage() {
  const { postId } = useParams();

  return (
    <div className="flex flex-col gap-4 items-center p-5">
      <h1>Post Detail 페이지</h1>
      <p>Post ID: {postId}</p>
      <ImageCarousel images={dummyPostDetail.imageUrls} />
    </div>
  );
}

export default DetailPostPage;
