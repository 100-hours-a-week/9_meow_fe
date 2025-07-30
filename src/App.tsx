import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef, lazy, Suspense } from "react";
import { Background, Header, NavigationBar } from "./components/common";
import "./index.css";

// Lazy load all page components
const MainPage = lazy(() => import("./app/MainPage"));
const CreatePostPage = lazy(() => import("./app/create/CreatePostPage"));
const DetailPostPage = lazy(
  () => import("./app/detail/[postId]/DetailPostPage"),
);
const LoginPage = lazy(() => import("./app/login/LoginPage"));
const SignupPage = lazy(() => import("./app/signup/SignupPage"));
const NotFoundPage = lazy(() => import("./app/not-found/NotFoundPage"));
const RedirectPage = lazy(() => import("./app/redirect/RedirectPage"));
const PostEdit = lazy(() => import("./app/edit/PostEdit"));
const MyPageRedirectPage = lazy(
  () => import("./app/mypage/redirect/MyPageRedirectPage"),
);
const ProfileEditPage = lazy(() => import("./app/mypage/edit/ProfileEditPage"));
const MemberPage = lazy(() => import("./app/member/[userId]/MemberPage"));
const FollowerPage = lazy(
  () => import("./app/member/[userId]/follower/FollowerPage"),
);
const FollowingPage = lazy(
  () => import("./app/member/[userId]/following/FollowingPage"),
);
const EventMainPage = lazy(() => import("./app/event/EventMainPage"));
const EventSubmitPage = lazy(
  () => import("./app/event/submit/[eventId]/EventSubmitPage"),
);
const EventVotePage = lazy(
  () => import("./app/event/vote/[eventId]/EventVotePage"),
);
const EventDetailPage = lazy(
  () => import("./app/event/[eventId]/EventDetailPage"),
);
const ChatPage = lazy(() => import("./app/chat/ChatPage"));

const queryClient = new QueryClient();

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Background>
          <div className="relative w-full flex flex-col bg-gradient-to-br from-rose-100 to-yellow-100 max-w-[430px] mx-auto outline outline-foreground/20 shadow-xl overflow-y-hidden">
            <Header />
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto mb-12"
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <MainPage scrollContainerRef={scrollContainerRef} />
                    }
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
                    element={
                      <MemberPage scrollContainerRef={scrollContainerRef} />
                    }
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
              </Suspense>
            </div>
            <NavigationBar scrollContainerRef={scrollContainerRef} />
          </div>
        </Background>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
