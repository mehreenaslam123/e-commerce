import { useQuery, useMutation } from "react-query";
import { authService } from "@/libs/services";

export const useAuth = () => {
    const AUTH_QUERY_KEY = "auth";

    const useLoginUser = ({ onSuccess, onError }: { onSuccess?: (data: any) => void, onError?: (error: any) => void } = {}) =>
        useMutation(
            [AUTH_QUERY_KEY, "login"],
            (data: any) =>
                authService.login(data),
            {
                onSuccess: (data: any) => {
                    localStorage.setItem("token", data.token);
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );
    const useUserMagicLink = ({ onSuccess, onError }: { onSuccess?: (data: any) => void, onError?: (error: any) => void } = {}) =>
        useMutation(
            [AUTH_QUERY_KEY, "userMagicLink"],
            (data: any) =>
                authService.userMagicLink(data),
            {
                onSuccess: (data: any) => {
                    localStorage.setItem("token", data.token);
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );
    const useUserMeData = ({ onSuccess, onError }: { onSuccess?: (data: any) => void, onError?: (error: any) => void } = {}) =>
        useQuery(
            [AUTH_QUERY_KEY, "userMeData"],
            () =>
                authService.userMeData(),
            {
                onSuccess: (data: any) => {
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );
    const useVerifyEmail = ({ token, onSuccess, onError }: { token: string, onSuccess?: (data: any) => void, onError?: (error: any) => void }) =>
        useQuery(
            [AUTH_QUERY_KEY, "verifyEmail"],
            () =>
                authService.verifyEmail(token),
            {
                enabled: !!token,
                onSuccess: (data: any) => {
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );
    const useVerifyMagicLink = ({ onSuccess, onError }: { onSuccess?: (data: any) => void, onError?: (error: any) => void } = {}) =>
        useMutation(
            [AUTH_QUERY_KEY, "verifyMagicLink"],
            (data: any) =>
                authService.verifyMagicLink(data),
            {
                onSuccess: (data: any) => {
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );
    const useVerifyMagicLinkCode = ({ token, onSuccess, onError }: { token: string, onSuccess?: (data: any) => void, onError?: (error: any) => void }) =>
        useQuery(
            [AUTH_QUERY_KEY, "verifyMagicLinkCode", token],
            () =>
                authService.verifyMagicLinkCode(token),
            {
                enabled: !!token,
                onSuccess: (data: any) => {
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );
    const useSignupUser = ({ onSuccess, onError }: { onSuccess?: (data: any) => void, onError?: (error: any) => void } = {}) =>
        useMutation(
            [AUTH_QUERY_KEY, "signup"],
            (data: any) =>
                authService.signup(data),
            {
                onSuccess: (data: any) => {
                    localStorage.setItem("token", data.token);
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );

    const useForgotPassword = ({ onSuccess, onError }: { onSuccess?: (data: any) => void, onError?: (error: any) => void } = {}) =>
        useMutation(
            [AUTH_QUERY_KEY, "forgotPassword"],
            (data: any) =>
                authService.forgotPassword(data),
            {
                onSuccess: (data: any) => {
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );
    const useResetPassword = ({ onSuccess, onError }: { onSuccess?: (data: any) => void, onError?: (error: any) => void } = {}) =>
        useMutation(
            [AUTH_QUERY_KEY, "resetPassword"],
            (data: any) =>
                authService.resetPassword(data),
            {
                onSuccess: (data: any) => {
                    if (onSuccess) onSuccess(data);
                },
                onError: (error) => {
                    if (onError) onError(error);
                },
            }
        );
    const useLogoutUser = () =>
        useMutation(
            [AUTH_QUERY_KEY, "logout"],
            () =>
                authService.logout(),
        );

    const useGetUser = () =>
        useQuery(
            [AUTH_QUERY_KEY, "getUser"],
            () =>
                authService.getUser(),
        );

    return {
        useLoginUser,
        useSignupUser,
        useLogoutUser,
        useGetUser,
        useForgotPassword,
        useResetPassword,
        useUserMeData,
        useUserMagicLink,
        useVerifyMagicLink,
        useVerifyMagicLinkCode,
        useVerifyEmail
    };
};
