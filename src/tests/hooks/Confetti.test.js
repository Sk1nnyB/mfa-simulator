import { render } from '@testing-library/react';
import confetti from 'canvas-confetti';
import ConfettiComponent from '../../hooks/confetti/confetti';

jest.mock('canvas-confetti', () => jest.fn());

describe('ConfettiComponent', () => {
  test('calls confetti on mount', () => {
    // Arrange
    render(<ConfettiComponent />);

    // Assert
    expect(confetti).toHaveBeenCalled();
    expect(confetti).toHaveBeenCalledWith(
      expect.objectContaining({
        particleCount: 5,
        startVelocity: 30,
        spread: 360,
        origin: expect.objectContaining({
          // These are random
          x: expect.any(Number),
          y: expect.any(Number),
        }),
      })
    );
  });
});
