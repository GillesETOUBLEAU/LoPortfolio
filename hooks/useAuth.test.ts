import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuth } from './useAuth';

const AUTH_TOKEN_KEY = 'portfolio_auth_token';

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Token validation', () => {
    it('should validate and accept a non-expired token', async () => {
      // Create a valid token that expires in 1 hour
      const futureExp = Math.floor(Date.now() / 1000) + 3600;
      const payload = { exp: futureExp };
      const token = `header.${btoa(JSON.stringify(payload))}.signature`;

      localStorage.setItem(AUTH_TOKEN_KEY, token);

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.error).toBe(null);
    });

    it('should reject an expired token', async () => {
      // Create a token that expired 1 hour ago
      const pastExp = Math.floor(Date.now() / 1000) - 3600;
      const payload = { exp: pastExp };
      const token = `header.${btoa(JSON.stringify(payload))}.signature`;

      localStorage.setItem(AUTH_TOKEN_KEY, token);

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe(null);
    });

    it('should reject malformed tokens', async () => {
      localStorage.setItem(AUTH_TOKEN_KEY, 'invalid-token');

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe(null);
    });

    it('should start unauthenticated when no token exists', async () => {
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  describe('Login functionality', () => {
    it('should successfully login with valid credentials', async () => {
      const mockToken = 'valid.jwt.token';
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ token: mockToken }),
        } as Response)
      );

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const loginResult = await result.current.login('correct-password');

      expect(loginResult).toBe(true);
      expect(result.current.isAuthenticated).toBe(true);
      expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe(mockToken);
    });

    it('should fail login with invalid credentials', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ error: 'Invalid password' }),
        } as Response)
      );

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const loginResult = await result.current.login('wrong-password');

      expect(loginResult).toBe(false);
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.error).toBe('Invalid password');
    });

    it('should handle network errors during login', async () => {
      global.fetch = vi.fn(() =>
        Promise.reject(new Error('Network error'))
      );

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const loginResult = await result.current.login('password');

      expect(loginResult).toBe(false);
      expect(result.current.error).toBe('Network error');
    });

    it('should handle missing token in response', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        } as Response)
      );

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const loginResult = await result.current.login('password');

      expect(loginResult).toBe(false);
      expect(result.current.error).toBe('Invalid response from server');
    });
  });
});
