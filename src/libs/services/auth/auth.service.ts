import { axios } from "@/libs/axios";
export const authService = {
    login: async (data: any) => {
        const response = await axios.post("/auth/login", data);
        return response.data;
    },
    signup: async (data: any) => {
        const response = await axios.post("/auth/signup", data);
        return response.data;
    },
    logout: async () => {
        const response = await axios.post("/auth/logout");
        return response.data;
    },
    getUser: async () => {
        const response = await axios.get("/auth/user");
        return response.data;
    },
    forgotPassword: async (data: any) => {
        const response = await axios.post("/auth/forgot-password", data);
        return response.data;
    },
    resetPassword: async (data: any) => {
        const response = await axios.post("/auth/reset-password", data);
        return response.data;
    },
    verifyEmail: async (token: string) => {
        console.log("token", token);
        const response = await axios.get(`/auth/verify-email?token=${token}`);
        console.log("response", response);
        return response.data;
    },
    verifyPhone: async (data: any) => {
        const response = await axios.post("/auth/verify-phone", data);
        return response.data;
    },
    sendVerificationCode: async (data: any) => {
        const response = await axios.post("/auth/send-verification-code", data);
        return response.data;
    },
    verifyCode: async (data: any) => {
        const response = await axios.post("/auth/verify-code", data);
        return response.data;
    },
    userMagicLink: async (data: any) => {
        const response = await axios.post("/auth/magic-link/request", data);
        return response.data;
    },
    verifyMagicLink: async (data: any) => {
        const response = await axios.post("/auth/magic-link/verify", data);
        return response.data;
    },
    verifyMagicLinkCode: async (token: string) => {
        const response = await axios.get(`/auth/magic-link/verify-code?code=${token}`);
        return response.data;
    },
    userMeData: async () => {
        const response = await axios.get("/auth/me");
        return response.data;
    }
}