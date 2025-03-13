import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import firebaseUtils from "../../firebase";
import Action from "../../components/pages/Action";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock("../../firebase", () => ({
  getField: jest.fn()
}));

jest.mock("../../components/actions/FreePlayStart", () => () => <div data-testid="freeplay-start">FreePlay Start</div>);
jest.mock("../../components/actions/FreePlayEnd", () => () => <div data-testid="freeplay-end">FreePlay End</div>);
jest.mock("../../components/elements/MFAInfo", () => ({ MFA }) => <div data-testid="mfa-info">{MFA.name}</div>);
jest.mock("../../components/actions/Password", () => () => <div data-testid="password">Password_Task</div>);
jest.mock("../../components/actions/Authentication_App", () => () => <div data-testid="auth_app">Authentication_Task</div>);
jest.mock("../../components/actions/Text", () => () => <div data-testid="text">Text_Task</div>);


describe("Action Component", () => {
  let navigate;
  let mockUseLocation;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    firebaseUtils.getField.mockResolvedValue('123456');
    mockUseLocation = require('react-router-dom').useLocation;
    mockUseLocation.mockReturnValue({ search: '' });
  });

  test("renders story start", async () => {
    // Arrange
    mockUseLocation.mockReturnValue({ search: '?story=true' });
    render(
      <MemoryRouter>
        <Action />
      </MemoryRouter>
    );

    // Assert
    await waitFor(() => expect(screen.getByTestId("freeplay-start")).toBeInTheDocument());
  });

  test("renders start", async () => {
    // Arrange
    mockUseLocation.mockReturnValue({ search: '?story=true' });
    render(
      <MemoryRouter>
        <Action />
      </MemoryRouter>
    );

    // Assert
    await waitFor(() => expect(screen.getByTestId("freeplay-start")).toBeInTheDocument());
  });

  test("navigates to /freeplay if no valid context / story", async () => {
    // Arrange
    firebaseUtils.getField.mockResolvedValue(null);
    render(
      <MemoryRouter>
        <Action />
      </MemoryRouter>
    );

    // Assert
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/freeplay", { replace: true }));
  });

  test("story renders correct initial task", async () => {
    // Arrange
    firebaseUtils.getField.mockImplementation((runCode, field) => {
      if (field === "story") return Promise.resolve(true);
      if (field === "password") return Promise.resolve("not started");
      return Promise.resolve(null);
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <Action />
        </MemoryRouter>
      );
    });

    // Assert
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Password_Task")).toBeInTheDocument();
  });

  test("story renders correct 2nd task", async () => {
    // Arrange
    firebaseUtils.getField.mockImplementation((runCode, field) => {
      if (field === "story") return Promise.resolve(true);
      if (field === "password") return Promise.resolve("finished");
      if (field === "text_task") return Promise.resolve("not started");
      return Promise.resolve(null);
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <Action />
        </MemoryRouter>
      );
    });

    // Assert
    expect(screen.getByText("Text (SMS) Code")).toBeInTheDocument();
    expect(screen.getByText("Text_Task")).toBeInTheDocument();
  });

  test("context renders correct initial task", async () => {
    // Arrange
    firebaseUtils.getField.mockImplementation((runCode, field) => {
      if (field === "context") return Promise.resolve(312);
      if (field === "password") return Promise.resolve("not started");
      return Promise.resolve(null);
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <Action />
        </MemoryRouter>
      );
    });

    // Assert
    expect(screen.getByText("Authentication App")).toBeInTheDocument();
    expect(screen.getByText("Authentication_Task")).toBeInTheDocument();
  });

  test("context renders correct 2nd task", async () => {
    // Arrange
    firebaseUtils.getField.mockImplementation((runCode, field) => {
      if (field === "context") return Promise.resolve(312);
      if (field === "password") return Promise.resolve("not started");
      if (field === "authentication_app") return Promise.resolve("finished");
      return Promise.resolve(null);
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <Action />
        </MemoryRouter>
      );
    });

    // Assert
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Password_Task")).toBeInTheDocument();
  });

  test("renders progress bar", async () => {
    // Arrange
    firebaseUtils.getField.mockImplementation((runCode, field) => {
      if (field === "context") return Promise.resolve(13);
      if (field === "password") return Promise.resolve("finished");
      if (field === "authentication_app") return Promise.resolve("not started");
      return Promise.resolve(null);
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <Action />
        </MemoryRouter>
      );
    });

    // Assert
    expect(screen.getByText("Progress: 1/2 | Playing Run:")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("value", "0.5");
  });

  test("displays runCode on the screen", async () => {
    // Arrange
    mockUseLocation.mockReturnValue({ search: '?runCode=123456' });
    firebaseUtils.getField.mockImplementation((runCode, field) => {
      if (field === "story") return Promise.resolve(true);
      return Promise.resolve(null);
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <Action />
        </MemoryRouter>
      );
    });

    // Assert
    expect(screen.getByText("Progress: 0/4 | Playing Run: 123456")).toBeInTheDocument();
  });

  test("renders end", async () => {
    // Arrange
    firebaseUtils.getField.mockImplementation((runCode, field) => {
      if (field === "context") return Promise.resolve(1);
      if (field === "password") return Promise.resolve("finished");
      return Promise.resolve(null);
    });
    render(
      <MemoryRouter>
        <Action />
      </MemoryRouter>
    );

    // Assert
    await waitFor(() => expect(screen.getByTestId("freeplay-end")).toBeInTheDocument());
  });
});
