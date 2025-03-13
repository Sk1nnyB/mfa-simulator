import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useVariables, useNextMFA } from "../../hooks/freeplay/FreePlayUtils";
import Password from '../../components/actions/Password';

jest.mock("react-tooltip", () => ({ Tooltip: () => <div data-testid="tooltip"></div> }));

jest.mock("../../hooks/freeplay/FreePlayUtils", () => ({
  useVariables: jest.fn(),
  useNextMFA: jest.fn(),
}));

describe('Password Component', () => {
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
    render(<Password />);

    // Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });

  test('renders action', () => {
    // Arrange
    render(<Password />);

    const passwordInput = screen.getByTestId("password-entry1");
    const lowerValidation = screen.getByText(/Lower Case/i);
    const upperValidation = screen.getByText(/Upper Case/i);
    const numberValidation = screen.getByText(/Number/i);
    const symbolValidation = screen.getByText(/Symbol/i);
    const lengthValidation = screen.getByText(/Length/i);
    const passwordValidation = screen.getByText(/Length/i);

    // Act
    fireEvent.change(passwordInput, { target: { value: '' } });

    // Assert
    expect(lowerValidation).toHaveClass('invalid');
    expect(upperValidation).toHaveClass('invalid');
    expect(numberValidation).toHaveClass('invalid');
    expect(symbolValidation).toHaveClass('invalid');
    expect(lengthValidation).toHaveClass('invalid');
    expect(passwordValidation).toHaveClass('invalid');

    // Act
    fireEvent.change(passwordInput, { target: { value: 'Abc123$%' } });

    // Assert
    expect(lowerValidation).toHaveClass('valid');
    expect(upperValidation).toHaveClass('valid');
    expect(numberValidation).toHaveClass('valid');
    expect(symbolValidation).toHaveClass('valid');
    expect(lengthValidation).toHaveClass('valid');
    expect(passwordValidation).toHaveClass('valid');
  });

  test("tooltip button", () => {
    // Arrange
    render(<Password />);

    // Act
    fireEvent.mouseOver(screen.getByText("?"));

    // Assert
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });

  test('passwords do not match error', () => {
    // Arrange
    render(<Password />);

    // Act
    fireEvent.change(screen.getByTestId("password-entry1"), { target: { value: 'Abc123$%' } });
    fireEvent.change(screen.getByTestId("password-entry2"), { target: { value: 'WrongPassword' } });
    fireEvent.click(screen.getByText('Log In'));

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Entered Password: WrongPassword is not correct! Try again.');
  });

  test('passwords not given error', () => {
    // Arrange
    render(<Password />);

    // Act
    fireEvent.change(screen.getByTestId("password-entry1"), { target: { value: '' } });
    fireEvent.change(screen.getByTestId("password-entry2"), { target: { value: 'WrongPassword' } });
    fireEvent.click(screen.getByText('Log In'));

    // Assert
    expect(window.alert).toHaveBeenCalledWith('No password given.');

    // Act
    fireEvent.change(screen.getByTestId("password-entry1"), { target: { value: 'WrongPassword' } });
    fireEvent.change(screen.getByTestId("password-entry2"), { target: { value: '' } });
    fireEvent.click(screen.getByText('Log In'));

    // Assert
    expect(window.alert).toHaveBeenCalledWith('No password given.');
  });

  test('passwords not strong enough', () => {
    // Arrange
    render(<Password />);

    // Act
    fireEvent.change(screen.getByTestId("password-entry1"), { target: { value: 'WrongPassword' } });
    fireEvent.change(screen.getByTestId("password-entry2"), { target: { value: 'WrongPassword' } });
    fireEvent.click(screen.getByText('Log In'));

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Password is not strong enough.');
  });

  test('correct passwords', () => {
    // Arrange
    render(<Password />);

    // Act
    fireEvent.change(screen.getByTestId("password-entry1"), { target: { value: 'Abc123$%' } });
    fireEvent.change(screen.getByTestId("password-entry1"), { target: { value: 'Abc123$%' } });
    fireEvent.click(screen.getByText('Log In'));

    // Assert
    waitFor(() => {
      expect(mockHandleNextMFA).toHaveBeenCalled();
    });
  });
});
