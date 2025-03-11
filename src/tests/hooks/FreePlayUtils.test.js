import { renderHook, act } from "@testing-library/react-hooks"; // Updated import for act
import { MemoryRouter } from "react-router-dom";
import freePlayUtils from "../../hooks/freeplay/FreePlayUtils";
import firebaseUtils from "../../firebase.js";

jest.mock("../../firebase.js", () => ({
  getField: jest.fn(),
  updateField: jest.fn(),
  useWaitForFinished: jest.fn(),
}));

describe("useVariables Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
  });

  test("fetches variables and updates fields on mount", async () => {
    firebaseUtils.getField
      .mockResolvedValueOnce(false) // Mock phone
      .mockResolvedValueOnce("not_started"); // Mock task status

    const fakeRunCode = "123456";
    const { result, waitForNextUpdate } = renderHook(() => freePlayUtils.useVariables("test_task"), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[`/somepath?runCode=${fakeRunCode}`]}>
          {children}
        </MemoryRouter>
      ),
    });

    await waitForNextUpdate();

    expect(result.current.runCode).toBe(fakeRunCode);
    expect(result.current.phone).toBe(false);
    expect(firebaseUtils.updateField).toHaveBeenCalledWith(fakeRunCode, "test_task", "started");
    expect(firebaseUtils.updateField).toHaveBeenCalledWith(fakeRunCode, "status", "active");
    expect(firebaseUtils.useWaitForFinished).toHaveBeenCalled();
  });

  test("status updated if already updated", async () => {
    firebaseUtils.getField.mockResolvedValueOnce(false).mockResolvedValueOnce("started");

    const fakeRunCode = "123456";
    const { waitForNextUpdate } = renderHook(() => freePlayUtils.useVariables("test_task"), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[`/somepath?runCode=${fakeRunCode}`]}>
          {children}
        </MemoryRouter>
      ),
    });

    await waitForNextUpdate();

    expect(firebaseUtils.updateField).not.toHaveBeenCalledWith(fakeRunCode, "test_task", "started");
  });
});

describe("useNextMFA Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("updates field and refreshes the page", async () => {
    // Arrange
    const fakeRunCode = "123456";
    const { result } = renderHook(() => freePlayUtils.useNextMFA("test_task"), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[`/somepath?runCode=${fakeRunCode}`]}>
          {children}
        </MemoryRouter>
      ),
    });

    // Act
    await act(async () => {
      await result.current();
    });

    // Assert
    expect(firebaseUtils.updateField).toHaveBeenCalledWith(fakeRunCode, "test_task", "finished");
    // expect(mockNavigate).toHaveBeenCalledWith(0);
  });
});
