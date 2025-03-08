import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import LibraryList from "../../components/elements/library/LibraryList";

describe("LibraryList Component", () => {
  const mockOnSelect = jest.fn();
  const mfas = ["MFA 1", "MFA 2", "MFA 3", "MFA 4", "MFA 5", "MFA 6", "MFA 7", "MFA 8"];
  const selectedMFA = "MFA 2";

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock function before each test
  });

  test("renders all MFAs correctly", () => {
    // Arrange
    render(<LibraryList options={mfas} onSelect={mockOnSelect} selectedOption={selectedMFA} />);

    //Assert
    mfas.forEach(MFA => {
      expect(screen.getByText(MFA)).toBeInTheDocument();
    });
  });

  test("mfa is highlighted", () => {
    // Arrange
    render(<LibraryList options={mfas} onSelect={mockOnSelect} selectedOption={selectedMFA} />);
    const selectedElement = screen.getByText(selectedMFA);

    // Assert
    expect(selectedElement).toHaveClass("selected");
  });

  test("tooltip is present", () => {
    // Arrange
    render(<LibraryList options={mfas} onSelect={mockOnSelect} selectedOption={selectedMFA} />);

    // Assert
    const tooltipElement = screen.getByText("?");
    expect(tooltipElement).toBeInTheDocument();
    expect(tooltipElement).toHaveClass("tooltip-circle");
  });

  test("mfa is selectable", () => {
    // Arrange
    render(<LibraryList options={mfas} onSelect={mockOnSelect} selectedOption={selectedMFA} />);
    const optionToClick = screen.getByText("MFA 1");

    // Act
    fireEvent.click(optionToClick);

    // Assert
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith("MFA 1");
  });
});
