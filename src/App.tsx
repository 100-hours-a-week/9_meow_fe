import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./app/MainPage";
import CreatePostPage from "./app/create/CreatePostPage";
import DetailPostPage from "./app/detail/[postId]/DetailPostPage";
import LoginPage from "./app/login/LoginPage";
import SignupPage from "./app/signup/SignupPage";
import NotFoundPage from "./app/not-found/NotFoundPage";
import RedirectPage from "./app/redirect/RedirectPage";
import { Header, NavigationBar } from "./components/common";
import "./index.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="relative flex flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/create" element={<CreatePostPage />} />
              <Route path="/detail/:postId" element={<DetailPostPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/redirect" element={<RedirectPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <NavigationBar />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
