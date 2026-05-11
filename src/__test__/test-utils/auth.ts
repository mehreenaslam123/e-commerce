import { vi } from 'vitest';

// Mock data factories
export const createMockUser = (overrides = {}) => ({
    id: '123',
    fullName: 'Test User',
    email: 'test@example.com',
    avatar: null,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    ...overrides,
});

export const createMockAuthResponse = (overrides = {}) => ({
    token: 'mock-jwt-token-12345',
    user: createMockUser(),
    refreshToken: 'mock-refresh-token-12345',
    ...overrides,
});

export const createMockLoginCredentials = (overrides = {}) => ({
    email: 'test@example.com',
    password: 'password123',
    ...overrides,
});

// Mock hook factories
export const createMockUseLoginUser = (overrides = {}) => ({
    mutate: vi.fn(),
    isLoading: false,
    error: null,
    data: null,
    ...overrides,
});

export const createMockUseUserMagicLink = (overrides = {}) => ({
    mutate: vi.fn(),
    isLoading: false,
    error: null,
    data: null,
    ...overrides,
});

export const createMockUseUserMeData = (overrides = {}) => ({
    data: createMockUser(),
    isLoading: false,
    error: null,
    ...overrides,
});

// Mock function factories
export const createMockNavigate = () => vi.fn();
export const createMockMessage = () => ({
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
});

// Mock localStorage utilities
export const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
};

export const setupLocalStorageMock = () => {
    Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
        configurable: true,
    });

    global.localStorage = mockLocalStorage;
};

export const resetLocalStorageMock = () => {
    mockLocalStorage.getItem.mockReset();
    mockLocalStorage.setItem.mockReset();
    mockLocalStorage.removeItem.mockReset();
    mockLocalStorage.clear.mockReset();
};

// Auth state utilities
export const setMockAuthToken = (token: string) => {
    mockLocalStorage.getItem.mockImplementation((key: string) => {
        if (key === 'token') return token;
        return null;
    });
};

export const clearMockAuthToken = () => {
    mockLocalStorage.getItem.mockImplementation(() => null);
};

// Common test data
export const testUsers = {
    valid: createMockUser(),
    invalid: createMockUser({ email: 'invalid@example.com' }),
    admin: createMockUser({
        id: 'admin-123',
        fullName: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
    }),
};

export const testCredentials = {
    valid: createMockLoginCredentials(),
    invalid: createMockLoginCredentials({
        email: 'invalid@example.com',
        password: 'wrongpassword'
    }),
    shortPassword: createMockLoginCredentials({ password: '123' }),
    longEmail: createMockLoginCredentials({
        email: 'a'.repeat(100) + '@example.com'
    }),
    specialChars: createMockLoginCredentials({
        email: 'test+tag@example.com'
    }),
};
