import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { useVariables, useNextMFA } from "../../hooks/freeplay/FreePlayUtils";
import Smart_Card from "../../components/actions/Smart_Card";

jest.mock("../../hooks/freeplay/FreePlayUtils", () => ({
  useVariables: jest.fn(),
  useNextMFA: jest.fn(),
}));

describe("Smart_Card Component", () => {
  let mockHandleNextMFA;

  beforeEach(() => {
    jest.clearAllMocks();
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: null,
      finished: false,
    });
    mockHandleNextMFA = jest.fn();
    useNextMFA.mockReturnValue(mockHandleNextMFA);
  });

  test("skips on pre-finished", async () => {
    // Arrange
    useVariables.mockReturnValue({
      finished: true,
    });
    await act(async () => {
      render(<Smart_Card />);
    });

    // Assert
    expect(mockHandleNextMFA).toHaveBeenCalled();
  });

  test("sensor works on card drag", async () => {
    // Arrange
    render(<Smart_Card />);
    const draggableCard = screen.getByTestId("draggable-card");
    const sensor = screen.getByTestId("sensor");
    await waitFor(() => {
      expect(screen.getByText("Drag the card here!")).toBeInTheDocument();
    });
    const sensorMock = {
      left: 50,
      right: 150,
      top: 50,
      bottom: 150,
    };
    const cardMockInside = {
      left: 100,
      right: 200,
      top: 100,
      bottom: 200,
    };
    sensor.getBoundingClientRect = jest.fn(() => sensorMock);
    draggableCard.getBoundingClientRect = jest.fn(() => cardMockInside);

    // Act
    fireEvent.mouseDown(draggableCard, { clientX: 100, clientY: 100 }); // Mouse down at the initial position
    fireEvent.mouseMove(draggableCard, { clientX: 150, clientY: 150 }); // Move card inside sensor area
    fireEvent.mouseMove(draggableCard, { clientX: 200, clientY: 200 }); // Continue moving the card
    fireEvent.mouseUp(draggableCard); // End the drag
    fireEvent.mouseMove(draggableCard, { clientX: 120, clientY: 120 }); // Move inside the sensor area

    // Assert
    await waitFor(() => {
      expect(screen.getByText("Scanning card... Please wait...")).toBeInTheDocument();
    });
  });

  test("calls handleNextMFA when progress reaches 100%", async () => {
    // Arrange
    render(<Smart_Card />);
    const draggableCard = screen.getByTestId("draggable-card");
    const sensor = screen.getByTestId("sensor");
    await waitFor(() => {
      expect(screen.getByText("Drag the card here!")).toBeInTheDocument();
    });
    const sensorMock = {
      left: 50,
      right: 150,
      top: 50,
      bottom: 150,
    };
    const cardMockInside = {
      left: 100,
      right: 200,
      top: 100,
      bottom: 200,
    };
    sensor.getBoundingClientRect = jest.fn(() => sensorMock);
    draggableCard.getBoundingClientRect = jest.fn(() => cardMockInside);

    // Act
    fireEvent.mouseDown(draggableCard, { clientX: 100, clientY: 100 }); // Mouse down at the initial position
    fireEvent.mouseMove(draggableCard, { clientX: 150, clientY: 150 }); // Move card inside sensor area
    fireEvent.mouseMove(draggableCard, { clientX: 200, clientY: 200 }); // Continue moving the card
    fireEvent.mouseUp(draggableCard); // End the drag
    fireEvent.mouseMove(draggableCard, { clientX: 120, clientY: 120 }); // Move inside the sensor area

    // Assert
    await waitFor(() => {
      expect(mockHandleNextMFA).not.toHaveBeenCalled();
    }, { timeout: 5000 });
  });

  test("does not call handleNextMFA when progress is below 100%", async () => {
    // Arrange
    render(<Smart_Card />);
    const draggableCard = screen.getByTestId("draggable-card");
    const sensor = screen.getByTestId("sensor");
    await waitFor(() => {
      expect(screen.getByText("Drag the card here!")).toBeInTheDocument();
    });
    const sensorMock = {
      left: 50,
      right: 150,
      top: 50,
      bottom: 150,
    };
    const cardMockInside = {
      left: 100,
      right: 200,
      top: 100,
      bottom: 200,
    };
    sensor.getBoundingClientRect = jest.fn(() => sensorMock);
    draggableCard.getBoundingClientRect = jest.fn(() => cardMockInside);

    // Act
    fireEvent.mouseDown(draggableCard, { clientX: 100, clientY: 100 }); // Mouse down at the initial position
    fireEvent.mouseMove(draggableCard, { clientX: 150, clientY: 150 }); // Move card inside sensor area
    fireEvent.mouseMove(draggableCard, { clientX: 200, clientY: 200 }); // Continue moving the card
    fireEvent.mouseUp(draggableCard); // End the drag
    fireEvent.mouseMove(draggableCard, { clientX: 120, clientY: 120 }); // Move inside the sensor area

    // Assert
    await waitFor(() => {
      expect(mockHandleNextMFA).not.toHaveBeenCalled();
    }, { timeout: 2000 });
  });
});
