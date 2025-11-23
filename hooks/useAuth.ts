import { useState, useEffect } from 'react';

const AUTH_TOKEN_KEY = 'portfolio_auth_token';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      // Verify token is still valid (not expired)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Date.now() / 1000;
        
        if (payload.exp && payload.exp > now) {
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          // Token expired, remove it
          localStorage.removeItem(AUTH_TOKEN_KEY);
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch {
        // Invalid token format, remove it
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } else {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: data.error || 'Authentication failed',
        });
        return false;
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      }

      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: 'Invalid response from server',
      });
      return false;
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Network error',
      });
      return false;
    }
  };

  return {
    ...authState,
    login,
  };
};

