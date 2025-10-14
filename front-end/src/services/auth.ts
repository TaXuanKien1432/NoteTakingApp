import { apiFetch } from "./api";

export interface User {
    id: number | string;
    name: string;
    email: string;
    profile_picture?: string;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}

export function setToken(token: string) {
    localStorage.setItem("accessToken", token);
}

export function getToken() {
    return localStorage.getItem("accessToken");
}

export function clearToken() {
    localStorage.removeItem("accessToken");
}

