import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Home from "../components/pages/Home";

// Mock useNavigate to track navigation
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Home Component", () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
  });

  test("renders text content", () => {
    // Arrange
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Assert description render
    expect(screen.getByText(/Learn all about different authentication methods in the Library, then try them yourself in the Story Mode or make your own log in system in Freeplay!/i)).toBeInTheDocument();
  });

  test("navigates story mode ", () => {
    // Arrange
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Act
    const storyButton = screen.getByRole("button", { name: /Try Story Mode/i });
    fireEvent.click(storyButton);

    // Assert
    expect(navigate).toHaveBeenCalledWith("/play?story=1");
  });

  test("navigates freeplay", () => {
    // Arrange
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Act
    const freeplayButton = screen.getByRole("button", { name: /Freeplay/i });
    fireEvent.click(freeplayButton);

    // Assert
    expect(navigate).toHaveBeenCalledWith("/freeplay");
  });
});
