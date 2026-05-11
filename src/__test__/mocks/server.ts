import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Mock user data
export const mockUser = {
  id: '123',
  fullName: 'Test User',
  email: 'test@example.com',
  avatar: null,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

export const mockAuthResponse = {
  token: 'mock-jwt-token-12345',
  user: mockUser,
  refreshToken: 'mock-refresh-token-12345',
};

// API handlers
export const handlers = [
  // Login endpoint
  http.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, async ({ request }) => {
    const { email, password } = await request.json() as any;

    // Simulate validation
    if (!email || !password) {
      return HttpResponse.json({
        error: 'Email and password are required',
        message: 'Validation failed',
      }, { status: 400 });
    }

    // Simulate invalid credentials
    if (email === 'invalid@example.com' || password === 'wrongpassword') {
      return HttpResponse.json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect',
      }, { status: 401 });
    }

    // Simulate successful login
    return HttpResponse.json(mockAuthResponse);
  }),

  // Magic link endpoint
  http.post(`${import.meta.env.VITE_API_BASE_URL}/auth/magic-link`, async ({ request }) => {
    const { email } = await request.json() as any;

    if (!email) {
      return HttpResponse.json({
        error: 'Email is required',
        message: 'Validation failed',
      }, { status: 400 });
    }

    // Simulate email not found
    if (email === 'notfound@example.com') {
      return HttpResponse.json({
        error: 'User not found',
        message: 'No user found with this email address',
      }, { status: 404 });
    }

    // Simulate successful magic link sent
    return HttpResponse.json({
      message: 'Magic link sent successfully',
      email: email,
    });
  }),

  // Refresh token endpoint
  http.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, async ({ request }) => {
    const { refreshToken } = await request.json() as any;

    if (!refreshToken) {
      return HttpResponse.json({
        error: 'Refresh token is required',
        message: 'Validation failed',
      }, { status: 400 });
    }

    // Simulate invalid refresh token
    if (refreshToken === 'invalid-refresh-token') {
      return HttpResponse.json({
        error: 'Invalid refresh token',
        message: 'Refresh token is expired or invalid',
      }, { status: 401 });
    }

    // Simulate successful token refresh
    return HttpResponse.json({
      token: 'new-mock-jwt-token-67890',
      refreshToken: 'new-mock-refresh-token-67890',
    });
  }),

  // Logout endpoint
  http.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, () => {
    return HttpResponse.json({
      message: 'Logged out successfully',
    });
  }),

  // Get user profile endpoint
  http.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, ({ request }) => {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({
        error: 'Unauthorized',
        message: 'Valid authentication token is required',
      }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    // Simulate invalid token
    if (token === 'invalid-token') {
      return HttpResponse.json({
        error: 'Invalid token',
        message: 'Authentication token is invalid or expired',
      }, { status: 401 });
    }

    // Simulate successful user profile fetch
    return HttpResponse.json(mockUser);
  }),

  // Update user profile endpoint
  http.put(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, async ({ request }) => {
    const authHeader = request.headers.get('authorization');
    const { fullName, email } = await request.json() as any;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({
        error: 'Unauthorized',
        message: 'Valid authentication token is required',
      }, { status: 401 });
    }

    if (!fullName || !email) {
      return HttpResponse.json({
        error: 'Full name and email are required',
        message: 'Validation failed',
      }, { status: 400 });
    }

    // Simulate successful profile update
    return HttpResponse.json({
      ...mockUser,
      fullName,
      email,
      updatedAt: new Date().toISOString(),
    });
  }),

  // Change password endpoint
  http.put(`${import.meta.env.VITE_API_BASE_URL}/auth/password`, async ({ request }) => {
    const authHeader = request.headers.get('authorization');
    const { currentPassword, newPassword } = await request.json() as any;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({
        error: 'Unauthorized',
        message: 'Valid authentication token is required',
      }, { status: 401 });
    }

    if (!currentPassword || !newPassword) {
      return HttpResponse.json({
        error: 'Current password and new password are required',
        message: 'Validation failed',
      }, { status: 400 });
    }

    // Simulate wrong current password
    if (currentPassword === 'wrongpassword') {
      return HttpResponse.json({
        error: 'Current password is incorrect',
        message: 'Please provide the correct current password',
      }, { status: 400 });
    }

    // Simulate password too short
    if (newPassword.length < 6) {
      return HttpResponse.json({
        error: 'Password too short',
        message: 'New password must be at least 6 characters long',
      }, { status: 400 });
    }

    // Simulate successful password change
    return HttpResponse.json({
      message: 'Password changed successfully',
    });
  }),

  // Forgot password endpoint
  http.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, async ({ request }) => {
    const { email } = await request.json() as any;

    if (!email) {
      return HttpResponse.json({
        error: 'Email is required',
        message: 'Validation failed',
      }, { status: 400 });
    }

    // Simulate email not found
    if (email === 'notfound@example.com') {
      return HttpResponse.json({
        error: 'User not found',
        message: 'No user found with this email address',
      }, { status: 404 });
    }

    // Simulate successful password reset email sent
    return HttpResponse.json({
      message: 'Password reset email sent successfully',
      email: email,
    });
  }),

  // Reset password endpoint
  http.post(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`, async ({ request }) => {
    const { token, newPassword } = await request.json() as any;

    if (!token || !newPassword) {
      return HttpResponse.json({
        error: 'Token and new password are required',
        message: 'Validation failed',
      }, { status: 400 });
    }

    // Simulate invalid or expired token
    if (token === 'invalid-token' || token === 'expired-token') {
      return HttpResponse.json({
        error: 'Invalid or expired token',
        message: 'Password reset token is invalid or has expired',
      }, { status: 400 });
    }

    // Simulate password too short
    if (newPassword.length < 6) {
      return HttpResponse.json({
        error: 'Password too short',
        message: 'New password must be at least 6 characters long',
      }, { status: 400 });
    }

    // Simulate successful password reset
    return HttpResponse.json({
      message: 'Password reset successfully',
    });
  }),

  // Verify email endpoint
  http.post(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-email`, async ({ request }) => {
    const { token } = await request.json() as any;

    if (!token) {
      return HttpResponse.json({
        error: 'Verification token is required',
        message: 'Validation failed',
      }, { status: 400 });
    }

    // Simulate invalid or expired token
    if (token === 'invalid-token' || token === 'expired-token') {
      return HttpResponse.json({
        error: 'Invalid or expired token',
        message: 'Email verification token is invalid or has expired',
      }, { status: 400 });
    }

    // Simulate successful email verification
    return HttpResponse.json({
      message: 'Email verified successfully',
    });
  }),

  // Resend verification email endpoint
  http.post(`${import.meta.env.VITE_API_BASE_URL}/auth/resend-verification`, async ({ request }) => {
    const { email } = await request.json() as any;

    if (!email) {
      return HttpResponse.json({
        error: 'Email is required',
        message: 'Validation failed',
      }, { status: 400 });
    }

    // Simulate email not found
    if (email === 'notfound@example.com') {
      return HttpResponse.json({
        error: 'User not found',
        message: 'No user found with this email address',
      }, { status: 404 });
    }

    // Simulate successful verification email sent
    return HttpResponse.json({
      message: 'Verification email sent successfully',
      email: email,
    });
  }),

  // Generic error handler for unmatched routes
  http.all('*', () => {
    console.warn('No handler found for this request');
    return HttpResponse.json({
      error: 'Not found',
      message: 'No handler found for this endpoint',
    }, { status: 404 });
  }),
];

// Create MSW server
export const server = setupServer(...handlers);

// Export types for use in tests
export type MockUser = typeof mockUser;
export type MockAuthResponse = typeof mockAuthResponse;
