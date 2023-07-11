import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// This checks if the learn react link is present in <App /> or not
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Now how to run this test?