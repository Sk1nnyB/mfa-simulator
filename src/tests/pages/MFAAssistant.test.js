import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MFA_Assistant from '../../components/pages/MFA_Assistant';

// Mocking the image import
jest.mock('../../data/images/phone-assistant-app.png', () => 'mock-image.png');

describe('MFA_Assistant Component', () => {

  test('renders text content', () => {
    // Arrange
    render(<MFA_Assistant />);

    // Assert
    expect(screen.getByText(/The MFA Assistant!/i)).toBeInTheDocument();
    expect(screen.getByText(/The MFA Assistant is an app that allows you to follow along with a Story Mode or Free Play simulation in real time!/i)).toBeInTheDocument();
    expect(screen.getByText(/Just click the button below to download the app to your phone and follow the instructions there./i)).toBeInTheDocument();
    const image = screen.getByAltText(/Image of MFA Assistant/i);
    expect(image).toHaveAttribute('src', 'mock-image.png');
  });

  test('renders download button', () => {
    // Arrange
    render(<MFA_Assistant />);

    // Assert
    expect(screen.getByText(/Download \(for Android\)/i)).toBeInTheDocument();
    const downloadButton = screen.getByText(/Download \(for Android\)/i);
    const downloadLink = downloadButton.closest('a');
    expect(downloadLink).toHaveAttribute('href', '../../../public/data/MFA-Assistant.apk');
    expect(downloadLink).toHaveAttribute('download', 'MFA_Assistant.apk');
  });

  test('button file download', () => {
    // Arrange
    render(<MFA_Assistant />);

    // Act
    const downloadButton = screen.getByText(/Download \(for Android\)/i);
    const downloadLink = downloadButton.closest('a');
    fireEvent.click(downloadButton);

    // Assert
    expect(downloadLink).toHaveAttribute('href', '../../../public/data/MFA-Assistant.apk');
  });

});

