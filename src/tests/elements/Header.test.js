import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/elements/header/Header";

describe("Header Component Regular Screen", () => {
  test("renders header title", () => {
    // Arrange
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText(/The MFA Simulator/i)).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    // Arrange
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const links = [
      { text: "Story Mode", href: "/play?story=true" },
      { text: "Free Play", href: "/Freeplay" },
      { text: "Library", href: "/library" },
      { text: "Feedback", href: "/feedback" },
      { text: "Assistant App", href: "/mfa-assistant" },
      { text: "Home", href: "/" },
    ];

    // Assert
    links.forEach(({ text, href }) => {
      const link = screen.getByRole("link", { name: text });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });
});

