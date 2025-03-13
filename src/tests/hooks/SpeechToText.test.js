import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useSpeechToText from '../../hooks/speechToText/index';

// Mocking webkitSpeechRecognition
class MockSpeechRecognition {
  constructor() {
    this.start = jest.fn();
    this.stop = jest.fn();
    this.onresult = jest.fn();
    this.onerror = jest.fn();
    this.onend = jest.fn();
    this.interimResults = false;
    this.lang = '';
    this.continuous = false;
  }
}

describe('useSpeechToText', () => {
  beforeAll(() => {
    global.webkitSpeechRecognition = MockSpeechRecognition;
  });

  afterAll(() => {
    delete global.webkitSpeechRecognition;
  });

  test('should initialize correctly', () => {
    // Arrange
    const { result } = renderHook(() => useSpeechToText());

    // Assert
    expect(result.current.listening).toBe(false);
    expect(result.current.input).toBe('');
  });

  test('should start recognition on startInput', () => {
    const { result } = renderHook(() => useSpeechToText());

    act(() => {
      result.current.startInput();
    });

    expect(result.current.listening).toBe(true);
    expect(result.current.input).toBe('');
  });

  test('should stop recognition on stopInput and reset input', () => {
    const { result } = renderHook(() => useSpeechToText());

    act(() => {
      result.current.startInput();
    });

    act(() => {
      result.current.stopInput();
    });

    expect(result.current.listening).toBe(false);
    expect(result.current.input).toBe('');
  });
});
