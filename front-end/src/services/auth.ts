import { apiFetch } from "./api";

export interface User {
    id: number;
    name: string;
    email: string;
    profilePicture: string | null;
}

export interface AuthResponse {
    accessToken: string | null;
    message: string;
    user: User | null;
}

export function setToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
}

export function getToken(): string | null {
    return localStorage.getItem("accessToken");
}

export function clearToken() {
    localStorage.removeItem("accessToken");
}

export async function login(email: string, password: string): Promise<User> {
    const data = await apiFetch<AuthResponse>("/auth/login", {
        method: "POST",
        body: { email, password },
    });
    if (data.message !== "success" || !data.accessToken) {
        throw new Error(data.message);
    }
    setToken(data.accessToken);
    return data.user as User;
}

export async function register(name: string, email: string, password: string): Promise<User> {
    const data = await apiFetch<AuthResponse>("/auth/register", {
        method: "POST",
        body: { name, email, password },
    });
    if (data.message !== "success" || !data.accessToken) {
        throw new Error(data.message);
    }
    setToken(data.accessToken);
    return data.user as User;
}

