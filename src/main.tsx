import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./app/App";
import CreatePostPage from "./app/create/CreatePostPage";
import DetailPostPage from "./app/detail/[postId]/DetailPostPage";
import LoginPage from "./app/login/LoginPage";
import SignupPage from "./app/signup/SignupPage";
import { Header, NavigationBar } from "./components/common";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <div className="relative">
        <Header />
        <NavigationBar />

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
