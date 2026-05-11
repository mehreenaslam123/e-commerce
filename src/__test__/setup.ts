import "@testing-library/jest-dom";
import { vi, beforeEach } from "vitest";
import i18n from '@/libs/i18n';

// Set up environment variables for tests
process.env.VITE_API_BASE_URL = 'http://localhost:3000/api';

// Initialize i18n for tests
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: {
        "auth.login.title": "Login",
        "auth.login.description": "AI-manage your business now",
        "auth.login.email": "Email",
        "auth.login.password": "Password",
        "auth.login.useMagic": "Use Magic Link instead",
        "auth.login.forgotPassword": "Forgot Password",
        "auth.login.loginSuccessful": "Login successful",
        "auth.login.youHaveSuccessfullyLoggedIn": "You have successfully logged in",
        "auth.login.loginNotSuccessful": "Login failed",
        "auth.login.youHaveNotSuccessfullyLoggedIn": "You have not successfully logged in"
      }
    }
  }
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
} as Storage;

// Mock sessionStorage
const sessionStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
} as Storage;
vi.mock('*.module.css', () => ({}));
// Set up localStorage mock before each test
beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Set up localStorage mock
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
    });

    // Set up sessionStorage mock
    Object.defineProperty(window, 'sessionStorage', {
        value: sessionStorageMock,
        writable: true,
    });

    // Also set global for Node.js environment
    global.localStorage = localStorageMock;
    global.sessionStorage = sessionStorageMock;
});
