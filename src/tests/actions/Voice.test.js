import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { useVariables, useNextMFA } from "../../hooks/freeplay/FreePlayUtils";
import useSpeechToText from "../../hooks/speechToText";
import Voice from "../../components/actions/Voice";

jest.mock("../../hooks/freeplay/FreePlayUtils", () => ({
  useVariables: jest.fn(),
  useNextMFA: jest.fn(),
}));

jest.mock("../../hooks/speechToText", () => jest.fn());

describe("Voice Component", () => {
  let mockHandleNextMFA;
  let mockStartInput;
  let mockStopInput;

  beforeEach(() => {
    jest.clearAllMocks();
    mockStartInput = jest.fn();
    mockStopInput = jest.fn();
    mockHandleNextMFA = jest.fn();
    useNextMFA.mockReturnValue(mockHandleNextMFA);
    global.alert = jest.fn();
    useVariables.mockReturnValue({
      runCode: "123456",
      phone:  true,
      finished: false,
    });
    global.alert = jest.fn();
  });

  test("skips on pre-finished", async () => {
    // Arrange
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: false,
      finished: true,
    });

    useSpeechToText.mockReturnValue({
      listening: false,
      input: "",
      startInput: jest.fn(),
      stopInput: jest.fn(),
    });

    await act(async () => {
      render(<Voice />);
    });

    // Act / Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });

  test("renders action", () => {
    // Arrange
    useSpeechToText.mockReturnValue({
      listening: false,
      input: "",
      startInput: jest.fn(),
      stopInput: jest.fn(),
    });

    render(<Voice />);

    expect(screen.getByText("Voice")).toBeInTheDocument();
    expect(screen.getByText("Start Recording")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("start/stop recording buttons", () => {
    // Arrange
    const startInput = jest.fn();
    const stopInput = jest.fn();
    useVariables.mockReturnValue({
      runCode: "123456",
      phone:  true,
      finished: false,
    });
    useSpeechToText.mockReturnValue({
      listening: false,
      input: "",
      startInput,
      stopInput,
    });
    render(<Voice />);

    // Act
    fireEvent.click(screen.getByText("Start Recording"));

    // Assert
    expect(startInput).toHaveBeenCalled();

    // Arrange
    useSpeechToText.mockReturnValue({
      listening: true,
      input: "this is a voice phrase",
      startInput,
      stopInput,
    });
    render(<Voice />);

    // Act
    fireEvent.click(screen.getByText("Stop Listening"));

    // Assert
    expect(stopInput).toHaveBeenCalled();
  });

  test("changes text area on speaking", async () => {
    // Arrange
    const mockInput = "this is a test input";
    useSpeechToText.mockReturnValue({
      listening: false,
      input: mockInput,
      startInput: mockStartInput,
      stopInput: mockStopInput,
    });
    render(<Voice />);

    // Assert
    expect(screen.getByRole("textbox").value).toBe("The voice phrase is: 'this is a voice phrase'.");

    // Act
    fireEvent.click(screen.getByText("Start Recording"));
    useSpeechToText.mockReturnValue({
      listening: true,
      input: mockInput,
      startInput: mockStartInput,
      stopInput: mockStopInput,
    });
    render(<Voice />);
    const textareas = screen.getAllByRole("textbox");
    await waitFor(() => expect(textareas[1].value).toBe(mockInput));

    // Assert
    expect(textareas[1].value).toBe(mockInput);
  });

  test("submitting correct voice input while recording", async () => {
    // Arrange
    const mockInput = "this is a voice phrase";
    useSpeechToText.mockReturnValue({
      listening: true,
      input: mockInput,
      startInput: mockStartInput,
      stopInput: mockStopInput,
    });
    render(<Voice />);
    await waitFor(() => expect(screen.getByRole("textbox").value).toBe(mockInput));

    // Act
    fireEvent.click(screen.getByText("Submit"));

    // Assert
    expect(screen.getByText("Submit")).toBeDisabled();
    await waitFor(() => expect(mockHandleNextMFA).not.toHaveBeenCalled());
  });

  test("submitting correct voice input", async () => {
    // Arrange
    const mockInput = "this is a voice phrase";
    useSpeechToText.mockReturnValue({
      listening: true,
      input: mockInput,
      startInput: mockStartInput,
      stopInput: mockStopInput,
    });
    render(<Voice />);
    await waitFor(() => expect(screen.getByRole("textbox").value).toBe(mockInput));
    useSpeechToText.mockReturnValue({
      listening: false,
      input: mockInput,
      startInput: mockStartInput,
      stopInput: mockStopInput,
    });

    // Act
    fireEvent.click(screen.getByText("Stop Listening"));
    fireEvent.click(screen.getByText("Submit"));

    // Assert
    expect(screen.getByText("Submit")).not.toBeDisabled();
    await waitFor(() => expect(mockHandleNextMFA).toHaveBeenCalled());
  });

  test("submitting incorrect voice input shows alert", async () => {
    // Arrange
    const mockInput = "wrong";
    useSpeechToText.mockReturnValue({
      listening: true,
      input: mockInput,
      startInput: mockStartInput,
      stopInput: mockStopInput,
    });
    render(<Voice />);
    await waitFor(() => expect(screen.getByRole("textbox").value).toBe(mockInput));
    useSpeechToText.mockReturnValue({
      listening: false,
      input: mockInput,
      startInput: mockStartInput,
      stopInput: mockStopInput,
    });

    // Act
    fireEvent.click(screen.getByText("Stop Listening"));
    fireEvent.click(screen.getByText("Submit"));

    // Assert
    await waitFor(() => {
          expect(global.alert).toHaveBeenCalledWith("Entered Voice Phrase: wrong is not correct! Try again.");
    });
  });

  test("skipping voice input triggers MFA", () => {
    // Arrange
    useSpeechToText.mockReturnValue({
      listening: false,
      input: "",
      startInput: jest.fn(),
      stopInput: jest.fn(),
    });
    render(<Voice />);

    // Act
    fireEvent.click(screen.getByText("Skip"));

    // Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });
});
