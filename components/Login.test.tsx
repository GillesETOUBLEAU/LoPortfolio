import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Login } from './Login';

describe('Login', () => {
  it('should render login form', () => {
    const mockOnLogin = vi.fn();
    render(<Login onLogin={mockOnLogin} isLoading={false} error={null} />);

    expect(screen.getByText('Portfolio Access')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Access Portfolio' })).toBeInTheDocument();
  });

  it('should call onLogin with password when form is submitted', async () => {
    const mockOnLogin = vi.fn().mockResolvedValue(true);
    render(<Login onLogin={mockOnLogin} isLoading={false} error={null} />);

    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Access Portfolio' });

    fireEvent.change(passwordInput, { target: { value: 'test-password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('test-password');
    });
  });

  it('should disable submit button when password is empty', () => {
    const mockOnLogin = vi.fn();
    render(<Login onLogin={mockOnLogin} isLoading={false} error={null} />);

    const submitButton = screen.getByRole('button', { name: 'Access Portfolio' });
    expect(submitButton).toBeDisabled();
  });

  it('should disable form when isLoading is true', () => {
    const mockOnLogin = vi.fn();
    render(<Login onLogin={mockOnLogin} isLoading={true} error={null} />);

    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Authenticating...' });

    expect(passwordInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it('should display error message when error prop is provided', () => {
    const mockOnLogin = vi.fn();
    const errorMessage = 'Invalid password';
    render(<Login onLogin={mockOnLogin} isLoading={false} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should change button text when loading', () => {
    const mockOnLogin = vi.fn();
    const { rerender } = render(<Login onLogin={mockOnLogin} isLoading={false} error={null} />);

    expect(screen.getByRole('button', { name: 'Access Portfolio' })).toBeInTheDocument();

    rerender(<Login onLogin={mockOnLogin} isLoading={true} error={null} />);

    expect(screen.getByRole('button', { name: 'Authenticating...' })).toBeInTheDocument();
  });
});
