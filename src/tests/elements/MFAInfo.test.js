import React from 'react';
import { render, screen } from '@testing-library/react';
import MFAInfo from '../../components/elements/MFAInfo';

describe('MFAInfo Component', () => {
  const mockMFA = {
    name: 'MFA',
    description: 'Test Description',
    why: 'Test Why',
    how: 'Test How',
    instructions: ['Instruction 1', 'Instruction 2', 'Instruction 3'],
    examples: 'Test Example',
    tips: 'Test Tip',
    fun_fact: 'Test Fact',
    wiki_link: 'https://en.wikipedia.org/wiki/Authenticator_app',
    image: 'https://example.com/ authenticator-image.png',
    secure: 'Test Secure',
    note: 'Test Note',
  };

  test('renders with instructions', () => {
    // Arrange
    render(
      <MFAInfo
        MFA={mockMFA}
        instructions_flag={true}
        more_information_flag={false}
      />
    );

    // Assert
    expect(screen.getByText("Instructions")).toBeInTheDocument();
    expect(screen.getByText("Instruction 1")).toBeInTheDocument();
    expect(screen.getByText("Instruction 2")).toBeInTheDocument();
    expect(screen.getByText("Instruction 3")).toBeInTheDocument();
    expect(screen.getByText("Test Note")).toBeInTheDocument();
  });

  test('renders with image', () => {
    // Arrange
    render(
      <MFAInfo
        MFA={mockMFA}
        instructions_flag={false}
        more_information_flag={false}
      />
    );

    // Assert
    expect(screen.getByAltText('Image of MFA')).toHaveAttribute('src', mockMFA.image);
  });

  test('renders with more information', () => {
    // Arrange
    render(
      <MFAInfo
        MFA={mockMFA}
        instructions_flag={false}
        more_information_flag={true}
      />
    );

    // Assert
    expect(screen.getByText("Where are they found?")).toBeInTheDocument();
    expect(screen.getByText(mockMFA.examples)).toBeInTheDocument();
    expect(screen.getByText("Tips on usage:")).toBeInTheDocument();
    expect(screen.getByText(mockMFA.tips)).toBeInTheDocument();
    expect(screen.getByText("Fun Fact:")).toBeInTheDocument();
    expect(screen.getByText(mockMFA.fun_fact)).toBeInTheDocument();
    expect(screen.getByText("Click here for more information:")).toBeInTheDocument();
  });

  test('renders without more information ', () => {
    // Arrange
    render(
      <MFAInfo
        MFA={mockMFA}
        instructions_flag={false}
        more_information_flag={false}
      />
    );

    // Assert
    expect(screen.queryByText("Where are they found?")).not.toBeInTheDocument();
    expect(screen.queryByText(mockMFA.examples)).not.toBeInTheDocument();
    expect(screen.queryByText(mockMFA.tips)).not.toBeInTheDocument();
    expect(screen.queryByText(mockMFA.fun_fact)).not.toBeInTheDocument();
  });

  test('renders general MFA details', () => {
    // Arrange
    render(
      <MFAInfo
        MFA={mockMFA}
        instructions_flag={false}
        more_information_flag={false}
      />
    );

    // Assert
    expect(screen.getByText(mockMFA.name)).toBeInTheDocument();
    expect(screen.getByText(mockMFA.description)).toBeInTheDocument();
    expect(screen.getByText(mockMFA.why)).toBeInTheDocument();
    expect(screen.getByText(mockMFA.how)).toBeInTheDocument();
  });

  test('renders secure section', () => {
    // Arrange
    render(
      <MFAInfo
        MFA={mockMFA}
        instructions_flag={false}
        more_information_flag={false}
      />
    );

    // Assert
    expect(screen.getByText("What makes a secure MFA?")).toBeInTheDocument();
    expect(screen.getByText(mockMFA.secure)).toBeInTheDocument();
  });

  test('renders without secure section', () => {
    // Arrange
    const mockMFAWithoutSecure = { ...mockMFA, secure: '' };
    render(
      <MFAInfo
        MFA={mockMFAWithoutSecure}
        instructions_flag={false}
        more_information_flag={false}
      />
    );

    // Assert
    expect(screen.queryByText("What makes a secure MFA?")).not.toBeInTheDocument();
  });
});
