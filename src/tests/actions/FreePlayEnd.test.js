import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import firebaseUtils from "../../firebase";
import FreePlayEnd from "../../components/actions/FreePlayEnd";

// Mock useNavigate to track navigation
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: () => ({
    search: "?runCode=123456",
  }),
}));

jest.mock("../../firebase", () => ({
  endRun: jest.fn(),
}));

jest.mock("../../hooks/confetti/confetti.jsx", () => () => <div data-testid="confetti" />);

describe("FreePlayEnd Component", () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
  });

  test("renders text content", () => {
    // Arrange
    render(
      <MemoryRouter>
        <FreePlayEnd />
      </MemoryRouter>
    );

    // Assert text render
    expect(screen.getByText(/Congratulations!!/i)).toBeInTheDocument();
    expect(screen.getByText(/You've successfully passed all selected authentication methods. Go again or go to story!/i)).toBeInTheDocument();
    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });

  test("navigates story mode ", () => {
    // Arrange
    render(
      <MemoryRouter>
        <FreePlayEnd />
      </MemoryRouter>
    );

    // Act
    fireEvent.click(screen.getByRole("button", { name: /Story/i }));

    // Assert
    expect(navigate).toHaveBeenCalledWith("/play?story=true");
  });

  test("navigates freeplay", () => {
    // Arrange
    render(
      <MemoryRouter>
        <FreePlayEnd />
      </MemoryRouter>
    );

    // Act
    fireEvent.click(screen.getByRole("button", { name: /Freeplay →/i }));

    // Assert
    expect(navigate).toHaveBeenCalledWith("/freeplay");
  });

  test("ends run with runCode", () => {
    // Arrange
    render(
      <MemoryRouter>
        <FreePlayEnd />
      </MemoryRouter>
    );

    // Assert
    expect(firebaseUtils.endRun).toHaveBeenCalledTimes(1);
    expect(firebaseUtils.endRun).toHaveBeenCalledWith("123456");
  });
});