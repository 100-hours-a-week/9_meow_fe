import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./app/App";
import CreatePostPage from "./app/create/CreatePostPage";
import DetailPostPage from "./app/detail/[postId]/DetailPostPage";
import LoginPage from "./app/login/LoginPage";
import SignupPage from "./app/signup/SignupPage";
import NotFoundPage from "./app/not-found/NotFoundPage";
import { Header, NavigationBar } from "./components/common";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <div className="relative flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/detail/:postId" element={<DetailPostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <NavigationBar />
      </div>
    </Router>
  </StrictMode>
);
