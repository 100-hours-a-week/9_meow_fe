import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./app/MainPage";
import CreatePostPage from "./app/create/CreatePostPage";
import DetailPostPage from "./app/detail/[postId]/DetailPostPage";
import LoginPage from "./app/login/LoginPage";
import SignupPage from "./app/signup/SignupPage";
import NotFoundPage from "./app/not-found/NotFoundPage";
import RedirectPage from "./app/redirect/RedirectPage";
import PostEdit from "./app/edit/PostEdit";
import MyPage from "./app/mypage/MyPage";
import MemberPage from "./app/member/[memberId]/MemberPage";
import { Background, Header, NavigationBar } from "./components/common";
import "./index.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Background>
          <div className="w-full flex flex-col bg-background max-w-[430px] mx-auto outline outline-foreground/20 shadow-xl overflow-y-hidden">
            <Header />
            <div className="flex-1 overflow-y-auto mb-16">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/create" element={<CreatePostPage />} />
                <Route path="/detail/:postId" element={<DetailPostPage />} />
                <Route path="/edit/:postId" element={<PostEdit />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/member/:memberId" element={<MemberPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/redirect" element={<RedirectPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            <NavigationBar />
          </div>
        </Background>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
