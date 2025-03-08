// import React from 'react';
// import { render, screen, fireEvent } from "@testing-library/react";
// import Text from "../../components/actions/Text";
// import { useVariables, useNextMFA } from "../../components/actions/FreePlayUtils";
// import firebaseUtils from "../../firebase";

// jest.mock("../../components/actions/FreePlayUtils", () => ({
//   useVariables: jest.fn(),
//   useNextMFA: jest.fn(),
// }));

// jest.mock("../../firebase", () => ({
//   updateField: jest.fn(),
//   getField: jest.fn(),
// }));

// global.alert = jest.fn();

// describe("Text Component", () => {
//   let mockHandleNextMFA;

//   beforeEach(() => {
//     mockHandleNextMFA = jest.fn();
//     useNextMFA.mockReturnValue(mockHandleNextMFA);
//     jest.clearAllMocks(); // Reset mocks before each test
//   });

//   test("renders mobile redirect", () => {
//     // Arrange
//     useVariables.mockReturnValue({
//       runCode: "123456",
//       phone: true,
//       finished: false,
//     });
//     render(<Text />);

//     // Assert
//     expect(screen.getByText(/Go to your mobile device now!/i)).toBeInTheDocument();
//     expect(screen.getByText(/Run Code:/i)).toBeInTheDocument();
//     expect(screen.getByText("123456")).toBeInTheDocument();
//   });

//   test("renders action", () => {
//     // Arrange
//     useVariables.mockReturnValue({
//       runCode: "123456",
//       phone: false,
//       finished: false,
//       code: 1234,
//     });
//     render(<Text />);

//     // Act / Assert
//     expect(screen.getByText(/Security Code/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /Input Code/i })).toBeInTheDocument();
//     expect(screen.getByText(/Hey! We've noticed you've attempted to log into your Manchester Email!/i)).toBeInTheDocument();
//     expect(screen.getByText(/Your code is: 1234/i)).toBeInTheDocument();
//   });

//   test("initializes firebase", () => {
//     // Arrange
//     useVariables.mockReturnValue({
//       runCode: "123456",
//       phone: false,
//       finished: false,
//       code: 1234,
//     });
//     render(<Text />);

//     // Act / Assert
//     expect(firebaseUtils.updateField).toHaveBeenCalledWith("123456", "text", "started");
//     expect(firebaseUtils.updateField).toHaveBeenCalledWith("123456", "text_code", "1234");
//     expect(firebaseUtils.updateField).toHaveBeenCalledWith("123456", "status", "active");
//   });

//   test("calls handleNextMFA", () => {
//     // Arrange
//     useVariables.mockReturnValue({
//       runCode: "123456",
//       phone: false,
//       finished: true,
//     });
//     render(<Text />);

//     // Act / Assert
//     expect(mockHandleNextMFA).toHaveBeenCalled();
//   });

//   test("submit correct code button", () => {
//     // Arrange
//     useVariables.mockReturnValue({
//       runCode: "123456",
//       phone: false,
//       finished: false,
//       code: 1234,
//     });
//     render(<Text />);

//     // Act
//     fireEvent.change(screen.getByPlaceholderText('Enter Code Here!'), { target: { value: '1234' } });
//     fireEvent.click(screen.getByRole("button", { name: /Input Code/i }));

//     // Assert
//     expect(firebaseUtils.updateField).toHaveBeenCalledWith("123456", 'text_task', 'finished');
//     expect(mockHandleNextMFA).toHaveBeenCalled();
//   });

//   test("submit incorrect code button", () => {
//     // Arrange
//     useVariables.mockReturnValue({
//       runCode: "123456",
//       phone: false,
//       finished: true,
//       code: 1234,
//     });
//     render(<Text />);

//     // Act
//     fireEvent.change(screen.getByPlaceholderText('Enter Code Here!'), { target: { value: '5678' } }); // Enter an incorrect code
//     fireEvent.click(screen.getByRole("button", { name: /Input Code/i }));

//     // Assert
//     expect(window.alert).toHaveBeenCalledWith('Entered Security Code: 5678 is not correct! Try again.');
//     expect(mockHandleNextMFA).not.toHaveBeenCalled();
//   });
// });

import { render, screen } from '@testing-library/react';
import Footer from "../../components/footer/Footer";

describe("Footer Component", () => {
  test("renders footer with a download link", () => {
    // Arrange
    render(<Footer />);

    // Act (Find the link)
    const downloadLink = screen.getByRole("link", { name: /learn more about this work/i });

    // Assert
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute("href", "../../data/MFA-Dissertation.pdf");
    expect(downloadLink).toHaveAttribute("download", "MFA-Dissertation.pdf");
  });
});