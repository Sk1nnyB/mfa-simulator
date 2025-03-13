import React, { useEffect } from "react";
import confetti from "canvas-confetti";

const ConfettiComponent = () => {
  useEffect(() => {
    const duration = 0.2 * 1000;
    const animationEnd = Date.now() + duration;
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    const frame = () => {
      confetti({
        particleCount: 5,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: randomInRange(0.1, 0.3)
        }
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
};

export default ConfettiComponent;
