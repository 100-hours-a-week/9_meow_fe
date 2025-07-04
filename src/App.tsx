import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import MainPage from "./app/MainPage";
import CreatePostPage from "./app/create/CreatePostPage";
import DetailPostPage from "./app/detail/[postId]/DetailPostPage";
import LoginPage from "./app/login/LoginPage";
import SignupPage from "./app/signup/SignupPage";
import NotFoundPage from "./app/not-found/NotFoundPage";
import RedirectPage from "./app/redirect/RedirectPage";
import PostEdit from "./app/edit/PostEdit";
import MyPageRedirectPage from "./app/mypage/redirect/MyPageRedirectPage";
import ProfileEditPage from "./app/mypage/edit/ProfileEditPage";
import MemberPage from "./app/member/[userId]/MemberPage";
import FollowerPage from "./app/member/[userId]/follower/FollowerPage";
import FollowingPage from "./app/member/[userId]/following/FollowingPage";
import EventMainPage from "./app/event/EventMainPage";
import EventSubmitPage from "./app/event/submit/[eventId]/EventSubmitPage";
import EventVotePage from "./app/event/vote/[eventId]/EventVotePage";
import EventDetailPage from "./app/event/[eventId]/EventDetailPage";
import { Background, Header, NavigationBar } from "./components/common";
import "./index.css";
import ChatPage from "./app/chat/ChatPage";

const queryClient = new QueryClient();

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Background>
          <div className="relative w-full flex flex-col bg-background max-w-[430px] mx-auto outline outline-foreground/20 shadow-xl overflow-y-hidden">
            <Header />
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto mb-12"
            >
              <Routes>
                <Route
                  path="/"
                  element={<MainPage scrollContainerRef={scrollContainerRef} />}
                />
                <Route path="/create" element={<CreatePostPage />} />
                <Route path="/detail/:postId" element={<DetailPostPage />} />
                <Route path="/edit/:postId" element={<PostEdit />} />
                <Route
                  path="/mypage/redirect"
                  element={<MyPageRedirectPage />}
                />
                <Route path="/mypage/edit" element={<ProfileEditPage />} />
                <Route
                  path="/member/:userId"
                  element={<MemberPage scrollContainerRef={scrollContainerRef} />}
                />
                <Route
                  path="/member/:userId/follower"
                  element={<FollowerPage />}
                />
                <Route
                  path="/member/:userId/following"
                  element={<FollowingPage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/redirect" element={<RedirectPage />} />
                <Route path="/event" element={<EventMainPage />} />
                <Route
                  path="/event/submit/:eventId"
                  element={<EventSubmitPage />}
                />
                <Route
                  path="/event/vote/:eventId"
                  element={<EventVotePage />}
                />
                <Route path="/event/:eventId" element={<EventDetailPage />} />
                <Route path="/chat" element={<ChatPage />} />
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
