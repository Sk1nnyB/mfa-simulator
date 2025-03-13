import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Feedback from '../../components/pages/Feedback';
import emailjs from 'emailjs-com';

jest.mock('emailjs-com', () => ({
  send: jest.fn(),
}));

global.fetch = jest.fn();

describe('Feedback Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
  });

  test('renders form content', () => {
    // Arrange
    render(<Feedback />);

    // Assert
    expect(screen.getByText('Submit an Issue')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title of Feedback')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description of feedback, bugs etc.')).toBeInTheDocument();
    expect(screen.getByText('Submit Feedback!')).toBeInTheDocument();
  });

  test('updates form', () => {
    // Arrange
    render(<Feedback />);

    // Act
    fireEvent.change(screen.getByPlaceholderText('Title of Feedback'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Description of feedback, bugs etc.'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Feedback' } });

    // Assert
    expect(screen.getByPlaceholderText('Title of Feedback').value).toBe('Test Title');
    expect(screen.getByPlaceholderText('Description of feedback, bugs etc.').value).toBe('Test Description');
    expect(screen.getByRole('combobox').value).toBe('Feedback');
  });

  test('github ticket created on bug', async () => {
    // Arrange
    render(<Feedback />);
    fireEvent.change(screen.getByPlaceholderText('Title of Feedback'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Description of feedback, bugs etc.'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Bug or Error' } });
    global.fetch.mockResolvedValueOnce({ ok: true });

    // Act
    fireEvent.click(screen.getByText('Submit Feedback!'));

    // Assert
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.github.com/repos/${process.env.REACT_APP_GITHUB_REPO}/issues`,
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          }),
          body: JSON.stringify({
            title: 'Test Title',
            body: 'Test Description',
          }),
        })
      )
    );

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Bug sent successfully!');
    });
  });

  test('handles GitHub issue error', async () => {
    // Arrange
    render(<Feedback />);
    fireEvent.change(screen.getByPlaceholderText('Title of Feedback'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Description of feedback, bugs etc.'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Bug or Error' } });
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));

    // Act: Simulate form submission
    fireEvent.click(screen.getByText('Submit Feedback!'));

    // Assert: Check if error handling works
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Bug was not sent! Please try again later.');
    });
  });

  test('email is sent on feedback', async () => {
    // Arrange
    render(<Feedback />);
    fireEvent.change(screen.getByPlaceholderText('Title of Feedback'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Description of feedback, bugs etc.'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Feedback' } });
    emailjs.send.mockResolvedValueOnce({});

    // Act
    fireEvent.click(screen.getByText('Submit Feedback!'));

    // Assert
    await waitFor(() => expect(emailjs.send).toHaveBeenCalledWith(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        title: 'Test Title',
        type: 'Feedback',
        message: 'Test Description',
      },
      process.env.REACT_APP_EMAILJS_USER_ID
    ));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Email sent successfully!');
    });
  });

  test('handles email error', async () => {
    // Arrange
    render(<Feedback />);
    fireEvent.change(screen.getByPlaceholderText('Title of Feedback'), { target: { value: 'Feature request' } });
    fireEvent.change(screen.getByPlaceholderText('Description of feedback, bugs etc.'), { target: { value: 'Add a dark mode feature' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Feedback' } });
    emailjs.send.mockRejectedValueOnce(new Error('Email send failed'));

    // Act
    fireEvent.click(screen.getByText('Submit Feedback!'));

    // Assert
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Email was not sent! The inbox may be full. Please try again tomorrow.');
    });
  });
});
