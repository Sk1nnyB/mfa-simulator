import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, useNavigate } from "react-router-dom";
import firebaseUtils from '../../firebase';
import FreePlayStart from '../../components/actions/FreePlayStart';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('../../firebase', () => ({
  generateUniqueRunCode: jest.fn(),
  setField: jest.fn(),
  startStory: jest.fn(),
  startFreePlay: jest.fn(),
}));

describe('FreePlayStart Component', () => {
  let navigate;
  let mockUseLocation;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    firebaseUtils.generateUniqueRunCode.mockResolvedValue('123456');
    mockUseLocation = require('react-router-dom').useLocation;
    mockUseLocation.mockReturnValue({ search: '' });
  });

  test('renders story content', () => {
    // Arrange
    mockUseLocation.mockReturnValue({ search: '?story=true' });
    render(
      <MemoryRouter>
        <FreePlayStart />
      </MemoryRouter>
      );

    // Assert
    expect(screen.getByText('Welcome to the story mode!')).toBeInTheDocument();
    expect(screen.getByText('Start →')).toBeInTheDocument();
    expect(screen.getByText('Start with MFA Assistant →')).toBeInTheDocument();
  });

  test('renders freeplay content', () => {
    // Arrange
    mockUseLocation.mockReturnValue({ search: '?context=1' });
    render(
      <MemoryRouter>
        <FreePlayStart />
      </MemoryRouter>
      );

    // Assert
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Start →')).toBeInTheDocument();
    expect(screen.getByText('Start with MFA Assistant →')).toBeInTheDocument();
  });

  test('web button click (story)', async () => {
    // Arrange
    mockUseLocation.mockReturnValue({ search: '?story=true' });
    render(
    <MemoryRouter>
      <FreePlayStart />
    </MemoryRouter>
    );

    // Act
    await act(async () => {
      fireEvent.click(screen.getByText('Start →'));
    });

    // Assert
    expect(firebaseUtils.generateUniqueRunCode).toHaveBeenCalled();
    expect(firebaseUtils.startStory).toHaveBeenCalledWith('123456', false);
    expect(navigate).toHaveBeenCalledWith('/play?runCode=123456');
  });

  test('phone button click (story)', async () => {
    // Arrange
    mockUseLocation.mockReturnValue({ search: '?story=true' });
    render(
    <MemoryRouter>
      <FreePlayStart />
    </MemoryRouter>
    );

    // Act
    await act(async () => {
      fireEvent.click(screen.getByText('Start with MFA Assistant →'));
    });

    // Assert
    expect(firebaseUtils.generateUniqueRunCode).toHaveBeenCalled();
    expect(firebaseUtils.setField).toHaveBeenCalledWith('123456', 'phone', true);
    expect(firebaseUtils.startStory).toHaveBeenCalledWith('123456', true);
    expect(navigate).toHaveBeenCalledWith('/play?runCode=123456');
  });

  test('web button click (context)', async () => {
    // Arrange
    mockUseLocation.mockReturnValue({ search: '?context=1' });
    render(
    <MemoryRouter>
      <FreePlayStart />
    </MemoryRouter>
    );

    // Act
    await act(async () => {
      fireEvent.click(screen.getByText('Start →'));
    });

    // Assert
    expect(firebaseUtils.generateUniqueRunCode).toHaveBeenCalled();
    expect(firebaseUtils.startFreePlay).toHaveBeenCalledWith('123456', "1");
    expect(navigate).toHaveBeenCalledWith('/play?runCode=123456');
  });

  test('phone button click (context)', async () => {
    // Arrange
    mockUseLocation.mockReturnValue({ search: '?context=1' });
    render(
    <MemoryRouter>
      <FreePlayStart />
    </MemoryRouter>
    );

    // Act
    await act(async () => {
      fireEvent.click(screen.getByText('Start with MFA Assistant →'));
    });

    // Assert
    expect(firebaseUtils.generateUniqueRunCode).toHaveBeenCalled();
    expect(firebaseUtils.setField).toHaveBeenCalledWith('123456', 'phone', true);
    expect(firebaseUtils.startFreePlay).toHaveBeenCalledWith('123456', "1");
    expect(navigate).toHaveBeenCalledWith('/play?runCode=123456');
  });

  test('handles error in generating run code', async () => {
    // Arrange
    console.error = jest.fn();
    firebaseUtils.generateUniqueRunCode.mockRejectedValue(new Error('Error generating code'));
    mockUseLocation.mockReturnValue({ search: '?story=true' });
    render(
      <MemoryRouter>
        <FreePlayStart />
      </MemoryRouter>
    );

    // Act
    await act(async () => {
      fireEvent.click(screen.getByText('Start →'));
    });

    // Assert
    expect(firebaseUtils.generateUniqueRunCode).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error generating run code:', new Error('Error generating code'));
  });
});
