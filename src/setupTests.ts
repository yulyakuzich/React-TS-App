import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './utils/msw/node';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
