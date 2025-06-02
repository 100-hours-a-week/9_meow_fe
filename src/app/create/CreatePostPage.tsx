import { CreatePostForm } from "@/components/pages";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTokenStore from "@/store/useTokenStore";

function CreatePostPage() {
  const navigate = useNavigate();
  const { token } = useTokenStore();

  useEffect(() => {
    if (!token) {
      const answer = window.confirm(
        "로그인이 필요한 서비스다옹. 로그인 페이지로 이동하겠냥?",
      );
      if (answer) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [navigate, token]);

  return <CreatePostForm />;
}

export default CreatePostPage;
