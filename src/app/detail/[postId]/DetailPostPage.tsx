import { useParams } from "react-router-dom";

function DetailPostPage() {
  const { postId } = useParams();

  return (
    <div>
      <h1>Post Detail 페이지</h1>
      <p>Post ID: {postId}</p>
    </div>
  );
}

export default DetailPostPage;
