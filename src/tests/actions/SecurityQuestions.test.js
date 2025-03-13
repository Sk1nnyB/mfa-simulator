import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useVariables, useNextMFA } from "../../hooks/freeplay/FreePlayUtils";
import { questions } from '../../data/security_questions';
import Security_Questions from '../../components/actions/Security_Questions';

jest.mock('../../hooks/freeplay/FreePlayUtils', () => ({
  useVariables: jest.fn(),
  useNextMFA: jest.fn(),
}));

jest.mock('../../data/security_questions', () => ({
  questions: [
    { id: 1, question: 'Question 1' },
    { id: 2, question: 'Question 2' },
  ],
}));

describe('Security_Questions Component', () => {
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
    render(<Security_Questions />);

    // Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });

  test('renders interactive components', () => {
    // Arrange
    render(<Security_Questions />);

    // Assert
    expect(screen.getByLabelText(/Select question:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Answer:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Security Question:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enter!/i })).toBeInTheDocument();
  });

  test('no question selected alert', async () => {
    // Arrange
    render(<Security_Questions />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: /Enter!/i }));

    // Check if alert is called when no question is selected
    expect(window.alert).toHaveBeenCalledWith('No question selected.');
  });

  test('no answer given alert', async () => {
    // Arrange
    render(<Security_Questions />);

    // Act
    fireEvent.change(screen.getByLabelText(/Select question:/i), {
      target: { value: questions[0].question },
    });
    fireEvent.click(screen.getByRole('button', { name: /Enter/i }));

    // Assert
    expect(window.alert).toHaveBeenCalledWith('No answer given for the security question.');
  });

  test('answer too short alert', async () => {
    // Arrange
    render(<Security_Questions />);

    // Act
    fireEvent.change(screen.getByLabelText(/Select question:/i), {
      target: { value: questions[0].question },
    });
    fireEvent.change(screen.getByLabelText(/Answer:/i), {
      target: { value: 'a' },
    });
    fireEvent.change(screen.getByLabelText(/Security Question:/i), {
      target: { value: 'a' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Enter/i }));

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Given answer is too short!');
  });

  test('answer is incorrect alert', async () => {
    // Arrange
    render(<Security_Questions />);

    // Act
    fireEvent.change(screen.getByLabelText(/Select question:/i), {
      target: { value: questions[0].question },
    });
    fireEvent.change(screen.getByLabelText(/Answer:/i), {
      target: { value: 'test1' },
    });
    fireEvent.change(screen.getByLabelText(/Security Question:/i), {
      target: { value: 'test2' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Enter/i }));

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Entered Answer: test2 is not correct! Try again.');
  });

  test('answer is correct', async () => {
    // Arrange
    render(<Security_Questions />);

    // Act
    fireEvent.change(screen.getByLabelText(/Select question:/i), {
      target: { value: questions[0].question },
    });
    fireEvent.change(screen.getByLabelText(/Answer:/i), {
      target: { value: 'test' },
    });
    fireEvent.change(screen.getByLabelText(/Security Question:/i), {
      target: { value: 'test' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Enter!/i }));

    // Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });
});
