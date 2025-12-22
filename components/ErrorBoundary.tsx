import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="relative w-full h-screen bg-slate-950 text-white font-sans overflow-hidden flex items-center justify-center">
          <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-0"></div>

          <div className="relative z-10 w-full max-w-2xl px-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-red-400 text-4xl">⚠️</div>
                <div>
                  <h1 className="text-3xl font-bold">Something went wrong</h1>
                  <p className="text-slate-400 text-sm mt-1">
                    An unexpected error occurred in the application
                  </p>
                </div>
              </div>

              {this.state.error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                  <p className="font-mono text-sm text-red-300">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}

              {import.meta.env.DEV && this.state.errorInfo && (
                <details className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                  <summary className="cursor-pointer text-sm font-medium mb-2">
                    Stack Trace (Development Only)
                  </summary>
                  <pre className="text-xs text-slate-400 overflow-auto max-h-64">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex gap-3">
                <button
                  onClick={this.handleReset}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  Try Again
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
