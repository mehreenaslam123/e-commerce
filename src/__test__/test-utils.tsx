import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/libs/i18n';

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return (
        <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </QueryClientProvider>
        </I18nextProvider>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Helper function to mock API responses
export const mockApiResponse = (data: any, status = 200) => {
    return Promise.resolve({
        data,
        status,
        ok: status >= 200 && status < 300,
    });
};

// Helper function to create mock user data
export const createMockUser = (overrides = {}) => ({
    id: '1',
    email: 'test@example.com',
    fullName: 'Test User',
    authorizationToken: 'mock-token',
    ...overrides,
});

// Helper function to mock localStorage
export const mockLocalStorage = () => {
    const store: Record<string, string> = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value;
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            Object.keys(store).forEach(key => delete store[key]);
        },
    };
};
