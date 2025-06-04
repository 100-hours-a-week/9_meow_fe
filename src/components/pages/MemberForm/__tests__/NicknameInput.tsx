import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NicknameInput from "../NicknameInput";

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

describe("NicknameInput", () => {
  const mockSetNicknameValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call setNicknameValue when 사용자 입력", () => {
    // given
    renderWithQueryClient(
      <NicknameInput
        nicknameValue=""
        setNicknameValue={mockSetNicknameValue}
      />,
    );

    // when
    const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
    fireEvent.change(input, { target: { value: "테스트" } });

    // then
    expect(mockSetNicknameValue).toHaveBeenCalledWith("테스트");
  });

  describe("중복 확인 버튼", () => {
    it("should be disabled when 닉네임 없는 경우", () => {
      // given
      renderWithQueryClient(
        <NicknameInput
          nicknameValue=""
          setNicknameValue={mockSetNicknameValue}
        />,
      );

      // when, then
      const button = screen.getByRole("button", { name: "중복 확인" });
      expect(button).toBeDisabled();
    });

    it("should be disabled when 닉네임 너무 짧은 경우", () => {
      // given
      renderWithQueryClient(
        <NicknameInput
          nicknameValue=""
          setNicknameValue={mockSetNicknameValue}
        />,
      );

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      fireEvent.change(input, { target: { value: "테" } });

      // then
      const button = screen.getByRole("button", { name: "중복 확인" });
      expect(button).toBeDisabled();
    });

    it("should be disabled when 닉네임 너무 긴 경우", () => {
      // given
      renderWithQueryClient(
        <NicknameInput
          nicknameValue=""
          setNicknameValue={mockSetNicknameValue}
        />,
      );

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      fireEvent.change(input, {
        target: {
          value: "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트",
        },
      });

      // then
      const button = screen.getByRole("button", { name: "중복 확인" });
      expect(button).toBeDisabled();
    });

    it("should be disabled when 닉네임 이모지 포함할 경우", () => {
      // given
      renderWithQueryClient(
        <NicknameInput
          nicknameValue=""
          setNicknameValue={mockSetNicknameValue}
        />,
      );

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      fireEvent.change(input, { target: { value: "테스트😊" } });

      // then
      const button = screen.getByRole("button", { name: "중복 확인" });
      expect(button).toBeDisabled();
    });

    it("should be enabled when 닉네임 유효한 경우", () => {
      // given
      const { rerender } = renderWithQueryClient(
        <NicknameInput
          nicknameValue=""
          setNicknameValue={mockSetNicknameValue}
        />,
      );

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      fireEvent.change(input, { target: { value: "테스트" } });
      rerender(
        <QueryClientProvider client={queryClient}>
          <NicknameInput
            nicknameValue="테스트"
            setNicknameValue={mockSetNicknameValue}
          />
        </QueryClientProvider>,
      );

      // then
      const button = screen.getByRole("button", { name: "중복 확인" });
      expect(button).not.toBeDisabled();
    });
  });

  describe("에러 메시지", () => {
    it("should show when 닉네임 너무 짧은 경우", () => {
      // given
      renderWithQueryClient(
        <NicknameInput
          nicknameValue=""
          setNicknameValue={mockSetNicknameValue}
        />,
      );

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      fireEvent.change(input, { target: { value: "테" } });

      // then
      expect(
        screen.getByText("닉네임은 3자 이상이어야 한다옹"),
      ).toBeInTheDocument();
    });

    it("should show when 이모지 포함한 경우", () => {
      // given
      renderWithQueryClient(
        <NicknameInput
          nicknameValue=""
          setNicknameValue={mockSetNicknameValue}
        />,
      );

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      fireEvent.change(input, { target: { value: "테스트😊" } });

      // then
      expect(screen.getByText("이모지 없이 적어달라옹")).toBeInTheDocument();
    });

    it("should show when 닉네임 너무 긴 경우", () => {
      // given
      renderWithQueryClient(
        <NicknameInput
          nicknameValue=""
          setNicknameValue={mockSetNicknameValue}
        />,
      );

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      fireEvent.change(input, {
        target: {
          value: "테스트테스트테스트테스트테스트테스트테스트테스트테스트",
        },
      });

      // then
      expect(
        screen.getByText("닉네임은 15자 이하여야 한다옹"),
      ).toBeInTheDocument();
    });

    it("should not show when 닉네임 유효한 경우", () => {
      // given
      renderWithQueryClient(
        <NicknameInput
          nicknameValue=""
          setNicknameValue={mockSetNicknameValue}
        />,
      );

      // when
      const input = screen.getByPlaceholderText("닉네임을 입력하세야옹...");
      fireEvent.change(input, { target: { value: "테스트" } });

      // then
      expect(screen.queryByText(/닉네임은/)).not.toBeInTheDocument();
      expect(screen.queryByText(/이모지/)).not.toBeInTheDocument();
    });
  });
});
