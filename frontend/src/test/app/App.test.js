import { render, screen } from '@testing-library/react';
import App from '../../app/App';

describe('Given the App component', () => {
  describe('When it renders the main UI', () => {
    test('Then it should show the "Available Products" section', () => {
      render(<App />);
      const sectionTitle = screen.getByText(/Available Products/i);
      expect(sectionTitle).toBeInTheDocument();
      expect(sectionTitle).toBeVisible();
    });

    test('Then it should show the "Build Your Order" section', () => {
      render(<App />);
      const sectionTitle = screen.getByText(/Build Your Order/i);
      expect(sectionTitle).toBeInTheDocument();
      expect(sectionTitle).toBeVisible();
    });
  });
});
