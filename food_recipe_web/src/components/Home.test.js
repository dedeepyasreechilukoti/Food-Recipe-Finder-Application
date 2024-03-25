// Import necessary dependencies and the component to be tested
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';

// Mock fetch function to return dummy data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ hits: [{ recipe: { label: 'Recipe 1' } }] }),
  })
);

describe('Home component', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('renders without crashing', () => {
    const headingElement = screen.getByText('Food Recipe Application');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders search input field and submit button', () => {
    const searchInput = screen.getByPlaceholderText('Please enter your favorite foods');
    expect(searchInput).toBeInTheDocument();

    const submitButton = screen.getByText('Search');
    expect(submitButton).toBeInTheDocument();
  });

  test('submits form with search query and renders products', async () => {
    const searchInput = screen.getByPlaceholderText('Please enter your favorite foods');
    fireEvent.change(searchInput, { target: { value: 'pizza' } });

    const submitButton = screen.getByText('Search');
    fireEvent.click(submitButton);

    // Wait for API call to resolve
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('pizza'));
    });

    // Check if product component is rendered with fetched data
    const productElement = screen.getByText('Recipe 1');
    expect(productElement).toBeInTheDocument();
  });
});
