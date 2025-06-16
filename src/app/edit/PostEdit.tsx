import { EditPostForm } from "@/components/pages";
import { useParams } from "react-router-dom";

export default function PostEdit() {
  const { postId } = useParams();

  return <EditPostForm postId={Number(postId)} />;
}
