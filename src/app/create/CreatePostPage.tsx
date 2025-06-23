import { CreatePostForm } from "@/components/pages";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TOKEN_KEY } from "@/store/useTokenStore";

function CreatePostPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      const answer = window.confirm(
        "로그인이 필요한 서비스다옹. 로그인 페이지로 이동하겠냥?",
      );
      if (answer) {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      } else {
        navigate("/");
      }
    }
  }, [navigate, location.pathname]);

  return <CreatePostForm />;
}

export default CreatePostPage;
