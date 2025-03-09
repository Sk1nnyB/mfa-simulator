import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Feedback from '../components/pages/Feedback';
import emailjs from 'emailjs-com';

jest.mock('emailjs-com', () => ({
  send: jest.fn(),
}));

global.fetch = jest.fn();

describe('Feedback Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
    global.alert = jest.fn();
  });

  test('renders the feedback form', () => {
    // Arrange
    render(<Feedback />);

    // Assert
    expect(screen.getByText('Submit an Issue')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title of Feedback')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description of feedback, bugs etc.')).toBeInTheDocument();
    expect(screen.getByText('Submit Feedback!')).toBeInTheDocument();
  });

  test('updates form values on input', () => {
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

    // test('handles error when creating GitHub issue', async () => {
  //   // Arrange
  //   render(<Feedback />);
  //   fireEvent.change(screen.getByPlaceholderText('Title of Feedback'), { target: { value: 'Test Title' } });
  //   fireEvent.change(screen.getByPlaceholderText('Description of feedback, bugs etc.'), { target: { value: 'Test Description' } });
  //   fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Bug' } });
  //   global.fetch.mockRejectedValueOnce(new Error('GitHub issue creation failed'));

  //   // Act: Simulate form submission
  //   fireEvent.click(screen.getByText('Submit Feedback!'));

  //   // Assert: Check if error handling works
  //   await waitFor(() => {
  //     expect(global.alert).toHaveBeenCalledWith('Feedback was not sent! Please try again later.');
  //   });
  // });

  // test('calls createGitHubIssue', async () => {
  //   // Arrange
  //   render(<Feedback />);
  //   fireEvent.change(screen.getByPlaceholderText('Title of Feedback'), { target: { value: 'Test Title' } });
  //   fireEvent.change(screen.getByPlaceholderText('Description of feedback, bugs etc.'), { target: { value: 'Test Description' } });
  //   fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Bug or Error' } });
  //   global.fetch.mockResolvedValueOnce({ ok: true });

  //   // Act
  //   fireEvent.click(screen.getByText('Submit Feedback!'));

  //   // Assert
  //   await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
  //     `${process.env.REACT_APP_GITHUB_REPO}`,
  //     expect.objectContaining({
  //       method: 'POST',
  //       headers: expect.objectContaining({
  //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  //       }),
  //       body: JSON.stringify({
  //         title: 'Test Title',
  //         body: 'Test Description',
  //       }),
  //     })
  //   ));

  //   await waitFor(() => {
  //     expect(global.alert).toHaveBeenCalledWith('Feedback sent successfully!');
  //   });
  // });

  test('calls sendEmail when Feedback type is selected and feedback is submitted', async () => {
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
      expect(global.alert).toHaveBeenCalledWith('Feedback sent successfully!');
    });
  });

  test('handles error when sending feedback via email', async () => {
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
      expect(global.alert).toHaveBeenCalledWith('Feedback was not sent! The inbox may be full. Please try again tomorrow.');
    });
  });
});
