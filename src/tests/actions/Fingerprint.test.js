import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useVariables, useNextMFA, updateField } from "../../components/actions/FreePlayUtils";
import Fingerprint from "../../components/actions/Fingerprint";
import firebaseUtils from "../../firebase";

// Mock the dependencies
jest.mock("../../components/actions/FreePlayUtils", () => ({
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
      runCode: "test123",
      phone: false,
      finished: false,
    });

    jest.clearAllMocks();
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
    expect(firebaseUtils.updateField).toHaveBeenCalledWith("test123", "fingerprint", "finished");
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
  });
});
