import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useVariables, useNextMFA } from "../../hooks/freeplay/FreePlayUtils";
import Fingerprint from "../../components/actions/Fingerprint";

jest.mock("../../hooks/freeplay/FreePlayUtils", () => ({
  useVariables: jest.fn(),
  useNextMFA: jest.fn(),
}));

describe("Fingerprint Component", () => {
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
    jest.useFakeTimers();
  });

  test("skips on pre-finished", async () => {
    // Arrange
    useVariables.mockReturnValue({
      finished: true,
    });
    render(<Fingerprint />);

    // Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });

  test("renders fingerprint scanner", () => {
    // Arrange
    render(<Fingerprint />);

    // Assert
    expect(screen.getByText(/Place your "finger" here!/i)).toBeInTheDocument();
  });

  test("starts scanning on hover", () => {
    // Arrange
    render(<Fingerprint />);
    const scanContainer = screen.getByText(/Place your "finger" here!/i);

    // Act
    fireEvent.mouseEnter(scanContainer);

    // Assert
    expect(screen.getByText(/Scanning "finger"... Please wait.../i)).toBeInTheDocument();
  });

  test("scanner bar start scanning", () => {
    // Arrange
    render(<Fingerprint />);
    const scanContainer = screen.getByText(/Place your "finger" here!/i);

    // Act
    fireEvent.mouseEnter(scanContainer);
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Assert
    expect(screen.getByText(/Scanning "finger"... Please wait.../i)).toBeInTheDocument();
  });

  test("scanner bar stops scanning on finish", () => {
    // Arrange
    render(<Fingerprint />);
    const scanContainer = screen.getByText(/Place your "finger" here!/i);

    // Act
    fireEvent.mouseEnter(scanContainer);
    act(() => {
      jest.advanceTimersByTime(2500);
    });

    // Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });

  test("scanner bar stop scanning on exit", () => {
    // Arrange
    render(<Fingerprint />);
    const scanContainer = screen.getByText(/Place your "finger" here!/i);

    // Act
    fireEvent.mouseEnter(scanContainer);
    fireEvent.mouseLeave(scanContainer);

    // Assert
    expect(screen.getByText(/Place your "finger" here!/i)).toBeInTheDocument();
    expect(mockHandleNextMFA).not.toHaveBeenCalled();
  });
});
