import { render, screen, fireEvent } from "@testing-library/react";
import Authentication_App from "../../components/actions/Authentication_App";
import { useVariables, useNextMFA } from "../../components/actions/FreePlayUtils";
import firebaseUtils from "../../firebase";

jest.mock("../../components/actions/FreePlayUtils", () => ({
  useVariables: jest.fn(),
  useNextMFA: jest.fn(),
}));

jest.mock("../../firebase", () => ({
  updateField: jest.fn(),
}));

describe("Authentication_App Component", () => {
  let mockHandleNextMFA;

  beforeEach(() => {
    mockHandleNextMFA = jest.fn();
    useNextMFA.mockReturnValue(mockHandleNextMFA);

    jest.clearAllMocks(); // Reset mocks before each test
  });

  test("skips on pre-finished", async () => {
    // Arrange
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: false,
      finished: true,
    });
    render(<Authentication_App />);

    // Act / Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });

  test("initializes firebase", () => {
    // Arrange
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: false,
      finished: false,
    });
    render(<Authentication_App />);

    // Assert
    expect(firebaseUtils.updateField).toHaveBeenCalledWith(123456, "authentication_app", "started");
    expect(firebaseUtils.updateField).toHaveBeenCalledWith(123456, "status", "active");
  });

  test("renders mobile redirect", () => {
    // Arrange
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: true,
      finished: false,
    });
    render(<Authentication_App />);

    // Act / Assert
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

    // Act / Assert
    expect(screen.getByText(/Log in detected!/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Approve/i })).toBeInTheDocument();
  });

  test("approve button", () => {
    // Arrange
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: false,
      finished: false,
    });
    render(<Authentication_App />);

    // Act
    const approveButton = screen.getByRole("button", { name: /Approve/i });
    fireEvent.click(approveButton);

    // Assert
    expect(firebaseUtils.updateField).toHaveBeenCalledWith(123456, "authentication_app", "finished");
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });
});
