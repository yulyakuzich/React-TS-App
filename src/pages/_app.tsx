import React from 'react';
import type { AppProps } from 'next/app';
import './styles.css';
import { ErrorBoundary } from '../components/ErrorBoundery/ErrorBoundary';
import { wrapper } from '../store';

function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
