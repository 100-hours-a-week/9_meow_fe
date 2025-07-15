import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NicknameInput from "../NicknameInput";
import { useState } from "react";

jest.mock("@/api/queries/signupQueries", () => ({
  signupQueries: {
    signup: () => ({
      mutationFn: jest.fn(),
    }),
    checkNickname: () => ({
      mutationFn: jest.fn(),
    }),
  },
}));

jest.mock("@/api/queries/loginQueries", () => ({
  loginQueries: {
    login: () => ({
      mutationFn: jest.fn(),
    }),
  },
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithQueryClient = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );
};

// 테스트용 래퍼 컴포넌트
// eslint-disable-next-line react-refresh/only-export-components
const TestWrapper = () => {
  const [nicknameValue, setNicknameValue] = useState("");
  return (
    <NicknameInput
      nicknameValue={nicknameValue}
      setNicknameValue={setNicknameValue}
    />
  );
};

describe("NicknameInput", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call setNicknameValue when 사용자 입력", async () => {
    // given
    renderWithQueryClient(<TestWrapper />);

    // when
    const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
    await user.type(input, "테스트");

    // then
    expect(input).toHaveValue("테스트");
  });

  describe("중복 확인 버튼", () => {
    it("should be disabled when 닉네임 없는 경우", () => {
      // given
      renderWithQueryClient(<TestWrapper />);

      // when, then
      const button = screen.getByRole("button", { name: "중복 확인" });
      expect(button).toBeDisabled();
    });

    it("should be disabled when 닉네임 너무 짧은 경우", async () => {
      // given
      renderWithQueryClient(<TestWrapper />);

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      await user.type(input, "테");

      // then
      const button = screen.getByRole("button", { name: "중복 확인" });
      expect(button).toBeDisabled();
    });

    it("should be disabled when 닉네임 너무 긴 경우", async () => {
      // given
      renderWithQueryClient(<TestWrapper />);

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      await user.type(
        input,
        "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트",
      );

      // then
      const button = screen.getByRole("button", { name: "중복 확인" });
      expect(button).toBeDisabled();
    });

    it("should be disabled when 닉네임 이모지 포함할 경우", async () => {
      // given
      renderWithQueryClient(<TestWrapper />);

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      await user.type(input, "테스트😊");

      // then
      const button = screen.getByRole("button", { name: "중복 확인" });
      expect(button).toBeDisabled();
    });

    it("should be enabled when 닉네임 유효한 경우", async () => {
      // given
      renderWithQueryClient(<TestWrapper />);

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      await user.type(input, "테스트");

      // then
      const button = screen.getByRole("button", { name: "중복 확인" });
      expect(button).not.toBeDisabled();
    });
  });

  describe("에러 메시지", () => {
    it("should show when 닉네임 너무 짧은 경우", async () => {
      // given
      renderWithQueryClient(<TestWrapper />);

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      await user.type(input, "테");

      // then
      expect(
        screen.getByText("닉네임은 3자 이상이어야 한다옹"),
      ).toBeInTheDocument();
    });

    it("should show when 이모지 포함한 경우", async () => {
      // given
      renderWithQueryClient(<TestWrapper />);

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      await user.type(input, "테스트😊");

      // then
      expect(screen.getByText("이모지 없이 적어달라옹")).toBeInTheDocument();
    });

    it("should show when 닉네임 너무 긴 경우", async () => {
      // given
      renderWithQueryClient(<TestWrapper />);

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      await user.type(
        input,
        "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트",
      );

      // then
      expect(
        screen.getByText("닉네임은 15자 이하여야 한다옹"),
      ).toBeInTheDocument();
    });

    it("should not show when 닉네임 유효한 경우", async () => {
      // given
      renderWithQueryClient(<TestWrapper />);

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      await user.type(input, "테스트");

      // then
      expect(screen.queryByText(/닉네임은/)).not.toBeInTheDocument();
      expect(screen.queryByText(/이모지/)).not.toBeInTheDocument();
    });
  });
});
