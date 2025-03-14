import { render, screen } from '@testing-library/react';
import Footer from "../../components/elements/footer/Footer";

describe("Footer Component", () => {
  test("renders footer with a download link", () => {
    // Arrange
    render(<Footer />);
    const downloadLink = screen.getByRole("link", { name: /learn more about this work/i });

    // Assert
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute("href", "https://sk1nnyb.github.io/mfa-simulator/data/MFA-Dissertation.pdf");
    expect(downloadLink).toHaveAttribute("download", "MFA-Dissertation.pdf");
  });
});
