import { Component } from 'react';
import { ErrorBounderyState } from '../types';

export default class ErrorButton extends Component {
  state: ErrorBounderyState = {
    hasError: false,
  };

  throwError = () => {
    throw new Error('Some error');
  };
  componentDidUpdate(): void {
    if (this.state.hasError) {
      this.throwError();
    }
  }
  render() {
    return (
      <section>
        <div className="container column">
          <button
            className="button"
            onClick={() => {
              this.setState({ hasError: true });
            }}
          >
            Error Button
          </button>
        </div>
      </section>
    );
  }
}
