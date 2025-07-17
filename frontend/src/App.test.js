import { render, screen } from '@testing-library/react';
import App from './app/App';

test('renders Available Products link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Available Products/i);
  expect(linkElement).toBeInTheDocument();
});
