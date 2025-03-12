import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Home from "../../components/pages/Home";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Home Component", () => {
  let navigate;

  beforeEach(() => {
    jest.clearAllMocks();
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

    // Assert
    expect(screen.getByText(/Learn all about different authentication methods in the Library, then try them yourself in the Story Mode or make your own log in system in Freeplay!/i)).toBeInTheDocument();
  });

  test("story mode button", () => {
    // Arrange
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Act
    fireEvent.click(screen.getByRole("button", { name: /Try Story Mode/i }));

    // Assert
    expect(navigate).toHaveBeenCalledWith("/play?story=true");
  });

  test("freeplay button", () => {
    // Arrange
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Act
    fireEvent.click(screen.getByRole("button", { name: /Freeplay/i }));

    // Assert
    expect(navigate).toHaveBeenCalledWith("/freeplay");
  });
});
