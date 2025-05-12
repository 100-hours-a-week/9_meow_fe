import { CreatePostForm } from "@/components/pages";
<<<<<<< HEAD

function CreatePostPage() {
=======
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "@/store/useTokenStore";

function CreatePostPage() {
  const navigate = useNavigate();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    const token = localStorage.getItem(TOKEN_KEY);
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
  }, [navigate]);

>>>>>>> origin/dev
  return <CreatePostForm />;
}

export default CreatePostPage;
