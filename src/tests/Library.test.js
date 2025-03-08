import React from 'react';
import { render, screen } from '@testing-library/react';
import Library from '../components/pages/Library';

// Mock child components to focus on rendering
jest.mock('../components/elements/library/LibraryList', () => ({ options, onSelect, selectedOption }) => (
  <div>LibraryList Component</div>
));

jest.mock('../components/elements/MFAInfo', () => ({ MFA }) => (
  <div>MFAInfo Component</div>
));

describe('Library Component', () => {
  test('renders LibraryList and MFAInfo', () => {
    // Arrange
    render(<Library />);

    // Assert
    expect(screen.getByText('LibraryList Component')).toBeInTheDocument();
    expect(screen.getByText('MFAInfo Component')).toBeInTheDocument();
  });
});
