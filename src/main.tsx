import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./app/App";
import CreatePostPage from "./app/create/CreatePostPage";
import DetailPostPage from "./app/detail/[postId]/DetailPostPage";
import LoginPage from "./app/login/LoginPage";
import SignupPage from "./app/signup/SignupPage";
import { Button } from "./components/ui/button";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <div>
        <nav>
          <Link to="/">
            <Button variant="default">Home</Button>
          </Link>
          <Link to="/create">
            <Button variant="secondary">게시글 작성</Button>
          </Link>
          <Link to="/detail/3">
            <Button variant="outline">3번 게시물 상세보기</Button>
          </Link>
          <Link to="/login">
            <Button variant="link">로그인</Button>
          </Link>
          <Link to="/signup">
            <Button variant="destructive">회원가입</Button>
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/detail/:postId" element={<DetailPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  </StrictMode>
);
