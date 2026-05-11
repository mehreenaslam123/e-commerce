import { describe, it, expect } from 'vitest';

// Example utility function to test
const formatEmail = (email: string): string => {
    if (!email) return '';
    return email.toLowerCase().trim();
};

const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!password) {
        errors.push('Password is required');
        return { isValid: false, errors };
    }

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

describe('Utility Functions', () => {
    describe('formatEmail', () => {
        it('should format email correctly', () => {
            expect(formatEmail('TEST@EXAMPLE.COM')).toBe('test@example.com');
            expect(formatEmail('  test@example.com  ')).toBe('test@example.com');
            expect(formatEmail('Test@Example.Com')).toBe('test@example.com');
        });

        it('should handle empty email', () => {
            expect(formatEmail('')).toBe('');
            expect(formatEmail('   ')).toBe('');
        });
    });

    describe('validatePassword', () => {
        it('should validate strong password', () => {
            const result = validatePassword('StrongPass123');
            expect(result.isValid).toBe(true);
            expect(result.errors).toEqual([]);
        });

        it('should reject empty password', () => {
            const result = validatePassword('');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password is required');
        });

        it('should reject short password', () => {
            const result = validatePassword('abc');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must be at least 6 characters');
        });

        it('should reject password without uppercase', () => {
            const result = validatePassword('password123');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must contain at least one uppercase letter');
        });

        it('should reject password without lowercase', () => {
            const result = validatePassword('PASSWORD123');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must contain at least one lowercase letter');
        });

        it('should reject password without numbers', () => {
            const result = validatePassword('Password');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must contain at least one number');
        });

        it('should collect multiple errors', () => {
            const result = validatePassword('abc');
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(3);
            expect(result.errors).toContain('Password must be at least 6 characters');
            expect(result.errors).toContain('Password must contain at least one uppercase letter');
            expect(result.errors).toContain('Password must contain at least one number');
        });
    });
});
