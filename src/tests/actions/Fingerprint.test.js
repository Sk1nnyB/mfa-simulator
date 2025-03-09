import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useVariables, useNextMFA, updateField } from "../../hooks/freeplay/FreePlayUtils";
import Fingerprint from "../../components/actions/Fingerprint";
import firebaseUtils from "../../firebase";

// Mock the dependencies
jest.mock("../../hooks/freeplay/FreePlayUtils", () => ({
  useVariables: jest.fn(),
  useNextMFA: jest.fn(),
}));

jest.mock("../../firebase", () => ({
  updateField: jest.fn(),
}));


describe("Fingerprint Component", () => {
  let mockHandleNextMFA;

  beforeEach(() => {
    mockHandleNextMFA = jest.fn();
    useNextMFA.mockReturnValue(mockHandleNextMFA);
    jest.useFakeTimers();
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: false,
      finished: false,
    });

    jest.clearAllMocks();
  });

  test("skips on pre-finished", async () => {
    // Arrange
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: false,
      finished: true,
    });
    render(<Fingerprint />);

    // Act / Assert
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
