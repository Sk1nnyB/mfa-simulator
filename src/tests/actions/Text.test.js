import React from 'react';
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useVariables, useNextMFA } from "../../hooks/freeplay/FreePlayUtils";
import firebaseUtils from "../../firebase";
import Text from "../../components/actions/Text";

jest.mock("../../hooks/freeplay/FreePlayUtils", () => ({
  useVariables: jest.fn(),
  useNextMFA: jest.fn(),
}));

jest.mock("../../firebase", () => ({
  setField: jest.fn(),
  getField: jest.fn(),
}));

describe("Text Component", () => {
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
    global.alert = jest.fn();
  });

  test("skips on pre-finished", async () => {
    // Arrange
    useVariables.mockReturnValue({
      finished: true,
    });
    await act(async () => {
      render(<Text />);
    });

    // Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });

  test("initializes firebase with no preset code", async () => {
    // Arrange
    firebaseUtils.getField.mockResolvedValue(null);
    jest.spyOn(global.Math, "random").mockReturnValue(0.5678);
    await act(async () => {
      render(<Text />);
    });
    const generatedCode = Math.floor(0.5678 * 9000) + 1000;

    // Assert
    expect(firebaseUtils.setField).toHaveBeenCalledWith(123456, "text_code", generatedCode);

    // Clean up
    global.Math.random.mockRestore();
  });

  test("initializes firebase with preset code", async () => {
    // Arrange
    firebaseUtils.getField.mockResolvedValue(4321);
    await act(async () => {
      render(<Text />);
    });

    // Assert
    expect(firebaseUtils.setField).toHaveBeenCalledWith(123456, "text_code", 4321);
  });

  test("renders mobile redirect", async () => {
    // Arrange
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: true,
      finished: false,
    });
    await act(async () => {
      render(<Text />);
    });

    // Assert
    expect(screen.getByText(/Go to your mobile device now!/i)).toBeInTheDocument();
    expect(screen.getByText(/Run Code:/i)).toBeInTheDocument();
    expect(screen.getByText("123456")).toBeInTheDocument();
  });

  test("renders action", async () => {
    // Arrange
    jest.spyOn(global.Math, "random").mockReturnValue(0.5678);
    await act(async () => {
      render(<Text />);
    });
    const generatedCode = Math.floor(0.5678 * 9000) + 1000;

    // Assert
    expect(screen.getByText(/Security Code/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Input Code/i })).toBeInTheDocument();
    expect(screen.getByText(/Hey! We've noticed you've attempted to log into your Manchester Email!/i)).toBeInTheDocument();
    expect(screen.getByText(/Your code is:/i)).toHaveTextContent(`Your code is: ${generatedCode}`);

    global.Math.random.mockRestore();
  });

  test("submit incorrect code button",  async () => {
    // Arrange
    firebaseUtils.getField.mockResolvedValue(1234);
    await act(async () => {
      render(<Text />);
    });
    await act(async () => {});

    // Act
    fireEvent.change(screen.getByPlaceholderText('Enter Code Here!'), { target: { value: 5678 } }); // Enter an incorrect code
    fireEvent.click(screen.getByRole("button", { name: /Input Code/i }));

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Entered Security Code: 5678 is not correct! Try again.');
    expect(useNextMFA()).not.toHaveBeenCalled();
  });

  test("submit correct code button", async () => {
    // Arrange
    firebaseUtils.getField.mockResolvedValue(1234);
    await act(async () => {
      render(<Text />);
    });

    // Act
    fireEvent.change(screen.getByPlaceholderText('Enter Code Here!'), { target: { value: 1234 } });
    fireEvent.click(screen.getByRole("button", { name: /Input Code/i }));

    expect(mockHandleNextMFA).toHaveBeenCalled();
  });
});