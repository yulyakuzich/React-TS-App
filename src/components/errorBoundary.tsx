import { Component, ErrorInfo } from 'react';
import { ErrorBounderyProps, ErrorBounderyState } from '../types';

export class ErrorBoundary extends Component<
  ErrorBounderyProps,
  ErrorBounderyState
> {
  state: ErrorBounderyState = { hasError: false };

  static getDerivedStateFromError(): ErrorBounderyState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <div className="container column">
            <h1 className="error_message">Somethig went wrong</h1>
            <button
              className="button"
              onClick={() => {
                location.reload();
              }}
            >
              Please, refresh page!
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
