import { render, screen, fireEvent } from "@testing-library/react";
import { useVariables, useNextMFA } from "../../hooks/freeplay/FreePlayUtils";
import Authentication_App from "../../components/actions/Authentication_App";

jest.mock("../../hooks/freeplay/FreePlayUtils", () => ({
  useVariables: jest.fn(),
  useNextMFA: jest.fn(),
}));

describe("Authentication_App Component", () => {
  let mockHandleNextMFA;

  beforeEach(() => {
    jest.clearAllMocks();
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: false,
      finished: false,
    });
    mockHandleNextMFA = jest.fn();
    useNextMFA.mockReturnValue(mockHandleNextMFA);
  });

  test("skips on pre-finished", async () => {
    // Arrange
    useVariables.mockReturnValue({
      finished: true,
    });
    render(<Authentication_App />);

    // Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });

  test("renders mobile redirect", () => {
    // Arrange
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: true,
      finished: false,
    });
    render(<Authentication_App />);

    // Assert
    expect(screen.getByText(/Go to your mobile device now!/i)).toBeInTheDocument();
    expect(screen.getByText(/Run Code:/i)).toBeInTheDocument();
    expect(screen.getByText("123456")).toBeInTheDocument();
  });

  test("renders action", () => {
    // Arrange
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: false,
      finished: false,
    });
    render(<Authentication_App />);

    // Assert
    expect(screen.getByText(/Log in detected!/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Approve/i })).toBeInTheDocument();
  });

  test("approve button", () => {
    // Arrange
    render(<Authentication_App />);

    // Act
    const approveButton = screen.getByRole("button", { name: /Approve/i });
    fireEvent.click(approveButton);

    // Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });
});
