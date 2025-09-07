'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRefresh = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  private handleHome = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/50 rounded-3xl p-8">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>

              <h1 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h1>

              <p className="text-neutral-300 mb-6">
                We encountered an unexpected error. Our team has been notified.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-neutral-800/40 rounded-xl p-4 mb-6 text-left">
                  <p className="text-red-400 text-sm font-mono">{this.state.error.message}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={this.handleRefresh} className="flex-1">
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again</span>
                </Button>

                <Button onClick={this.handleHome} variant="outline" className="flex-1">
                  <Home className="h-4 w-4" />
                  <span>Go Home</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
