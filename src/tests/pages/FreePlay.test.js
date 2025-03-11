import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { optionsMFA } from "../../data/options_mfa";
import FreePlay from "../../components/pages/FreePlay";

jest.mock("react-tooltip", () => ({ Tooltip: () => <div data-testid="tooltip"></div> }));
jest.mock("reactjs-popup", () => ({
  __esModule: true,
  default: ({ trigger }) => (
    <div>
      {trigger}
      <div data-testid="popup-content">Content about AALs</div>
    </div>
  ),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("FreePlay Component", () => {
  let navigate;

  beforeEach(() => {
      jest.clearAllMocks();
      global.alert = jest.fn();
      navigate = jest.fn();
      useNavigate.mockReturnValue(navigate);
    });

  test("renders freeplay text", () => {
    // Arrange
    render(
      <MemoryRouter>
        <FreePlay />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("Authentication Assurance Level")).toBeInTheDocument();
    expect(screen.getByText("Here's the link to your setup:")).toBeInTheDocument();
  });

  test("checkbox works", () => {
    // Arrange
    render(
      <MemoryRouter>
        <FreePlay />
      </MemoryRouter>
    );

    // Assert
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(optionsMFA.length - 1);

    // Act
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[2]);

    // Assert
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).toBeChecked();
  });

  test("authentication level updates", () => {
    // Arrange
    render(
      <MemoryRouter>
        <FreePlay />
      </MemoryRouter>
    );
    const checkboxes = screen.getAllByRole("checkbox");

    // Assert / Act Cycle
    expect(screen.getByTestId("auth-level")).toHaveTextContent("0");

    fireEvent.click(checkboxes[0]);
    expect(screen.getByTestId("auth-level")).toHaveTextContent("1");

    fireEvent.click(checkboxes[2]);
    expect(screen.getByTestId("auth-level")).toHaveTextContent("2");

    fireEvent.click(checkboxes[5]);
    expect(screen.getByTestId("auth-level")).toHaveTextContent("3");
  });

  test("playcode and link changes", () => {
    render(
      <MemoryRouter>
        <FreePlay />
      </MemoryRouter>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[7]);
    expect(screen.getByText("https://sk1nnyb.github.io/mfa-simulator/#/play?context=128")).toBeInTheDocument();

    fireEvent.click(checkboxes[7]);
    expect(screen.getByText("https://sk1nnyb.github.io/mfa-simulator/#/FreePlay")).toBeInTheDocument();
  });

  test("resets options", () => {
    // Arrange
    render(
      <MemoryRouter>
        <FreePlay />
      </MemoryRouter>
    );

    // Act
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    // Assert
    expect(checkboxes[0]).toBeChecked();

    // Act
    fireEvent.click(screen.getByText("Reset"));
    // Assert
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test("copies link to clipboard", () => {
    // Arrange
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(),
      },
    });
    render(
      <MemoryRouter>
        <FreePlay />
      </MemoryRouter>
    );

    // Act
    fireEvent.click(screen.getByText("Copy"));

    // Assert
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  test("start button navigates", () => {
    // Arrange
    render(
      <MemoryRouter>
        <FreePlay />
      </MemoryRouter>
    );

    // Act
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    fireEvent.click(screen.getByText("Start!"));

    // Assert
    expect(navigate).toHaveBeenCalledWith("/play?context=1");
  });

  test("displays tooltip", () => {
    // Arrange
    render(
      <MemoryRouter>
        <FreePlay />
      </MemoryRouter>
    );
    // Act
    fireEvent.mouseOver(screen.getByText("?"));

    // Assert
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });

  test("displays popup", () => {
    // Arrange
    render(
      <MemoryRouter>
        <FreePlay />
      </MemoryRouter>
    );


    // Act
    fireEvent.click(screen.getByText("What are AALs?"));

    // Assert
    expect(screen.getByTestId("popup-content")).toBeInTheDocument();
  });
});