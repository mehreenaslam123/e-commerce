import { setupWorker } from 'msw/browser';
import { handlers } from './server';

// Create MSW worker for browser environment
export const worker = setupWorker(...handlers);

// Export handlers for use in tests
export { handlers };
