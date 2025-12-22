import React, { useState, FormEvent } from 'react';

interface LoginProps {
  onLogin: (password: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export const Login: React.FC<LoginProps> = ({ onLogin, isLoading, error }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onLogin(password);
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 text-white font-sans overflow-hidden flex items-center justify-center">
      {/* Global Background Noise/Gradient Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-0"
        aria-hidden="true"
      ></div>

      <main className="relative z-10 w-full max-w-md px-6" role="main">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold mb-2 text-center">Portfolio Access</h1>
          <p className="text-slate-400 text-center mb-8">Enter password to continue</p>

          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Login form">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter password"
                autoFocus
                autoComplete="current-password"
                aria-required="true"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'login-error' : undefined}
              />
            </div>

            {error && (
              <div
                id="login-error"
                role="alert"
                aria-live="polite"
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-200"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={isLoading ? 'Authenticating, please wait' : 'Access portfolio'}
            >
              {isLoading ? 'Authenticating...' : 'Access Portfolio'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

