// Import necessary dependencies and the component to be tested
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login component', () => {
  test('renders login form elements', () => {
    render(<Login />, { wrapper: MemoryRouter });

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');
    const registerLink = screen.getByText('Register');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  test('submits login form with valid credentials', () => {
    render(<Login />, { wrapper: MemoryRouter });

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    // Fill in the login form with valid credentials
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(loginButton);

    // Assert that the form submission was successful
    // You may add assertions specific to your application logic here
  });

  test('redirects to home page after successful login', () => {
    // Mock Navigate component to avoid errors in tests
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      Navigate: jest.fn(({ to }) => <div data-testid="navigate">{to}</div>),
    }));

    render(<Login />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    // Fill in the login form with valid credentials
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(loginButton);

    // Assert that the redirect to home page occurs
    expect(screen.getByTestId('navigate').textContent).toBe('/home');
  });
});
