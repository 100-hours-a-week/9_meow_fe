import { useParams } from "react-router-dom";

export default function PostEdit() {
  const { postId } = useParams();

  return <div>postId: {postId}</div>;
}
