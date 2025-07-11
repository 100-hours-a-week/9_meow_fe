import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignupForm from "../SignupForm";
import { useMutation } from "@tanstack/react-query";
import { signupQueries } from "@/api/queries/signupQueries";
import useKakaoIdStore from "@/store/useKakaoIdStore";
import useTokenStore from "@/store/useTokenStore";
import { loginQueries } from "@/api/queries/loginQueries";

// Mock the API instances
jest.mock("@/api/instance/aiDefaultInstance", () => ({
  __esModule: true,
  default: {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
  },
}));

jest.mock("@/api/instance/authInstance", () => ({
  __esModule: true,
  default: {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
  },
}));

jest.mock("@/api/instance/defaultInstance", () => ({
  __esModule: true,
  default: {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
  },
}));

// Mock the API-related modules
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

// Mock the hooks and modules
jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

// Mock the image API
jest.mock("@/api/image", () => ({
  uploadImageToS3: jest.fn(),
}));

// Mock the stores
jest.mock("@/store/useKakaoIdStore");
jest.mock("@/store/useTokenStore");
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("SignupForm", () => {
  const mockSetKakaoId = jest.fn();
  const mockSetToken = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the store implementation
    (useKakaoIdStore as unknown as jest.Mock).mockImplementation(() => ({
      kakaoId: "test-kakao-id",
      setKakaoId: mockSetKakaoId,
    }));
    (useTokenStore as unknown as jest.Mock).mockImplementation(() => ({
      token: null,
      setToken: mockSetToken,
    }));
  });

  it("should disable button when 회원가입 isPending", () => {
    // given
    (useMutation as jest.Mock).mockImplementation((options) => {
      // signup mutation인 경우 isPending
      if (
        options.mutationFn ===
        signupQueries.signup({
          setKakaoId: mockSetKakaoId,
          login: mockSetToken,
        }).mutationFn
      ) {
        return {
          mutate: jest.fn(),
          isPending: true,
        };
      }
      // 다른 mutation들은 기본값 반환
      return {
        mutate: jest.fn(),
        isPending: false,
      };
    });

    // when
    render(<SignupForm />);

    // then
    const submitButton =
      screen.getByText("다 적으면 누르라냥!") ||
      screen.getByText("잠시만 기다려 달라옹...");
    expect(submitButton).toBeDisabled();
  });

  it("should disable button when 로그인 isPending", () => {
    // given
    (useMutation as jest.Mock).mockImplementation((options) => {
      // login mutation인 경우 isPending
      if (
        options.mutationFn ===
        loginQueries.login({
          setToken: mockSetToken,
          navigate: jest.fn(),
        }).mutationFn
      ) {
        return {
          mutate: jest.fn(),
          isPending: true,
        };
      }
      // 다른 mutation들은 기본값 반환
      return {
        mutate: jest.fn(),
        isPending: false,
      };
    });

    // when
    render(<SignupForm />);

    // then
    const submitButton =
      screen.getByText("다 적으면 누르라냥!") ||
      screen.getByText("잠시만 기다려 달라옹...");
    expect(submitButton).toBeDisabled();
  });

  it("should disable button when 닉네임 중복 isPending", () => {
    // given
    (useMutation as jest.Mock).mockImplementation((options) => {
      // checkNickname mutation인 경우 isPending
      if (
        options.mutationFn ===
        signupQueries.checkNickname({
          setIsNicknameDuplicate: jest.fn(),
          setErrorMessage: jest.fn(),
          setSuccessMessage: jest.fn(),
        }).mutationFn
      ) {
        return {
          mutate: jest.fn(),
          isPending: true,
        };
      }
      // 다른 mutation들은 기본값 반환
      return {
        mutate: jest.fn(),
        isPending: false,
      };
    });

    // when
    render(<SignupForm />);

    // then
    const submitButton =
      screen.getByText("다 적으면 누르라냥!") ||
      screen.getByText("잠시만 기다려 달라옹...");
    expect(submitButton).toBeDisabled();
  });

  it("should disable button when 닉네임 중복인 경우", () => {
    // given
    (useMutation as jest.Mock).mockImplementation((options) => {
      // checkNickname mutation인 경우
      if (
        options.mutationFn ===
        signupQueries.checkNickname({
          setIsNicknameDuplicate: jest.fn(),
          setErrorMessage: jest.fn(),
          setSuccessMessage: jest.fn(),
        }).mutationFn
      ) {
        return {
          mutate: jest.fn(),
          isPending: false,
          isSuccess: true,
          data: true, // 닉네임 중복 응답
        };
      }
      // 다른 mutation들은 기본값 반환
      return {
        mutate: jest.fn(),
        isPending: false,
      };
    });

    // when
    render(<SignupForm />);
    const nicknameInput = screen.getByRole("textbox");
    fireEvent.change(nicknameInput, { target: { value: "test" } });

    // 닉네임 중복 체크 버튼 클릭
    const checkButton = screen.getByRole("button", { name: /중복 확인/i });
    fireEvent.click(checkButton);

    // then
    const submitButton =
      screen.getByText("다 적으면 누르라냥!") ||
      screen.getByText("잠시만 기다려 달라옹...");
    expect(submitButton).toBeDisabled();
  });

  it("should disable button when 닉네임 비어 있는 경우", () => {
    // given
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    // when
    render(<SignupForm />);

    // then
    const submitButton =
      screen.getByText("다 적으면 누르라냥!") ||
      screen.getByText("잠시만 기다려 달라옹...");
    expect(submitButton).toBeDisabled();
  });

  it("should disable button when 닉네임 중복 체크 안 된 경우", () => {
    // given
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    // when
    render(<SignupForm />);
    const nicknameInput = screen.getByRole("textbox");
    fireEvent.change(nicknameInput, { target: { value: "test" } });

    // then
    const submitButton =
      screen.getByText("다 적으면 누르라냥!") ||
      screen.getByText("잠시만 기다려 달라옹...");
    expect(submitButton).toBeDisabled();
  });
});
