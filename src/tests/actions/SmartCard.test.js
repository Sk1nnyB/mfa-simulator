import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import Smart_Card from "../../components/actions/Smart_Card"; // Import your component
import { useVariables, useNextMFA } from "../../hooks/freeplay/FreePlayUtils";

// Mock the freePlayUtils hooks
jest.mock("../../hooks/freeplay/FreePlayUtils", () => ({
  useVariables: jest.fn(),
  useNextMFA: jest.fn(),
}));

describe("Smart_Card Component", () => {
  let mockHandleNextMFA;

  beforeEach(() => {
    jest.clearAllMocks();
    mockHandleNextMFA = jest.fn();
    useVariables.mockReturnValue({
      runCode: "123456",
      phone: null,
      finished: false,
    });
    useNextMFA.mockReturnValue(mockHandleNextMFA);
  });

  test("skips on pre-finished", async () => {
    // Arrange
    useVariables.mockReturnValue({
      runCode: 123456,
      phone: false,
      finished: true,
    });
    await act(async () => {
      render(<Smart_Card />);
    });

    // Act / Assert
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

    // Set up mock for getBoundingClientRect
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

    // Mock the getBoundingClientRect function
    sensor.getBoundingClientRect = jest.fn(() => sensorMock);
    draggableCard.getBoundingClientRect = jest.fn(() => cardMockInside);

    // Act: Simulate dragging the card over the sensor
    fireEvent.mouseDown(draggableCard, { clientX: 100, clientY: 100 }); // Mouse down at the initial position
    fireEvent.mouseMove(draggableCard, { clientX: 150, clientY: 150 }); // Move card inside sensor area
    fireEvent.mouseMove(draggableCard, { clientX: 200, clientY: 200 }); // Continue moving the card
    fireEvent.mouseUp(draggableCard); // End the drag

    // Simulate dragging the card inside the sensor
    fireEvent.mouseMove(draggableCard, { clientX: 120, clientY: 120 }); // Move inside the sensor area

    // Wait for the progress bar to start increasing
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

    // Set up mock for getBoundingClientRect
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

    // Mock the getBoundingClientRect function
    sensor.getBoundingClientRect = jest.fn(() => sensorMock);
    draggableCard.getBoundingClientRect = jest.fn(() => cardMockInside);

    // Act: Simulate dragging the card over the sensor
    fireEvent.mouseDown(draggableCard, { clientX: 100, clientY: 100 }); // Mouse down at the initial position
    fireEvent.mouseMove(draggableCard, { clientX: 150, clientY: 150 }); // Move card inside sensor area
    fireEvent.mouseMove(draggableCard, { clientX: 200, clientY: 200 }); // Continue moving the card
    fireEvent.mouseUp(draggableCard); // End the drag

    // Simulate dragging the card inside the sensor
    fireEvent.mouseMove(draggableCard, { clientX: 120, clientY: 120 }); // Move inside the sensor area

    // Wait until the progress reaches 100% and ensure handleNextMFA is called
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

    // Set up mock for getBoundingClientRect
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

    // Mock the getBoundingClientRect function
    sensor.getBoundingClientRect = jest.fn(() => sensorMock);
    draggableCard.getBoundingClientRect = jest.fn(() => cardMockInside);

    // Act: Simulate dragging the card over the sensor
    fireEvent.mouseDown(draggableCard, { clientX: 100, clientY: 100 }); // Mouse down at the initial position
    fireEvent.mouseMove(draggableCard, { clientX: 150, clientY: 150 }); // Move card inside sensor area
    fireEvent.mouseMove(draggableCard, { clientX: 200, clientY: 200 }); // Continue moving the card
    fireEvent.mouseUp(draggableCard); // End the drag

    // Simulate dragging the card inside the sensor
    fireEvent.mouseMove(draggableCard, { clientX: 120, clientY: 120 }); // Move inside the sensor area

    await waitFor(() => {
      expect(mockHandleNextMFA).not.toHaveBeenCalled();
    }, { timeout: 2000 });
  });
});
