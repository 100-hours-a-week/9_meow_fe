import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./app/App";
import CreatePostPage from "./app/create/CreatePostPage";
import DetailPostPage from "./app/detail/[postId]/DetailPostPage";
import LoginPage from "./app/login/LoginPage";
import SignupPage from "./app/signup/SignupPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/create">게시글 작성</Link> |{" "}
          <Link to="/detail/3">3번 게시물 상세보기</Link> |{" "}
          <Link to="/login">로그인</Link> | <Link to="/signup">회원가입</Link>
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
